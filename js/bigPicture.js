import {pictureData} from './drawing.js';
import {isEscapeKey} from './util.js';

const bigPictureWindow = document.querySelector('.big-picture');
const closeButton = bigPictureWindow.querySelector('.big-picture__cancel');
const bigPicture = bigPictureWindow.querySelector('.big-picture__img');

const currentSocialCommentsCount = document.querySelector('.current-comments-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

const socialComments = document.querySelector('.social__comments');

const createComments = (comments) => {

  comments.forEach(({avatar, message, name}) => {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');
    comment.classList.add('hidden');

    const avatarImg = document.createElement('img');
    avatarImg.classList.add('social__picture');
    avatarImg.src = avatar;
    avatarImg.alt = name;
    avatarImg.width = '35';
    avatarImg.height = '35';
    comment.appendChild(avatarImg);

    const text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = message;
    comment.appendChild(text);

    socialComments.appendChild(comment);
  });
  downloadComments();
};

const createBigPicture = (index) => {
  const picture = pictureData[index];
  bigPicture.querySelector('img').src = picture.url;
  bigPictureWindow.querySelector('.likes-count').textContent = picture.likes;
  bigPictureWindow.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureWindow.querySelector('.social__caption').textContent = picture.description;

  createComments(picture.comments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureWindow();
  }
};

function openBigPictureWindow() {
  bigPictureWindow.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPictureWindow() {
  bigPictureWindow.classList.add('hidden');
  body.classList.remove('modal-open');

  const commentsList = document.querySelectorAll('.social__comment');
  for( let i = 0; i < commentsList.length; i++ ){
    commentsList[i].outerHTML = '';
  }

  document.removeEventListener('keydown', onDocumentKeydown);
}

const onPreviewClick = () => {
  const pictures = document.querySelectorAll('.picture');
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPictureWindow();
      createBigPicture(i);
    });
  }
};

closeButton.addEventListener('click', () => {
  closeBigPictureWindow();
});

commentsLoader.addEventListener('click', () => {
  downloadComments();
});

function updateCurrentSocialCommentsCount(visibleSocialCommentsLenght) {
  currentSocialCommentsCount.textContent = visibleSocialCommentsLenght;

  if (visibleSocialCommentsLenght < socialComments.childElementCount) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }
}

function downloadComments() {
  for (let i = 0; i < 5; i++) {
    const hiddenSocialComment = socialComments.querySelector('.hidden');
    if (hiddenSocialComment !== null) {
      hiddenSocialComment.classList.remove('hidden');
    }
  }
  const hiddenSocialComments = socialComments.querySelectorAll('.hidden');
  const hiddenSocialCommentsLength = hiddenSocialComments.length;
  const visibleSocialCommentsLenght = socialComments.childElementCount - hiddenSocialCommentsLength;

  updateCurrentSocialCommentsCount(visibleSocialCommentsLenght);
}

export {openBigPictureWindow, closeBigPictureWindow, onPreviewClick};
