import { imgGallery } from './const';

export function createMarkUp(images) {
  const result = images.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <a href="${largeImageURL}" class="img-info"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="img-found"width="180" height="100"/>
  <div class="info">
    <p class="info-item">
      <b>Likes <br>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views <br>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments <br>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads <br>${downloads}</b>
    </p>
  </div>
  </a>
</div>`
    )
    .join('');
  return imgGallery.insertAdjacentHTML('beforeend', result);
}
