import { showAlert, debounce } from './util.js';
import { getData } from './api.js';
import { photoDrawing } from './drawing.js';
import { setDefaultFilter, setDiscussedFilter, setRandomFilter} from './filters.js';
import { setUserFormSubmit } from './imageUploadForm.js';

getData()
  .then((pictures) => {
    photoDrawing(pictures);
    setDefaultFilter(debounce(() => photoDrawing(pictures)));
    setDiscussedFilter(debounce(() => photoDrawing(pictures, 'discussed')));
    setRandomFilter(debounce(() => photoDrawing(pictures, 'random')));
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );


setUserFormSubmit();
