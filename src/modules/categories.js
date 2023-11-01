let URL = '';
let queryType = '';
let optgroupLabel = '';
function getSelectedOptionValueAndGroup() {
  const selectElement = document.getElementById('category');
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const optionValue = selectedOption.value;
  optgroupLabel = selectedOption.parentNode.label;
  console.log('Выбрано значение:', optionValue);
  console.log('Название подгруппы:', optgroupLabel);
  if (optgroupLabel === 'Images') {
    URL = 'https://pixabay.com/api/';
    queryType = `image_type=${optionValue}`;
  } else {
    URL = 'https://pixabay.com/api/videos/';
    queryType = `video_type=${optionValue}`;
  }
  console.log(URL);
  console.log(queryType);
  return URL, queryType, optgroupLabel;
}

document
  .getElementById('category')
  .addEventListener('change', getSelectedOptionValueAndGroup);

export { URL, queryType, optgroupLabel, getSelectedOptionValueAndGroup };
