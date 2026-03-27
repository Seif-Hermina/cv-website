document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const welcomeMessage = document.getElementById("welcome-message");
  const themeToggle = document.getElementById("theme-toggle");

  // 1) Welcome message
  welcomeMessage.textContent = "Welcome to my portfolio page!";

  // 2) Dark mode / light mode toggle
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    themeToggle.textContent = body.classList.contains("dark-mode")
      ? "Light Mode"
      : "Dark Mode";
  });

  // 3) Show / hide sections
  const toggleButtons = document.querySelectorAll(".toggle-btn");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const target = document.getElementById(targetId);

      target.classList.toggle("hidden");
      button.textContent = target.classList.contains("hidden")
        ? button.textContent.includes("Skills")
          ? "Show Skills"
          : button.textContent.includes("Projects")
          ? "Show Projects"
          : "Show Achievements"
        : button.textContent.includes("Skills")
        ? "Hide Skills"
        : button.textContent.includes("Projects")
        ? "Hide Projects"
        : "Hide Achievements";
    });
  });

  // 4) Dynamic skills list
  const addSkillForm = document.getElementById("add-skill-form");
  const newSkillInput = document.getElementById("new-skill");
  const skillsList = document.getElementById("skills-list");
  const skillMessage = document.getElementById("skill-message");

  addSkillForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const skill = newSkillInput.value.trim();

    if (skill === "") {
      skillMessage.textContent = "Please enter a skill.";
      skillMessage.style.color = "#dc2626";
      return;
    }

    const li = document.createElement("li");
    li.textContent = skill;
    skillsList.appendChild(li);

    newSkillInput.value = "";
    skillMessage.textContent = `${skill} added successfully.`;
    skillMessage.style.color = "#16a34a";
  });

  // 5) Interactive project section
  const projectButtons = document.querySelectorAll(".project-btn");

  projectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const target = document.getElementById(targetId);

      target.classList.toggle("hidden");
      button.textContent = target.classList.contains("hidden")
        ? "Show Details"
        : "Hide Details";
    });
  });

  // 6) Contact form validation
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const messageInput = document.getElementById("contact-message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const formMessage = document.getElementById("form-message");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formMessage.textContent = "";
    formMessage.style.color = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name === "") {
      nameError.textContent = "Name is required.";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (message === "") {
      messageError.textContent = "Message is required.";
      isValid = false;
    }

    if (isValid) {
      formMessage.textContent = "Message sent successfully!";
      formMessage.style.color = "#16a34a";
      contactForm.reset();
    }
  });
});