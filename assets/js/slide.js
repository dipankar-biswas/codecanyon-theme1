const slideWrap = document.querySelector(".slide-wrap");
if(slideWrap){
    const slides = document.querySelector(".slides");
    const firstSlideWidth = slides.querySelector(".slide").offsetWidth;
    const arrowBtns = document.querySelectorAll(".slide-wrap .arrow .icon");
    const slidesChildren = [...slides.children];
    
    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
    
    // Get the number of slide that can fit in the slides at once
    let slidePerView = Math.round(slides.offsetWidth / firstSlideWidth);
    
    // Insert copies of the last few slide to beginning of slides for infinite scrolling
    slidesChildren.slice(-slidePerView).reverse().forEach(slide => {
        slides.insertAdjacentHTML("afterbegin", slide.outerHTML);
    });
    
    // Insert copies of the first few slide to end of slides for infinite scrolling
    slidesChildren.slice(0, slidePerView).forEach(slide => {
        slides.insertAdjacentHTML("beforeend", slide.outerHTML);
    });
    
    // Scroll the slides at appropriate postition to hide first few duplicate slide on Firefox
    slides.classList.add("no-transition");
    slides.scrollLeft = slides.offsetWidth;
    slides.classList.remove("no-transition");
    
    // Add event listeners for the arrow buttons to scroll the slides left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            slides.scrollLeft += btn.id == "left" ? -firstSlideWidth : firstSlideWidth;
        });
    });
    
    const dragStart = (e) => {
        isDragging = true;
        slides.classList.add("dragging");
        // Records the initial cursor and scroll position of the slides
        startX = e.pageX;
        startScrollLeft = slides.scrollLeft;
    }
    
    const dragging = (e) => {
        if(!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the slides based on the cursor movement
        slides.scrollLeft = startScrollLeft - (e.pageX - startX);
    }
    
    const dragStop = () => {
        isDragging = false;
        slides.classList.remove("dragging");
    }
    
    const infiniteScroll = () => {
        // If the slides is at the beginning, scroll to the end
        if(slides.scrollLeft === 0) {
            slides.classList.add("no-transition");
            slides.scrollLeft = slides.scrollWidth - (2 * slides.offsetWidth);
            slides.classList.remove("no-transition");
        }
        // If the slides is at the end, scroll to the beginning
        else if(Math.ceil(slides.scrollLeft) === slides.scrollWidth - slides.offsetWidth) {
            slides.classList.add("no-transition");
            slides.scrollLeft = slides.offsetWidth;
            slides.classList.remove("no-transition");
        }
    
        // Clear existing timeout & start autoplay if mouse is not hovering over slides
        clearTimeout(timeoutId);
        if(!slideWrap.matches(":hover")) autoPlay();
    }
    
    const autoPlay = () => {
        if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the slides after every 2500 ms
        timeoutId = setTimeout(() => slides.scrollLeft += firstSlideWidth, 4000);
    }
    autoPlay();
    
    slides.addEventListener("mousedown", dragStart);
    slides.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    slides.addEventListener("scroll", infiniteScroll);
    slideWrap.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    slideWrap.addEventListener("mouseleave", autoPlay);
}