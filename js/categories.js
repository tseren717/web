
// Dark/Light toggle
    const toggleBtn = document.getElementById('theme-toggle');
    toggleBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
    });

// Бүтээгдэхүүний тоолуур
function updateProductCounter() {
    const productCards = document.querySelectorAll('.product-card');
    document.getElementById('total-products').textContent = productCards.length;
}

// Хуудас ачаалсны дараа ажиллуулна
window.addEventListener('DOMContentLoaded', updateProductCounter);
