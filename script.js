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

const siteHeader = document.querySelector(".site-header");
const updateHeaderState = () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
};

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

const revealElements = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
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
