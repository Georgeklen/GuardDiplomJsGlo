const mainSlider = () => {
    // создание переменных 
    const   slide = document.querySelectorAll('.main-slider .slide');
    let interval,timeOutFirst,timeOutSecond,
        currentSlide = 0; 
        //opacity clubs"
    slide.forEach((el, index) => {
        el.style.transition = `opacity .3s`;
        if(index === 0)
            el.style.opacity = `1`;
        else
            el.style.opacity = `0`;
    });

    const prevSlide = (elem, index) => {
        elem[index].style.opacity = `0`;
        timeOutFirst = setTimeout(() => {
            clearTimeout(timeOutFirst);
            elem[index].style.display = `none`;
        }, 300);

    };
// prok..
    const nextSlide = (elem, index, strClass) => {
        elem[index].style.display = `flex`;
        timeOutSecond = setTimeout(() => {
            clearTimeout(timeOutSecond);
            elem[index].style.opacity = `1`;
        }, 300);
    };
// auto
    const autoPlaySlide = () => {
        prevSlide(slide, currentSlide);
        currentSlide++;
        if(currentSlide >= slide.length){
            currentSlide = 0;
        }
        nextSlide(slide, currentSlide);
    };
// period
    const startSlide = ( time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    startSlide();
};
export default mainSlider; 