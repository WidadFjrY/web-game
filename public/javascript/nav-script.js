const menuIcon = document.querySelector(".menu-icons");
const navMenu = document.querySelector(".nav-menu");
const menuIconBars = document.getElementById("menuIconBars");
const menuIconTimes = document.getElementById("menuIconTimes");

menuIcon.addEventListener("click", function () {
  navMenu.classList.toggle("active");
  if (navMenu.classList.contains("active")) {
    menuIconBars.style.display = "none";
    menuIconTimes.style.display = "block";
    navMenu.style.display = "flex";
    navMenu.style.right = "4.1rem";
  } else {
    menuIconBars.style.display = "block";
    menuIconTimes.style.display = "none";
    navMenu.style.display = "none";
  }
});
