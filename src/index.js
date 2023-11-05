import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { scrollToTopButton, scrollToTop } from './modules/scroll';
import {
  URL,
  queryType,
  optgroupLabel,
  getSelectedValue,
  selectedTags,
} from './modules/categories';
import { select } from './modules/select';
// import { selectedTags } from './modules/tags';
const apiKey = '39198737-e441a494d9c878a4c9c462200';
const perPage = 40;
let currentPage = 1;
let isGalleryLoaded = false;
const searchForm = document.querySelector('#search-form');
const searchToggle = document.querySelector('#search-toggle');
const gallery = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');
const loader = document.querySelector('.loader');
//!observer
const options = {
  root: null,
  rootMargin: '300px',
};
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });
}, options);
observer.observe(guard);
//!loader
function showLoader() {
  loader.style.display = 'block';
}
function hideLoader() {
  loader.style.display = 'none';
}

const lightbox = new SimpleLightbox('.gallery a', {
  enableKeyboard: true,
});

async function searchContent(query) {
  try {
    const tagQuery =
      selectedTags.length > 0 ? `&category=${selectedTags.join(',')}` : '';
    const response = await axios.get(
      `${URL}?key=${apiKey}&q=${query}&${queryType}${tagQuery}&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`
    );

    const data = response.data;
    // return data.hits;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    redirectTo404Page();
    return [];
  }
}
function redirectTo404Page() {
  // window.location.href = '404.html';
  window.open('404.html', '_blank');
}

function renderContent(content) {
  content.forEach(item => {
    const card = document.createElement('div');
    card.classList.add(
      optgroupLabel === 'Images' ? 'photo-card' : 'video-card'
    );

    if (URL === 'https://pixabay.com/api/') {
      card.innerHTML = `
        <a href="${item.largeImageURL}" data-lightbox="image">
          <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
        </a>
        
      `;
    } else {
      card.innerHTML = `
        <video width="320" height="240" controls>
          <source src="${item.videos.tiny.url}" type="video/mp4">
          <source src="${item.videos.large.url}" type="video/mp4">
          <source src="${item.videos.medium.url}" type="video/mp4">
          <source src="${item.videos.small.url}" type="video/mp4">
          Ваш браузер не поддерживает воспроизведение видео.
        </video>
        
      `;
    }

    gallery.appendChild(card);
  });

  lightbox.refresh();
  isGalleryLoaded = true;
}

//! додаткове завантаження картинок
async function loadMore() {
  if (isGalleryLoaded) {
    currentPage++;
    showLoader();
    const currentQuery = searchForm.searchQuery.value.trim();
    const content = await searchContent(currentQuery);
    if (content.hits.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "We're sorry, but you've reached the end of search results.",
      });
      observer.unobserve(guard);
    } else {
      renderContent(content.hits);
      scrollToNextGroup();
    }
  }

  hideLoader();
}

//! плавний скролл до нових картинок
function scrollToNextGroup() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight,
    behavior: 'smooth',
  });
}

//! обробник пошуку з логікою на оновлення галлереї в разі зміни слова пошуку
searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const currentQuery = event.target.searchQuery.value.trim();
  if (currentQuery === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Your search is empty!!!',
    });
    return;
  }

  currentPage = 1;
  removeCards();
  showLoader();
  const content = await searchContent(currentQuery);
  console.log(content);
  //! Обробка результатів пошуку
  if (content.hits.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Sorry',
      text: 'There are no results matching your search query. Please try another query.',
    });
  } else {
    renderContent(content.hits);
    const text = `We found ${content.totalHits} results.`;
    Swal.fire({
      icon: 'success',
      title: 'Hooray!',
      text: text,
      width: '320px',
      showConfirmButton: false,
      timer: 1000,
    });
  }
  hideLoader();
});

//! скидання галлереї
function removeCards() {
  const photoCards = document.querySelectorAll('.photo-card');
  const videoCards = document.querySelectorAll('.video-card');
  photoCards.forEach(card => {
    gallery.removeChild(card);
  });
  videoCards.forEach(card => {
    gallery.removeChild(card);
  });
  isGalleryLoaded = false;
}
const area = document.querySelector('.area');
function renderBackground() {
  const backgroundList = document.createElement('ul');
  backgroundList.classList.add('circles');
  backgroundList.innerHTML = `
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            `;
  area.appendChild(backgroundList);
}
renderBackground();

scrollToTopButton.addEventListener('click', scrollToTop);
select();
getSelectedValue();
