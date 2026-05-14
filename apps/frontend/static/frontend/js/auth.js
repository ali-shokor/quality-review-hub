document.addEventListener("DOMContentLoaded", () => {

  const token = localStorage.getItem("access_token");

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      window.location.href = "/";
    });
  }

  const form = document.getElementById("loginForm");

  if (!form) return;

  if (token) {
    return;
  }

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username =
      document.getElementById("username").value;

    const password =
      document.getElementById("password").value;

    const errorBox =
      document.getElementById("loginError");

    errorBox.textContent = "";

    const response = await fetch("/api/token/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      errorBox.textContent =
        data.detail || "Login failed";
      return;
    }

    localStorage.setItem(
      "access_token",
      data.access
    );

    localStorage.setItem(
      "refresh_token",
      data.refresh
    );

    window.location.href = "/dashboard/";
  });
});