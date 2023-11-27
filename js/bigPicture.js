import {similarPhotos, photoDrawing} from './drawing.js';
import {isEscapeKey} from './util.js';

photoDrawing();

const bigPictureWindow = document.querySelector('.big-picture');
const closeButton = bigPictureWindow.querySelector('.big-picture__cancel');
const bigPicture = bigPictureWindow.querySelector('.big-picture__img');
const pictures = document.querySelectorAll('.picture__img');

const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

const createComments = function(comments) {
  const socialComments = document.querySelector('.social__comments');
  comments.forEach(({avatar, message, name}) => {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');

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
};

const createBigPicture = function(index) {
  const photo = similarPhotos[index];
  bigPicture.querySelector('img').src = photo.url;
  bigPictureWindow.querySelector('.likes-count').textContent = photo.likes;
  bigPictureWindow.querySelector('.comments-count').textContent = photo.comments.length;
  bigPictureWindow.querySelector('.social__caption').textContent = photo.description;

  createComments(photo.comments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureWindow();
  }
};

function openBigPictureWindow () {
  bigPictureWindow.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPictureWindow () {
  bigPictureWindow.classList.add('hidden');
  body.classList.remove('modal-open');

  const commentsList = document.querySelectorAll('.social__comment');
  for( let i = 0; i < commentsList.length; i++ ){
    commentsList[i].outerHTML = '';
  }

  document.removeEventListener('keydown', onDocumentKeydown);
}

for (let i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener('click', () => {
    openBigPictureWindow();
    createBigPicture(i);
  });
}

closeButton.addEventListener('click', () => {
  closeBigPictureWindow();
});
