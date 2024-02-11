const prevBtn = document.querySelector(".navigation-buttons__previous");
const nextBtn = document.querySelector(".navigation-buttons__next");
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slider__slide");
const popupOverlay = document.querySelector(".popup__overlay");
const popupSlide = document.querySelector(".popup__content");
const popupCloseBtn = document.querySelector(".popup__close-btn");

let sliderIndex = 0;

prevBtn.addEventListener("click", () => {
    if (sliderIndex > 0) {
        sliderIndex--;
        updateSlidePosition();
    } else {
        sliderIndex = 4;
        updateSlidePosition();
    }
});

nextBtn.addEventListener("click", () => {
    if (sliderIndex < 4) {
        sliderIndex++;
        updateSlidePosition();
    } else {
        sliderIndex = 0;
        updateSlidePosition();
    }
});

function updateSlidePosition() {
    slider.style.transform = `translateX(-${sliderIndex * 25}%)`;
}

let popupSlideIndex = 0;

slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
        openPopup(index);
    });
});

function openPopup(index) {
    popupOverlay.style.display = "block";
    popupSlideIndex = index;
    updatePopupSlide();
    createPaginator(slides);
}

popupCloseBtn.addEventListener("click", closePopup);

function closePopup() {
    popupOverlay.style.display = "none";
    popupSlide.innerHTML = "";
}

function createPaginator(slides) {
    const paginator = document.querySelector(".popup__paginator");
    paginator.innerHTML = "";

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");

        if (i === popupSlideIndex) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
            popupSlideIndex = i;
            updatePopupSlide();
            updatePaginator();
        });
        
        paginator.appendChild(dot);
    }
}

function updatePopupSlide() {
    popupSlide.innerHTML = "";
    const inner = document.createElement("iframe");
    inner.src =
        "https://player.vimeo.com/video/824804225?h=5764ab8c22&autoplay=0&title=0&byline=0&portrait=0&badge=0";
    inner.frameBorder = "0";
    inner.allow = "fullscreen; picture-in-picture";
    popupSlide.appendChild(inner);
}

function updatePaginator() {
    const dots = document.querySelectorAll(".dot");

    dots.forEach((dot, index) => {
        if (index === popupSlideIndex) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}
