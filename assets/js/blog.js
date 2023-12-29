const blogWrap = document.querySelector(".blog-wrap");
if(blogWrap){

    const blogs = document.querySelector(".blogs");
    const firstCardWidth = blogs.querySelector(".item").offsetWidth;
    const arrowBtns = blogWrap.querySelectorAll(".arrow .icon");
    const blogsChildrens = [...blogs.children];
    
    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
    
    // Get the number of items that can fit in the blogs at once
    let itemPerView = Math.round(blogs.offsetWidth / firstCardWidth);
    
    // Insert copies of the last few items to beginning of blogs for infinite scrolling
    blogsChildrens.slice(-itemPerView).reverse().forEach(item => {
        blogs.insertAdjacentHTML("afterbegin", item.outerHTML);
    });
    
    // Insert copies of the first few items to end of blogs for infinite scrolling
    blogsChildrens.slice(0, itemPerView).forEach(item => {
        blogs.insertAdjacentHTML("beforeend", item.outerHTML);
    });
    
    // Scroll the blogs at appropriate postition to hide first few duplicate items on Firefox
    blogs.classList.add("no-transition");
    blogs.scrollLeft = blogs.offsetWidth;
    blogs.classList.remove("no-transition");
    
    // Add event listeners for the arrow buttons to scroll the blogs left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            blogs.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });
    
    const dragStart = (e) => {
        isDragging = true;
        blogs.classList.add("dragging");
        // Records the initial cursor and scroll position of the blogs
        startX = e.pageX;
        startScrollLeft = blogs.scrollLeft;
    }
    
    const dragging = (e) => {
        if(!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the blogs based on the cursor movement
        blogs.scrollLeft = startScrollLeft - (e.pageX - startX);
    }
    
    const dragStop = () => {
        isDragging = false;
        blogs.classList.remove("dragging");
    }
    
    const infiniteScroll = () => {
        // If the blogs is at the beginning, scroll to the end
        if(blogs.scrollLeft === 0) {
            blogs.classList.add("no-transition");
            blogs.scrollLeft = blogs.scrollWidth - (2 * blogs.offsetWidth);
            blogs.classList.remove("no-transition");
        }
        // If the blogs is at the end, scroll to the beginning
        else if(Math.ceil(blogs.scrollLeft) === blogs.scrollWidth - blogs.offsetWidth) {
            blogs.classList.add("no-transition");
            blogs.scrollLeft = blogs.offsetWidth;
            blogs.classList.remove("no-transition");
        }
    
        // Clear existing timeout & start autoplay if mouse is not hovering over blogs
        clearTimeout(timeoutId);
        if(!blogWrap.matches(":hover")) autoPlay();
    }
    
    const autoPlay = () => {
        if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the blogs after every 2500 ms
        timeoutId = setTimeout(() => blogs.scrollLeft += firstCardWidth, 2500);
    }
    autoPlay();
    
    blogs.addEventListener("mousedown", dragStart);
    blogs.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    blogs.addEventListener("scroll", infiniteScroll);
    blogWrap.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    blogWrap.addEventListener("mouseleave", autoPlay);
}