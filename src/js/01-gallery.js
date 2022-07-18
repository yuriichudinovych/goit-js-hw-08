// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
console.log(galleryItems);

const galleryRef = document.querySelector('.gallery');

const createMarkupElement = ({ preview, original, description }) => {
  return `<a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>`;
};

const createGallary = (galleryItems, callback) => {
  return galleryItems.map(el => callback(el)).join('');
};

galleryRef.insertAdjacentHTML(
  'beforeend',
  createGallary(galleryItems, createMarkupElement)
);

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});
