import { isEscapeKey, findDuplicates } from './util.js';
import './imageScale.js';
import { hideSlider } from './imageEffects.js';


const body = document.querySelector('body');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const closeButton = document.querySelector('.img-upload__cancel');

const textDescriptionField = imgUploadForm.querySelector('.text__description');
const textHashtagsField = imgUploadForm.querySelector('.text__hashtags');

const HASHTAGS_MAX_COUNT = 5;
const DESCRIPTION_MAX_LENGHT = 140;

const isFocused = (element) => document.activeElement === element;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFocused(textDescriptionField) && !isFocused(textHashtagsField)) {
    evt.preventDefault();
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
  hideSlider();

  document.removeEventListener('keydown', onDocumentKeydown);
}

imgUploadInput.addEventListener('change', () => {
  openUploadOverlay();
});

closeButton.addEventListener('click', () => {
  closeUploadOverlay();
});

const pristine = new Pristine(imgUploadForm);

function validateDescription(value) {
  return value.length <= DESCRIPTION_MAX_LENGHT;
}

function validateHashtags(value) {
  const hashtag = /^#[a-zа-ё0-9]{1,19}$/i;

  if (value === ''){
    return true;
  }

  const hashtags = value.split(' ');
  if (hashtags.length > HASHTAGS_MAX_COUNT && findDuplicates(hashtags)) {
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
