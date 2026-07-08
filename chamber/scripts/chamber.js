const url = 'https://mcwiseman97.github.io/wdd231/chamber/scripts/business.json';

const cards = document.querySelector('#cards');

const displayBusinesses = (businesses) => {
  businesses.forEach((business) => {
    let card = document.createElement('section');
    let busname = document.createElement('h2');
    let logo = document.createElement('img');

    busname.textContent = `${business.businessname}`;

    logo.setAttribute('src', business.imageurl);
    logo.setAttribute('alt', `Portrait of ${business.businessname}`);
    logo.setAttribute('loading', 'lazy');
    logo.setAttribute('width', '340');
    logo.setAttribute('height', '440');

    card.appendChild(busname);
    card.appendChild(logo);

    cards.appendChild(card);
  });
};

async function getBusinessData(url) {
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

getBusinessData(url);