const popup = () => {
  // получаю элменты
  const popupLink = document.querySelector('.open-popup'),
    btnPopupCallBack = document.querySelectorAll('.head-main .callback-btn'),
    gift = document.querySelector('.fixed-gift'),
    popup = document.querySelectorAll('.popup');

  const popupOpen = (e) => {
    e.preventDefault();
    let target = e.target;
    let href = target.dataset.popup,
      popupNow = document.querySelector(href), popupForm = popupNow.querySelector('form'), status = popupNow.querySelector('.status');
    popupNow.style.display = 'block';
    popupForm.style.display = 'block';
    if (status) {
      status.remove();
    }
  };

  const popupClose = (e) => {
    let target = e.target;
    if (target.matches('.overlay') || target.matches('.close_icon') || target.matches('.close-btn')) {
      target.closest('.popup').style.display = 'none';
    }
  };

  popupLink.addEventListener('click', popupOpen);
  // позвонить мне
  btnPopupCallBack.forEach((item) => {
    item.addEventListener('click', popupOpen);
  });

  popup.forEach((item) => {
    item.addEventListener('click', popupClose);
  });
// подарок на скидку
  if (gift) {
    gift.addEventListener('click', () => {
      let href = '#gift',
        popupNow = document.querySelector(href);
      popupNow.style.display = 'block';
      gift.remove();
    });
  }
  const headMenu = () => {
    // выбери клуб
    const headMain = document.querySelector('.head-main'),
        clubsList = document.querySelector('.clubs-list'),
        clubsListUl = clubsList.querySelector('ul');
      
    const handlerMenu = () => { 
        if (clubsListUl.style.display !== 'block') {
            clubsListUl.style.display = 'block';
        } else {
            clubsListUl.style.display = 'none';
        }  
    };
  
    headMain.addEventListener('click', (event) => {
        let target = event.target;
        if (target.parentNode === clubsList) {
            handlerMenu();
        }
    });
  
  };
  
  headMenu();
};

export default popup;