// Dark/Light toggle
const toggleBtn = document.getElementById('theme-toggle');
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        
        // Save theme preference to localStorage
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Filter functionality
const filterOptions = document.querySelectorAll('.filter-option');
filterOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all options
        filterOptions.forEach(opt => opt.classList.remove('active'));
        // Add active class to clicked option
        option.classList.add('active');
        
        // Here you would typically filter the products
        // For now, we'll just log the filter text
        console.log('Filtering by: ' + option.textContent);
    });
});

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
});

// Cart functionality
const cartIcon = document.querySelector('.cart-icon');
if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        alert('Сагсны хуудас руу шилжиж байна');
        // Redirect to cart page in a real application
        // window.location.href = 'cart.html';
    });
}

// User icon functionality
const userIcon = document.querySelector('.user-icon');
if (userIcon) {
    userIcon.addEventListener('click', () => {
        alert('Хэрэглэгчийн хуудас руу шилжиж байна');
        // Redirect to user profile page in a real application
        // window.location.href = 'profile.html';
    });
}