import { applications, id } from "./applications";

const addItemToTheList = (data) => {
  localStorage.setItem(
    'applications',
    JSON.stringify(
      JSON.parse(localStorage.getItem('applications')).concat(data)
    )
  );
};

const getData = () => {
  if (localStorage.getItem('applications') == null) {
    localStorage.setItem('applications', JSON.stringify(applications));
    localStorage.setItem('id', id);
  }

  return JSON.parse(localStorage.getItem('applications'));
};

const getNextId = () => {
  let id = localStorage.getItem('id');
  localStorage.setItem('id', ++id);

  return id;
};

export { addItemToTheList, getData, getNextId };
