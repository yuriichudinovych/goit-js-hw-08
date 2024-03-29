const feedbackFormRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('.feedback-form input');
const textareaRef = document.querySelector('.feedback-form textarea');
const throttle = require('lodash.throttle');
const LOCALSTORAGE_KEY = 'feedback-form-state';

updateInput();
function updateInput() {
  if (localStorage.getItem(LOCALSTORAGE_KEY) !== null) {
    inputRef.value = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).email;
    textareaRef.value = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY)
    ).message;
  } else {
    inputRef.value = '';
    textareaRef.value = '';
  }
}
const hendleInput = () => {
  const formData = { email: inputRef.value, message: textareaRef.value };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
};

const throttledOnInput = throttle(hendleInput, 500);
inputRef.addEventListener('input', throttledOnInput);
textareaRef.addEventListener('input', throttledOnInput);

feedbackFormRef.addEventListener('submit', e => {
  e.preventDefault();
  if (inputRef.value === '' || textareaRef.value === '') {
    return console.log('Please fill in all the fields!');
  }
  e.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  localStorage.removeItem(LOCALSTORAGE_KEY);
});
