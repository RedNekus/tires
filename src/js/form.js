import validate from '../../node_modules/validate.js/validate.min.js';
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
document.addEventListener('DOMContentLoaded',  () => {
    console.log('DOMContentLoaded');
    const form = document.querySelector('.js-form');
    const phoneEl = document.getElementById('phone');
    form.addEventListener('submit', async(e) => {
        console.log('Submit');
        e.preventDefault();

        const data = new FormData(e.target);
        let test = validate({phone: data.get('phone')}, constraints);

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
                e.target.reset();
            }
        }
    })
})
