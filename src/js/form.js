'use strict';
const sendData = async (data, uri) => {
    return await fetch(uri, {
        method: 'POST',
        body: data,
    })
        .then((response) => response.json())
}

const constraints = {
    phone: {
        presence: true,
        length: {
            minimum: 6,
            message: "^Не введен номер телефона."
        },
        format: {
            pattern: /^\+375\s?\(\d{2}\)\s?\d{3}(-?\d{2}){2}$/,
            message: "^'%{value}' Недопустимый формат номера."
        }
    }
};

const maskOptions = {
    mask: '+{375} (00) 000-00-00'
};

document.addEventListener('DOMContentLoaded',  () => {
    const form = document.querySelector('.js-form');
    const phoneEl = document.getElementById('phone');
    const popupBg = document.querySelector('.popup__bg');
    const popup = document.querySelector('.popup');
    const closeElem = document.querySelector('.close-popup');

    IMask(phoneEl, maskOptions);

    phoneEl.addEventListener('input', (e) => {
        let err = phoneEl.parentElement.querySelector('p.error');
        if(err) {
            err.remove();
            phoneEl.classList.remove('error');
        }
    });

    closeElem.addEventListener('click', () => {
        popupBg.classList.remove('active');
        popup.classList.remove('active');
    });

    form.addEventListener('submit', async(e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        let test = null;
        if( null !== validate) {
            test = validate({phone: data.get('phone')}, constraints);
        }
        if(test) {
            let err = document.createElement("p");
            err.classList.add('error');
            phoneEl.classList.add('error');
            let msg = '';
            test.phone.forEach((e) => msg += `${e}<br>`)
            err.innerHTML = msg;
            phoneEl.parentElement.append(err);
        } else {
            const uri = e.target.getAttribute('action');
            const response = await sendData(data, uri);

            if(response.ok) {
                popupBg.classList.add('active');
                popup.classList.add('active');
                form.reset();
            }
        }
    })
})