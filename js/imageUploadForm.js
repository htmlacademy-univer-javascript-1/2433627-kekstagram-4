import { isEscapeKey, findDuplicates } from './util.js';


const body = document.querySelector('body');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const closeButton = document.querySelector('.img-upload__cancel');

const textDescriptionField = imgUploadForm.querySelector('.text__description');
const textHashtagsField = imgUploadForm.querySelector('.text__hashtags');

let isFocused = false;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFocused) {
    evt.preventDefault();
    evt.stopPropagation();
    closeUploadOverlay();
  }
};

function openUploadOverlay() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadOverlay() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadForm.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
}

imgUploadInput.addEventListener('change', () => {
  openUploadOverlay();
});

closeButton.addEventListener('click', () => {
  closeUploadOverlay();
});

textDescriptionField.addEventListener('focus', () => {
  isFocused = true;
});

textDescriptionField.addEventListener('blur', () => {
  isFocused = false;
});

textHashtagsField.addEventListener('focus', () => {
  isFocused = true;
});

textHashtagsField.addEventListener('blur', () => {
  isFocused = false;
});

const pristine = new Pristine(imgUploadForm);

function validateDescription(value) {
  return value.length <= 140;
}

function validateHashtags(value) {
  const hashtag = /^#[a-zа-ё0-9]{1,19}$/i;

  if (value === ''){
    return true;
  }

  const hashtags = value.split(' ');
  if (hashtags.length > 5 && findDuplicates(hashtags)) {
    return false;
  }

  for (const tag of hashtags) {
    if (!hashtag.test(tag)){
      return false;
    }
  }
}

pristine.addValidator(
  textDescriptionField,
  validateDescription,
  'Не более 140 символов!'
);

pristine.addValidator(
  textHashtagsField,
  validateHashtags,
  'Ошибка хештегов!'
);

imgUploadForm.addEventListener('sibmit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
