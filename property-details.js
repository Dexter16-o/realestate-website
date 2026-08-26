document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     GET PROPERTY ID FROM URL
  ======================================================= */

  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("id");


  /* =======================================================
     PAGE ELEMENTS
  ======================================================= */

  const loading = document.getElementById("property-details-loading");
  const content = document.getElementById("property-details-content");
  const notFound = document.getElementById("property-not-found");

  const breadcrumbTitle = document.getElementById(
    "breadcrumb-property-title"
  );

  const pageTitle = document.getElementById(
    "property-page-title"
  );

  const mainImage = document.getElementById(
    "property-details-main-image"
  );

  const badge = document.getElementById(
    "property-details-badge"
  );

  const location = document.getElementById(
    "property-details-location"
  );

  const title = document.getElementById(
    "property-details-title"
  );

  const priceLabel = document.getElementById(
    "property-details-price-label"
  );

  const price = document.getElementById(
    "property-details-price"
  );

  const description = document.getElementById(
    "property-details-description"
  );

  const type = document.getElementById(
    "property-details-type"
  );

  const purpose = document.getElementById(
    "property-details-purpose"
  );

  const bhk = document.getElementById(
    "property-details-bhk"
  );

  const area = document.getElementById(
    "property-details-area"
  );

  const bedrooms = document.getElementById(
    "property-details-bedrooms"
  );

  const bathrooms = document.getElementById(
    "property-details-bathrooms"
  );

  const amenities = document.getElementById(
    "property-details-amenities"
  );

  const enquiryBtn = document.getElementById(
    "property-details-enquiry-btn"
  );

  const whatsappBtn = document.getElementById(
    "property-details-whatsapp-btn"
  );


  /* =======================================================
     FIND SELECTED PROPERTY
  ======================================================= */

  const property = Array.isArray(properties)
    ? properties.find((item) => item.id === propertyId)
    : null;


  /* =======================================================
     PROPERTY NOT FOUND
  ======================================================= */

  if (!property) {
    loading.hidden = true;
    notFound.hidden = false;

    return;
  }


  /* =======================================================
     LOAD PROPERTY DATA
  ======================================================= */

  document.title = `${property.title} | Bhavesh Property`;

  breadcrumbTitle.textContent = property.title;
  pageTitle.textContent = property.title;

  mainImage.src = property.coverImage;
  mainImage.alt = property.title;

  badge.textContent =
    property.purpose === "rent"
      ? "For Rent"
      : "For Sale";

  location.textContent =
    property.address ||
    property.areaName ||
    property.city ||
    "Ahmedabad";

  title.textContent = property.title;

  priceLabel.textContent =
    property.purpose === "rent"
      ? "Rent"
      : "Price";

  price.textContent = property.priceDisplay;

  description.textContent = property.description;

  type.textContent =
    property.type.charAt(0).toUpperCase() +
    property.type.slice(1);

  purpose.textContent =
    property.purpose === "rent"
      ? "For Rent"
      : "For Sale";

  bhk.textContent =
    property.bhk || "Not Applicable";

  area.textContent =
    property.area || "Not Available";

  bedrooms.textContent =
    property.bedrooms ?? "Not Applicable";

  bathrooms.textContent =
    property.bathrooms ?? "Not Applicable";


  /* =======================================================
     AMENITIES
  ======================================================= */

  amenities.innerHTML = (property.amenities || [])
    .map(
      (amenity) => `
        <span class="property-details-amenity">
          <i class="fa-solid fa-check"></i>
          ${amenity}
        </span>
      `
    )
    .join("");


  /* =======================================================
     ENQUIRY BUTTON
  ======================================================= */

  enquiryBtn.href =
    `index.html#contact`;


  /* =======================================================
     WHATSAPP BUTTON
  ======================================================= */

  const whatsappMessage =
    `Hello, I am interested in ${property.title} (${property.id}). ` +
    `Please share more details.`;

  whatsappBtn.href =
    `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;


  /* =======================================================
     SHOW PROPERTY
  ======================================================= */

  loading.hidden = true;
  content.hidden = false;

  /* =======================================================
   THEME SWITCHER
======================================================= */

const themeDropdown = document.querySelector(".theme-dropdown");
const themeToggle = document.getElementById("theme-toggle");
const themeOptions = document.querySelectorAll(".theme-option");

const systemTheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
);

function applyTheme(theme) {

  const useDarkTheme =
    theme === "dark" ||
    (
      theme === "system" &&
      systemTheme.matches
    );

  document.body.classList.toggle(
    "dark-theme",
    useDarkTheme
  );

  themeOptions.forEach((option) => {
    option.classList.toggle(
      "active",
      option.dataset.theme === theme
    );
  });

}

function setTheme(theme) {
  localStorage.setItem(
    "website-theme",
    theme
  );

  applyTheme(theme);
}


/* Load saved theme */

const savedTheme =
  localStorage.getItem(
    "website-theme"
  ) || "system";

applyTheme(savedTheme);


/* Open / close theme menu */

themeToggle?.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    const isOpen =
      themeDropdown.classList.toggle("open");

    themeToggle.setAttribute(
      "aria-expanded",
      isOpen
    );

  }
);


/* Select theme */

themeOptions.forEach((option) => {

  option.addEventListener(
    "click",
    () => {

      setTheme(
        option.dataset.theme
      );

      themeDropdown.classList.remove(
        "open"
      );

      themeToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }
  );

});


/* Close when clicking outside */

document.addEventListener(
  "click",
  (event) => {

    if (
      themeDropdown &&
      !themeDropdown.contains(event.target)
    ) {

      themeDropdown.classList.remove(
        "open"
      );

      themeToggle?.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  }
);


/* Follow system theme changes */

systemTheme.addEventListener(
  "change",
  () => {

    const currentTheme =
      localStorage.getItem(
        "website-theme"
      ) || "system";

    if (currentTheme === "system") {
      applyTheme("system");
    }

  }
);

});