
let headerScroll = require('./headerScroll')('body__container', 'header_scroll', 'header', 'active');
let menu = require('./menu');
menu('menu');
menu('menuScroll');

let modal = require('./modal')();
let anchor = require('./anchor');
anchor('body__container', 'licenses', 'menuScroll');
anchor('body__container', 'licenses', 'menu');

let phoneMask = require('./phone_mask')();
let ajax = require('./ajax')();
let form = require('./form')(ajax, 'form');
let interactive = require('./interactive')();
let formInteractive = require('./form')(ajax, 'formInteractive');

let bodyContainer = document.getElementsByClassName('body__container')[0];
let headerScrollWidth = document.getElementById('header_scroll');

let widthScrollMenu = () => {
    if (bodyContainer.offsetWidth > 960) {
        let scrollWidth = bodyContainer.offsetWidth - bodyContainer.clientWidth;
        headerScrollWidth.style.width = 'calc(100% - ' + scrollWidth + 'px)';
    } else {
        headerScrollWidth.style.width = '';
    }
};

widthScrollMenu();

window.onresize = function(event) {
    widthScrollMenu();
};
