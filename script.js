const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeLabel = document.querySelector(".theme-label");

function setTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";
  themeButton?.setAttribute("aria-pressed", String(isDark));
  themeButton?.setAttribute("aria-label", isDark ? "Switch to day mode" : "Switch to night mode");
  if (themeIcon) themeIcon.textContent = isDark ? "☀" : "☾";
  if (themeLabel) themeLabel.textContent = isDark ? "Day mode" : "Night mode";
}

const savedTheme = localStorage.getItem("trupti-theme");
setTheme(savedTheme === "dark" ? "dark" : "light");

themeButton?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  localStorage.setItem("trupti-theme", nextTheme);
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelectorAll(".section-heading, .now-list > div, .contact-section > *, .about-copy > *").forEach(el => el.classList.add("reveal"));
document.querySelectorAll(".project-grid, .timeline, .now-list, .about-copy, .contact-section").forEach(group => {
  group.querySelectorAll(":scope > .reveal").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 0.12 + "s"; });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

const copyButton = document.querySelector("#copy-email");
const toast = document.querySelector(".toast");
let toastTimeout;

copyButton?.addEventListener("click", async () => {
  const email = copyButton.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = "Email copied. Talk soon!";
  } catch {
    toast.textContent = email;
  }
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
});

// scroll progress bar
const bar = document.createElement("div");
bar.className = "scroll-progress";
document.body.prepend(bar);
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
}, { passive: true });

// hero mouse parallax
const heroArt = document.querySelector(".hero-art");
heroArt?.addEventListener("mousemove", e => {
  const r = heroArt.getBoundingClientRect();
  heroArt.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
  heroArt.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
});
heroArt?.addEventListener("mouseleave", () => {
  heroArt.style.setProperty("--mx", 0);
  heroArt.style.setProperty("--my", 0);
});