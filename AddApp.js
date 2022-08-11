const addItemToTheList = (data) => {
  localStorage.setItem(
    'applications',
    JSON.stringify(
      JSON.parse(localStorage.getItem('applications')).concat(data)
    )
  );
};

const getNextId = () => {
  let id = localStorage.getItem('id');
  localStorage.setItem('id', ++id);

  return id;
};

const handlePublishForm = (event) => {
  event.preventDefault();
  const form = event.target;
  const alert = document.querySelector('#invalidAlert');

  if(form.reportValidity()) {
    if (form.classList.contains('was-validated')) {
      form.classList.remove('was-validated');
    }

    alert.remove();

    addItemToTheList({
      id: getNextId(),
      imageUrl: form.elements['ImageUrl'],
      name: form.elements['name'],
      price: form.elements['price'],
      desc: form.elements['description'],
      companyName: form.elements['companyName']
    });

    location.assign('mainPage.html');
  } else {
    if (!form.classList.contains('was-validated')) {
      form.classList.add('was-validated');
    }

    if(alert.classList.contains('invisible')) {
      alert.classList.remove('invisible');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#appPublishForm')
    .addEventListener('submit', handlePublishForm);
});
