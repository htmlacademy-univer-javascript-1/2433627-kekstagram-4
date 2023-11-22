import {createPhotoDescriptions} from './data.js';

const photoDrawing = function() {
  const container = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const similarListFragment = document.createDocumentFragment();
  const similarPhotos = createPhotoDescriptions();

  similarPhotos.forEach(({url, description, likes, comments}) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('img').src= url;
    newPicture.querySelector('img').alt = description;
    newPicture.querySelector('.picture__likes').textContent = likes;
    newPicture.querySelector('.picture__comments').textContent = comments.length;
    similarListFragment.appendChild(newPicture);
  });

  container.appendChild(similarListFragment);
};

export {photoDrawing};
