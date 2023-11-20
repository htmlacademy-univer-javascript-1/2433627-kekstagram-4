import {getRandomArrayElement, getRandomInteger, getUniqueId, createId} from './util.js';

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
const MAX_COMMENT_COUNT = 30;

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
  comments: Array.from({length: getRandomInteger(0, MAX_COMMENT_COUNT)}, createComments)
});

const createPhotoDescriptions = () => Array.from({length: PHOTO_DESCRIPTION_COUNT}, createPhotoDescription);

export {createPhotoDescriptions};
