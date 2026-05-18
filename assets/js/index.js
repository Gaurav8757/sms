// Toast notification helper
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    // Dynamically create toast container if not in DOM
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Session validation and routing
function checkSession() {
  const userData = sessionStorage.getItem('asl_user');
  if (!userData) {
    window.location.href = 'login.html';
    return null;
  }
  return JSON.parse(userData);
}

// Logout routine
function handleLogout() {
  sessionStorage.removeItem('asl_user');
  window.location.href = 'login.html';
}

// Global balance top-up
function addBalance() {
  const userData = sessionStorage.getItem('asl_user');
  if (!userData) return;
  
  const user = JSON.parse(userData);
  let currentVal = parseFloat(user.balance || 907.96);
  let newVal = (currentVal + 100.00).toFixed(2);
  
  user.balance = newVal;
  sessionStorage.setItem('asl_user', JSON.stringify(user));
  
  // Update header and card stats balances dynamically if present
  const headerBal = document.getElementById('header-balance');
  if (headerBal) {
    headerBal.textContent = newVal + ' SMS';
  }
  
  const dashBalVal = document.getElementById('dash-balance-value');
  if (dashBalVal) {
    dashBalVal.textContent = Math.round(newVal);
  }
  
  showToast('🎉 Balance topped up successfully!');
}

// Form Password Visibility Toggle
function togglePasswordVisibility(inputId, eyeIconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(eyeIconId);
  if (!input || !icon) return;
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fa-regular fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fa-regular fa-eye';
  }
}

// Profile dropdown toggle
function toggleDropdown(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('profileDropdown');
  if (dropdown) dropdown.classList.toggle('open');
}

// Close profile dropdown on click outside
document.addEventListener('click', () => {
  const dropdown = document.getElementById('profileDropdown');
  if (dropdown) dropdown.classList.remove('open');
});

// Sidebar Submenu initialization and toggling
let isSubmenuOpen = false;
let isDevSubmenuOpen = false;

function initSidebarSubmenus() {
  const currentPath = window.location.pathname;
  const list = document.getElementById('submenuList');
  const arrow = document.getElementById('submenuArrow');
  const devList = document.getElementById('devSubmenuList');
  const devArrow = document.getElementById('devSubmenuArrow');

  // Check if we are on templates or sender-ids pages
  if (currentPath.includes('templates.html') || currentPath.includes('sender-ids.html')) {
    isSubmenuOpen = true;
  }
  // Check if we are on api-keys or docs pages
  if (currentPath.includes('api-keys.html') || currentPath.includes('docs.html')) {
    isDevSubmenuOpen = true;
  }

  // Apply visual states on load
  if (list && arrow) {
    list.style.display = isSubmenuOpen ? 'flex' : 'none';
    arrow.className = isSubmenuOpen ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right';
  }
  if (devList && devArrow) {
    devList.style.display = isDevSubmenuOpen ? 'flex' : 'none';
    devArrow.className = isDevSubmenuOpen ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right';
  }
}

// Call on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebarSubmenus);
} else {
  initSidebarSubmenus();
}

function toggleSubmenu() {
  const list = document.getElementById('submenuList');
  const arrow = document.getElementById('submenuArrow');
  const devList = document.getElementById('devSubmenuList');
  const devArrow = document.getElementById('devSubmenuArrow');
  if (!list || !arrow) return;

  isSubmenuOpen = !isSubmenuOpen;
  list.style.display = isSubmenuOpen ? 'flex' : 'none';
  arrow.className = isSubmenuOpen ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right';

  // Accordion behavior: Close DevSubmenu if Submenu is opened
  if (isSubmenuOpen) {
    isDevSubmenuOpen = false;
    if (devList && devArrow) {
      devList.style.display = 'none';
      devArrow.className = 'fa-solid fa-chevron-right';
    }
  }
}

function toggleDevSubmenu() {
  const list = document.getElementById('submenuList');
  const arrow = document.getElementById('submenuArrow');
  const devList = document.getElementById('devSubmenuList');
  const devArrow = document.getElementById('devSubmenuArrow');
  if (!devList || !devArrow) return;

  isDevSubmenuOpen = !isDevSubmenuOpen;
  devList.style.display = isDevSubmenuOpen ? 'flex' : 'none';
  devArrow.className = isDevSubmenuOpen ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right';

  // Accordion behavior: Close Submenu if DevSubmenu is opened
  if (isDevSubmenuOpen) {
    isSubmenuOpen = false;
    if (list && arrow) {
      list.style.display = 'none';
      arrow.className = 'fa-solid fa-chevron-right';
    }
  }
}

// Sidebar responsive drawer toggle
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}
