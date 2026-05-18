"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface JQueryCollection {
  not(selector: string): JQueryCollection;
  each(fn: (i: number, el: HTMLElement) => void): JQueryCollection;
  children(selector: string): JQueryCollection;
  attr(name: string): string | undefined;
  parent(selector?: string): JQueryCollection;
  css(styles: Record<string, string>): JQueryCollection;
  addClass(className: string): JQueryCollection;
  hasClass(className: string): boolean;
  remove(): void;
  slick(options?: Record<string, unknown>): void;
  off(event: string): JQueryCollection;
  on(event: string, handler: (e: Event) => void): JQueryCollection;
  magnificPopup(options: Record<string, unknown>): void;
  niceSelect(action?: string): void;
  toggleClass(className: string): JQueryCollection;
  siblings(): JQueryCollection;
  removeClass(className: string): JQueryCollection;
}

interface JQueryStatic {
  (selector: string | HTMLElement | EventTarget | null): JQueryCollection;
  fn: Record<string, unknown>;
}

declare global {
  interface Window {
    jQuery: JQueryStatic | undefined;
  }
}

function reinitWidgets() {
  const $ = window.jQuery;
  if (!$) return;

  // 1. Process .bg-img divs → set parent background-image and remove the div
  //    (matches main.js lines 110-122)
  $(".bg-img")
    .not("[data-processed]")
    .each(function (_i: number, el: HTMLElement) {
      const $el = $(el);
      const imgSrc = $el.children("img").attr("src");
      if (!imgSrc) return;
      $el.parent().css({
        "background-image": "url(" + imgSrc + ")",
        "background-size": "cover",
        "background-position": "center",
      });
      $el.parent().addClass("bg-img");
      if ($el.hasClass("background-size-auto")) {
        $el.parent().addClass("background-size-auto");
      }
      $el.remove();
    });

  // 2. Initialize slick carousels that haven't been initialized yet
  if ($.fn.slick) {
    $(".slick-carousel").not(".slick-initialized").slick();

    $(".slider-with-navs")
      .not(".slick-initialized")
      .slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        dots: true,
        asNavFor: ".slider-nav",
      });

    $(".slider-nav")
      .not(".slick-initialized")
      .slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".slider-with-navs",
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true,
        infinite: false,
      });
  }

  // 3. Accordion click handlers (re-bind with .off first to prevent duplicates)
  $(".accordion__header")
    .off("click.docagora")
    .on("click.docagora", (e: Event) => {
      $(e.currentTarget).parent(".accordion-item").toggleClass("opened");
      $(e.currentTarget).parent(".accordion-item").siblings().removeClass("opened");
    });
  $(".accordion__title")
    .off("click.docagora")
    .on("click.docagora", (e: Event) => {
      e.preventDefault();
    });

  // 4. MagnificPopup for gallery images
  if ($.fn.magnificPopup) {
    $(".popup-gallery-item").magnificPopup({
      type: "image",
      tLoading: "Loading image #%curr%...",
      mainClass: "mfp-img-mobile",
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1],
      },
    });
    $(".popup-video").magnificPopup({
      mainClass: "mfp-fade",
      removalDelay: 0,
      preloader: false,
      fixedContentPos: false,
      type: "iframe",
    });
  }

  // 5. NiceSelect for dropdowns
  if ($.fn.niceSelect) {
    $("select").niceSelect("destroy");
    $("select").niceSelect();
  }
}

export default function JQueryLoader() {
  const pathname = usePathname();
  const scriptsLoadedRef = useRef(false);

  // Load jQuery + plugins + main.js once
  useEffect(() => {
    if (scriptsLoadedRef.current) return;
    scriptsLoadedRef.current = true;

    const jq = document.createElement("script");
    jq.src = "/assets/js/jquery-3.5.1.min.js";
    jq.async = false;
    document.body.appendChild(jq);

    jq.onload = () => {
      const plugins = document.createElement("script");
      plugins.src = "/assets/js/plugins.js";
      plugins.async = false;
      document.body.appendChild(plugins);

      plugins.onload = () => {
        const main = document.createElement("script");
        main.src = "/assets/js/main.js";
        main.async = false;
        document.body.appendChild(main);
      };
    };
  }, []);

  // Re-initialize page-specific widgets on every route change
  useEffect(() => {
    // Give React time to render the new DOM
    const timer = setTimeout(reinitWidgets, 200);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
