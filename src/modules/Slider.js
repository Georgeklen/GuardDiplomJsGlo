const mainSlider = () => {
    const sliderBlock = document.querySelector('.main-slider'),
        slides = sliderBlock.querySelectorAll('.slide');


    let currentSlide = 0;

    const prevSlide = (elem, index) => {
        elem[index].style.display = 'none';
    };
    const nextSlide = (elem, index) => {
        elem[index].style.display = 'block';
        elem[index].style.display = '-webkit-box';
    };


    const autoPlaySlide = () => {
        prevSlide(slides, currentSlide);
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        nextSlide(slides, currentSlide);
    };

    setInterval(autoPlaySlide, 2000);
};

export default mainSlider;