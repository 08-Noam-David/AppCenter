const getData = () => {
  if (localStorage.getItem('applications') == null) {
    localStorage.setItem('applications', JSON.stringify(applications));
    localStorage.setItem('id', id);
  }

  return JSON.parse(localStorage.getItem('applications'));
};

const createAppCard = (app) => {
  return `
  <div class="card mb-3 border border-0" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img 
          src="images/${app.id}/${app.imageUrl}"
          class="img-fluid app-logo"
          alt="Logo of ${app.name}"
          style="height: 160px;"
          onerror="this.src = 'images/Help.png';"
        />
      </div>
      <div class="col-md-8">
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

const handleSearch = (event) => {
  const query = event.target.value.trim();

  if (query !== '') {
    const data = getData().filter((app) =>
      app.name.toLowerCase().includes(query.toLowerCase())
    );

    renderAppData(data);
  } else {
    renderAppData(getData());
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderAppData(getData());

  document.querySelector('#searchBox').addEventListener('input', handleSearch);
});
