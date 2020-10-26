const sendForm = () => {
  const errorMessage = 'ошибка',
      loadMessage = 'идет отправка...',
      successMessage = 'Ваша заявка отправлена.         Мы свяжемся с вами в ближайшее время',
      patternPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  
  document.querySelectorAll('form').forEach((item) => {
      for (let elem of item.elements) {
          elem.required = '';
          elem.addEventListener('input', () => {
              if (elem.name === 'name' && elem.placeholder !== 'Промокод') {
                  elem.value = elem.value.replace(/[^а-яё\s]/ig, '');
              } else if (elem.name === 'name' && elem.placeholder === 'Промокод') {
                  elem.value = elem.value.replace(/[^а-яё\s\d]/ig, '');
              } 
              else if (elem.name === 'phone') {
                  elem.value = elem.value.replace(/[^\+\-\(\)\s\d]/ig, '');
             }
          });  
      } 
  });
console.log('asd')
  const classRemove = (elem) => {
      elem.classList.remove('error');
  };

  const classAdd = (elem) => {
      elem.classList.add('error');
  };
  
  const valid = (event) => {
      for (let elem of event.target.elements) {
          if (elem.name === 'phone' && !patternPhone.test(elem.value)) {
              elem.placeholder = '+7 (XXX) XXX-XX-XX';
              elem.style.color = 'red';
              classAdd(elem);
              return false;   
          } else if (elem.name === 'phone' || patternPhone.test(elem.value)) {
              classRemove(elem);
              return true;
          } else if (elem.name === 'name' && elem.placeholder !== 'Промокод' && elem.value.trim() === '') {
              classAdd(elem);
              return false;
          } else if (elem.name === 'name' && elem.placeholder !== 'Промокод' && elem.value.trim() !== '') {
              classRemove(elem);
          } 
      }
  };

  const applyStyle = () => {
      const style = document.createElement('style');
      document.head.appendChild(style);
      style.textContent = `
          body input.error ,
          #card_order input.error,
          footer #callback_footer_form-phone.error,
          #banner-form input.error,
          .popup .form-content input[type='tel'].error,
          .popup .form-content input[type='text'].error{
              border: 2px solid red;
          }
      `;
  };
  applyStyle(); 
  
  
  const confirmError = (target) => {
      if (!target.querySelector('.confirm-error')) {
          const personalData = target.querySelector('.personal-data'),
              chooseClub = target.querySelector('.choose-club');
          let confirmDiv = document.createElement('div');

          confirmDiv.classList.add('confirm-error');
          confirmDiv.style.cssText = `font-size: 12px; color: red; padding-top: 10px;;`;

          if (personalData) {
              confirmDiv.textContent = 'Необходимо подтвердить ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ!';
              personalData.insertAdjacentElement('afterend', confirmDiv);
          } else if (chooseClub) {
              confirmDiv.textContent = 'Выберите клуб из предложенных!';
              chooseClub.appendChild(confirmDiv);
          }

      } 
  };

  const confirmSuccess = (target) => {
      if(target.querySelector('.confirm-error')) {
          target.querySelector('.confirm-error').remove();
      }
  };

  const radioChecked = (footerForm) => {
      for (var i=0; i<footerForm.length; i++){
          if (footerForm[i].checked) return true;
      }
      return false; 
  };


  const formaStyle = (forma) => {
      forma.style.cssText = `
      font-size: 20px;
      color: #fff; 
      text-transform: uppercase;
          `;
  };
    
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem; color: #fff';

  const sendingForm = () => {
      document.querySelectorAll('form').forEach((forma) => {
          forma.addEventListener('submit', (event) => {
              let target = event.target;
              const checkboxElem = target.querySelector('input[type="checkbox"]'),
                  thanksModalWindow = document.querySelector('#thanks'),
                  thanksFormContent = thanksModalWindow.querySelector('.form-content'),
                  footerForm = document.querySelector('#footer_form'),
                  htmlId = document.querySelector('html').id,
                  priceTotal = document.querySelector('#price-total'),
                  cardOrder = document.querySelector('#card_order');
              
              event.preventDefault();
              const formData = new FormData(forma);
              let body = {},
                  i = 0;
      
                
              if (event.target === footerForm) {
                  if (!radioChecked(footerForm)) {
                      confirmError(footerForm);
                      return;
                  } else {
                      confirmSuccess(footerForm);
                  }
              }    

              if (!valid(event)) {
                  return;
              }  
                  
              formData.forEach((val, key) => {
                  if (key !==  'form_name') {
                      if (key === 'name') {
                          if (val) {
                              body[key + i] = val;
                              i++;
                          }
                      } else {
                          body[key] = val;
                      }
                  } 
              });

              if (checkboxElem && checkboxElem.checked === true) {
                  body[checkboxElem.type] = checkboxElem.value;
                  statusMessage.textContent = loadMessage;
              } else if (checkboxElem && !checkboxElem.checked){
                  confirmError(target);
                  return;
              }
              
              if (htmlId && forma === cardOrder && forma !== footerForm) {
                  body['club-name'] = htmlId;
              }
//free-visit-form
              confirmSuccess(target);
              forma.appendChild(statusMessage);

              postData(body)
                  .then ((response) => {
                      if (response.status !== 200) {
                          throw new Error('status network not 200');
                      }
                      
                      if (forma.id === 'form2' || forma.id === 'form1') {
                          forma.innerHTML = `<h4>Записаться на визит</h4>
                                              <p>${successMessage}</p>`;
                          formaStyle(forma);                                     
                      } else {
                          thanksModalWindow.style.display = 'block';
                      
                          [...forma.elements].forEach((item) => {
                              
                              if (item.name === 'name' || item.name === 'phone') {
                                  item.value = '';
                              } else if (item.type === 'checkbox') {
                                  item.checked = false;
                              } else if (item) {
                                  item.checked = false;
                                  if (item.getAttribute('checked') !== null) {
                                      item.checked = true; 
                                  }
                              }  
                          });
                          if (priceTotal) {
                              priceTotal.textContent ='1999';
                          }
                      }

                      statusMessage.textContent = '';
                  })
                  .catch((error) => {
                      if (forma.id === 'form2' || forma.id === 'form1') {
                          forma.innerHTML = `<h4>Записаться на визит</h4>
                                              <p>${errorMessage}</p>
                                              <p>Отправка не вышла!</p>`;
                          formaStyle(forma);                                      
                      } else {
                          thanksModalWindow.style.display = 'block';
                          
                          thanksFormContent.innerHTML = `<h4>Ошибка</h4>
                                                      <p>Отправка не вышла!</p>`;
                          thanksFormContent.style.cssText = ` 
                          display: block;`;                            
                      }
                      statusMessage.textContent = '';
                  }); 
          });
      });
      
  };
  sendingForm();

  const postData = (body) => {
      return fetch('./server.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
      });
  };

 

}   

             
    
export default sendForm;








    



