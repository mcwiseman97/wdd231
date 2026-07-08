const url = 'https://mcwiseman97.github.io/wdd231/chamber/scripts/business.json';
const cards = document.querySelector('#cards');

const displayBusinesses = (businesses) => {
  businesses.forEach((business) => {
    let card = document.createElement('section');
    let busname = document.createElement('h2');
    let tagline = document.createElement('p');
    let logo = document.createElement('img');
    let details = document.createElement('div');
    let email = document.createElement('p');
    let phone = document.createElement('p');
    let url = document.createElement('p');

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
    url.innerHTML = `<strong>ADDRESS:</strong> ${business.address}`;

    details.appendChild(email);
    details.appendChild(phone);
    details.appendChild(url);

    card.appendChild(busname);
    card.appendChild(tagline);
    card.appendChild(logo);
    card.appendChild(details);

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