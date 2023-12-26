import { onPreviewClick } from './bigPicture.js';

let picturesData = [];

const photoDrawing = function(data, filter = 'default') {
  const container = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const pictureListFragment = document.createDocumentFragment();

  let sortedData;
  switch (filter) {
    case 'default':
      sortedData = data;
      break;
    case 'random':
      sortedData = data.slice().sort(() => Math.random() - 0.5).slice(0, 10);
      break;
    case 'discussed':
      sortedData = data.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;
  }

  picturesData = sortedData;

  sortedData.forEach(({url, description, likes, comments}) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('img').src= url;
    newPicture.querySelector('img').alt = description;
    newPicture.querySelector('.picture__likes').textContent = likes;
    newPicture.querySelector('.picture__comments').textContent = comments.length;
    pictureListFragment.appendChild(newPicture);
  });

  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture)=> {
    picture.parentNode.removeChild(picture);
  });

  container.appendChild(pictureListFragment);
  onPreviewClick();
};

export {photoDrawing, picturesData};
