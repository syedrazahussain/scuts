document.querySelector('.menu-icon').addEventListener('click', function() {
    const navbarContainer = document.querySelector('.customize-navbar-container');
    const icon = document.querySelector('.menu-icon i');

    navbarContainer.classList.toggle('open');

    // Check if the navbar is open and change icon accordingly
    if (navbarContainer.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});
