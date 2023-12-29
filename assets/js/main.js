// Overlay Div 
let site_overly = document.querySelector('.site-overlay');

// Aside Open/Close
let aside_open_btn = document.querySelector('header .aside-open');
let aside_close_btn = document.querySelector('header .navigation .nav-items .aside-close');
let aside = document.querySelector('header .navigation');

if(aside_open_btn){
    aside_open_btn.addEventListener('click',function(){
        aside.classList.add('show');
        site_overly.classList.add('show');
        console.log(site_overly);
    });
}
if(aside_close_btn){
    aside_close_btn.addEventListener('click',function(){
        aside.classList.remove('show');
        site_overly.classList.remove('show');
    });
}

let submenuslide = document.querySelectorAll("header .navigation .item .link");
if(submenuslide){
    for (let i = 0; i < submenuslide.length; i++) {
        submenuslide[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var submenu = submenuslide[i].closest('.item').querySelector('.submenu');
            if(submenu){
                if (submenu.style.maxHeight) {
                    submenu.style.maxHeight = null;
                } else {
                    submenu.style.maxHeight = submenu.scrollHeight + "px";
                } 
            }
        });
    }
}


let link_item = document.querySelectorAll("aside nav .navbar-nav li a.link-item");
if(link_item){
    for(let i = 0; i < link_item.length; i++){
        link_item[i].addEventListener('click',function(){
            aside.classList.remove('show');
            site_overly.classList.remove('show');
        });
    }
}


// Overly Click All Close
if(site_overly){
    site_overly.addEventListener('click',function(){
        this.classList.remove("show");
        aside.classList.remove("show");
    });
}



// // User Options Open/Close
// let user_options_btn = document.querySelector('.layout-header .avatar .user-options-btn');
// let user_options = document.querySelector('.layout-header .avatar .user-options');
// let user_options_head = document.querySelector('.layout-header .avatar .user-options .head');
// window.addEventListener('mouseup',function(event){
//     if(user_options_btn == event.target.closest(".avatar .user-options-btn")){
//         user_options.classList.toggle('show');
//     }else{
//         if(event.target == user_options_head || event.target.closest(".user-options .head") == user_options_head){
//             return false;
//         }else if(event.target != user_options && event.target.parentNode != user_options){
//             user_options.classList.remove("show");
//         }
//     }
// }); 



// Image Select
let imageSelect = document.querySelectorAll('.thumbnail .imageSelect');
let imageDefault = document.querySelectorAll('.thumbnail .imageDefault');
let fileOpen = document.querySelectorAll('.thumbnail .fileOpen');
let ImageRemove = document.querySelectorAll('.thumbnail .ImageRemove');
if(imageSelect){
    imageSelect.forEach((select,index) => {
        select.addEventListener('click', function(){
            this.closest('.thumbnail').querySelector('.fileOpen').click();
        })
    });
}

if(fileOpen){
    fileOpen.forEach((file,index) => {
        file.addEventListener('change', function(event){
            let isThis = this;
            let reader = new FileReader();
            reader.onload = function(){
                imageDefault[index].style.display = "none";
                ImageRemove[index].style.display = "block";
                isThis.closest('.thumbnail').querySelector('.imagePreview').style.display = "block";
                let imagePreview = isThis.closest('.thumbnail').querySelector('.imagePreview');
                imagePreview.src = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]); 
        })
    });
}

if(ImageRemove){
    ImageRemove.forEach((remove,index) => { 
        remove.addEventListener('click', function(){
            remove.style.display = "none";
            this.closest('.thumbnail').querySelector('.fileOpen').value = null;
            this.closest('.thumbnail').querySelector('.imagePreview').src = null;
            this.closest('.thumbnail').querySelector('.imagePreview').style.display = "none";
            this.closest('.thumbnail').querySelector('.imageDefault').style.display = "block";
        })
    });
}
















