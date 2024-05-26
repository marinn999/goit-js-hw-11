import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchImage } from './js/pixabay-api';
import { imagesTemplate } from './js/render-functions';

const iziToastOptions = {
  message:
    'Sorry, there are no images matching your search query. Please try again!',
  messageColor: 'white',
  messageSize: '16px',
  backgroundColor: 'red',
  position: 'topRight',
  timeout: 5000,
  drag: true,
  overlay: true,
  overlayClose: true,
};

const iziToastErr = {
  message: 'Sorry, something goes wrong!',
  backgroundColor: 'red',
  messageColor: 'white',
  position: 'topRight',
  timeout: 5000,
  drag: true,
  overlay: true,
  overlayClose: true,
};

const formElem = document.querySelector('.form');
const imagesList = document.querySelector('.images-container');
const loader = document.querySelector('.loader');

formElem.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.target.elements.query.value.trim();

  searchImage(query)
    .then(data => {
      {
        if (data.hits.length === 0) {
          iziToast.show(iziToastOptions);
        } else {
          const markup = imagesTemplate(data.hits);
          imagesList.innerHTML = markup;
        }
      }
    })
    .then(() => {
      loader.classList.add('is-hidden');
      const lightbox = new SimpleLightbox('.large-image', {
        captionDelay: 250,
        captionsData: 'alt',
      });
      lightbox.refresh();
    })
    .catch(error => {
      iziToast.show(iziToastErr);
    });

  formElem.reset();
});
