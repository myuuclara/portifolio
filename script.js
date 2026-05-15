const tabs = Array.from(document.querySelectorAll("[role='tab']"));
const panels = Array.from(document.querySelectorAll("[role='tabpanel']"));
const filters = Array.from(document.querySelectorAll(".filter"));
const techItems = Array.from(document.querySelectorAll(".tech"));
const toast = document.querySelector(".toast");
const sectionShortcuts = Array.from(document.querySelectorAll("[data-section-shortcut]"));
const resumeShell = document.querySelector(".resume-shell");
const paperIntro = document.querySelector(".paper-intro");
const letterOpen = document.querySelector("[data-open-letter]");
const tabOrder = tabs.map((tab) => tab.dataset.tab || tab.dataset.goTab);
let activeTabId = "resumo";

function getTabLabel(tabId) {
  const tab = tabs.find((item) => (item.dataset.tab || item.dataset.goTab) === tabId);
  return tab?.querySelector("strong")?.textContent?.trim() || tabId;
}

function createPanelSteppers() {
  panels.forEach((panel) => {
    const tabId = panel.id.replace("panel-", "");
    const currentIndex = tabOrder.indexOf(tabId);

    if (currentIndex === -1 || panel.querySelector(".panel-stepper")) {
      return;
    }

    const nextTabId = tabOrder[(currentIndex + 1) % tabOrder.length];
    const stepper = document.createElement("nav");
    const button = document.createElement("button");

    stepper.className = "panel-stepper";
    stepper.setAttribute("aria-label", "Navegacao entre secoes");

    button.className = "next-panel-button";
    button.type = "button";
    button.dataset.goTab = nextTabId;
    button.setAttribute("aria-label", `Ir para ${getTabLabel(nextTabId)}`);

    stepper.append(button);
    panel.append(stepper);
  });
}

function unlockResume(shouldAnimate = true) {
  if (!document.body.classList.contains("index-only")) {
    return;
  }

  if (shouldAnimate) {
    resumeShell?.classList.add("is-unlocked");
    resumeShell?.addEventListener(
      "animationend",
      () => resumeShell.classList.remove("is-unlocked"),
      { once: true }
    );
  }

  document.body.classList.remove("index-only");
}

function playRevealAnimations(scope = document) {
  const revealItems = Array.from(scope.querySelectorAll(".reveal"));
  if (scope.classList?.contains("reveal")) {
    revealItems.unshift(scope);
  }

  revealItems.forEach((item) => item.classList.remove("is-visible"));
  revealItems.forEach((item, index) => {
    window.setTimeout(() => item.classList.add("is-visible"), index * 55);
  });
}

function activateTab(tabId, shouldFocus = false, shouldUpdateHash = true) {
  const nextTab = tabs.find((tab) => (tab.dataset.tab || tab.dataset.goTab) === tabId) || tabs[0];
  const nextTabId = nextTab.dataset.tab || nextTab.dataset.goTab;
  const currentIndex = tabOrder.indexOf(activeTabId);
  const nextIndex = tabOrder.indexOf(nextTabId);
  const direction =
    currentIndex === -1 || nextIndex === -1 || currentIndex === nextIndex
      ? "same"
      : nextIndex > currentIndex
        ? "forward"
        : "back";

  resumeShell?.classList.remove("deck-forward", "deck-back");
  if (direction !== "same") {
    resumeShell?.classList.add(`deck-${direction}`);
  }

  tabs.forEach((tab) => {
    const isActive = tab === nextTab;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel) => {
    const isActive = panel.id === `panel-${nextTabId}`;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });

  sectionShortcuts.forEach((shortcut) => {
    shortcut.classList.toggle("is-active", shortcut.dataset.goTab === nextTabId);
  });

  if (shouldFocus) {
    nextTab.focus({ preventScroll: true });
  }

  const activePanel = document.querySelector(`#panel-${nextTabId}`);
  if (activePanel) {
    playRevealAnimations(activePanel);
  }

  if (shouldUpdateHash) {
    history.replaceState(null, "", `#${nextTabId}`);
  }

  activeTabId = nextTabId;
}

function revealPortfolio() {
  document.body.classList.remove("intro-locked");
  document.body.classList.add("portfolio-revealed");

  const activePanel = document.querySelector(".panel.is-active");
  window.setTimeout(() => playRevealAnimations(activePanel || document), 180);
}

if (paperIntro) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    paperIntro.classList.add("is-done");
    revealPortfolio();
  } else {
    window.setTimeout(() => {
      paperIntro.classList.add("is-ready");
      letterOpen?.focus({ preventScroll: true });
    }, 3100);

    letterOpen?.addEventListener("click", () => {
      if (paperIntro.classList.contains("is-open")) {
        return;
      }

      paperIntro.classList.remove("is-ready");
      paperIntro.classList.add("is-open");
      window.setTimeout(revealPortfolio, 620);
      window.setTimeout(() => paperIntro.classList.add("is-done"), 1250);
    });
  }
} else {
  revealPortfolio();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    if (!tab.dataset.goTab) {
      activateTab(tab.dataset.tab);
    }
  });
  tab.addEventListener("keydown", (event) => {
    const keyMap = {
      ArrowRight: 1,
      ArrowLeft: -1,
      Home: -index,
      End: tabs.length - index - 1,
    };

    if (!(event.key in keyMap)) {
      return;
    }

    event.preventDefault();
    const nextIndex = (index + keyMap[event.key] + tabs.length) % tabs.length;
    activateTab(tabs[nextIndex].dataset.tab || tabs[nextIndex].dataset.goTab, true);
  });
});

if (window.location.hash) {
  history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

createPanelSteppers();
activateTab("resumo", false, false);

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const group = filter.dataset.filter;

    filters.forEach((item) => item.classList.toggle("is-active", item === filter));
    techItems.forEach((item) => {
      const groups = item.dataset.groups.split(" ");
      item.classList.toggle("is-hidden", group !== "all" && !groups.includes(group));
    });
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 1900);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copiado.");
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.append(field);
    field.select();
    document.execCommand("copy");
    field.remove();
    showToast("Copiado.");
  }
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", () => copyText(button.dataset.copy));
});

document.querySelectorAll("[data-go-tab]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    unlockResume();
    activateTab(link.dataset.goTab);
    document.querySelector(".resume-shell")?.scrollIntoView({ block: "start", behavior: "smooth" });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

window.addEventListener("pointermove", (event) => {
  document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
});
