const imgUploadScale = document.querySelector('.img-upload__scale');
const scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
const scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
const imgUploadPreview = document.querySelector('.img-upload__preview');

let scaleValue = Number(scaleControlValue.value.slice(0, -1));

const SCALE_VALUE_STEP = 25;
const SCALE_VALUE_MIN = 25;
const SCALE_VALUE_MAX = 100;

const updateScaleValue = () => {
  scaleControlValue.value = `${scaleValue}%`;
  imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
};

scaleControlSmaller.addEventListener('click', () => {
  if (scaleValue > SCALE_VALUE_MIN) {
    scaleValue -= SCALE_VALUE_STEP;
    updateScaleValue();
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (scaleValue < SCALE_VALUE_MAX) {
    scaleValue += SCALE_VALUE_STEP;
    updateScaleValue();
  }
});


