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
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#appPublishForm')
    .addEventListener('submit', handlePublishForm);
});
