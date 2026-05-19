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

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual server submission

    // Reset previous errors
    clearErrors();
    
    // Get values
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let isValid = true;

    // Validate Name
    if (!name) {
      showError(nameInput, 'nameError', 'Имя обязательно для заполнения');
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      showError(emailInput, 'emailError', 'Email обязателен для заполнения');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError(emailInput, 'emailError', 'Неверный формат email');
      isValid = false;
    }

    // Validate Message
    if (!message) {
      showError(messageInput, 'messageError', 'Сообщение обязательно для заполнения');
      isValid = false;
    }

    // If valid, simulate submission
    if (isValid) {
      // Simulate network request delay
      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправка...';

      setTimeout(() => {
        contactForm.reset();
        
        // Show success message (Fade In via CSS)
        successMessage.classList.remove('hidden');
        
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить';
        
        // Hide success message after 3 seconds (Fade Out via CSS)
        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, 3000);
        
      }, 1000);
    }
  });
}

// Helper function to show error
function showError(inputElement, errorId, message) {
  inputElement.classList.add('error');
  const errorSpan = document.getElementById(errorId);
  if (errorSpan) {
    errorSpan.textContent = message;
  }
}

// Helper function to clear errors
function clearErrors() {
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => input.classList.remove('error'));
  
  const errors = document.querySelectorAll('.error-message');
  errors.forEach(span => span.textContent = '');
  
  // Ensure success message is hidden when starting new validation
  if (successMessage) {
    successMessage.classList.add('hidden');
  }
}