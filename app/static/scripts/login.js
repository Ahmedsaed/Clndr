// Get tab elements and content container
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginContent = document.getElementById("login");
const registerContent = document.getElementById("register");

// Add event listeners to the tabs
loginTab.addEventListener("click", showLoginContent);
registerTab.addEventListener("click", showRegisterContent);

// Function to show login content
function showLoginContent() {
  // Remove active class from all tabs
  loginTab.classList.add("selected");
  registerTab.classList.remove("selected");

  registerContent.classList.add("hidden");
  loginContent.classList.remove("hidden");
}

// Function to show register content
function showRegisterContent() {
  // Remove active class from all tabs
  loginTab.classList.remove("selected");
  registerTab.classList.add("selected");

  loginContent.classList.add("hidden");
  registerContent.classList.remove("hidden");
}
