import { setUserFormSubmit} from './imageUploadForm.js';
import { photoDrawing } from './drawing.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

getData()
  .then((pictures) => {
    photoDrawing(pictures);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit();
