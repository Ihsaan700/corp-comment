// -- GLOBAL --
const MAX_CHARS = 150

const textAreaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const formSubmitEl = document.querySelector('.submit-btn');
const feedbackListEl = document.querySelector('.feedbacks');
const spinnerEl = document.querySelector('.spinner')

const renderFeedbackItem = (feedbackItem) => {
    // HTML for new feedback item
    const feedbackItemHTML = `
        <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${feedbackItem.upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${feedbackItem.company}</p>
                <p class="feedback__text">${feedbackItem.text}</p>
            </div>
            <p class="feedback__date">${feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
        </li>
    `;

    // insert new feedback item
    feedbackListEl.insertAdjacentHTML('afterbegin', feedbackItemHTML);
};

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
    const badgeLetter = hashtag.substring(1, 2).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;

    // feedback item object
    const feedbackItem = {
        upvoteCount,
        company,
        badgeLetter,
        daysAgo,
        text,
    }

    // render feedback item
    renderFeedbackItem(feedbackItem)

    // send feedback item to server
    fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks', {
        method: 'POST',
        body: JSON.stringify(feedbackItem),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',

        }
    }).then(res => {
        if (!res.ok) {
            console.log('something went wrong');
            return;
        }

        console.log('successfully submitted');
    }).catch(error => {
        console.log(error);
    });

    // clear textarea
    textAreaEl.value = '';

    // blur submit button
    formSubmitEl.blur()

    // reset character counter
    counterEl.textContent = MAX_CHARS;
};

formSubmitEl.addEventListener('click', submitHandler);


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
            renderFeedbackItem(feedback)
        });

    })
    .catch(error => {
        feedbackListEl.textContent = `Failed to fetch feedback items. Error message: ${error.message}`;
    });