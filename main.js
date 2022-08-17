const getData = () => {
  if (localStorage.getItem('applications') == null) {
    localStorage.setItem('applications', JSON.stringify(applications));
    localStorage.setItem('id', id);
  }

  return JSON.parse(localStorage.getItem('applications'));
};

const createAppCard = (app) => {
  return `
  <!-- https://stackoverflow.com/questions/39031224/how-to-center-cards-in-bootstrap-4 -->
  <div class="card mb-3 border border-0 mx-auto" style="max-width: 35rem;">
    <div class="row g-0">
      <div class="col-md-4">
        <img 
          src="images/${app.id}/${app.imageUrl}"
          class="img-fluid app-logo"
          alt="Logo of ${app.name}"
          style="height: 10rem;"
          onerror="this.src = 'images/Help.png';"
        />
      </div>
      <div class="col-md-8">
        <button class="remove-button btn btn-danger position-absolute top-50 start-100 rounded-circle py-2" type="button">
          <svg
            id="i-trash"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="32"
            height="32"
            fill="none"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />
          </svg>
        </button>
        <div class="card-body">
          <h5 class="card-title">${app.name}</h5>
          <p class="card-text">
            ${app.desc}<br />
            Price: ${app.price}<br />
            Company name: ${app.companyName}<br />
          </p>
        </div>
      </div>
    </div>
  </div>
  `;
};

const renderAppData = (arr) => {
  const appCardList = document.querySelector('main');

  appCardList.innerHTML = arr.map(createAppCard).join('');
};

const renderByQuery = (query) => {
  if (query !== '') {
    const data = getData().filter((app) =>
      app.name.toLowerCase().includes(query.toLowerCase())
    );

    renderAppData(data);
  } else {
    renderAppData(getData());
  }
};

const handleSearch = (event) => {
  const query = event.target.value.trim();

  renderByQuery(query);
};

document.addEventListener('DOMContentLoaded', () => {
  renderAppData(getData());

  document.querySelector('#searchBox').addEventListener('input', handleSearch);
});
