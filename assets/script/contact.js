document.addEventListener("DOMContentLoaded", function () {
  // Apply theme
  const backButton = document.getElementById("back");
  const contactLogo = document.getElementById("contact-logo");
  const storedTheme = localStorage.getItem("theme");

  function applyTheme(theme) {
    const root = document.documentElement;

    if (theme === "light") {
      root.classList.add("light-theme");
      backButton.src = "../images/back-light.svg";
      contactLogo.src = "../images/logo-light.svg";
    } else {
      root.classList.remove("light-theme");
      backButton.src = "../images/back-dark.svg";
      contactLogo.src = "../images/logo-dark.svg";
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
    const pageTitle = document.getElementById("contact-title");
    const emailInput = document.getElementById("email");
    const description = document.getElementById("contact-description");
    const formName = document.getElementById("name");
    const formPhone = document.getElementById("phone");
    const formSubject = document.getElementById("subject");
    const formMessage = document.getElementById("message");
    const formButton = document.getElementById("submit");

    if (lang === "en") {
      pageTitle.textContent = "CONTACT";
      description.textContent =
        "Ready to start a project? Don't hesitate to get in touch using the form below to request a quote. I promise to get back to you as soon as possible.";
      formName.placeholder = "Name";
      formPhone.placeholder = "Phone";
      formSubject.placeholder = "Subject";
      formMessage.placeholder = "Message";
      formButton.textContent = "LET'S WORK!";
      emailInput.setCustomValidity("Please enter a valid email.");
    } else {
      pageTitle.textContent = "CONTACTO";
      description.textContent =
        "Pronto para começarmos um projeto? Não hesites em entrar em contacto através do formulário abaixo para pedidos de orçamento. Prometo responder o mais breve possível.";
      formName.placeholder = "Nome";
      formPhone.placeholder = "Telefone";
      formSubject.placeholder = "Assunto";
      formMessage.placeholder = "Mensagem";
      formButton.textContent = "BORA TRABALHAR!";
      emailInput.setCustomValidity("Por favor, insira um email válido.");
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

// Check phone number
document.getElementById("phone").addEventListener("keydown", function (event) {
  if (
    event.key === "Backspace" ||
    event.key === "Delete" ||
    event.key === "Tab" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight"
  ) {
    return;
  }

  if (!/[0-9()+-]/.test(event.key)) {
    event.preventDefault();
  }
});

// Check email
document.getElementById("email").addEventListener("input", function (event) {
  var email = event.target.value;
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    event.target.setCustomValidity("Por favor, insira um email válido.");
  } else {
    event.target.setCustomValidity("");
  }
});

// Form submit
class FormSubmit {
  constructor(settings, languageToggle) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    this.languageToggle = languageToggle;

    if (this.form) {
      this.url = this.form.getAttribute("action");
    }

    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    if (this.languageToggle.getAttribute("data-lang") === "en") {
      this.form.innerHTML =
        "<div class='sucess' style='height: 26rem; width: 24rem; display: flex; justify-content: center; align-items: center;'><h1 id='sucess' style='color: var(--white); font-size: 1.5rem; text-align: center;'>Your message has been sent successfully!</h1></div>";
    } else {
      this.form.innerHTML =
        "<div class='sucess' style='height: 26rem; width: 24rem; display: flex; justify-content: center; align-items: center;'><h1 id='sucess' style='color: var(--white); font-size: 1.5rem; text-align: center;'>A sua mensagem foi enviada com sucesso!</h1></div>";
    }
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  }

  displayError() {
    if (this.languageToggle.getAttribute("data-lang") === "en") {
      this.form.innerHTML =
        "<div style='height: 26rem; width: 24rem; display: flex; justify-content: center; align-items: center;' style='color: var(--white); font-size: 1.5rem; text-align: center;'><h1 id='error'>An error occurred. Please try again.</h1></div>";
    } else {
      this.form.innerHTML =
        "<div style='height: 26rem; width: 24rem; display: flex; justify-content: center; align-items: center;' style='color: var(--white); font-size: 1.5rem; text-align: center;'><h1 id='error'>Ocorreu um erro. Por favor, tente novamente.</h1></div>";
    }
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");

    fields.forEach((field) => {
      formObject[field.name] = field.value;
    });

    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.textContent =
      this.languageToggle.getAttribute("data-lang") === "en"
        ? "SENDING..."
        : "A ENVIAR...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();

      throw new Error(error);
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const languageToggle = document.getElementById("language");
const formSubmit = new FormSubmit(
  {
    form: "[data-form]",
    button: "[data-button]",
  },
  languageToggle
);
formSubmit.init();
