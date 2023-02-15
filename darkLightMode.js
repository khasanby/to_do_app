const darkModeToggle = document.querySelector("#checkbox-mode");
darkModeToggle.addEventListener('change', function(event) {
  event.preventDefault();
  document.body.classList.toggle('darkMode');
});