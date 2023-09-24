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

// lăn chuột mất header
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-80px";
  }
  prevScrollpos = currentScrollPos;
}

// gửi dữ liệu 

function sendImg(title) {
    fetch('/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: title.toString() })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dữ liệu từ máy chủ:', data);
    })
    .catch(error => {
        console.error('Lỗi khi gửi yêu cầu:', error);
    });
}