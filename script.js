const textAreaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');


const inputHandler = () => {
    // maximum number of characters
    const maxChars = 150;

    // calculate number of characters left
    const noCharsTyped = textAreaEl.value.length;
    counterEl.textContent = 150 - noCharsTyped
};

textAreaEl.addEventListener('input', inputHandler);