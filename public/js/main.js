document.addEventListener('DOMContentLoaded', function() {

    var currentPath = window.location.pathname;
    var navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(function(link) {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.mobile-nav-toggle').addEventListener('click', function(e) {
        document.querySelector('#navbar').classList.toggle('navbar-mobile');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var image = document.getElementById("figcaption");
    console.log(image);

    image.addEventListener("mouseenter", function() {
        image.style.transform = "scale(1.2)";
    });

    image.addEventListener("mouseleave", function() {
        image.style.transform = "scale(1)";
            
    });
});