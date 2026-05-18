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

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3000"

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
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">

            {/* Header */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white d-flex align-items-center justify-content-between py-3 border-bottom">
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: 36, height: 36, backgroundColor: "var(--bs-primary)", opacity: 0.1 }}
                  >
                    <i className="fas fa-robot text-primary"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-semibold" style={{ fontSize: "0.9rem" }}>{t("title")}</h6>
                    <small className="text-muted">{t("subtitle")}</small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <small className="text-muted me-1">
                    {remaining} {t("freeSearches")}
                  </small>
                  {Array.from({ length: MAX_FREE_MESSAGES }).map((_, i) => (
                    <span
                      key={i}
                      className="rounded-circle d-inline-block"
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: i < messagesUsed ? "var(--bs-primary)" : "#dee2e6",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="card-body p-3"
                style={{ height: 380, overflowY: "auto" }}
              >
                {messages.map((msg, i) => (
                  <div key={i} className="mb-3">
                    <div className={`d-flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                      <div
                        className={`d-flex align-items-center justify-content-center rounded-circle flex-shrink-0 ${
                          msg.role === "user" ? "bg-primary text-white" : "bg-light"
                        }`}
                        style={{ width: 30, height: 30, minWidth: 30 }}
                      >
                        <i className={`fas ${msg.role === "user" ? "fa-user" : "fa-robot"}`} style={{ fontSize: "0.75rem" }}></i>
                      </div>
                      <div
                        className={`rounded-3 px-3 py-2 ${
                          msg.role === "user"
                            ? "bg-primary text-white"
                            : "bg-light text-dark"
                        }`}
                        style={{ maxWidth: "85%", fontSize: "0.875rem", lineHeight: 1.6 }}
                      >
                        {msg.content}
                      </div>
                    </div>

                    {/* Professional cards */}
                    {msg.professionals && msg.professionals.length > 0 && (
                      <div className="ms-5 mt-2">
                        {msg.professionals.map((pro) => (
                          <div key={pro.id} className="card border mb-2">
                            <div className="card-body p-2 d-flex align-items-center gap-2">
                              <div
                                className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary fw-medium flex-shrink-0"
                                style={{ width: 40, height: 40, fontSize: "0.8rem" }}
                              >
                                {(pro.first_name?.[0] ?? "").toUpperCase()}
                                {(pro.last_name?.[0] ?? "").toUpperCase()}
                              </div>
                              <div className="flex-grow-1" style={{ minWidth: 0 }}>
                                <p className="mb-0 fw-medium text-truncate" style={{ fontSize: "0.875rem" }}>
                                  {pro.first_name} {pro.last_name}
                                </p>
                                <small className="text-muted text-truncate d-block text-capitalize">
                                  {pro.specialty?.replace(/_/g, " ")}
                                </small>
                                <div className="d-flex align-items-center gap-2 mt-1">
                                  {pro.city && (
                                    <small className="text-muted">
                                      <i className="fas fa-map-marker-alt me-1" style={{ fontSize: "0.65rem" }}></i>
                                      {pro.city}
                                    </small>
                                  )}
                                  {pro.rating != null && (
                                    <small className="text-muted">
                                      <i className="fas fa-star text-warning me-1" style={{ fontSize: "0.65rem" }}></i>
                                      {pro.rating.toFixed(1)}
                                    </small>
                                  )}
                                  {pro.consultation_fee != null && (
                                    <small className="text-muted">{pro.consultation_fee}&euro;</small>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <p className="text-muted fst-italic mb-0" style={{ fontSize: "0.75rem" }}>
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
                      className="d-flex align-items-center justify-content-center rounded-circle bg-light flex-shrink-0"
                      style={{ width: 30, height: 30, minWidth: 30 }}
                    >
                      <i className="fas fa-robot" style={{ fontSize: "0.75rem" }}></i>
                    </div>
                    <div className="rounded-3 bg-light px-3 py-2">
                      <div className="d-flex gap-1">
                        <span className="spinner-grow spinner-grow-sm text-secondary" style={{ width: 8, height: 8, animationDelay: "0ms" }}></span>
                        <span className="spinner-grow spinner-grow-sm text-secondary" style={{ width: 8, height: 8, animationDelay: "150ms" }}></span>
                        <span className="spinner-grow spinner-grow-sm text-secondary" style={{ width: 8, height: 8, animationDelay: "300ms" }}></span>
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
                        className="btn btn-outline-secondary btn-sm rounded-pill"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Paywall wall */}
                {showWall && (
                  <div className="card border-primary border-opacity-25 mt-3" style={{ background: "linear-gradient(135deg, rgba(var(--bs-primary-rgb), 0.03), rgba(var(--bs-primary-rgb), 0.08))" }}>
                    <div className="card-body text-center p-4">
                      <h5 className="fw-semibold mb-2">{t("wallTitle")}</h5>
                      <p className="text-muted small mb-3">{t("wallDescription")}</p>
                      <ul className="list-unstyled text-start mb-3">
                        {(["wallBenefit1", "wallBenefit2", "wallBenefit3", "wallBenefit4"] as const).map((key) => (
                          <li key={key} className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: "0.875rem" }}>
                            <span className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10" style={{ width: 28, height: 28, minWidth: 28 }}>
                              <i className={`fas ${key === "wallBenefit1" ? "fa-search" : key === "wallBenefit2" ? "fa-calendar-check" : key === "wallBenefit3" ? "fa-bell" : "fa-clock"} text-primary`} style={{ fontSize: "0.7rem" }}></i>
                            </span>
                            {t(key)}
                          </li>
                        ))}
                      </ul>
                      <div className="d-grid gap-2">
                        <a
                          href={`${PLATFORM_URL}/login?redirect=${encodeURIComponent("/patient/search?chat=1")}#register`}
                          className="btn btn-primary"
                        >
                          {t("wallCreateAccount")}
                        </a>
                        <a
                          href={`${PLATFORM_URL}/login?redirect=${encodeURIComponent("/patient/search?chat=1")}`}
                          className="btn btn-outline-primary"
                        >
                          {t("wallLogin")}
                        </a>
                      </div>
                      <p className="text-muted mt-3 mb-0 d-flex align-items-center justify-content-center gap-1" style={{ fontSize: "0.75rem" }}>
                        <i className="fas fa-shield-alt"></i>
                        {t("wallRgpd")}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="card-footer bg-white p-3 border-top">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend(input)
                  }}
                  className="input-group"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={showWall ? t("placeholderDisabled") : t("placeholder")}
                    disabled={isLoading || showWall}
                    maxLength={500}
                    className="form-control"
                    style={{ fontSize: "0.875rem" }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim() || showWall}
                    className="btn btn-primary"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
