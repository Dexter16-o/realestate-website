/* =========================================================
   BHAVESH PROPERTY
   Interactive Website JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
   PROPERTY DATA RENDERING
   ======================================================= */

const propertyGrid = document.getElementById("property-grid");

const escapeHTML = (value) => {
  if (value === null || value === undefined) return "";

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const getPropertyIcon = (type) => {
  const icons = {
    apartment: "fa-building",
    house: "fa-house",
    villa: "fa-house-chimney",
    plot: "fa-map-location-dot",
    office: "fa-building"
  };

  return icons[type] || "fa-house";
};

const renderProperties = (propertyList = properties) => {
  if (!propertyGrid) return;

  if (!Array.isArray(propertyList)) {
    console.error("Property data is not available.");
    return;
  }

  propertyGrid.innerHTML = propertyList
    .map((property) => {
      const location = property.areaName || property.city || "Ahmedabad";

      const specs = [
        property.bhk,
        property.area,
        property.bathrooms
          ? `${property.bathrooms} Bath${property.bathrooms > 1 ? "s" : ""}`
          : null
      ]
        .filter(Boolean)
        .map(
          (item) => `
            <span>
              <i class="fa-solid fa-check"></i>
              ${escapeHTML(item)}
            </span>
          `
        )
        .join("");

      return `
        <article
          class="property-card"
          data-property-id="${escapeHTML(property.id)}"
          data-property-type="${escapeHTML(property.type)}"
          data-purpose="${escapeHTML(property.purpose)}"
          data-location="${escapeHTML(location.toLowerCase())}"
          data-category="${escapeHTML(property.category)}"
        >

          <div class="property-image">
            <img
              src="${escapeHTML(property.coverImage)}"
              alt="${escapeHTML(property.title)}"
              loading="lazy"
            >

            <span class="property-badge">
              ${escapeHTML(property.purpose === "rent" ? "For Rent" : "For Sale")}
            </span>

            <button
              type="button"
              class="favorite-btn"
              aria-label="Save ${escapeHTML(property.title)}"
              data-property-id="${escapeHTML(property.id)}"
            >
              <i class="fa-regular fa-heart"></i>
            </button>
          </div>

          <div class="property-content">

            <div class="property-meta">
              <span>
                <i class="fa-solid ${getPropertyIcon(property.type)}"></i>
                ${escapeHTML(
                  property.type.charAt(0).toUpperCase() +
                  property.type.slice(1)
                )}
              </span>

              <span>
                <i class="fa-solid fa-location-dot"></i>
                ${escapeHTML(location)}
              </span>
            </div>

            <h3>${escapeHTML(property.title)}</h3>

            <p class="property-description">
              ${escapeHTML(property.description)}
            </p>

            <div class="property-specs">
              ${specs}
            </div>

            <div class="property-footer">

              <div>
                <span class="property-price-label">
                  ${property.purpose === "rent" ? "Rent" : "Price"}
                </span>

                <strong>${escapeHTML(property.priceDisplay)}</strong>
              </div>

              <button
                type="button"
                class="property-details-btn"
                data-property-id="${escapeHTML(property.id)}"
              >
                View Details
                <i class="fa-solid fa-arrow-right"></i>
              </button>

            </div>

          </div>

        </article>
      `;
    })
    .join("");
};

renderProperties();

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const header = document.getElementById("site-header");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mainNav = document.getElementById("main-nav");

  const filterButtons = document.querySelectorAll(".filter-btn");
  const propertyCards = document.querySelectorAll(".property-card");

  const searchForm = document.getElementById("property-search-form");

  const contactForm = document.getElementById("contact-form");
  const contactSubmitBtn = document.getElementById("contact-submit-btn");
  const formStatus = document.getElementById("form-status");

  const backToTopBtn = document.getElementById("back-to-top");

  const currentYear = document.getElementById("current-year");


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const closeMobileMenu = () => {
    if (!mainNav || !mobileMenuBtn) return;

    mainNav.classList.remove("open");
    mobileMenuBtn.setAttribute("aria-expanded", "false");

    const icon = mobileMenuBtn.querySelector("i");

    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }

    document.body.classList.remove("menu-open");
  };


  const toggleMobileMenu = () => {
    if (!mainNav || !mobileMenuBtn) return;

    const isOpen = mainNav.classList.toggle("open");

    mobileMenuBtn.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    const icon = mobileMenuBtn.querySelector("i");

    if (icon) {
      icon.classList.toggle("fa-bars", !isOpen);
      icon.classList.toggle("fa-xmark", isOpen);
    }

    document.body.classList.toggle("menu-open", isOpen);
  };


  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener(
      "click",
      toggleMobileMenu
    );
  }


  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });


  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  });


  /* =======================================================
     ACTIVE NAVIGATION LINK
  ======================================================= */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navLinks = document.querySelectorAll(
    ".nav-link"
  );

  const updateActiveNav = () => {
    const scrollPosition =
      window.scrollY + 130;

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      link.classList.toggle(
        "active",
        href === `#${currentSection}`
      );
    });
  };

  updateActiveNav();

  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );


  /* =======================================================
     PROPERTY FILTER
  ======================================================= */

  const filterProperties = (filter) => {
    propertyCards.forEach((card) => {
      const type = card.dataset.propertyType;

      if (filter === "all" || type === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  };


  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const filter =
        button.dataset.filter || "all";

      filterProperties(filter);

      const grid =
        document.getElementById("property-grid");

      if (grid) {
        grid.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }
    });
  });


  /* =======================================================
     PROPERTY SEARCH
  ======================================================= */

  if (searchForm) {

    searchForm.addEventListener("submit", (event) => {

      event.preventDefault();

      const purpose =
        document.getElementById(
          "search-purpose"
        )?.value || "all";

      const type =
        document.getElementById(
          "search-type"
        )?.value || "all";

      const location =
        document.getElementById(
          "search-location"
        )?.value || "all";


      let visibleCount = 0;


      propertyCards.forEach((card) => {

        const cardPurpose =
          card.dataset.purpose || "all";

        const cardType =
          card.dataset.propertyType || "all";

        const cardLocation =
          card.dataset.location || "all";


        const purposeMatch =
          purpose === "all" ||
          purpose === cardPurpose;

        const typeMatch =
          type === "all" ||
          type === cardType;

        const locationMatch =
          location === "all" ||
          location === cardLocation;


        const shouldShow =
          purposeMatch &&
          typeMatch &&
          locationMatch;


        if (shouldShow) {

          card.classList.remove("hidden");

          visibleCount++;

        } else {

          card.classList.add("hidden");

        }

      });


      const propertiesSection =
        document.getElementById("properties");

      if (propertiesSection) {

        propertiesSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }


      const existingMessage =
        document.querySelector(
          ".search-result-message"
        );

      if (existingMessage) {
        existingMessage.remove();
      }


      const message =
        document.createElement("div");

      message.className =
        "search-result-message";


      if (visibleCount === 0) {

        message.innerHTML = `
          <i class="fa-solid fa-circle-info"></i>
          <span>
            We couldn't find a matching property in the current listings.
            Contact us and we'll help you find suitable options.
          </span>
        `;

      } else {

        message.innerHTML = `
          <i class="fa-solid fa-circle-check"></i>
          <span>
            Showing ${visibleCount}
            ${visibleCount === 1 ? "property" : "properties"}
            matching your search.
          </span>
        `;

      }


      const propertyGrid =
        document.getElementById(
          "property-grid"
        );


      if (propertyGrid) {

        propertyGrid.insertAdjacentElement(
          "afterend",
          message
        );

      }

    });

  }


  /* =======================================================
     RESET PROPERTY SEARCH WHEN FILTER BUTTON USED
  ======================================================= */

  filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const message =
        document.querySelector(
          ".search-result-message"
        );

      if (message) {
        message.remove();
      }

      const searchPurpose =
        document.getElementById(
          "search-purpose"
        );

      const searchType =
        document.getElementById(
          "search-type"
        );

      const searchLocation =
        document.getElementById(
          "search-location"
        );


      if (searchPurpose) {
        searchPurpose.value = "all";
      }

      if (searchType) {
        searchType.value = "all";
      }

      if (searchLocation) {
        searchLocation.value = "all";
      }

    });

  });


  /* =======================================================
     FAVORITE PROPERTY BUTTON
  ======================================================= */

  const favoriteButtons =
    document.querySelectorAll(
      ".favorite-btn"
    );


  favoriteButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const icon =
        button.querySelector("i");

      if (!icon) return;


      const isActive =
        button.classList.toggle("active");


      if (isActive) {

        icon.classList.remove(
          "fa-regular"
        );

        icon.classList.add(
          "fa-solid"
        );

        button.setAttribute(
          "aria-label",
          "Remove saved property"
        );

      } else {

        icon.classList.remove(
          "fa-solid"
        );

        icon.classList.add(
          "fa-regular"
        );

        button.setAttribute(
          "aria-label",
          "Save property"
        );

      }

    });

  });


  /* =======================================================
     PROPERTY ENQUIRY LINKS
  ======================================================= */

  const propertyLinks =
    document.querySelectorAll(
      ".property-link"
    );


  propertyLinks.forEach((link) => {

    link.addEventListener("click", () => {

      const propertyName =
        link.dataset.property;

      const messageField =
        document.getElementById("message");


      if (
        propertyName &&
        messageField
      ) {

        messageField.value =
          `Hello, I am interested in "${propertyName}". Please share more details, price and availability.`;

      }

    });

  });


  /* =======================================================
     CONTACT FORM
  ======================================================= */

  const setFormStatus = (
    message,
    type = ""
  ) => {

    if (!formStatus) return;

    formStatus.textContent = message;

    formStatus.classList.remove(
      "success",
      "error"
    );

    if (type) {
      formStatus.classList.add(type);
    }

  };


  const setSubmitLoading = (
    loading
  ) => {

    if (!contactSubmitBtn) return;

    contactSubmitBtn.disabled =
      loading;


    if (loading) {

      contactSubmitBtn.innerHTML = `
        Sending...
        <i class="fa-solid fa-spinner fa-spin"></i>
      `;

    } else {

      contactSubmitBtn.innerHTML = `
        Send Enquiry
        <i class="fa-solid fa-paper-plane"></i>
      `;

    }

  };


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();

        setFormStatus("");

        const formData =
          new FormData(contactForm);


        const name =
          String(
            formData.get("name") || ""
          ).trim();

        const email =
          String(
            formData.get("email") || ""
          ).trim();

        const phone =
          String(
            formData.get("phone") || ""
          ).trim();

        const interest =
          String(
            formData.get("interest") || ""
          ).trim();

        const budget =
          String(
            formData.get("budget") || ""
          ).trim();

        const message =
          String(
            formData.get("message") || ""
          ).trim();


        if (
          !name ||
          !email ||
          !phone ||
          !interest ||
          !message
        ) {

          setFormStatus(
            "Please fill in all required fields.",
            "error"
          );

          return;

        }


        const emailPattern =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

          setFormStatus(
            "Please enter a valid email address.",
            "error"
          );

          return;

        }


        const cleanedPhone =
          phone.replace(/\D/g, "");


        if (
          cleanedPhone.length < 10
        ) {

          setFormStatus(
            "Please enter a valid phone number.",
            "error"
          );

          return;

        }


        setSubmitLoading(true);


        try {

          const payload = {
            name,
            email,
            phone,
            interest,
            budget,
            message
          };


          const response =
            await fetch(
              "/submit-form",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json"
                },

                body:
                  JSON.stringify(payload)
              }
            );


          if (!response.ok) {
            throw new Error(
              "Server returned an error."
            );
          }


          let result = null;

          const contentType =
            response.headers.get(
              "content-type"
            );


          if (
            contentType &&
            contentType.includes(
              "application/json"
            )
          ) {

            result =
              await response.json();

          }


          /*
             The current backend redirects after
             successfully sending the email.

             We therefore treat any successful
             HTTP response as a successful enquiry.
          */

          if (
            !result ||
            result.success !== false
          ) {

            setFormStatus(
              "Your enquiry has been sent successfully. We'll contact you soon.",
              "success"
            );

            contactForm.reset();


            /*
              Optional WhatsApp follow-up button
            */

            const whatsappMessage =
              encodeURIComponent(
                `Hello Bhavesh Property, my name is ${name}. I am interested in ${interest}. ${message}`
              );


            const existingWhatsapp =
              document.querySelector(
                ".form-whatsapp-followup"
              );


            if (!existingWhatsapp) {

              const followup =
                document.createElement(
                  "a"
                );

              followup.href =
                `https://wa.me/919909004699?text=${whatsappMessage}`;

              followup.target = "_blank";

              followup.rel =
                "noopener noreferrer";

              followup.className =
                "form-whatsapp-followup";

              followup.innerHTML = `
                <i class="fa-brands fa-whatsapp"></i>
                Prefer WhatsApp? Send us a message
              `;


              formStatus.insertAdjacentElement(
                "afterend",
                followup
              );

            }

          } else {

            throw new Error(
              result.message ||
              "Unable to send enquiry."
            );

          }

        } catch (error) {

          console.error(
            "Contact form error:",
            error
          );


          setFormStatus(
            "We couldn't send your enquiry right now. Please contact us directly on WhatsApp or phone.",
            "error"
          );

        } finally {

          setSubmitLoading(false);

        }

      }
    );

  }


  /* =======================================================
     BACK TO TOP
  ======================================================= */

  const updateBackToTop =
    () => {

      if (!backToTopBtn) return;

      if (window.scrollY > 700) {

        backToTopBtn.classList.add(
          "visible"
        );

      } else {

        backToTopBtn.classList.remove(
          "visible"
        );

      }

    };


  updateBackToTop();


  window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
  );


  if (backToTopBtn) {

    backToTopBtn.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /* =======================================================
     SMOOTH SCROLL FOR INTERNAL LINKS
  ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {

        closeMobileMenu();

      }

    }
  );


  /* =======================================================
     IMAGE FALLBACK
  ======================================================= */

  document
    .querySelectorAll(
      ".property-image img, .about-image-main img"
    )
    .forEach((image) => {

      image.addEventListener(
        "error",
        () => {

          image.style.display =
            "none";

          const parent =
            image.parentElement;


          if (parent) {

            parent.style.background =
              "linear-gradient(135deg, #e8e2d7, #cbb99b)";

          }

        }
      );

    });


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  filterProperties("all");

  /* =====================================================
   THEME SWITCHER
  ===================================================== */

const themeDropdown = document.querySelector(".theme-dropdown");
const themeToggle = document.getElementById("theme-toggle");
const themeMenu = document.getElementById("theme-menu");
const themeOptions = document.querySelectorAll(".theme-option");

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
  const useDarkTheme =
    theme === "dark" ||
    (theme === "system" && systemTheme.matches);

  document.body.classList.toggle("dark-theme", useDarkTheme);

  themeOptions.forEach((option) => {
    option.classList.toggle(
      "active",
      option.dataset.theme === theme
    );
  });

  // Update PWA/browser theme color
  const themeColor = document.querySelector('meta[name="theme-color"]');

  if (themeColor) {
    themeColor.setAttribute(
      "content",
      useDarkTheme ? "#0f172a" : "#a67c3d"
    );
  }
}

function setTheme(theme) {
  localStorage.setItem("website-theme", theme);
  applyTheme(theme);
}

/* Load saved theme */
const savedTheme = localStorage.getItem("website-theme") || "system";
applyTheme(savedTheme);

/* Open / close dropdown */
themeToggle.addEventListener("click", (event) => {
  event.stopPropagation();

  const isOpen = themeDropdown.classList.toggle("open");

  themeToggle.setAttribute("aria-expanded", isOpen);
});

/* Select Light / Dark / System */
themeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const selectedTheme = option.dataset.theme;

    setTheme(selectedTheme);

    themeDropdown.classList.remove("open");
    themeToggle.setAttribute("aria-expanded", "false");
  });
});

/* Close dropdown when clicking outside */
document.addEventListener("click", (event) => {
  if (!themeDropdown.contains(event.target)) {
    themeDropdown.classList.remove("open");
    themeToggle.setAttribute("aria-expanded", "false");
  }
});

/* Follow system changes when System Default is selected */
systemTheme.addEventListener("change", () => {
  const currentTheme = localStorage.getItem("website-theme") || "system";

  if (currentTheme === "system") {
    applyTheme("system");
  }
});

});