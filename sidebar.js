const hamburgerButton = document.querySelector('.hamburger-button');
const sidebar = document.querySelector('.features');
const pickerButton = document.querySelector('.background-color-picker');
const fontPickerButton = document.querySelector('.font-picker-button');
const colorPicker = document.querySelector('.color-picker');
const fontPicker = document.querySelector('.font-picker');

hamburgerButton.addEventListener('click', function(event) {
    event.preventDefault();
    hamburgerButton.classList.toggle('hamburger_button_click');
    sidebar.classList.toggle('appear-sidebar');
});

pickerButton.addEventListener('click', function(event) {
    event.preventDefault();
    colorPicker.classList.toggle('show');
});

fontPickerButton.addEventListener('click', function(event) {
    event.preventDefault();
    fontPicker.classList.toggle('show');
});


// Color Picker Function
function changeBackground(div, imagePath) {
    div.addEventListener('click', function(event) {
        event.preventDefault();
        document.body.style.backgroundImage = `url(${imagePath})`;
        document.body.style.backgroundSize = 'cover';
    });
}

const backgroundDiv1 = document.querySelector('.bgcolor-1');
const backgroundDiv2 = document.querySelector('.bgcolor-2');
const backgroundDiv3 = document.querySelector('.bgcolor-3');
const backgroundDiv4 = document.querySelector('.bgcolor-4');
const backgroundDiv5 = document.querySelector('.bgcolor-5');

changeBackground(backgroundDiv1, 'images/1.jpg');
changeBackground(backgroundDiv2, 'images/2.jpg');
changeBackground(backgroundDiv3, 'images/3.jpg');
changeBackground(backgroundDiv4, 'images/4.jpg');
changeBackground(backgroundDiv5, 'images/background-image.jpg');

// Fint Picker Function
function changeFontStyle(styleButton, styleClassName) {
    styleButton.addEventListener('click', function(event) {
        event.preventDefault();
        document.body.style.fontFamily = 'Arial, sans-serif';
    });
}

const crimsonStyleButton = document.querySelector('.crimson');
const dancingScriptStyleButton = document.querySelector('.dancing');
const gloriaStyleButton = document.querySelector('.gloria');
const inconsolataStyleButton = document.querySelector('.inconsolata');
const sofiaStyleButton = document.querySelector('.sofia');

changeFontStyle(crimsonStyleButton, '.crimson');
changeFontStyle(dancingScriptStyleButton, '.dancing');
changeFontStyle(gloriaStyleButton, '.gloria');
changeFontStyle(inconsolataStyleButton, '.inconsolata');
changeFontStyle(sofiaStyleButton, '.sofia');