const themeToggleBtn = document.getElementById("themeToggle");

// Helper to check if localStorage is available
const isStorageAvailable = () => {
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Apply theme based on boolean
function applyTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

// Initialize theme
if (isStorageAvailable()) {
  const savedTheme = localStorage.getItem("theme");
  // Default to dark if saved as dark, otherwise light (default CSS)
  applyTheme(savedTheme === "dark");
}

// Event Listener for Theme Toggle
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    // Toggle the class directly
    const isNowDark = document.body.classList.toggle("dark");

    // Save state
    if (isStorageAvailable()) {
      localStorage.setItem("theme", isNowDark ? "dark" : "light");
    }
  });
} else {
  console.warn("Кнопка #themeToggle не найдена. Проверь HTML.");
}

// --- Contact Form Logic ---

const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");
const submitBtn = document.getElementById("submitBtn");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual server submission

    // Reset previous errors
    clearErrors();

    // Get values
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let isValid = true;

    // Validate Name
    if (!name) {
      showError(nameInput, "nameError", "Имя обязательно для заполнения");
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      showError(emailInput, "emailError", "Email обязателен для заполнения");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError(emailInput, "emailError", "Неверный формат email");
      isValid = false;
    }

    // Validate Message
    if (!message) {
      showError(
        messageInput,
        "messageError",
        "Сообщение обязательно для заполнения",
      );
      isValid = false;
    }

    // If valid, simulate submission
    if (isValid) {
      // Simulate network request delay
      submitBtn.disabled = true;
      submitBtn.textContent = "Отправка...";

      setTimeout(() => {
        contactForm.reset();

        // Show success message (Fade In via CSS)
        successMessage.classList.remove("hidden");

        submitBtn.disabled = false;
        submitBtn.textContent = "Отправить";

        // Redirect to thanks.html after 1.5 seconds total (or slightly after success msg)
        // The prompt asks to redirect after 1.5s.
        // Let's redirect 1.5s after the "network" request finishes.
        setTimeout(() => {
          window.location.href = "./thanks.html";
        }, 1500);
      }, 1000);
    }
  });
}

// Helper function to show error
function showError(inputElement, errorId, message) {
  inputElement.classList.add("error");
  const errorSpan = document.getElementById(errorId);
  if (errorSpan) {
    errorSpan.textContent = message;
  }
}

// Helper function to clear errors
function clearErrors() {
  const inputs = document.querySelectorAll("input, textarea");
  inputs.forEach((input) => input.classList.remove("error"));

  const errors = document.querySelectorAll(".error-message");
  errors.forEach((span) => (span.textContent = ""));

  // Ensure success message is hidden when starting new validation
  if (successMessage) {
    successMessage.classList.add("hidden");
  }
}

// --- Service Card Interaction ---
const serviceButtons = document.querySelectorAll(".service-btn");

serviceButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".service-card");
    const description = card.querySelector(".service-description");

    // Toggle a class to simulate expanding details or highlighting selection
    // This requires a small CSS addition for the .expanded state if visual change is needed beyond hover
    card.classList.toggle("selected");

    // Optional: Change button text temporarily
    const originalText = e.target.textContent;
    e.target.textContent = "Загружено...";

    setTimeout(() => {
      e.target.textContent = originalText;
    }, 1000);

    console.log(
      `User clicked on: ${card.querySelector(".service-title").textContent}`,
    );
  });
});

// --- Service Card Scroll Animation ---

// Check if IntersectionObserver is supported
if ("IntersectionObserver" in window) {
  const cardObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the visible class to trigger CSS transition
          entry.target.classList.add("visible");

          // Stop observing once animated
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the card is visible
      rootMargin: "0px 0px -50px 0px", // Offset slightly so it triggers before bottom edge
    },
  );

  // Observe all service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    cardObserver.observe(card);
  });
} else {
  // Fallback for very old browsers: just show them immediately
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => card.classList.add("visible"));
}

// --- FAQ Accordion Logic with Mode Switcher ---

const faqList = document.querySelector(".faq-list");
const faqQuestions = document.querySelectorAll(".faq-question");
const modeInputs = document.querySelectorAll("input[name='faqMode']");

// Function to handle click on a question
function handleQuestionClick(clickedQuestion) {
  const isExpanded = clickedQuestion.getAttribute("aria-expanded") === "true";

  // Check current mode
  const singleMode = document.querySelector(
    "input[name='faqMode'][value='single']",
  ).checked;

  if (singleMode) {
    // Single Mode: Close all others first
    faqQuestions.forEach((otherQuestion) => {
      if (otherQuestion !== clickedQuestion) {
        otherQuestion.setAttribute("aria-expanded", "false");
      }
    });

    // Toggle the clicked one
    // If it was open, it closes. If closed, it opens (and others are already closed).
    clickedQuestion.setAttribute("aria-expanded", !isExpanded);
  } else {
    // Multiple Mode: Just toggle the clicked one
    clickedQuestion.setAttribute("aria-expanded", !isExpanded);
  }
}

// Attach event listeners to questions
faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    handleQuestionClick(question);
  });
});

// Optional: If switching from Multiple to Single, you might want to close all but the first open one?
// For now, we just let the state be until the user clicks again, which is standard behavior.
// However, if you want strict enforcement when switching modes:
modeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.value === "single") {
      // Find the first open item
      const openItem = document.querySelector(
        ".faq-question[aria-expanded='true']",
      );
      if (openItem) {
        // Close all others
        faqQuestions.forEach((q) => {
          if (q !== openItem) {
            q.setAttribute("aria-expanded", "false");
          }
        });
      }
    }
  });
});

// MODAL

document.addEventListener("DOMContentLoaded", () => {
  // --- Data Source for Modal Content ---
  // In a real app, this might come from an API or JSON file
  const serviceData = {
    "web-dev": {
      title: "Web Development",
      icon: "🚀",
      description:
        "Our Web Development service includes full-cycle creation of websites. We ensure high performance, SEO optimization, and cross-browser compatibility. Perfect for businesses looking to establish a strong online presence.",
    },
    frontend: {
      title: "Frontend Dev",
      icon: "💻",
      description:
        "We build responsive and interactive user interfaces using modern standards like HTML5, CSS3, and Vanilla JavaScript. We focus on clean code and smooth animations to enhance user experience.",
    },
    "ui-ux": {
      title: "UI/UX Design",
      icon: "🎨",
      description:
        "Our design process involves user research, wireframing, and prototyping. We create intuitive layouts that guide users naturally through your application, ensuring high conversion rates.",
    },
    backend: {
      title: "Backend API",
      icon: "⚙️",
      description:
        "Robust server-side solutions using Node.js or Python. We design secure RESTful APIs, manage database structures, and ensure your application scales efficiently as your user base grows.",
    },
  };

  // --- DOM Elements ---
  const modal = document.getElementById("serviceModal");
  const modalOverlay = modal.querySelector(".modal-overlay");
  const closeBtn = modal.querySelector(".modal-close");
  const triggerButtons = document.querySelectorAll(
    '[data-modal-trigger="service-details"]',
  );

  // Content Elements
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalIcon = document.getElementById("modalIcon");

  // --- Functions ---

  /**
   * Opens the modal and populates it with data based on the target ID
   * @param {string} targetId - The ID corresponding to serviceData keys
   */
  const openModal = (targetId) => {
    const data = serviceData[targetId];

    if (!data) return; // Exit if no data found

    // Populate content
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;
    modalIcon.textContent = data.icon;

    // Show modal
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    // Prevent background scrolling
    document.body.classList.add("modal-open");

    // Focus management: Move focus to the close button for accessibility
    closeBtn.focus();
  };

  /**
   * Closes the modal and resets state
   */
  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    // Restore background scrolling
    document.body.classList.remove("modal-open");
  };

  // --- Event Listeners ---

  // 1. Open Modal on Button Click
  triggerButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetId = e.currentTarget.getAttribute("data-target-id");
      openModal(targetId);
    });
  });

  // 2. Close on "X" Click
  closeBtn.addEventListener("click", closeModal);

  // 3. Close on Overlay Click (outside content)
  modalOverlay.addEventListener("click", closeModal);

  // 4. Close on Escape Key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});
