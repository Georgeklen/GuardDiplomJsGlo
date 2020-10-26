import buttonsEventListeners from './modules/ClubS';
import mainSlider from './modules/Slider'
import windowScroll from './modules/btnUp';
import sliderGalery from './modules/PhotoGalery';
import SliderCarl from './modules/SliderService'
import burgerMenuShow from './modules/stickingMenu'
import calc from './modules/calc'
import sendForm from './modules/sendData'



sendForm()
windowScroll()
burgerMenuShow()
calc()
buttonsEventListeners()
const newOne = new SliderCarl({
    prev: '#arrow-left',
    next: '#arrow-right',
    responsive: [ {
        breakpoint: 1024,
        slideToShow: 3
    },
    {
        breakpoint: 576,
        slideToShow: 1
    }]
});
newOne.init();
sliderGalery()
mainSlider()
