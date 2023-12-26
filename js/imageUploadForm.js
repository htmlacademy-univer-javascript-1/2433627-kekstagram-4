import { isEscapeKey, findDuplicates} from './util.js';
import './imageScale.js';
import { hideSlider } from './imageEffects.js';
import { sendData } from './api.js';

const body = document.querySelector('body');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const closeButton = document.querySelector('.img-upload__cancel');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

const textDescriptionField = imgUploadForm.querySelector('.text__description');
const textHashtagsField = imgUploadForm.querySelector('.text__hashtags');

const errorMessage = document.querySelector('.error');
const successMessage = document.querySelector('.success');
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');

const HASHTAGS_MAX_COUNT = 5;
const DESCRIPTION_MAX_LENGHT = 140;

const errorMessages = {
  HASHTAGS_COUNT: 'Максимальное количество хештегов - 5!',
  HASHTAGS_DUPLICATES:'Хештеги не должны повторяться!',
  HASHTAGS_FORMAT: 'Неправильный формат!',
  DESCRIPTION_LENGHT: 'Не более 140 символов!'
};

const isFocused = (element) => document.activeElement === element;

const onFormKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFocused(textDescriptionField) && !isFocused(textHashtagsField)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

function openUploadOverlay() {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onFormKeydown);
}

function closeUploadOverlay() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadForm.reset();
  hideSlider();

  document.removeEventListener('keydown', onFormKeydown);
}

imgUploadInput.addEventListener('change', () => {
  const file = imgUploadInput.files[0];
  imgPreview.src = URL.createObjectURL(file);
  openUploadOverlay();
});

closeButton.addEventListener('click', () => {
  closeUploadOverlay();
});

const onMessageKeydown = (messageType) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage(messageType);
  }
};

function openMessage (messageType) {
  messageType.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onMessageKeydown(messageType));
  document.removeEventListener('keydown', onFormKeydown);
}

function closeMessage (messageType) {
  messageType.classList.add('hidden');
  if (messageType === errorMessage) {
    imgUploadOverlay.classList.remove('hidden');
  }
  else {
    body.classList.remove('modal-open');
  }

  document.removeEventListener('keydown', onMessageKeydown(messageType));
  document.addEventListener('keydown', onFormKeydown);
}

successButton.addEventListener('click', () => {
  closeMessage(successMessage);
});

errorButton.addEventListener('click', () => {
  closeMessage(errorMessage);
});

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'h3',
  errorTextClass: 'form__error'
});

function validateDescription(value) {
  return value.length <= DESCRIPTION_MAX_LENGHT;
}

function validateHashtags(value) {
  const hashtag = /^#[a-zа-ё0-9]{1,19}$/i;

  if (value === ''){
    return { isValid: true, message: '' };
  }

  const hashtags = value.split(' ');
  if (hashtags.length > HASHTAGS_MAX_COUNT) {
    return { isValid: false, message: errorMessages.HASHTAGS_COUNT };
  }

  if (findDuplicates(hashtags)) {
    return { isValid: false, message: errorMessages.HASHTAGS_DUPLICATES };
  }

  for (const tag of hashtags) {
    if (!hashtag.test(tag)){
      return { isValid: false, message: errorMessages.HASHTAGS_FORMAT };
    }
  }

  return { isValid: true, message: '' };
}

pristine.addValidator(
  textDescriptionField,
  validateDescription,
  errorMessages.DESCRIPTION_LENGHT
);

pristine.addValidator(
  textHashtagsField,
  (value) => {
    const validationResult = validateHashtags(value);
    return validationResult.isValid;
  },
  (value) => {
    const validationResult = validateHashtags(value);
    return validationResult.message;
  }
);

const setUserFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      imgUploadSubmit.disabled = true;
      sendData(new FormData(evt.target))
        .then(
          () => {
            closeUploadOverlay();
            openMessage(successMessage);
          }
        )
        .catch(
          () => {
            imgUploadOverlay.classList.add('hidden');
            openMessage(errorMessage);
          }
        )
        .finally(imgUploadSubmit.disabled = false);
    }
  });
};


export {setUserFormSubmit};
