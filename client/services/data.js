const baseUrl = 'http://localhost:3000';

const addItemToTheList = (data) => {
  return fetch(`${baseUrl}/api/apps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
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

export { addItemToTheList, getData };
