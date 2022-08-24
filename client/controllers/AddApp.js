import { Toast } from '../assets/bootstrap.esm.min.js';

import { addItemToTheList } from '../services/data.js';

const handlePublishForm = async (event) => {
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

    try {
      const response = await addItemToTheList({
        imageUrl: form.elements['ImageUrl'].value,
        name: form.elements['name'].value,
        price: parseFloat(form.elements['price'].value),
        desc: form.elements['description'].value,
        companyName: form.elements['companyName'].value,
      });

      if(!response.ok) {
        console.log(await response.json());
        throw new Error('Ooops');
      }

      location.assign('mainPage.html');
    } catch (error) {
      const toast = new Toast(document.querySelector('#failureToast'));
      toast.show();
    }
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
