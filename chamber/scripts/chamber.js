const url = 'https://mcwiseman97.github.io/wdd231/chamber/scripts/members.json';
const cards = document.querySelector('#cards');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

const setView = (view) => {
  if (!cards) {
    return;
  }

  cards.classList.toggle('list-view', view === 'list');
  cards.classList.toggle('grid-view', view === 'grid');

  if (gridBtn) {
    gridBtn.classList.toggle('active', view === 'grid');
  }

  if (listBtn) {
    listBtn.classList.toggle('active', view === 'list');
  }
};

const displayBusinesses = (businesses) => {
  if (!cards) {
    return;
  }

  businesses.forEach((business) => {
    let card = document.createElement('section');
    let busname = document.createElement('h2');
    let tagline = document.createElement('p');
    let logo = document.createElement('img');
    let details = document.createElement('div');
    let email = document.createElement('p');
    let phone = document.createElement('p');
    let address = document.createElement('p');

    busname.textContent = `${business.businessname}`;
    tagline.textContent = business.businesstagline;
    tagline.className = 'tagline';

    logo.setAttribute('src', business.imageurl);
    logo.setAttribute('alt', `Logo of ${business.businessname}`);
    logo.setAttribute('loading', 'lazy');
    logo.setAttribute('width', '150');
    logo.setAttribute('height', '150');

    details.className = 'details';
    email.innerHTML = `<strong>EMAIL:</strong> ${business.email}`;
    phone.innerHTML = `<strong>PHONE:</strong> ${business.phone}`;
    address.innerHTML = `<strong>ADDRESS:</strong> ${business.address}`;

    details.appendChild(email);
    details.appendChild(phone);
    details.appendChild(address);

    card.appendChild(busname);
    card.appendChild(tagline);
    card.appendChild(logo);
    card.appendChild(details);

    cards.appendChild(card);
  });
};

async function getBusinessData(url) {
  if (!cards) {
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const data = await response.json();
    displayBusinesses(data.businesses);
  } catch (error) {
    console.error('Failed to fetch business data:', error);
  }
}

if (cards) {
  setView('grid');

  if (gridBtn) {
    gridBtn.addEventListener('click', () => setView('grid'));
  }

  if (listBtn) {
    listBtn.addEventListener('click', () => setView('list'));
  }

  getBusinessData(url);
}

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
  });
}

// Set last modified date
const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) {
  lastModifiedElement.textContent = document.lastModified;
}
