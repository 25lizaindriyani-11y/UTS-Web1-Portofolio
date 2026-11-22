
/* =========================================
   1. MOBILE NAVIGATION
========================================= */
// Select navigation elements from the DOM
const menuToggle = document.getElementById("menu-toggle");
const primaryNav = document.getElementById("primary-nav");

// Open and close the mobile navigation
if (menuToggle && primaryNav) {

    menuToggle.addEventListener("click", function () {

        // Toggle the navigation menu
        const isOpen = primaryNav.classList.toggle("is-open");

        // Update accessibility attributes
        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
        );

    });

    // Close the menu after a navigation link is clicked
    const navLinks = primaryNav.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            primaryNav.classList.remove("is-open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Buka menu navigasi"
            );

        });

    });

}


/* =========================================
   2. PROJECT FILTER
========================================= */
// Select filter buttons and project cards
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

// Add click events to each filter button
filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Get selected category from the button
        const selectedFilter = button.dataset.filter;

        // Update active button appearance
        filterButtons.forEach(function (item) {

            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");

        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");


        // Show or hide projects based on category
        projectCards.forEach(function (card) {

            const projectCategory = card.dataset.category;
            const shouldShow =
                selectedFilter === "all" ||
                selectedFilter === projectCategory;

            card.classList.toggle("is-filtered", !shouldShow);

        });

    });

});


/* =========================================
   3. SCROLL REVEAL ANIMATION
========================================= */
// Select elements that will appear while scrolling
const revealElements = document.querySelectorAll(".reveal");

// Check browser support for Intersection Observer
if ("IntersectionObserver" in window) {

    // Create an observer to detect visible elements
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                // Check whether the element enters the viewport
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    entry.target.classList.remove("is-hidden");

                    // Stop observing after the animation occurs
                    observer.unobserve(entry.target);
                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }

    );

    // Prepare and observe every reveal element
    revealElements.forEach(function (element) {
        element.classList.add("is-hidden");

        revealObserver.observe(element);
    });

} else {

    // Show all elements if the browser does not support Intersection Observer
    revealElements.forEach(function (element) {
        element.classList.add("is-visible");
    });

}


/* =========================================
   4. DYNAMIC FOOTER YEAR
========================================= */
// Select the year element in the footer
const currentYear = document.getElementById("current-year");

// Display the current year automatically
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
