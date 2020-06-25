
module.exports = () => {
    let objQuestion = [];
    let prev = ['one'];

    let JSinteractive = document.getElementById('JSinteractive');
    let blockTitle = JSinteractive.querySelector('.JSinteractive__title');

    function hasClass( target, className ) {
        return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
    }

    let isCurrentState = () => {
        let current = JSinteractive.querySelector('.JSinteractive__current');

        if (!hasClass(current, 'JSinteractive__sendForm')) {
            let JSsteps = current.querySelector('.JSinteractive__step');
            let JSstepsAttr = JSON.parse(JSsteps.getAttribute('data-step'));

            if (!objQuestion[JSstepsAttr.step - 1]) {
                JSsteps.setAttribute("disabled", "disabled");
            } else {
                JSsteps.removeAttribute("disabled");
            }

            blockTitle.style.display = 'block';
        } else {
            blockTitle.style.display = 'none';
        }
    };

    let interactiveEvent = (event) => {
        let question = JSON.parse(event.target.getAttribute('data-question'));
        let button = JSON.parse(event.target.getAttribute('data-step'));

        if (question) {
            if (question.type === 'radio') {
                objQuestion[question.order] = question;
                window.interactive = objQuestion;
                isCurrentState();
            } else {
                let checked = [];
                let list = JSinteractive.querySelectorAll('.JSinteractive__current .JSinteractive__list input[type="checkbox"]');

                list.forEach(function(item, i) {
                    if (item.checked) {
                        checked[i] = item.value;
                    }
                });

                if (checked.length) {
                    question.value = checked;
                    objQuestion[question.order] = question;
                    window.interactive = objQuestion;
                    isCurrentState();
                }
            }
        } else if (button) {
            let thisBlock = JSinteractive.querySelector('.JSinteractive__current');
            let nextBlock;
            if (button.type === 'next') {
                let target;

                if (button.stateType === "radio") {
                    target = objQuestion[button.step - 1].target;
                } else {
                    target = button.target;
                }

                nextBlock = JSinteractive.querySelector('.JSinteractive__' + target);
                prev[button.step - 1] = button.state;
            } else {
                nextBlock = JSinteractive.querySelector('.JSinteractive__' + prev[button.step] + '.JSinteractive__' + button.step);
                prev.slice(0, -1);
            }
            thisBlock.style.display = 'none';
            nextBlock.style.display = 'flex';
            thisBlock.classList.remove('JSinteractive__current');
            nextBlock.classList.add('JSinteractive__current');
            isCurrentState();
        }
    };

    isCurrentState();
    JSinteractive.addEventListener("click", interactiveEvent, false);
};
