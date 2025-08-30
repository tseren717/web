const menuToggle = document.getElementById('menuToggle');
  const dropdownMenu = document.getElementById('dropdownMenu');

  menuToggle.addEventListener('click', function () {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  // Close menu if clicked outside
  window.addEventListener('click', function (e) {
    if (!menuToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.style.display = 'none';
    }
  });

const profilePic = localStorage.getItem("profilePic");
const fullName = localStorage.getItem("fullName");
const username = localStorage.getItem("username");
const bio = localStorage.getItem("bio");

if (profilePic) {
  const imgElem = document.getElementById("profilePic");
  if (imgElem) {
    imgElem.src = profilePic;
  }
}

if (fullName) {
  const fullNameElem = document.getElementById("fullName");
  if (fullNameElem) {
    fullNameElem.textContent = fullName;
  }
}

if (username) {
  const usernameElem = document.getElementById("username");
  if (usernameElem) {
    usernameElem.textContent = username;
  }
}

if (bio) {
  const bioElem = document.getElementById("bio");
  if (bioElem) {
    bioElem.textContent = bio;  
  }
}
