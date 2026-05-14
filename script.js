const themeToggleBtn = document.getElementById("themeToggle");
const bodyElement = document.body;

// Task B: Helper function for safe localStorage access
function safeStorage() {
  try {
    // Check if storage is available and writable
    const testKey = "__test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

// Function to apply the selected theme
function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  document.body.classList.toggle("light", !isDark);
}

// Apply saved theme on load if storage is available
if (safeStorage()) {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    applyTheme(true);
  } else {  
    applyTheme(false);
  }
} else {
  // Fallback if localStorage is not available (e.g., private mode or disabled)
  applyTheme(false); 
}

// Task A: Check if button exists before adding event listener
if (!themeToggleBtn) {
  console.warn("Кнопка #themeToggle не найдена. Проверь HTML.");
} else {
  themeToggleBtn.addEventListener("click", () => { 
    const isCurrentlyDark = bodyElement.classList.contains("dark");
    
    const newIsDark = !isCurrentlyDark;
    applyTheme(newIsDark);

    // Save theme only if storage is safe
    if (safeStorage()) {
      localStorage.setItem("theme", newIsDark ? "dark" : "light");
    }
  });
}