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

// Event Listener
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