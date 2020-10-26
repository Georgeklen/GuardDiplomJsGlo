'use strict';

const windowScroll = () => {
    try {
        const totop = document.getElementById('totop'),
            clubs = document.querySelector('#clubs > .wrapper'),
            breadcrumbs = document.querySelector('.breadcrumbs');
        let topElem;    
            
        window.addEventListener('scroll', () => {
            if (clubs) {
                topElem = clubs.getBoundingClientRect().top;
            }
            if (breadcrumbs) {
                topElem = breadcrumbs.getBoundingClientRect().top;
            }
            if (topElem <= 100) {
                totop.style.display = 'block';
            } else {
                totop.style.display = 'none';
            }
        });

    } catch (error) {
        console.warn('windowScroll.js', error);
    }
};

export default windowScroll;