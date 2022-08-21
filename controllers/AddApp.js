import { addItemToTheList, getNextId } from '../services/data.js';

const handlePublishForm = (event) => {
  event.preventDefault();
  const form = event.target;
  const alert = document.querySelector('#invalidAlert');

  const isValid = [...form.elements]
    .map((el) => el.checkValidity())
    .every((valid) => valid);

  if (isValid) {
    if (form.classList.contains('was-validated')) {
      form.classList.remove('was-validated');
    }

    alert.remove();

    addItemToTheList({
      id: getNextId(),
      imageUrl: form.elements['ImageUrl'].value,
      name: form.elements['name'].value,
      price: form.elements['price'].value,
      desc: form.elements['description'].value,
      companyName: form.elements['companyName'].value,
    });

    location.assign('mainPage.html');
  } else {
    if (!form.classList.contains('was-validated')) {
      form.classList.add('was-validated');
    }

    if (alert.classList.contains('invisible')) {
      alert.classList.remove('invisible');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#appPublishForm')
    .addEventListener('submit', handlePublishForm);
});
