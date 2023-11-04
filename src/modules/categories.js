let URL = 'https://pixabay.com/api/';
let queryType = 'all';
let optgroupLabel = 'Images';
const tagsContainer = document.querySelector('.tags');
let selectedTags = [];

function getSelectedValue() {
  const categoryHeader = document.getElementById('categoryHeader');
  const categoryBody = document.getElementById('categoryBody');
  const selectItems = categoryBody.querySelectorAll('.selector-item');
  const selectCurrent = categoryHeader.querySelector('.selector-current');

  for (const item of selectItems) {
    item.addEventListener('click', function () {
      const optionValue = item.textContent.split(' ')[0].toLocaleLowerCase();
      const optionValueText = item.textContent;
      selectCurrent.textContent = optionValueText;

      const parentDiv = item.parentElement;
      if (parentDiv) {
        if (parentDiv.classList.contains('image-selector')) {
          optgroupLabel = 'Images';
        } else if (parentDiv.classList.contains('video-selector')) {
          optgroupLabel = 'Videos';
        }
      }
      tagsContainer.innerHTML = '';

      if (optgroupLabel === 'Images') {
        URL = 'https://pixabay.com/api/';
        queryType = `image_type=${optionValue}`;
        const imageTags = [
          'backgrounds',
          'fashion',
          'nature',
          'science',
          'education',
          'feelings',
          'health',
          'people',
          'religion',
          'places',
          'animals',
          'industry',
          'computer',
          'food',
          'sports',
          'transportation',
          'travel',
          'buildings',
          'business',
          'music',
        ];
        generateTagElements(imageTags);
      } else if (optgroupLabel === 'Videos') {
        URL = 'https://pixabay.com/api/videos/';
        queryType = `video_type=${optionValue}`;
        const videoTags = [
          'backgrounds',
          'fashion',
          'nature',
          'science',
          'education',
          'feelings',
          'health',
          'people',
          'religion',
          'places',
          'animals',
          'industry',
          'computer',
          'food',
          'sports',
          'transportation',
          'travel',
          'buildings',
          'business',
          'music',
        ];
        generateTagElements(videoTags);
      } else {
        alarm('Custom filters are not supported');
        return;
      }

      console.log('Выбрано значение:', optionValue);
      console.log('Название подгруппы:', optgroupLabel);
      console.log('URL:', URL);
      console.log('Query Type:', queryType);
    });
  }
}

// Функция для генерации элементов тегов
function generateTagElements(tagArray) {
  tagArray.forEach(tagText => {
    const tagElement = document.createElement('div');
    tagElement.classList.add('tag');
    tagElement.textContent = tagText;
    tagElement.setAttribute('data-tag', tagText);
    tagsContainer.appendChild(tagElement);

    tagElement.addEventListener('click', () => {
      if (selectedTags.includes(tagText)) {
        selectedTags = selectedTags.filter(item => item !== tagText);
        tagElement.classList.remove('selected');
      } else {
        selectedTags.push(tagText);
        tagElement.classList.add('selected');
      }
      updateSelectedTags();
    });
  });
}

// Обновить выбранные теги
function updateSelectedTags() {
  console.log(`Selected Tags: ${selectedTags.join(', ')}`);
}

// Инициализировать генерацию тегов

export {
  URL,
  queryType,
  optgroupLabel,
  getSelectedValue,
  tagsMarkup,
  selectedTags,
};
