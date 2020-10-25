const sliderGalery = () => {
    const gallery = document.getElementById('gallery'),
        slides = gallery.querySelectorAll('.slide'),
        sliderDotsBlock = gallery.querySelector('.slider-dots');

    const ul = document.createElement('ul');
    let newLi,
        newBtn,
        interval,
        currentSlide = 0;
    sliderDotsBlock.appendChild(ul);

//clubs"
    for (let i = 0; i < slides.length; i++) {
        newLi = document.createElement('li');
        newLi.classList.add('li');
        newBtn = document.createElement('button');
        newBtn.classList.add('portfolio-btn');
        newLi.appendChild(newBtn);
        ul.appendChild(newLi);
    }
    const li =  document.querySelectorAll('.li');
    const btn = document.querySelectorAll('.portfolio-btn');
    li[0].classList.add('slick-active');

    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };


    const autoPlaySlide = () => {

        prevSlide(li, currentSlide, 'slick-active');
        prevSlide(slides, currentSlide, 'slide-active');
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        nextSlide(li, currentSlide, 'slick-active');
        nextSlide(slides, currentSlide, 'slide-active');
    };

    const startSlide = (time = 2000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    gallery.addEventListener('click', event => {
        event.preventDefault();

        const target = event.target;
        if (!target.matches('.portfolio-btn, #arrow-right-gallery, #arrow-left-gallery')) {
            return;
        }
        
        prevSlide(li, currentSlide, 'slick-active');
        prevSlide(slides, currentSlide, 'slide-active');

        if (target.matches('#arrow-right-gallery')) {
            currentSlide++;
        } else if (target.matches('#arrow-left-gallery')) {
            currentSlide--;
        } else if (target.matches('.portfolio-btn')) {
            btn.forEach((elem, index) => {
                if (elem === target) {
                    currentSlide = index;
                }
            });
        }
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        nextSlide(li, currentSlide, 'slick-active');
        nextSlide(slides, currentSlide, 'slide-active');
    });

    gallery.addEventListener('mouseover', event => {
        if (event.target.matches('.portfolio-btn') ||
        event.target.matches('#arrow-left-gallery') ||
        event.target.matches('#arrow-right-gallery')) {
            stopSlide();
        }
    });

    gallery.addEventListener('mouseout', event => {
        if (event.target.matches('.portfolio-btn') ||
        event.target.matches('#arrow-left-gallery') ||
        event.target.matches('#arrow-right-gallery')) {
            startSlide();
        }
    });

    startSlide(2000);
};
export default sliderGalery;