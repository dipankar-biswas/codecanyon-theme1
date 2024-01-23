// Page Load
window.addEventListener('load', (e) => {
	setTimeout(function(){
	    document.querySelector(".page-loader").classList.remove('show');
        handleScroll();
	},500);
});

// Overlay Div 
let menu_overly = document.querySelector('.overlay');

// Aside Open/Close
let aside_open_btn = document.querySelector('header .aside-open');
let aside_close_btn = document.querySelector('header .navigation .nav-items .aside-close');
let aside = document.querySelector('header .navigation');

if(aside_open_btn){
    aside_open_btn.addEventListener('click',function(){
        aside.classList.add('show');
        menu_overly.classList.add('show');
        console.log(site_overly);
    });
}
if(aside_close_btn){
    aside_close_btn.addEventListener('click',function(){
        aside.classList.remove('show');
        menu_overly.classList.remove('show');
    });
}

let submenuslide = document.querySelectorAll("header .navigation .item .link .icon");
if(submenuslide){
    for (let i = 0; i < submenuslide.length; i++) {
        submenuslide[i].addEventListener("click", function(event) {
            event.preventDefault();
            this.closest('.link').classList.toggle("active");
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
if(menu_overly){
    menu_overly.addEventListener('click',function(){
        this.classList.remove("show");
        aside.classList.remove("show");
    });
}




// Our Project
let tabs = document.querySelectorAll('.project-tabs .tabs .tab');
let projects = document.querySelectorAll(`.projects .item`);

if(tabs){
    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        tab.addEventListener('click', function(e){
            document.querySelector('.project-tabs .tabs .tab.active').classList.remove("active");
            this.classList.add("active");
            let tab_name = this.getAttribute('data-name');
            
            
            projects.forEach(card => {
                if(card.dataset.name === e.target.dataset.filter || e.target.dataset.filter === "all") {
                    return card.classList.replace("hide", "show");
                }
                card.classList.add("hide");
            });
        });
    }
}


// View
let video_open_btn = document.querySelector('.about-us .content .video .icon');
let displayVideo = document.querySelector('.displayVideo');
let video_close_btn = document.querySelector('.displayVideo .close-btn');
if(video_open_btn){
    video_open_btn.addEventListener('click', () => {
        displayVideo.classList.add('show');
    })
}
if(video_close_btn){
    video_close_btn.addEventListener('click', () => {
        displayVideo.classList.remove('show');
    })
}



// Animation
let count_index = 0;
function calculateVisiblePixels(el) {
    var rect = el.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;

    var visiblePixels = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));

    return visiblePixels;
}

function handleScroll() {
    var sections = document.querySelectorAll('.animation');
    var counter = document.querySelector('.count-down .animate');

    sections.forEach(function(section) {
        var visiblePixels = calculateVisiblePixels(section);

        if (visiblePixels > 100) {
            section.classList.add('animate');
            if(section == counter && count_index == 0){
                numberCount();
            }
        }
    });
}

window.addEventListener('scroll', handleScroll);



function numberCount() {
    var count_item = document.querySelectorAll('.count-down .item .counter');
    let interval = 3000;
    count_item.forEach((countNum) => {
        let startValue = 0;
        let endValue = parseInt(countNum.getAttribute("data-val"));
        let duration = Math.floor(interval / endValue);
        let counter = setInterval(function () {
          startValue += 1;
          countNum.textContent = startValue;
          if (startValue == endValue) {
            clearInterval(counter);
          }
        }, duration);
    });
    count_index = 1;
}













