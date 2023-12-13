const sliderContainer = document.querySelector('.img-upload__effect-level');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsLevelValue = document.querySelector('.effect-level__value');
const effectsRadio = document.querySelectorAll('.effects__radio');
const effects = [
  {
    cssName: 'grayscale',
    htmlName: 'chrome',
    min: 0,
    max: 1,
    step: 0.1,
    units: ''
  },
  {
    cssName: 'sepia',
    htmlName: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    units: ''
  },
  {
    cssName: 'invert',
    htmlName: 'marvin',
    min: 0,
    max: 100,
    step: 1,
    units: '%'
  },
  {
    cssName: 'blur',
    htmlName: 'phobos',
    min: 0,
    max: 3,
    step: 0.1,
    units: 'px'
  },
  {
    cssName: 'brightness',
    htmlName: 'heat',
    min: 1,
    max: 3,
    step: 0.1,
    units: ''
  }
];

hideSlider();

noUiSlider.create(effectLevelSlider, {
  connect: 'lower',
  range: {
    min: 0,
    max: 100
  },
  start: 0,
  step: 1
});

for (const effectRadio of effectsRadio) {
  effectRadio.addEventListener('change', () => {
    if (effectRadio.value === 'none') {
      hideSlider();
    }

    else {
      const effect = effects.find((eff) => eff.htmlName === effectRadio.value);
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: effect.min,
          max: effect.max,
        },
        start: effect.max,
        step: effect.step,
      });

      showSlider();
      updateStyle(`${effect.cssName}(${effectsLevelValue.value}${effect.units})`);
      effectLevelSlider.noUiSlider.on('update', () => {
        effectsLevelValue.value = effectLevelSlider.noUiSlider.get();
        updateStyle(`${effect.cssName}(${effectsLevelValue.value}${effect.units})`);
      });
    }
  });
}

function showSlider() {
  sliderContainer.classList.remove('hidden');
}

function hideSlider() {
  sliderContainer.classList.add('hidden');
  updateStyle(null);
}

function updateStyle(value) {
  imgUploadPreview.style.filter = value;
}

export {hideSlider};
