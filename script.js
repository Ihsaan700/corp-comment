// -- GLOBAL --
const textAreaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.submit-btn');
const feedbackListEl = document.querySelector('.feedbacks');


// -- COUNTER COMPONENT -- //
const inputHandler = () => {
    // calculate number of characters left
    const noCharsTyped = textAreaEl.value.length;
    counterEl.textContent = 150 - noCharsTyped;
};

textAreaEl.addEventListener('input', inputHandler);


// -- FORM COMPONENT -- //
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

        // stop this function execution
        return;
    }

    // extract information from text
    const hashtag = text.split(' ').find(word => word.includes(('#')));
    const company = hashtag.substring(1);
    const badgeLetter = hashtag.substring(0, 1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;

    // HTML for new feedback item
    const feedbackItem = `
        <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${company}</p>
                <p class="feedback__text">${text}</p>
            </div>
            <p class="feedback__date">${daysAgo === 0 ? 'NEW' : `${daysAgo}d`}</p>
        </li>
    `;

    // insert new feedback item
    feedbackListEl.insertAdjacentHTML('afterbegin', feedbackItem);

    // clear textarea
    textAreaEl.value = '';

    // blur submit button
    formEl.blur()

    // reset character counter
    counterEl.textContent = '150';
};

formEl.addEventListener('click', submitHandler);
