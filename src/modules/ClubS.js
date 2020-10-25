const buttonsEventListeners = () => {
    const clubUl = document.getElementById('clubs-list'),
        body = document.querySelector('body'),
        openPopUp = document.querySelector('.open-popup'),
        freeVisitForm = document.getElementById('free_visit_form'),
        popup = document.querySelectorAll('.popup'),
        gift = document.getElementById('gift'),
        callbackForm = document.getElementById('callback_form'),
        fixedBtn = document.querySelector('.fixed-gift');
        
        
// делегирование чере тело
    body.addEventListener('click', event => {
        const target = event.target;
        const p = target.closest('#choose_club');
        const callbackPopup = target.closest('.callback-btn-popup');
        // выбор клуба giftBtn
        if (target.contains(p)) {
            if (clubUl.style.display === 'none' || clubUl.style.display === '') {
                clubUl.style.display = 'block';
            } else {
                clubUl.style.display = 'none';
            }
        } else {
            clubUl.style.display = 'none';
        }
        // по клику записаться
        if (target.contains(openPopUp)) {
            freeVisitForm.style.display = 'block';
        }
        // скидка на 30% 
        if (fixedBtn) {
            const test = fixedBtn.querySelector('img');
            if (target.contains(test)) {
                fixedBtn.style.display = 'none';
                gift.style.display = 'block';
            }

        }
        // clubs
        if (target.contains(callbackPopup)) {
            callbackForm.style.display = 'block';
        }

       
      

    });


    popup.forEach(item => {
        item.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('close_icon') || target.classList.contains('close-btn')) {
                item.style.display = 'none';
            } else {
                target = target.closest('.form-content');
                if (!target) {
                    item.style.display = 'none';
                }
            }
        });
    });
};

export default buttonsEventListeners;