// -- GLOBAL --
const MAX_CHARS = 150

const textAreaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const formSubmitEl = document.querySelector('.submit-btn');
const feedbackListEl = document.querySelector('.feedbacks');
const spinnerEl = document.querySelector('.spinner')


// -- COUNTER COMPONENT -- //
const inputHandler = () => {
    // calculate number of characters left
    const noCharsTyped = textAreaEl.value.length;
    counterEl.textContent = MAX_CHARS - noCharsTyped;
};

textAreaEl.addEventListener('input', inputHandler);


// -- FORM COMPONENT -- //
const showVisualIndicator = (textCheck) => {
    const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid'

    //show valid indicator
    formEl.classList.add(className);

    // remove visual indicator
    setTimeout( () => {
        formEl.classList.remove(className);
    }, 2000)
};

const submitHandler = (event) => {
    event.preventDefault();

    // get text from input
    const text = textAreaEl.value;

    // validate text for hashtag and text length
    if (text.includes('#') && text.length >= 5) {
        showVisualIndicator('valid')

    } else {
        showVisualIndicator('invalid')
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
    formSubmitEl.blur()

    // reset character counter
    counterEl.textContent = MAX_CHARS;
};

formEl.addEventListener('click', submitHandler);


// -- FEEDBACK LIST COMPONENT -- //
fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
    .then(res => {
        return res.json();
    })
    .then(data => {
        // remove spinner
        spinnerEl.remove();


        // iterate over data
        data.feedbacks.forEach(feedback => {
        // HTML for new feedback item
        const feedbackItemHTML = `
        <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${feedback.upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${feedback.badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${feedback.company}</p>
                <p class="feedback__text">${feedback.text}</p>
            </div>
            <p class="feedback__date">${feedback.daysAgo === 0 ? 'NEW' : `${feedback.daysAgo}d`}</p>
        </li>
        `;

        // insert new feedback item
        feedbackListEl.insertAdjacentHTML('afterbegin', feedbackItemHTML);
        });

    })
    .catch(error => {
        feedbackListEl.textContent = `Failed to fetch feedback items. Error message: ${error.message}`;
    });