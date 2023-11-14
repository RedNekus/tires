const getHeight = () => {
    const body = document.body;
    const html = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
}

document.addEventListener('DOMContentLoaded',  () => {
    if(document.documentElement.clientWidth < 992) {
        const top = document.getElementById("ToTop");
        const bottom = document.getElementById("OnBottom");
        const h = getHeight();

        if (window.scrollY>=250) {
            top.classList.add('active');
        }
        if (window.scrollY<=h-999) {
            bottom.classList.add('active');
        }

        window.addEventListener('scroll', () => {
            console.log(`${window.scrollY}: ${h}`);
            if (window.scrollY <=250) {
                top.classList.remove('active');
            } else {
                top.classList.add('active');
            }
            if (window.scrollY>=h-999) {
                bottom.classList.remove('active');
            } else {
                bottom.classList.add('active');
            }
        });

        top.addEventListener('click', () => {
            window.scrollTo(0, 0);
        });
        bottom.addEventListener('click', () => {
            window.scrollTo(0, h);
        })
    }
});