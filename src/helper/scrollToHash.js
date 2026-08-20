export const HASH_SCROLL_OFFSET = 80;

export function scrollToHashTarget(id, { offset = HASH_SCROLL_OFFSET, duration = 1.15 } = {}) {
  if (!id || typeof window === "undefined") return false;

  const el = document.getElementById(id);
  if (!el) return false;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -offset, duration });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  try {
    sessionStorage.removeItem("scroll-to-id");
  } catch {
    /* ignore */
  }

  return true;
}

export function handleHashLinkClick(event, href, { onNavigate } = {}) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return false;

  const id = decodeURIComponent(href.slice(hashIndex + 1));
  if (!id) return false;

  const path = href.slice(0, hashIndex);
  const samePage =
    !path ||
    (typeof window !== "undefined" && path === window.location.pathname);

  if (samePage) {
    event.preventDefault();
    scrollToHashTarget(id);
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }
    onNavigate?.();
    return true;
  }

  event.preventDefault();
  try {
    sessionStorage.setItem("scroll-to-id", id);
  } catch {
    /* ignore */
  }

  onNavigate?.(path || "/");
  return true;
}
