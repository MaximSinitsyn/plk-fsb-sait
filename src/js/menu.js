
module.exports = (el) => {
    let elem = document.getElementById(el);
    let body = elem.getElementsByClassName('menu__body')[0];
    let btnWrap = elem.getElementsByClassName('menu__button-wrapper')[0];
    let btn = elem.getElementsByClassName('menu__button')[0];
    let h = elem.offsetHeight;

    let getHeight = () => {
        if (body.offsetHeight > h) {
            btnWrap.classList.add('menu__button-wrapper_visible');
            body.classList.add('menu__body_left');
        } else {
            btnWrap.classList.remove('menu__button-wrapper_visible');
            body.classList.remove('menu__body_left');
        }
    };

    window.addEventListener('resize', function(event) {
        getHeight();

        if(btn.classList.contains('menu__button_active')) {
            elem.style.height = body.offsetHeight + 'px';
        }
    });

    getHeight();

    btnWrap.onclick = () => {
        if(btn.classList.contains('menu__button_active')) {
            btn.classList.remove('menu__button_active');
            elem.style.height = h + 'px';
        } else {
            btn.classList.add('menu__button_active');
            elem.style.height = body.offsetHeight + 'px';
        }
    };
};
