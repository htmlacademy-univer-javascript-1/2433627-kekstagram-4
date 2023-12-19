import { showAlert } from './util.js';
import { setUserFormSubmit} from './imageUploadForm.js';
import { getData } from './api.js';
import { photoDrawing } from './drawing.js';
import { onPreviewClick } from './bigPicture.js';

getData()
  .then((pictures) => {
    photoDrawing(pictures);
    onPreviewClick();
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );


setUserFormSubmit();
