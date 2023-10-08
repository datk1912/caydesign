
// điều hướng trong header menu
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

// gửi dữ liệu dự án
document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitProduct');
    const myForm = document.getElementById('formProduct');

    submitButton.addEventListener('click', function() {
        myForm.submit();
    });
});

// xóa 1 sản phẩm

function DeleteProduct(folName){
    const isConfirmed = confirm('Bạn có chắc chắn muốn xóa mục này?');
    if (isConfirmed) {
        const folderName = folName; 
        fetch(`./admin?folderName=${folderName}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                console.log('Xóa thành công');
                return;
            } else {
                console.error('Xóa không thành công');
            }
        })
        .catch(error => {
            console.error('Lỗi:', error);
        });
    }
    
}