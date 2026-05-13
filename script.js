const themeToggleBtn = document.getElementById("themeToggle");
const bodyElement = document.body;

// Function to apply the selected theme
function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  document.body.classList.toggle("light", !isDark);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  applyTheme(true);
} else {  
  applyTheme(false);
}

themeToggleBtn.addEventListener("click", () => { 
  const isCurrentlyDark = bodyElement.classList.contains("dark");
  
  const newIsDark = !isCurrentlyDark;
  applyTheme(newIsDark);

  localStorage.setItem("theme", newIsDark ? "dark" : "light");
});
