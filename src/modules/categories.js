let URL = 'https://pixabay.com/api/';
let queryType = 'all';
let optgroupLabel = 'Images';

function getSelectedOptionValueAndGroup() {
  const categoryHeader = document.getElementById('categoryHeader');
  const categoryBody = document.getElementById('categoryBody');
  const selectItems = categoryBody.querySelectorAll('.selector-item');
  const selectCurrent = categoryHeader.querySelector('.selector-current');

  for (const item of selectItems) {
    item.addEventListener('click', function () {
      const optionValue = item.textContent.toLocaleLowerCase();
      selectCurrent.textContent = optionValue;

      let optgroupLabel = '';
      const parentDiv = item.parentElement;
      if (parentDiv) {
        if (parentDiv.classList.contains('image-selector')) {
          optgroupLabel = 'Images';
        } else if (parentDiv.classList.contains('video-selector')) {
          optgroupLabel = 'Videos';
        }
      }

      if (optgroupLabel === 'Images') {
        URL = 'https://pixabay.com/api/';
        queryType = `image_type=${optionValue}`;
      } else if (optgroupLabel === 'Videos') {
        URL = 'https://pixabay.com/api/videos/';
        queryType = `video_type=${optionValue}`;
      } else {
        // Обработка других случаев
      }

      console.log('Выбрано значение:', optionValue);
      console.log('Название подгруппы:', optgroupLabel);
      console.log('URL:', URL);
      console.log('Query Type:', queryType);
    });
  }
}

export { URL, queryType, optgroupLabel, getSelectedOptionValueAndGroup };
