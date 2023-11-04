let select = function () {
  let selectHeader = document.querySelectorAll('.selector-header');
  let selectItem = document.querySelectorAll('.selector-item');

  selectHeader.forEach(item => {
    item.addEventListener('click', selectToggle);
  });

  selectItem.forEach(item => {
    item.addEventListener('click', selectChoose);
  });
  function selectToggle() {
    this.parentElement.classList.toggle('isActive');
  }
  function selectChoose() {
    let text = this.innerText,
      select = this.closest('.selector'),
      currentText = select.querySelector('.selector-current');
    currentText.innerText = text;
    select.classList.remove('isActive');
  }
};

export { select };
