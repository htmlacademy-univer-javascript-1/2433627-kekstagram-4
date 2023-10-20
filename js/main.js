const NAMES = [
  'Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон',
  'Игорь', 'Анжелла', 'Даниил', 'Егор', 'Антон', 'Сергей', 'Ольга', 'Кристина', 'Ксения', 'Екатерина',
  'Слава', 'Стас', 'Кирилл', 'Евгений', 'Нина', 'Валентина', 'Гоша', 'Жора', 'Гога', 'Степа', 'Олег', 'Арсений'
];

const MESSAGES = [ 'Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = ['Мое новое фото!', 'Хорошо посидели!', 'Мы с друзьями!', 'На отдыхе!', ')'];

const PHOTO_DESCRIPTION_COUNT = 25;
const MAX_PHOTO_ID = 25;
const MAX_PHOTO_URL_ID = 25;
const MAX_LIKE_COUNT = 200;
const MIN_LIKE_COUNT = 15;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqueId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

const createId = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

const getCommentId = createId();
const getPhotoId = getUniqueId(1, MAX_PHOTO_ID);
const getUrlId = getUniqueId(1, MAX_PHOTO_URL_ID);

const createComments = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${  getRandomInteger(1, 6).toString()  }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = () => ({
  id: getPhotoId(),
  url: `photos/${  getUrlId().toString()  }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKE_COUNT, MAX_LIKE_COUNT),
  comments: createComments(),
});

const getPhotoDescriptions = (count) => Array.from({length: count}, createPhotoDescription);

const photoDescriptions = getPhotoDescriptions(PHOTO_DESCRIPTION_COUNT);
