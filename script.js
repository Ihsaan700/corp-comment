// -- GLOBAL --
const textAreaEl = document.querySelector('.form__textarea');


// -- COUNTER COMPONENT -- //
const counterEl = document.querySelector('.counter');


const inputHandler = () => {
    // calculate number of characters left
    const noCharsTyped = textAreaEl.value.length;
    counterEl.textContent = 150 - noCharsTyped;
};

textAreaEl.addEventListener('input', inputHandler);


// -- SUBMIT COMPONENT -- //
const formEl = document.querySelector('.form');

const submitHandler = (event) => {
    event.preventDefault();

    // get text from input
    const text = textAreaEl.value;

    // validate text for hashtag and text length
    if (text.includes('#') && text.length >= 5) {
        //show valid indicator
        formEl.classList.add('form--valid');

        // remove visual indicator
        setTimeout(() => {
            formEl.classList.remove('form--valid');
        }, 2000);
    } else {
        //show invalid indicator
        formEl.classList.add('form--invalid');

        // remove visual indicator
        setTimeout(() => {
            formEl.classList.remove('form--invalid')
        }, 2000);

        // maintain focus on textarea
        textAreaEl.focus();
    }

};

formEl.addEventListener('click', submitHandler);
