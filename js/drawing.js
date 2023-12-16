let pictureData = [];

const photoDrawing = function(data) {
  const container = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  pictureData = data;
  const pictureListFragment = document.createDocumentFragment();

  data.forEach(({url, description, likes, comments}) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('img').src= url;
    newPicture.querySelector('img').alt = description;
    newPicture.querySelector('.picture__likes').textContent = likes;
    newPicture.querySelector('.picture__comments').textContent = comments.length;
    pictureListFragment.appendChild(newPicture);
  });

  container.appendChild(pictureListFragment);
};

export {photoDrawing, pictureData};
