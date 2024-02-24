document.addEventListener("DOMContentLoaded", function () {
  // Apply theme
  const backButton = document.getElementById("back");
  const storedTheme = localStorage.getItem("theme");

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light-theme");
      backButton.src = "../images/back-light.svg";
    } else {
      root.classList.remove("light-theme");
      backButton.src = "../images/back-dark.svg";
    }
  }

  if (storedTheme) {
    applyTheme(storedTheme);
  }

  // Go back to home
  backButton.addEventListener("click", function () {
    window.location.href = "../../index.html";
  });

  // Change language
  const languageToggle = document.getElementById("language");
  const flag = document.getElementById("language");
  const cachedLang = localStorage.getItem("language");

  if (cachedLang) {
    updateLanguage(cachedLang);
    languageToggle.setAttribute("data-lang", cachedLang);

    updateFlag(cachedLang);

    document.documentElement.lang = cachedLang === "pt" ? "pt-PT" : "en";
  } else {
    const userLang = navigator.language.substring(0, 2);
    updateLanguage(userLang);
    languageToggle.setAttribute("data-lang", userLang);
    localStorage.setItem("language", userLang);

    updateFlag(userLang);

    document.documentElement.lang = userLang === "pt" ? "pt-PT" : "en";
  }

  languageToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    const currentLang = languageToggle.getAttribute("data-lang");
    const newLang = currentLang === "pt" ? "en" : "pt";
    updateLanguage(newLang);
    languageToggle.setAttribute("data-lang", newLang);
    localStorage.setItem("language", newLang);

    updateFlag(newLang);

    document.documentElement.lang = newLang === "pt" ? "pt-PT" : "en";
  });

  function updateLanguage(lang) {
    const pageTitle = document.querySelector("h1");
    if (lang === "en") {
      pageTitle.textContent = "Contact";
    } else {
      pageTitle.textContent = "Contato";
    }
  }

  function updateFlag(lang) {
    if (lang === "en") {
      flag.src = "../images/portuguese.svg";
    } else {
      flag.src = "../images/english.svg";
    }
  }
});
