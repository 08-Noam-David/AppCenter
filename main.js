const getData = () => {
  if (localStorage.getItem('applications') == null) {
    localStorage.setItem('applications', JSON.stringify(applications));
    localStorage.setItem('id', id);
  }

  return JSON.parse(localStorage.getItem('applications'));
};

const renderAppCardLogo = (app) => {
  const appLogo = document.createElement('img');
  appLogo.src = `images/${app.id}/${app.imageUrl}`;
  appLogo.alt = `Logo of ${app.name}`;
  appLogo.style.height = '160px';
  appLogo.addEventListener('error', () => {
    appLogo.src = 'images/Help.png';
    appLogo.alt = 'Unkown logo';
  });

  const appLogoContainer = document.createElement('div');
  appLogoContainer.classList.add('col-md-4');

  appLogoContainer.appendChild(appLogo);

  return appLogoContainer;
};

const renderAppCardBody = (app) => {
  const appName = document.createElement('h5');
  appName.classList.add('card-title');
  appName.textContent = app.name;

  const appDetails = document.createElement('p');
  appDetails.classList.add('card-text');
  appDetails.innerText = `
  ${app.desc}
  Price: ${app.price}
  Company name: ${app.companyName}
  `;

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardBodyContainer = document.createElement('div');
  cardBodyContainer.classList.add('col-md-8');

  cardBody.appendChild(appName);
  cardBody.appendChild(appDetails);
  cardBodyContainer.appendChild(cardBody);

  return cardBodyContainer;
};

const createAppCard = (app) => {
  const appLogo = renderAppCardLogo(app);
  const appDetails = renderAppCardBody(app);

  const appCardConatiner = document.createElement('div');
  appCardConatiner.classList.add('row', 'g-0');
  appCardConatiner.appendChild(appLogo);
  appCardConatiner.appendChild(appDetails);

  const appCard = document.createElement('article');
  appCard.classList.add('card', 'mt-2', 'border-0');
  appCard.appendChild(appCardConatiner);

  return appCard;
};

const renderAppData = (arr) => {
  const appCardList = document.querySelector('main');

  appCardList.innerText = '';
  arr.map(createAppCard).forEach((card) => appCardList.appendChild(card));
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
