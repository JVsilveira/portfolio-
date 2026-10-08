const pages = {
  me: { file: "sobre-mim.ts", language: "TypeScript" },
  activity: { file: "tecnologias.json", language: "JSON" },
  whatido: { file: "projetos.tsx", language: "TypeScript JSX" },
  contact: { file: "contato.md", language: "Markdown" },
};
const mobileMedia = window.matchMedia("(max-width: 767px)");
const tabs = document.querySelector(".tabs");
const tabTemplates = new Map(
  [...tabs.querySelectorAll("a")].map((link) => [
    link.dataset.page,
    link.cloneNode(true),
  ]),
);
const content = document.getElementById("content");
const openedFiles = [];
const scrollPositions = new Map();
let currentPage;

const mobileFiles = document.getElementById("mobile-files");
const mobileFilesToggle = document.getElementById("mobile-files-toggle");
mobileFilesToggle.addEventListener("click", () => {
  if (mobileFiles.open) mobileFiles.close();
  else {
    mobileFiles.show();
    mobileFilesToggle.setAttribute("aria-expanded", "true");
  }
});
mobileFiles.addEventListener("close", () =>
  mobileFilesToggle.setAttribute("aria-expanded", "false"),
);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileFiles.open) {
    mobileFiles.close();
    mobileFilesToggle.focus();
  }
});
const mobileFolder = document.getElementById("mobile-folder-toggle");
mobileFolder.addEventListener("click", () => {
  const expanded = mobileFolder.getAttribute("aria-expanded") === "true";
  mobileFolder.setAttribute("aria-expanded", String(!expanded));
  document.getElementById("mobile-file-list").hidden = expanded;
});

const workspace = document.querySelector(".workspace");
const explorerToggle = document.getElementById("explorer-toggle");
function setExplorer(open) {
  workspace.classList.toggle("explorer-hidden", !open);
  explorerToggle.setAttribute("aria-expanded", String(open));
  explorerToggle.setAttribute(
    "aria-label",
    open ? "Ocultar explorador" : "Mostrar explorador",
  );
  explorerToggle.classList.toggle("active", open);
}
explorerToggle.addEventListener("click", () =>
  setExplorer(explorerToggle.getAttribute("aria-expanded") !== "true"),
);
const folderToggle = document.getElementById("folder-toggle");
folderToggle.addEventListener("click", () => {
  const expanded = folderToggle.getAttribute("aria-expanded") === "true";
  folderToggle.setAttribute("aria-expanded", String(!expanded));
  document.getElementById("desktop-files").hidden = expanded;
});

function renderTabs() {
  const files = openedFiles;
  tabs.replaceChildren(
    ...files.map((page) => {
      const tab = document.createElement("div");
      tab.className = "editor-tab";
      tab.dataset.file = page;
      tab.classList.toggle("active", page === currentPage);
      const link = tabTemplates.get(page).cloneNode(true);
      link.classList.toggle("active", page === currentPage);
      if (page === currentPage) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
      tab.append(link);
      const close = document.createElement("button");
      close.type = "button";
      close.className = "tab-close";
      close.dataset.close = page;
      close.setAttribute("aria-label", `Fechar ${pages[page].file}`);
      close.textContent = "×";
      tab.append(close);
      return tab;
    }),
  );
}
function activate(page, { focus = false } = {}) {
  if (currentPage)
    scrollPositions.set(
      currentPage,
      mobileMedia.matches ? window.scrollY : content.scrollTop,
    );
  if (page && !openedFiles.includes(page)) openedFiles.push(page);
  const changed = currentPage !== page;
  currentPage = page;
  document.querySelectorAll(".page").forEach((section) => {
    section.hidden = section.id !== page;
  });
  document.getElementById("empty-editor").hidden = page !== null;
  document.querySelector(".breadcrumbs").hidden = page === null;
  document.getElementById("current-file").textContent = page
    ? pages[page].file
    : "";
  document.getElementById("file-language").textContent = page
    ? pages[page].language
    : "";
  document.querySelectorAll("[data-page]").forEach((link) => {
    const active = link.dataset.page === page;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  renderTabs();
  if (changed) {
    content.scrollTop = page ? scrollPositions.get(page) || 0 : 0;
    if (mobileMedia.matches)
      window.scrollTo({
        top: page ? scrollPositions.get(page) || 0 : 0,
        behavior: "instant",
      });
    if (focus) content.focus({ preventScroll: true });
  }
}
function navigate(page, options = {}) {
  const hash = page ? `#${page}` : "#editor";
  if (location.hash !== hash) history.pushState(null, "", hash);
  activate(page, options);
}
function fromLocation() {
  const requested = location.hash.slice(1);
  activate(
    requested === "editor"
      ? null
      : Object.hasOwn(pages, requested)
        ? requested
        : "me",
  );
}
document.addEventListener("click", (event) => {
  const close = event.target.closest("[data-close]");
  if (close) {
    const page = close.dataset.close;
    const index = openedFiles.indexOf(page);
    openedFiles.splice(index, 1);
    scrollPositions.delete(page);
    if (page === currentPage)
      navigate(openedFiles[Math.min(index, openedFiles.length - 1)] || null, {
        focus: true,
      });
    else {
      renderTabs();
      tabs.querySelector(`[data-page="${currentPage}"]`)?.focus();
    }
    return;
  }
  const link = event.target.closest("[data-page]");
  if (!link || !Object.hasOwn(pages, link.dataset.page)) return;
  event.preventDefault();
  if (mobileFiles.open) mobileFiles.close();
  navigate(link.dataset.page, { focus: true });
});
window.addEventListener("popstate", fromLocation);
window.addEventListener("hashchange", fromLocation);
fromLocation();
window.addEventListener(
  "load",
  () => window.scrollTo({ top: 0, behavior: "instant" }),
  { once: true },
);

const terminalToggle = document.getElementById("terminal-toggle");
function setTerminal(expanded) {
  document.getElementById("terminal-content").hidden = !expanded;
  terminalToggle.setAttribute("aria-expanded", String(expanded));
  terminalToggle.setAttribute(
    "aria-label",
    expanded ? "Recolher terminal" : "Expandir terminal",
  );
  terminalToggle.classList.toggle("is-expanded", expanded);
}
terminalToggle.addEventListener("click", () =>
  setTerminal(terminalToggle.getAttribute("aria-expanded") !== "true"),
);
setTerminal(!mobileMedia.matches);
mobileMedia.addEventListener("change", (event) => {
  if (!event.matches && mobileFiles.open) mobileFiles.close();
  renderTabs();
  setTerminal(!event.matches);
});
