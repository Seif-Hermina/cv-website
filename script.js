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



  // --- 1. QUOTES API ---
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");
  const newQuoteBtn = document.getElementById("new-quote-btn");

  async function fetchQuote() {
    try {
      // Show loading state
      quoteText.textContent = "Loading an inspiring quote...";
      quoteAuthor.innerHTML = "";
      
      // Fetch data
      const response = await fetch("https://dummyjson.com/quotes/random");
      
      // Handle failed request
      if (!response.ok) throw new Error("Failed to fetch quote");
      
      const data = await response.json();
      
      // Update DOM with API data
      quoteText.textContent = `"${data.quote}"`;
      quoteAuthor.innerHTML = `<strong>- ${data.author}</strong>`;
    } catch (error) {
      // Handle Errors
      quoteText.textContent = "Oops! Couldn't load a quote right now. Please try again later.";
      quoteAuthor.innerHTML = "";
      console.error(error);
    }
  }

  // Fetch initial quote and add event listener to button
  fetchQuote();
  newQuoteBtn.addEventListener("click", fetchQuote);


  // --- 2. WEATHER API (Using WeatherAPI.com) ---
  // IMPORTANT: Replace the string below with your actual WeatherAPI key!
  const WEATHER_API_KEY = "cffd904d187c480ba77193607261604"; 
  
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherStatus = document.getElementById("weather-status");
  const weatherData = document.getElementById("weather-data");
  const weatherTemp = document.getElementById("weather-temp");
  const weatherCondition = document.getElementById("weather-condition");
  const weatherIcon = document.getElementById("weather-icon");

  async function fetchWeather(city) {
    try {
      // Show loading state and hide previous data
      weatherStatus.textContent = `Loading weather for ${city}...`;
      weatherStatus.classList.remove("hidden");
      weatherData.classList.add("hidden");

      // WeatherAPI endpoint
      const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`;
      const response = await fetch(url);

      // Handle failed request
      if (!response.ok) throw new Error("City not found or API error");

      const data = await response.json();

      // Update DOM with API data
      weatherTemp.textContent = `${data.current.temp_c}°C`;
      weatherCondition.textContent = data.current.condition.text;
      
      // WeatherAPI returns icon URLs starting with "//", so we prepend "https:"
      weatherIcon.src = `https:${data.current.condition.icon}`;

      // Hide loading status and show data
      weatherStatus.classList.add("hidden");
      weatherData.classList.remove("hidden");

    } catch (error) {
      // Handle Errors
      weatherStatus.textContent = `Could not fetch weather for "${city}". Please check the spelling and try again.`;
      weatherStatus.classList.remove("hidden");
      weatherData.classList.add("hidden");
      console.error(error);
    }
  }

  // Fetch initial weather for Cairo and add event listener to button
  fetchWeather(cityInput.value);
  getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
      fetchWeather(city);
    }
  });
  
});