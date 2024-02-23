let isMenuOpen = false;

// Loading Screen
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("load", function () {
    const loadingScreen = document.getElementById("loading-screen");
    const minDisplayTime = 2000;
    const elapsedTime =
      new Date().getTime() - window.performance.timing.navigationStart;
    const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

    setTimeout(function () {
      loadingScreen.style.display = "none";
    }, remainingTime);
  });
});

// Iris movement
function updateIrisPosition(x, y) {
  const eye = document.querySelector(".eye");
  const iris = document.querySelector(".iris");
  const eyeRect = eye.getBoundingClientRect();

  const eyeX = eyeRect.left + eyeRect.width / 2;
  const eyeY = eyeRect.top + eyeRect.height / 2;

  const deltaX = x - eyeX;
  const deltaY = y - eyeY;

  const angle = Math.atan2(deltaY, deltaX);

  const eyeRadius = eyeRect.width / 2;
  const irisRadius = iris.offsetWidth / 2;
  const maxMove = eyeRadius - irisRadius / 2;

  const distance = Math.min(
    Math.sqrt(deltaX * deltaX + deltaY * deltaY),
    maxMove
  );

  const irisX = distance * Math.cos(angle);
  const irisY = distance * Math.sin(angle);

  iris.style.transform = `translate(${irisX}px, ${irisY}px)`;
}

document.addEventListener("mousemove", function (event) {
  updateIrisPosition(event.clientX, event.clientY);
});

document.addEventListener("touchmove", function (event) {
  const touch = event.touches[0];
  updateIrisPosition(touch.clientX, touch.clientY);
});

document.addEventListener("touchmove", function (event) {
  event.preventDefault();
});

// Change theme color
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const logo = document.getElementById("logo");
  const menu = document.getElementById("menu");
  const root = document.documentElement;
  const storedTheme = localStorage.getItem("theme");

  function applyTheme(theme) {
    if (theme === "light") {
      root.classList.add("light-theme");
      logo.classList.add("logo-light");
      logo.src = "./assets/images/logo-light.svg";
      themeToggle.src = "./assets/images/dark.svg";

      if (!isMenuOpen) {
        return (menu.src = "./assets/images/open-light.svg");
      } else {
        return (menu.src = "./assets/images/close-light.svg");
      }
    } else {
      root.classList.remove("light-theme");
      logo.classList.remove("logo-light");
      logo.src = "./assets/images/logo-dark.svg";
      themeToggle.src = "./assets/images/light.svg";
      if (!isMenuOpen) {
        menu.src = "./assets/images/open-dark.svg";
      } else {
        menu.src = "./assets/images/close-dark.svg";
      }
    }
  }

  if (storedTheme) {
    applyTheme(storedTheme);
  }

  themeToggle.addEventListener("click", function () {
    if (root.classList.contains("light-theme")) {
      root.classList.remove("light-theme");
      logo.src = "./assets/images/logo-dark.svg";
      themeToggle.src = "./assets/images/light.svg";
      if (!isMenuOpen) {
        menu.src = "./assets/images/open-dark.svg";
      } else {
        menu.src = "./assets/images/close-dark.svg";
      }
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.add("light-theme");
      logo.src = "./assets/images/logo-light.svg";
      themeToggle.src = "./assets/images/dark.svg";
      if (!isMenuOpen) {
        menu.src = "./assets/images/open-light.svg";
      } else {
        menu.src = "./assets/images/close-light.svg";
      }
      localStorage.setItem("theme", "light");
    }
  });
});

// Change language
document.addEventListener("DOMContentLoaded", function () {
  const languageToggle = document.getElementById("language");
  const cachedLang = localStorage.getItem("language");

  if (cachedLang) {
    updateLanguage(cachedLang);
    languageToggle.setAttribute("data-lang", cachedLang);
  } else {
    const userLang = navigator.language.substring(0, 2);
    updateLanguage(userLang);
    languageToggle.setAttribute("data-lang", userLang);

    localStorage.setItem("language", userLang);
  }

  languageToggle.addEventListener("click", function () {
    const currentLang = languageToggle.getAttribute("data-lang");
    const newLang = currentLang === "pt" ? "en" : "pt";

    updateLanguage(newLang);

    languageToggle.setAttribute("data-lang", newLang);

    localStorage.setItem("language", newLang);
  });

  function updateLanguage(lang) {
    const flag = document.querySelector("#language");
    const title = document.querySelector("#title");
    const role = document.querySelector("#role");
    const workButton = document.querySelector(".buttons button");

    if (lang === "en") {
      title.textContent = "FOUNDER & CEO AT LIONFORGE";
      role.textContent = "WEB DEVELOPER";
      workButton.textContent = "LET'S WORK!";
      flag.src = "./assets/images/portuguese.svg";
    } else {
      title.textContent = "FUNDADOR & CEO DA LIONFORGE";
      role.textContent = "DESENVOLVEDOR WEB";
      workButton.textContent = "BORA TRABALHAR!";
      flag.src = "./assets/images/english.svg";
    }
  }
});
