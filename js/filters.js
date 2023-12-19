const filtersBlock = document.querySelector('.img-filters');
const defaultFilter = filtersBlock.querySelector('#filter-default');
const randomFilter = filtersBlock.querySelector('#filter-random');
const discussedFilter = filtersBlock.querySelector('#filter-discussed');

filtersBlock.classList.remove('img-filters--inactive');

const setDefaultFilter = (cb) => defaultFilter.addEventListener('click', cb);
const setRandomFilter = (cb) => randomFilter.addEventListener('click', cb);
const setDiscussedFilter = (cb) => discussedFilter.addEventListener('click', cb);

const handleFilterClick = (filterElement) => {
  const activeFilter = filtersBlock.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
  filterElement.classList.add('img-filters__button--active');
};

defaultFilter.addEventListener('click', () => handleFilterClick(defaultFilter));
randomFilter.addEventListener('click', () => handleFilterClick(randomFilter));
discussedFilter.addEventListener('click', () => handleFilterClick(discussedFilter));


export {filtersBlock, setDefaultFilter, setRandomFilter, setDiscussedFilter};
