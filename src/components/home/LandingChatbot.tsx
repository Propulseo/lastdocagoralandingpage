"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useTranslations, useLocale } from "next-intl"
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
  const locale = useLocale()

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
          locale,
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
      className="overflow-hidden"
      style={{
        borderRadius: 18,
        backdropFilter: "blur(20px)",
        background: "rgba(255, 255, 255, 0.92)",
        boxShadow: "0 16px 48px rgba(36, 72, 130, 0.22), 0 0 0 1px rgba(255,255,255,0.15)",
        width: "100%",
        maxWidth: 520,
      }}
    >
      {/* Header */}
      <div
        className="d-flex align-items-center justify-content-between px-4"
        style={{ background: "linear-gradient(135deg, #0C121E, #244882)", padding: "14px 20px" }}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: 40, height: 40, background: "rgba(103,203,199,0.2)", border: "1.5px solid rgba(103,203,199,0.45)" }}
          >
            <i className="icon-stethoscope" style={{ fontSize: "1.05rem", color: "var(--color-accent)" }}></i>
          </div>
          <div>
            <h6 className="mb-0 fw-semibold text-white" style={{ fontSize: "0.92rem", letterSpacing: "0.01em" }}>{t("title")}</h6>
            <small style={{ fontSize: "0.75rem", color: "rgba(103,203,199,0.85)" }}>{t("subtitle")}</small>
          </div>
        </div>
        <div className="d-flex align-items-center gap-1">
          <small className="me-2" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)" }}>
            {remaining}/{MAX_FREE_MESSAGES}
          </small>
          {Array.from({ length: MAX_FREE_MESSAGES }).map((_, i) => (
            <span
              key={i}
              className="rounded-circle d-inline-block"
              style={{
                width: 7,
                height: 7,
                backgroundColor: i < messagesUsed ? "var(--color-accent)" : "rgba(255,255,255,0.18)",
                transition: "background-color 0.3s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="px-4 py-3"
        style={{ height: 400, overflowY: "auto" }}
      >
        {messages.map((msg, i) => (
          <div key={i} className="mb-3">
            <div className={`d-flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                style={{
                  width: 32,
                  height: 32,
                  minWidth: 32,
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, var(--color-navy), #0C121E)"
                    : "rgba(103,203,199,0.12)",
                  color: msg.role === "user" ? "#fff" : "var(--color-navy)",
                }}
              >
                <i className={msg.role === "user" ? "fas fa-user" : "icon-stethoscope"} style={{ fontSize: "0.72rem" }}></i>
              </div>
              <div
                className={msg.role === "user" ? "text-white" : ""}
                style={{
                  maxWidth: "80%",
                  fontSize: "0.875rem",
                  lineHeight: 1.55,
                  padding: "10px 16px",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, var(--color-navy), #0C121E)"
                    : "rgba(103,203,199,0.08)",
                  color: msg.role === "user" ? "#fff" : "var(--color-navy)",
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
                    className="mb-2"
                    style={{ borderRadius: 12, background: "rgba(103,203,199,0.05)", border: "1px solid rgba(103,203,199,0.15)", padding: "10px 14px" }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle fw-medium flex-shrink-0 text-white"
                        style={{
                          width: 40,
                          height: 40,
                          fontSize: "0.78rem",
                          background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))",
                        }}
                      >
                        {(pro.first_name?.[0] ?? "").toUpperCase()}
                        {(pro.last_name?.[0] ?? "").toUpperCase()}
                      </div>
                      <div className="flex-grow-1" style={{ minWidth: 0 }}>
                        <p className="mb-0 fw-medium text-truncate" style={{ fontSize: "0.875rem", color: "var(--color-navy)" }}>
                          {pro.first_name} {pro.last_name}
                        </p>
                        <small className="text-truncate d-block text-capitalize" style={{ fontSize: "0.78rem", color: "var(--color-accent)" }}>
                          {pro.specialty?.replace(/_/g, " ")}
                        </small>
                        <div className="d-flex align-items-center gap-3 mt-1">
                          {pro.city && (
                            <small style={{ fontSize: "0.72rem", color: "#6c7a93" }}>
                              <i className="fas fa-map-marker-alt me-1"></i>
                              {pro.city}
                            </small>
                          )}
                          {pro.rating != null && (
                            <small style={{ fontSize: "0.72rem", color: "#6c7a93" }}>
                              <i className="fas fa-star me-1" style={{ color: "var(--color-accent)" }}></i>
                              {pro.rating.toFixed(1)}
                            </small>
                          )}
                          {pro.consultation_fee != null && (
                            <small style={{ fontSize: "0.72rem", color: "#6c7a93" }}>{pro.consultation_fee}&euro;</small>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="fst-italic mb-0" style={{ fontSize: "0.78rem", color: "#6c7a93" }}>
                  {t("viewProfiles")}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="d-flex gap-2 mb-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
              style={{ width: 32, height: 32, minWidth: 32, background: "rgba(103,203,199,0.12)" }}
            >
              <i className="icon-stethoscope" style={{ fontSize: "0.72rem", color: "var(--color-navy)" }}></i>
            </div>
            <div style={{ borderRadius: "16px 16px 16px 4px", background: "rgba(103,203,199,0.08)", padding: "10px 16px" }}>
              <div className="d-flex gap-1">
                <span className="spinner-grow spinner-grow-sm" style={{ width: 7, height: 7, animationDelay: "0ms", color: "var(--color-accent)" }}></span>
                <span className="spinner-grow spinner-grow-sm" style={{ width: 7, height: 7, animationDelay: "150ms", color: "var(--color-accent)" }}></span>
                <span className="spinner-grow spinner-grow-sm" style={{ width: 7, height: 7, animationDelay: "300ms", color: "var(--color-accent)" }}></span>
              </div>
            </div>
          </div>
        )}

        {/* Suggestions */}
        {showSuggestions && !isLoading && (
          <div className="d-flex flex-wrap gap-2 ms-5">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                className="btn btn-sm rounded-pill"
                style={{
                  fontSize: "0.72rem",
                  padding: "4px 11px",
                  background: "rgba(103,203,199,0.08)",
                  color: "var(--color-navy)",
                  border: "1px solid rgba(103,203,199,0.25)",
                  transition: "all 0.2s",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-accent)"
                  e.currentTarget.style.color = "#fff"
                  e.currentTarget.style.borderColor = "var(--color-accent)"
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(103,203,199,0.25)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(103,203,199,0.08)"
                  e.currentTarget.style.color = "var(--color-navy)"
                  e.currentTarget.style.borderColor = "rgba(103,203,199,0.25)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Paywall wall */}
        {showWall && (
          <div className="mt-3" style={{ borderRadius: 14, background: "linear-gradient(135deg, rgba(103,203,199,0.06), rgba(36,72,130,0.04))", border: "1px solid rgba(103,203,199,0.15)", padding: "20px" }}>
            <div className="text-center">
              <h6 className="fw-semibold mb-2" style={{ fontSize: "0.95rem", color: "var(--color-navy)" }}>{t("wallTitle")}</h6>
              <p className="mb-3" style={{ fontSize: "0.82rem", color: "#6c7a93", lineHeight: 1.5 }}>{t("wallDescription")}</p>
              <ul className="list-unstyled text-start mb-3">
                {(["wallBenefit1", "wallBenefit2", "wallBenefit3", "wallBenefit4"] as const).map((key) => (
                  <li key={key} className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: "0.82rem", color: "var(--color-navy)" }}>
                    <span className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: 26, height: 26, minWidth: 26, background: "rgba(103,203,199,0.12)" }}>
                      <i className={`fas ${key === "wallBenefit1" ? "fa-search" : key === "wallBenefit2" ? "fa-calendar-check" : key === "wallBenefit3" ? "fa-bell" : "fa-clock"}`} style={{ fontSize: "0.6rem", color: "var(--color-accent)" }}></i>
                    </span>
                    {t(key)}
                  </li>
                ))}
              </ul>
              <div className="d-grid gap-2">
                <a
                  href={`${PLATFORM_URL}/login?redirect=${encodeURIComponent("/patient/search?chat=1")}#register`}
                  className="btn btn-sm text-white"
                  style={{ borderRadius: 10, fontSize: "0.88rem", padding: "10px 16px", background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))", border: "none", fontWeight: 600 }}
                >
                  {t("wallCreateAccount")}
                </a>
                <a
                  href={`${PLATFORM_URL}/login?redirect=${encodeURIComponent("/patient/search?chat=1")}`}
                  className="btn btn-sm"
                  style={{ borderRadius: 10, fontSize: "0.88rem", padding: "10px 16px", background: "transparent", border: "1px solid var(--color-accent)", color: "var(--color-navy)", fontWeight: 600 }}
                >
                  {t("wallLogin")}
                </a>
              </div>
              <p className="mt-3 mb-0 d-flex align-items-center justify-content-center gap-1" style={{ fontSize: "0.72rem", color: "#6c7a93" }}>
                <i className="fas fa-shield-alt"></i>
                {t("wallRgpd")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-3 py-3" style={{ background: "rgba(255,255,255,0.97)", borderTop: "1px solid rgba(103,203,199,0.1)" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend(input)
          }}
          className="d-flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={showWall ? t("placeholderDisabled") : t("placeholder")}
            disabled={isLoading || showWall}
            maxLength={500}
            className="form-control border-0"
            style={{ fontSize: "0.875rem", background: "rgba(103,203,199,0.06)", borderRadius: 12, padding: "10px 16px" }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || showWall}
            className="btn border-0 text-white d-flex align-items-center justify-content-center"
            style={{
              borderRadius: 12,
              width: 42,
              minWidth: 42,
              height: 42,
              background: isLoading || !input.trim() || showWall
                ? "rgba(103,203,199,0.3)"
                : "linear-gradient(135deg, var(--color-accent), var(--color-accent-hover))",
              transition: "all 0.2s",
            }}
          >
            <i className="fas fa-paper-plane" style={{ fontSize: "0.82rem" }}></i>
          </button>
        </form>
      </div>
    </div>
  )
}
