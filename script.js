const messengerUrl = "https://m.me/oscmb";
const messengerLinks = document.querySelectorAll("[data-messenger]");

messengerLinks.forEach((link) => {
  link.setAttribute("href", messengerUrl);
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
});

const yearElement = document.getElementById("current-year");
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const revealElements = document.querySelectorAll("[data-reveal]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reducedMotion) {
  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 30, 220)}ms`;
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const siteHeader = document.querySelector(".site-header");
function updateHeaderState() {
  if (!siteHeader) return;
  if (window.scrollY > 8) {
    siteHeader.classList.add("is-scrolled");
  } else {
    siteHeader.classList.remove("is-scrolled");
  }
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();
