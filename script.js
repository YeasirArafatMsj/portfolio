/* =========================================================
   YEASIR ARAFAT — HOME PAGE MASTER SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR — SCROLL EFFECT
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    const handleNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", handleNavbar);
    handleNavbar();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("mobile-open");

            menuToggle.classList.toggle("active");

            if (navMenu.classList.contains("mobile-open")) {
                menuToggle.innerHTML = "✕";
            } else {
                menuToggle.innerHTML = "☰";
            }

        });


        /* Close menu after clicking a link */

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("mobile-open");

                menuToggle.classList.remove("active");

                menuToggle.innerHTML = "☰";

            });

        });

    }


    /* =====================================================
       HERO MOUSE PARALLAX
    ===================================================== */

    const hero = document.querySelector(".hero");
    const heroBackground = document.querySelector(".hero-background");
    const heroContent = document.querySelector(".hero-content");

    if (hero && heroBackground) {

        hero.addEventListener("mousemove", (event) => {

            const rect = hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;


            heroBackground.style.transform =
                `scale(1.08) translate(${x * -10}px, ${y * -10}px)`;


            if (heroContent) {

                heroContent.style.transform =
                    `translate(${x * 4}px, ${y * 4}px)`;

            }

        });


        hero.addEventListener("mouseleave", () => {

            heroBackground.style.transform =
                "scale(1.05) translate(0, 0)";

            if (heroContent) {
                heroContent.style.transform =
                    "translate(0, 0)";
            }

        });

    }


    /* =====================================================
       HERO BACKGROUND SLIDER
       ULAB → JOURNALISM → BUSINESS → TRAVEL
    ===================================================== */

    const heroSlides = [
        "assets/images/journey/ulab.jpg",
        "assets/images/journalism/journalism-bg.jpg",
        "assets/images/business/business-bg.jpg",
        "assets/images/travel/travel-bg.jpg"
    ];

    let currentHeroSlide = 0;

    if (heroBackground && heroSlides.length > 1) {

        const changeHeroBackground = () => {

            heroBackground.classList.add("hero-changing");

            setTimeout(() => {

                currentHeroSlide =
                    (currentHeroSlide + 1) %
                    heroSlides.length;

                heroBackground.style.backgroundImage =
                    `url("${heroSlides[currentHeroSlide]}")`;

                heroBackground.classList.remove(
                    "hero-changing"
                );

            }, 600);

        };


        /* Keep ULAB as first image */

        heroBackground.style.backgroundImage =
            `url("${heroSlides[0]}")`;


        setInterval(
            changeHeroBackground,
            7000
        );

    }


    /* =====================================================
       IMAGE / SECTION SLIDER
       For Home Page 4 Visual Sections
    ===================================================== */

    const visualSlider =
        document.querySelector(".visual-slider");

    if (visualSlider) {

        const slides =
            visualSlider.querySelectorAll(".visual-slide");

        const dots =
            document.querySelectorAll(".visual-dot");

        let activeSlide = 0;

        const showSlide = (index) => {

            if (!slides.length) return;

            slides.forEach((slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === index
                );

            });

            dots.forEach((dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === index
                );

            });

        };


        dots.forEach((dot, index) => {

            dot.addEventListener("click", () => {

                activeSlide = index;

                showSlide(activeSlide);

            });

        });


        setInterval(() => {

            activeSlide =
                (activeSlide + 1) %
                slides.length;

            showSlide(activeSlide);

        }, 6500);

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .section-title, .project-row, .story-section, .business-section, .travel-section, .contact-section"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            element.classList.add("reveal-ready");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("is-visible");

        });

    }


    /* =====================================================
       PROJECT ROW PARALLAX
    ===================================================== */

    const projectRows =
        document.querySelectorAll(".project-row");


    projectRows.forEach(row => {

        const image =
            row.querySelector(
                ".project-image img"
            );


        if (!image) return;


        row.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    row.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height - 0.5;


                image.style.transform =
                    `scale(1.04) translate(${x * 8}px, ${y * 8}px)`;

            }
        );


        row.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "scale(1) translate(0, 0)";

            }
        );

    });


    /* =====================================================
       PROJECT IMAGE HOVER
    ===================================================== */

    document
        .querySelectorAll(".project-image")
        .forEach(imageBox => {

            imageBox.addEventListener(
                "mouseenter",
                () => {

                    imageBox.classList.add(
                        "image-hover"
                    );

                }
            );


            imageBox.addEventListener(
                "mouseleave",
                () => {

                    imageBox.classList.remove(
                        "image-hover"
                    );

                }
            );

        });


    /* =====================================================
       BUSINESS / TRAVEL IMAGE EFFECT
    ===================================================== */

    document
        .querySelectorAll(
            ".business-image, .travel-image, .story-image"
        )
        .forEach(imageBox => {

            imageBox.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        imageBox.getBoundingClientRect();

                    const x =
                        (event.clientX - rect.left) /
                        rect.width - 0.5;

                    const y =
                        (event.clientY - rect.top) /
                        rect.height - 0.5;


                    const image =
                        imageBox.querySelector("img");


                    if (image) {

                        image.style.transform =
                            `scale(1.05) translate(${x * 7}px, ${y * 7}px)`;

                    }

                }
            );


            imageBox.addEventListener(
                "mouseleave",
                () => {

                    const image =
                        imageBox.querySelector("img");


                    if (image) {

                        image.style.transform =
                            "scale(1) translate(0, 0)";

                    }

                }
            );

        });


    /* =====================================================
       COUNTER ANIMATION
       Works for elements with data-count
    ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );


    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        const counter =
                            entry.target;

                        const target =
                            Number(
                                counter.dataset.count
                            );

                        const duration = 1600;

                        const startTime =
                            performance.now();


                        const updateCounter =
                            currentTime => {

                                const progress =
                                    Math.min(
                                        (currentTime - startTime) /
                                        duration,
                                        1
                                    );


                                const eased =
                                    1 -
                                    Math.pow(
                                        1 - progress,
                                        3
                                    );


                                counter.textContent =
                                    Math.floor(
                                        target * eased
                                    );


                                if (progress < 1) {

                                    requestAnimationFrame(
                                        updateCounter
                                    );

                                } else {

                                    counter.textContent =
                                        target;

                                }

                            };


                        requestAnimationFrame(
                            updateCounter
                        );


                        counterObserver.unobserve(
                            counter
                        );

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    }


    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ===================================================== */

    document
        .querySelectorAll(
            ".btn, .portfolio-button, .about-button, .business-button, .travel-button, .contact-button"
        )
        .forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    button.style.transform =
                        `translate(${x * 0.08}px, ${y * 0.08}px)`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        });


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        document.querySelector(
            ".nav-search input"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            event => {

                if (event.key !== "Enter") return;

                const query =
                    searchInput.value
                        .trim()
                        .toLowerCase();


                if (!query) return;


                const searchableElements =
                    document.querySelectorAll(
                        "h1, h2, h3, h4, p, a"
                    );


                let found = null;


                searchableElements.forEach(element => {

                    if (found) return;

                    if (
                        element.textContent
                            .toLowerCase()
                            .includes(query)
                    ) {

                        found = element;

                    }

                });


                if (found) {

                    found.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });


                    found.classList.add(
                        "search-highlight"
                    );


                    setTimeout(() => {

                        found.classList.remove(
                            "search-highlight"
                        );

                    }, 1800);

                } else {

                    searchInput.classList.add(
                        "search-no-result"
                    );


                    setTimeout(() => {

                        searchInput.classList.remove(
                            "search-no-result"
                        );

                    }, 1000);

                }

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) return;


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navbarHeight -
                        20;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    const cursorGlow =
        document.createElement("div");

    cursorGlow.className =
        "cursor-glow";

    document.body.appendChild(
        cursorGlow
    );


    let cursorX = 0;
    let cursorY = 0;

    let glowX = 0;
    let glowY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            cursorX = event.clientX;
            cursorY = event.clientY;

        }
    );


    const animateCursor = () => {

        glowX +=
            (cursorX - glowX) * 0.12;

        glowY +=
            (cursorY - glowY) * 0.12;


        cursorGlow.style.transform =
            `translate3d(${glowX}px, ${glowY}px, 0)`;


        requestAnimationFrame(
            animateCursor
        );

    };


    animateCursor();


    /* =====================================================
       CURSOR HOVER STATES
    ===================================================== */

    document
        .querySelectorAll(
            "a, button, .project-card, .project-image"
        )
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    document.body.classList.add(
                        "cursor-hover"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    document.body.classList.remove(
                        "cursor-hover"
                    );

                }
            );

        });


    /* =====================================================
       CONTACT FORM — FRONT-END FEEDBACK
    ===================================================== */

    const contactForm =
        document.querySelector(
            ".contact-form"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const button =
                    contactForm.querySelector(
                        "button[type='submit']"
                    );


                if (!button) return;


                const originalText =
                    button.textContent;


                button.textContent =
                    "MESSAGE READY";


                button.classList.add(
                    "form-success"
                );


                setTimeout(() => {

                    button.textContent =
                        originalText;

                    button.classList.remove(
                        "form-success"
                    );

                }, 2200);

            }
        );

    }


    /* =====================================================
       IMAGE LOAD FADE
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            if (img.complete) {

                img.classList.add(
                    "image-loaded"
                );

            } else {

                img.addEventListener(
                    "load",
                    () => {

                        img.classList.add(
                            "image-loaded"
                        );

                    }
                );

            }

        });


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add(
                "page-loaded"
            );

        }
    );

});
