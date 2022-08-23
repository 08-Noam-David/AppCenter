const baseUrl = 'http://localhost:3000';

const addItemToTheList = (data) => {
  localStorage.setItem(
    'applications',
    JSON.stringify(
      JSON.parse(localStorage.getItem('applications')).concat(data)
    )
  );
};

const getData = async (search = '') => {
  const queryParams = new URLSearchParams({
    search,
  });

  const res = await fetch(
    `${baseUrl}/api/apps${search ? `?${queryParams}` : ''}`
  );
  return res.json();
};

const getNextId = () => {
  let id = localStorage.getItem('id');
  localStorage.setItem('id', ++id);

  return id;
};

export { addItemToTheList, getData, getNextId };
