// SmileBright Dental Clinic JavaScript
document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const navbar = document.querySelector(".navbar");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link, .btn-appointment");

    // --- 1. Mobile Menu Toggle ---
    const toggleMenu = () => {
        const isActive = navMenu.classList.toggle("active");
        hamburgerBtn.classList.toggle("active");
        
        // Prevent scrolling on body when mobile menu is open
        document.body.style.overflow = isActive ? "hidden" : "";
    };

    const closeMenu = () => {
        if (navMenu && hamburgerBtn) {
            navMenu.classList.remove("active");
            hamburgerBtn.classList.remove("active");
        }
        document.body.style.overflow = "";
    };

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking outside of it
        document.addEventListener("click", (e) => {
            if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // --- 2. Close Menu on Link Click ---
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    // --- 3. Navbar Scroll Transition ---
    const handleScroll = () => {
        if (navbar) {
            if (window.scrollY > 20) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    };

    // Run once at start to check scroll position
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // --- 4. Detect Active Page and Highlight Link ---
    const currentPath = window.location.pathname;
    let pageName = currentPath.split("/").pop();
    
    // Map root or index directory paths to index.html
    if (pageName === "" || pageName === "dentist-website" || pageName === "index") {
        pageName = "index.html";
    }

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === pageName) {
            link.classList.add("active");
        }
    });

    // --- 5. Resize Event Listener ---
    // Reset mobile menu if window is resized above mobile breakpoint (768px)
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});
