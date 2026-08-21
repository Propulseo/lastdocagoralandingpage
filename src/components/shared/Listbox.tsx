"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

export interface ListboxOption {
  value: string;
  label: string;
}

interface ListboxProps {
  id: string;
  labelId: string;
  value: string;
  onChange: (value: string) => void;
  options: ListboxOption[];
  className?: string;
  /** `glass` = verre teal (console de recherche, fond illustré) ;
   *  `plain` = carte sobre (formulaire sur fond blanc, template Medically). */
  tone?: "glass" | "plain";
  required?: boolean;
  invalid?: boolean;
  describedBy?: string;
  disabled?: boolean;
}

/** Listbox maison (remplace le <select> natif, dont la liste ouverte reste
 *  rendue par l'OS et ne peut pas être stylée en CSS). Pattern ARIA APG
 *  "select-only combobox" : le focus DOM reste sur le bouton (role
 *  combobox), l'option survolée au clavier est signalée par
 *  aria-activedescendant — pas de déplacement de focus dans la liste. */
export default function Listbox({
  id,
  labelId,
  value,
  onChange,
  options,
  className,
  tone = "glass",
  required,
  invalid,
  describedBy,
  disabled,
}: ListboxProps) {
  const [open, setOpen] = useState(false);
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listboxId = `${id}-listbox`;
  const optionId = (i: number) => `${listboxId}-opt-${i}`;
  const isPlaceholder = tone === "plain" && options[selectedIndex]?.value === "";

  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  function openAt(index: number) {
    setActiveIndex(index);
    setOpen(true);
  }

  function commit(index: number) {
    onChange(options[index].value);
    setOpen(false);
  }

  function onButtonKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (open) setActiveIndex((i) => (i + 1) % options.length);
        else openAt(selectedIndex);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (open) setActiveIndex((i) => (i - 1 + options.length) % options.length);
        else openAt(options.length - 1);
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActiveIndex(options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) commit(activeIndex);
        else openAt(selectedIndex);
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
    }
  }

  return (
    <div className={`lbx lbx--${tone}${className ? ` ${className}` : ""}`} ref={wrapRef}>
      <style>{`
        .lbx { position: relative; }
        .lbx__btn {
          width: 100%; padding: 0 40px 0 14px;
          font-family: inherit; text-align: left; cursor: pointer; position: relative;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .lbx__btn:disabled { cursor: not-allowed; opacity: 0.6; }
        .lbx__btn:focus-visible { outline: 2px solid #1E6E68; outline-offset: 2px; }
        .lbx__chev {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          width: 15px; height: 15px; color: #1E6E68; pointer-events: none;
          transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .lbx__btn.is-open .lbx__chev { transform: translateY(-50%) rotate(180deg); }
        .lbx__panel {
          position: absolute; left: 0; right: 0; top: calc(100% + 8px); z-index: 20;
          margin: 0; padding: 8px; list-style: none; max-height: 260px; overflow-y: auto;
        }
        .lbx__opt {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 12px; border-radius: 10px; font-size: 14px; font-weight: 500;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .lbx__opt svg { width: 14px; height: 14px; opacity: 0; flex-shrink: 0; }
        .lbx__opt.is-selected svg { opacity: 1; }

        /* ── tone: glass (console de recherche, fond illustré) ── */
        .lbx--glass .lbx__btn {
          height: 52px; border-radius: 12px; border: 1.5px solid rgba(var(--color-navy-rgb), 0.16);
          background-color: rgba(255, 255, 255, 0.72);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -2px 6px -3px rgba(var(--color-navy-rgb), 0.16);
          color: var(--color-dark-1); font-size: 14.5px; font-weight: 500;
        }
        .lbx--glass .lbx__btn.is-open { border-color: #1E6E68; box-shadow: 0 0 0 3px rgba(var(--color-teal-rgb), 0.3); }
        .lbx--glass .lbx__panel {
          border-radius: 16px; background: rgba(255, 255, 255, 0.86);
          border: 1px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(18px) saturate(1.5); -webkit-backdrop-filter: blur(18px) saturate(1.5);
          box-shadow: 0 26px 50px -20px rgba(var(--color-mint-rgb), 0.45), 0 0 0 1px rgba(var(--color-teal-rgb), 0.18);
        }
        .lbx--glass .lbx__opt { color: var(--color-dark-1); }
        .lbx--glass .lbx__opt:hover, .lbx--glass .lbx__opt.is-active { background: rgba(var(--color-teal-rgb), 0.16); }
        .lbx--glass .lbx__opt.is-selected {
          background: linear-gradient(135deg, rgba(var(--color-teal-rgb), 0.28), rgba(var(--color-cobalt-rgb), 0.12));
          color: #1E6E68; font-weight: 700;
        }
        .lbx--glass .lbx__opt svg, .lbx--glass .lbx__chev { color: #1E6E68; }

        /* ── tone: plain (formulaire, template Medically) ── */
        .lbx--plain .lbx__btn {
          height: 50px; border-radius: 15px; border: 1px solid #e5e8ea;
          background: #fff; font-size: 16px; color: var(--color-dark-1);
        }
        .lbx--plain .lbx__btn.is-placeholder { color: #9d9c9c; }
        .lbx--plain .lbx__btn.is-open { border-color: #67CBC7; box-shadow: 0 0 0 3px rgba(103, 203, 199, 0.25); }
        .lbx--plain .lbx__btn.is-invalid { border-color: #c0392b; }
        .lbx--plain .lbx__panel {
          border-radius: 14px; background: #fff; border: 1px solid #e5e8ea;
          box-shadow: 0 24px 46px -22px rgba(36, 72, 130, 0.22);
        }
        .lbx--plain .lbx__opt { color: #3a3a3a; }
        .lbx--plain .lbx__opt:hover, .lbx--plain .lbx__opt.is-active { background: #f4f6f6; }
        .lbx--plain .lbx__opt.is-selected { background: rgba(103, 203, 199, 0.14); color: #1E6E68; font-weight: 700; }
        .lbx--plain .lbx__opt svg, .lbx--plain .lbx__chev { color: #1E6E68; }
      `}</style>
      <button
        type="button"
        id={id}
        ref={buttonRef}
        className={`lbx__btn${open ? " is-open" : ""}${isPlaceholder ? " is-placeholder" : ""}${invalid ? " is-invalid" : ""}`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={open ? optionId(activeIndex) : undefined}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openAt(selectedIndex))}
        onKeyDown={onButtonKeyDown}
      >
        {options[selectedIndex]?.label}
        <svg className="lbx__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul id={listboxId} className="lbx__panel" role="listbox" aria-labelledby={labelId}>
          {options.map((opt, i) => (
            <li
              key={opt.value || "__placeholder"}
              id={optionId(i)}
              ref={(el) => {
                optionRefs.current[i] = el;
              }}
              role="option"
              aria-selected={i === selectedIndex}
              className={`lbx__opt${i === selectedIndex ? " is-selected" : ""}${i === activeIndex ? " is-active" : ""}`}
              onClick={() => commit(i)}
            >
              {opt.label}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l4 4 10-10" />
              </svg>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
