import { places } from "../data/places.mjs";

const gallery = document.querySelector("#discover-gallery");
const visitMessage = document.querySelector("#visit-message");
const visitClose = document.querySelector("#visit-close");

const displayPlaces = (items) => {
  if (!gallery) {
    return;
  }

  items.forEach((place, index) => {
    const card = document.createElement("article");
    card.className = `discover-card discover-card-${index + 1}`;

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = place.imageurl;
    img.alt = place.name;
    img.loading = "lazy";
    img.width = 300;
    img.height = 200;
    figure.appendChild(img);

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "learn more";
    button.addEventListener("click", () => {
      if (place.url) {
        window.open(place.url, "_blank", "noopener,noreferrer");
      }
    });

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);
    gallery.appendChild(card);
  });
};

const displayVisitMessage = () => {
  if (!visitMessage) {
    return;
  }

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const now = Date.now();
  const lastVisit = Number(localStorage.getItem("discover-last-visit"));

  let message = "Welcome! Let us know if you have any questions.";

  if (lastVisit) {
    const daysBetween = Math.floor((now - lastVisit) / MS_PER_DAY);

    if (daysBetween < 1) {
      message = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${daysBetween} days ago.`;
    }
  }

  visitMessage.querySelector(".visit-text").textContent = message;
  visitMessage.hidden = false;
  localStorage.setItem("discover-last-visit", String(now));
};

if (visitClose && visitMessage) {
  visitClose.addEventListener("click", () => {
    visitMessage.hidden = true;
  });
}

displayPlaces(places);
displayVisitMessage();
