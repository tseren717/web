document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const emailInput = form.querySelector("input[type='email']");
    const passwordInput = form.querySelector("input[type='password']");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const err = await response.json();
                alert("Нэвтрэхэд алдаа: " + err.error);
                return;
            }

            alert("Амжилттай нэвтэрлээ!");
            window.location.href = "profile.html";
        } catch (err) {
            console.error("Login error:", err);
            alert("Сервертэй холбогдож чадсангүй.");
        }
    });
});