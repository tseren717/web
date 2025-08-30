// Зураг сонгогдсон үед preview-г харуулах
const profilePicInput = document.getElementById("profilePic");
const previewImg = document.getElementById("previewImg");

profilePicInput.addEventListener("change", function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImg.src = e.target.result;
      previewImg.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    previewImg.src = "";
    previewImg.style.display = "none";
  }
});

// Форм хадгалах event
document.getElementById("editProfileForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("profilePic");
  const fullNameInput = document.getElementById("fullName").value.trim();
  const usernameInput = document.getElementById("username").value.trim();
  const bioInput = document.getElementById("bio").value.trim();

  // Одоогийн хадгалагдсан утгууд
  const storedFullName = localStorage.getItem("fullName") || "";
  const storedUsername = localStorage.getItem("username") || "";
  const storedBio = localStorage.getItem("bio") || "";

  // Текстэн талбаруудыг хадгална
  localStorage.setItem("fullName", fullNameInput !== "" ? fullNameInput : storedFullName);
  localStorage.setItem("username", usernameInput !== "" ? usernameInput : storedUsername);
  localStorage.setItem("bio", bioInput !== "" ? bioInput : storedBio);

  // Зураг байвал Base64 болгож хадгалах
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(event) {
      localStorage.setItem("profilePic", event.target.result);
      window.location.href = "profile.html";
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    // Хэрвээ зураг оруулаагүй бол хуучин зургийг хадгалж үлдэнэ
    window.location.href = "profile.html";
  }
});
