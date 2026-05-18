"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useTranslations } from "next-intl"
import {
  getOrCreateSessionId,
  getLocalMessageCount,
  incrementLocalCount,
  hasReachedLimit,
  MAX_FREE_MESSAGES,
  type LandingPro,
  type ChatMessage,
} from "@/lib/chat-session"

type ChatEntry = {
  role: "user" | "assistant"
  content: string
  professionals?: LandingPro[]
}

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3001"

export default function LandingChatbot() {
  const t = useTranslations("chatbot")

  const [messages, setMessages] = useState<ChatEntry[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showWall, setShowWall] = useState(false)
  const [messagesUsed, setMessagesUsed] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages([{ role: "assistant", content: t("welcome") }])
    setMessagesUsed(getLocalMessageCount())
  }, [t])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const buildHistory = useCallback((): ChatMessage[] => {
    return messages
      .filter((m) => !m.professionals)
      .map((m) => ({ role: m.role, content: m.content }))
  }, [messages])

  async function handleSend(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    if (hasReachedLimit()) {
      setShowWall(true)
      return
    }

    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: trimmed }])
    setIsLoading(true)

    try {
      const sessionId = getOrCreateSessionId()
      const history = buildHistory()

      const res = await fetch(`${PLATFORM_URL}/api/landing-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history,
          session_id: sessionId,
          locale: "en",
        }),
      })

      if (res.status === 429) {
        setShowWall(true)
        setIsLoading(false)
        return
      }

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: t("errorMessage") },
        ])
        setIsLoading(false)
        return
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ""
      let messageText = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        const lines = buffer.split("\n")
        buffer = lines.pop()!

        for (const line of lines) {
          if (!line.trim()) continue
          try {
            const chunk = JSON.parse(line)

            if (chunk.error) {
              setMessages((prev) => [
                ...prev,
                { role: "assistant", content: t("errorMessage") },
              ])
              setIsLoading(false)
              return
            }

            if (chunk.type === "message") {
              messageText = chunk.message
              setMessages((prev) => [
                ...prev,
                { role: "assistant", content: chunk.message },
              ])
              setIsLoading(false)
            }

            if (chunk.type === "complete") {
              if (!messageText && chunk.message) {
                messageText = chunk.message
                setMessages((prev) => [
                  ...prev,
                  { role: "assistant", content: chunk.message },
                ])
                setIsLoading(false)
              }

              if (chunk.professionals?.length > 0) {
                setMessages((prev) => {
                  const updated = [...prev]
                  const lastIdx = updated.length - 1
                  if (lastIdx >= 0 && updated[lastIdx].role === "assistant") {
                    updated[lastIdx] = {
                      ...updated[lastIdx],
                      professionals: chunk.professionals,
                    }
                  }
                  return updated
                })
              }

              const newCount = incrementLocalCount()
              setMessagesUsed(newCount)

              if (chunk.show_wall) {
                setTimeout(() => setShowWall(true), 800)
              }
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("errorMessage") },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const suggestions = [t("suggestion1"), t("suggestion2"), t("suggestion3"), t("suggestion4")]
  const showSuggestions = messages.length === 1

  const remaining = MAX_FREE_MESSAGES - messagesUsed

  return (
    <div
      className="card border-0 overflow-hidden"
      style={{
        borderRadius: 16,
        backdropFilter: "blur(12px)",
        background: "rgba(255, 255, 255, 0.92)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
      }}
    >
      {/* Header */}
      <div
        className="card-header d-flex align-items-center justify-content-between py-2 px-3 border-0"
        style={{ background: "linear-gradient(135deg, #0d6efd, #0a58ca)" }}
      >
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: 32, height: 32, background: "rgba(255,255,255,0.2)" }}
          >
            <i className="fas fa-robot text-white" style={{ fontSize: "0.8rem" }}></i>
          </div>
          <div>
            <h6 className="mb-0 fw-semibold text-white" style={{ fontSize: "0.8rem" }}>{t("title")}</h6>
            <small style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.75)" }}>{t("subtitle")}</small>
          </div>
        </div>
        <div className="d-flex align-items-center gap-1">
          <small className="me-1" style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.7)" }}>
            {remaining}/{MAX_FREE_MESSAGES}
          </small>
          {Array.from({ length: MAX_FREE_MESSAGES }).map((_, i) => (
            <span
              key={i}
              className="rounded-circle d-inline-block"
              style={{
                width: 6,
                height: 6,
                backgroundColor: i < messagesUsed ? "#fff" : "rgba(255,255,255,0.3)",
                transition: "background-color 0.3s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="card-body p-3"
        style={{ height: 320, overflowY: "auto" }}
      >
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <div className={`d-flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className={`d-flex align-items-center justify-content-center rounded-circle flex-shrink-0 ${
                  msg.role === "user" ? "text-white" : ""
                }`}
                style={{
                  width: 28,
                  height: 28,
                  minWidth: 28,
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, #0d6efd, #0a58ca)"
                    : "#f0f2f5",
                }}
              >
                <i className={`fas ${msg.role === "user" ? "fa-user" : "fa-robot"}`} style={{ fontSize: "0.65rem" }}></i>
              </div>
              <div
                className={`px-3 py-2 ${
                  msg.role === "user" ? "text-white" : "text-dark"
                }`}
                style={{
                  maxWidth: "80%",
                  fontSize: "0.8rem",
                  lineHeight: 1.5,
                  borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, #0d6efd, #0a58ca)"
                    : "#f0f2f5",
                }}
              >
                {msg.content}
              </div>
            </div>

            {/* Professional cards */}
            {msg.professionals && msg.professionals.length > 0 && (
              <div className="ms-5 mt-2">
                {msg.professionals.map((pro) => (
                  <div
                    key={pro.id}
                    className="card border-0 mb-2"
                    style={{ borderRadius: 10, background: "#f8f9fa" }}
                  >
                    <div className="card-body p-2 d-flex align-items-center gap-2">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle fw-medium flex-shrink-0 text-white"
                        style={{
                          width: 36,
                          height: 36,
                          fontSize: "0.7rem",
                          background: "linear-gradient(135deg, #0d6efd, #0a58ca)",
                        }}
                      >
                        {(pro.first_name?.[0] ?? "").toUpperCase()}
                        {(pro.last_name?.[0] ?? "").toUpperCase()}
                      </div>
                      <div className="flex-grow-1" style={{ minWidth: 0 }}>
                        <p className="mb-0 fw-medium text-truncate" style={{ fontSize: "0.8rem" }}>
                          {pro.first_name} {pro.last_name}
                        </p>
                        <small className="text-muted text-truncate d-block text-capitalize" style={{ fontSize: "0.7rem" }}>
                          {pro.specialty?.replace(/_/g, " ")}
                        </small>
                        <div className="d-flex align-items-center gap-2 mt-1">
                          {pro.city && (
                            <small className="text-muted" style={{ fontSize: "0.65rem" }}>
                              <i className="fas fa-map-marker-alt me-1"></i>
                              {pro.city}
                            </small>
                          )}
                          {pro.rating != null && (
                            <small className="text-muted" style={{ fontSize: "0.65rem" }}>
                              <i className="fas fa-star text-warning me-1"></i>
                              {pro.rating.toFixed(1)}
                            </small>
                          )}
                          {pro.consultation_fee != null && (
                            <small className="text-muted" style={{ fontSize: "0.65rem" }}>{pro.consultation_fee}&euro;</small>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="text-muted fst-italic mb-0" style={{ fontSize: "0.7rem" }}>
                  {t("viewProfiles")}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="d-flex gap-2 mb-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
              style={{ width: 28, height: 28, minWidth: 28, background: "#f0f2f5" }}
            >
              <i className="fas fa-robot" style={{ fontSize: "0.65rem" }}></i>
            </div>
            <div className="px-3 py-2" style={{ borderRadius: "14px 14px 14px 4px", background: "#f0f2f5" }}>
              <div className="d-flex gap-1">
                <span className="spinner-grow spinner-grow-sm text-secondary" style={{ width: 6, height: 6, animationDelay: "0ms" }}></span>
                <span className="spinner-grow spinner-grow-sm text-secondary" style={{ width: 6, height: 6, animationDelay: "150ms" }}></span>
                <span className="spinner-grow spinner-grow-sm text-secondary" style={{ width: 6, height: 6, animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>
        )}

        {/* Suggestions */}
        {showSuggestions && !isLoading && (
          <div className="d-flex flex-wrap gap-1 ms-5">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                className="btn btn-sm rounded-pill border-0"
                style={{
                  fontSize: "0.72rem",
                  padding: "4px 12px",
                  background: "#e8f0fe",
                  color: "#0d6efd",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0d6efd"
                  e.currentTarget.style.color = "#fff"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#e8f0fe"
                  e.currentTarget.style.color = "#0d6efd"
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Paywall wall */}
        {showWall && (
          <div className="card border-0 mt-2" style={{ borderRadius: 12, background: "linear-gradient(135deg, #f0f4ff, #e8f0fe)" }}>
            <div className="card-body text-center p-3">
              <h6 className="fw-semibold mb-1" style={{ fontSize: "0.85rem" }}>{t("wallTitle")}</h6>
              <p className="text-muted mb-2" style={{ fontSize: "0.75rem" }}>{t("wallDescription")}</p>
              <ul className="list-unstyled text-start mb-2">
                {(["wallBenefit1", "wallBenefit2", "wallBenefit3", "wallBenefit4"] as const).map((key) => (
                  <li key={key} className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: "0.75rem" }}>
                    <span className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: 22, height: 22, minWidth: 22, background: "#e8f0fe" }}>
                      <i className={`fas ${key === "wallBenefit1" ? "fa-search" : key === "wallBenefit2" ? "fa-calendar-check" : key === "wallBenefit3" ? "fa-bell" : "fa-clock"} text-primary`} style={{ fontSize: "0.55rem" }}></i>
                    </span>
                    {t(key)}
                  </li>
                ))}
              </ul>
              <div className="d-grid gap-1">
                <a
                  href={`${PLATFORM_URL}/login?redirect=${encodeURIComponent("/patient/search?chat=1")}#register`}
                  className="btn btn-primary btn-sm"
                  style={{ borderRadius: 8, fontSize: "0.8rem" }}
                >
                  {t("wallCreateAccount")}
                </a>
                <a
                  href={`${PLATFORM_URL}/login?redirect=${encodeURIComponent("/patient/search?chat=1")}`}
                  className="btn btn-outline-primary btn-sm"
                  style={{ borderRadius: 8, fontSize: "0.8rem" }}
                >
                  {t("wallLogin")}
                </a>
              </div>
              <p className="text-muted mt-2 mb-0 d-flex align-items-center justify-content-center gap-1" style={{ fontSize: "0.65rem" }}>
                <i className="fas fa-shield-alt"></i>
                {t("wallRgpd")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="card-footer border-0 p-2" style={{ background: "rgba(255,255,255,0.95)" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend(input)
          }}
          className="input-group input-group-sm"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={showWall ? t("placeholderDisabled") : t("placeholder")}
            disabled={isLoading || showWall}
            maxLength={500}
            className="form-control border-0"
            style={{ fontSize: "0.8rem", background: "#f0f2f5", borderRadius: "10px 0 0 10px" }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || showWall}
            className="btn btn-primary border-0"
            style={{ borderRadius: "0 10px 10px 0" }}
          >
            <i className="fas fa-paper-plane" style={{ fontSize: "0.75rem" }}></i>
          </button>
        </form>
      </div>
    </div>
  )
}
