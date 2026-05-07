document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorBox = document.getElementById("loginError");
  const logoutBtn = document.getElementById("logoutBtn");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username")?.value.trim() || "";
      const password = document.getElementById("password")?.value.trim() || "";

      if (!username || !password) {
        errorBox.textContent = "Please enter username and password.";
        return;
      }

      errorBox.textContent = "";

      try {
        const response = await fetch("/api/token/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          errorBox.textContent = data.detail || "Login failed";
          return;
        }

        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        window.location.href = "/dashboard/";
      } catch (error) {
        errorBox.textContent = "Network error while logging in.";
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/";
    });
  }
});