const pages = {
  me: { file: "sobre-mim.ts", language: "TypeScript" },
  activity: { file: "tecnologias.json", language: "JSON" },
  whatido: { file: "projetos.tsx", language: "TypeScript JSX" },
  contact: { file: "contato.md", language: "Markdown" },
};

const navigation = document.querySelectorAll("[data-page]");
let currentPage;
function showPage({ focus = false } = {}) {
  const requested = location.hash.slice(1);
  const page = Object.hasOwn(pages, requested) ? requested : "me";
  document.querySelectorAll(".page").forEach((section) => {
    section.hidden = section.id !== page;
  });
  navigation.forEach((link) => {
    const active = link.dataset.page === page;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.getElementById("current-file").textContent = pages[page].file;
  document.getElementById("file-language").textContent = pages[page].language;
  if (currentPage !== page) {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (focus)
      document.getElementById("content").focus({ preventScroll: true });
  }
  currentPage = page;
}

navigation.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const hash = `#${link.dataset.page}`;
    if (location.hash !== hash) history.pushState(null, "", hash);
    showPage({ focus: true });
  });
});
window.addEventListener("hashchange", () => showPage({ focus: true }));
window.addEventListener("popstate", () => showPage({ focus: true }));
showPage();

const terminalToggle = document.getElementById("terminal-toggle");
terminalToggle.addEventListener("click", () => {
  const expanded = terminalToggle.getAttribute("aria-expanded") === "true";
  document.getElementById("terminal-content").hidden = expanded;
  terminalToggle.setAttribute("aria-expanded", String(!expanded));
  terminalToggle.setAttribute(
    "aria-label",
    expanded ? "Expandir terminal" : "Recolher terminal",
  );
  terminalToggle.classList.toggle("is-expanded", !expanded);
});
