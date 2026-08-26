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

});