import { fetchPictures } from './js/fetch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkUp } from './js/markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { form, input, btnLoad, imgGallery } from './js/const';

form.addEventListener('submit', onFormImg);
btnLoad.addEventListener('click', onBtnLoad);

let page = 1;
btnLoad.style = 'display: none;';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 350,
});

function clearPage() {
  imgGallery.innerHTML = '';
  page = 1;
  btnLoad.style = 'display: none;';
}

async function onFormImg(event) {
  event.preventDefault();

  clearPage();
  const inputValue = input.value;
  const img = await fetchPictures(inputValue, page);

  if (!img.hits.length) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  if (img.totalHits < 40) {
    btnLoad.style = 'display: none;';
    Notify.info("We're sorry, but you've reached the end of search results.");
    createMarkUp(img);
    Notify.success(`Hooray! We found ${img.totalHits} images.`);
    lightbox.refresh();
    return;
  }
  Notify.success(`Hooray! We found ${img.totalHits} images.`);
  createMarkUp(img);
  lightbox.refresh();
  btnLoad.style = 'display;';
}

async function onBtnLoad() {
  const inputValue = input.value;
  page += 1;

  const imgLoad = await fetchPictures(inputValue, page);
  if (imgLoad.totalHits < 40) {
    btnLoad.style = 'display: none;';
    Notify.info("We're sorry, but you've reached the end of search results.");
    createMarkUp(imgLoad);
    Notify.success(`Hooray! We found ${imgLoad.totalHits} images.`);
    lightbox.refresh();
    return;
  }
  Notify.success(`Hooray! We found ${imgLoad.totalHits} images.`);
  createMarkUp(imgLoad);
  lightbox.refresh();
}
