let isMenuOpen = false;

// Loading screen
function showLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.display = "block";
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.display = "none";
}

function initializeLoadingScreen() {
  showLoadingScreen();
  window.addEventListener("pageshow", function (event) {
    const minDisplayTime = 1000;
    const elapsedTime =
      new Date().getTime() - window.performance.timing.navigationStart;
    const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

    setTimeout(function () {
      hideLoadingScreen();
    }, remainingTime);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initializeLoadingScreen();

  // Eye animation
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

  // Change theme color
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
      menu.src = isMenuOpen
        ? "./assets/images/close-light.svg"
        : "./assets/images/open-light.svg";
    } else {
      root.classList.remove("light-theme");
      logo.classList.remove("logo-light");
      logo.src = "./assets/images/logo-dark.svg";
      menu.src = isMenuOpen
        ? "./assets/images/close-dark.svg"
        : "./assets/images/open-dark.svg";
    }
    themeToggle.src = `./assets/images/${theme}.svg`;
  }

  if (storedTheme) {
    applyTheme(storedTheme);
  }

  themeToggle.addEventListener("click", function () {
    event.stopPropagation();
    const newTheme = root.classList.contains("light-theme") ? "dark" : "light";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // Change language
  const languageToggle = document.getElementById("language");
  const cachedLang = localStorage.getItem("language");

  if (cachedLang) {
    updateLanguage(cachedLang);
    languageToggle.setAttribute("data-lang", cachedLang);
    document.documentElement.lang = cachedLang === "pt" ? "pt-PT" : "en";
  } else {
    const userLang = navigator.language.substring(0, 2);
    updateLanguage(userLang);
    languageToggle.setAttribute("data-lang", userLang);
    localStorage.setItem("language", userLang);
    document.documentElement.lang = userLang === "pt" ? "pt-PT" : "en";
  }

  languageToggle.addEventListener("click", function () {
    event.stopPropagation();
    const currentLang = languageToggle.getAttribute("data-lang");
    const newLang = currentLang === "pt" ? "en" : "pt";
    updateLanguage(newLang);
    languageToggle.setAttribute("data-lang", newLang);
    localStorage.setItem("language", newLang);

    document.documentElement.lang = newLang === "pt" ? "pt-PT" : "en";
  });

  function updateLanguage(lang) {
    const flag = document.querySelector("#language");
    const title = document.querySelector("#title");
    const role = document.querySelector("#role");
    const about = document.querySelector("#about");
    const works = document.querySelector("#works");
    const projects = document.querySelector("#projects");
    const contact = document.querySelector("#contact");
    const workButton = document.querySelector(".buttons button");

    if (lang === "en") {
      title.textContent = "FOUNDER & CEO AT LIONFORGE";
      role.textContent = "WEB DEVELOPER";
      workButton.textContent = "LET'S WORK!";
      about.textContent = "ABOUT ME";
      works.textContent = "WORKS";
      projects.textContent = "PROJECTS";
      contact.textContent = "CONTACT";
      flag.src = "./assets/images/portuguese.svg";
    } else {
      title.textContent = "FUNDADOR & CEO DA LIONFORGE";
      role.textContent = "DESENVOLVEDOR WEB";
      workButton.textContent = "BORA TRABALHAR!";
      about.textContent = "SOBRE MIM";
      works.textContent = "TRABALHOS";
      projects.textContent = "PROJETOS";
      contact.textContent = "CONTATO";
      flag.src = "./assets/images/english.svg";
    }
  }

  // Open & close menu
  const menuToggle = document.getElementById("menu");
  const menuBox = document.querySelector(".menu-box");

  menuToggle.addEventListener("click", function () {
    menuBox.classList.toggle("open");
    isMenuOpen = !isMenuOpen;
    updateMenuImage();
  });

  document.addEventListener("click", function (event) {
    const menuBox = document.querySelector(".menu-box");
    const menuToggle = document.getElementById("menu");
    const isClickInsideMenu =
      menuBox.contains(event.target) || menuToggle.contains(event.target);
    if (!isClickInsideMenu && isMenuOpen) {
      menuBox.classList.remove("open");
      isMenuOpen = false;
      updateMenuImage();
    }
  });

  // Update menu image
  function updateMenuImage() {
    const menuToggle = document.getElementById("menu");
    const root = document.documentElement;

    if (root.classList.contains("light-theme")) {
      menuToggle.src = isMenuOpen
        ? "./assets/images/close-light.svg"
        : "./assets/images/open-light.svg";
    } else {
      menuToggle.src = isMenuOpen
        ? "./assets/images/close-dark.svg"
        : "./assets/images/open-dark.svg";
    }
  }

  // Work button
  const workButton = document.querySelector(".buttons button");

  workButton.addEventListener("click", function () {
    showLoadingScreen();
    setTimeout(function () {
      window.location.href = "./assets/pages/contact.html";
    }, 2000);
  });
});
