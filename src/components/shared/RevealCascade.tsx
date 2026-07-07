"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react";

import { useRevealInView } from "@/components/shared/useRevealInView";

type RevealTag = "div" | "ul" | "ol" | "dl";

type RevealChildProps = {
  className?: string;
  style?: CSSProperties;
};

type CssVars = CSSProperties & {
  "--mo-base-delay"?: string;
  "--mo-cascade-y"?: string;
  "--mo-cascade-scale"?: string;
  "--mo-delay"?: string;
  "--mo-i"?: number;
};

interface RevealCascadeProps {
  as?: RevealTag;
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  baseDelayMs?: number;
  stepMs?: number;
  distance?: number;
  scale?: number;
  amount?: number;
}

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export default function RevealCascade({
  as = "div",
  children,
  className,
  itemClassName,
  baseDelayMs = 0,
  stepMs = 90,
  distance = 22,
  scale = 0.985,
  amount = 0.18,
}: RevealCascadeProps) {
  const { ref, revealed } = useRevealInView<HTMLElement>(amount);

  const style: CssVars = {
    "--mo-base-delay": `${baseDelayMs}ms`,
    "--mo-cascade-y": `${distance}px`,
    "--mo-cascade-scale": String(scale),
  };

  const items = Children.map(children, (child, index) => {
    if (!isValidElement<RevealChildProps>(child)) return child;

    const childStyle: CssVars = {
      ...(child.props.style ?? {}),
      "--mo-delay": `${baseDelayMs + index * stepMs}ms`,
      "--mo-i": index,
    };

    return cloneElement(child as ReactElement<RevealChildProps>, {
      className: cx(child.props.className, "mo-cascade__item", itemClassName),
      style: childStyle,
    });
  });

  const commonProps = {
    className: cx("mo-cascade", revealed && "mo-in", className),
    style,
  };

  if (as === "ul") {
    return (
      <ul ref={ref as RefObject<HTMLUListElement | null>} {...commonProps}>
        {items}
      </ul>
    );
  }

  if (as === "ol") {
    return (
      <ol ref={ref as RefObject<HTMLOListElement | null>} {...commonProps}>
        {items}
      </ol>
    );
  }

  if (as === "dl") {
    return (
      <dl ref={ref as RefObject<HTMLDListElement | null>} {...commonProps}>
        {items}
      </dl>
    );
  }

  return (
    <div ref={ref as RefObject<HTMLDivElement | null>} {...commonProps}>
      {items}
    </div>
  );
}
