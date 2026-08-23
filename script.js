/* =========================================================
   YEASIR ARAFAT — HOME PAGE FINAL STABLE SCRIPT
   Works with the current index.html + style.css
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    const hero = document.querySelector(".hero");
    const heroSlides = document.querySelectorAll(".hero-slide");
    const heroDots = document.querySelectorAll(".hero-dot");
    const heroPrev = document.querySelector(".hero-prev");
    const heroNext = document.querySelector(".hero-next");


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const handleNavbar = () => {

        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );

    };

    window.addEventListener(
        "scroll",
        handleNavbar,
        { passive: true }
    );

    handleNavbar();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("mobile-open");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.innerHTML =
                isOpen ? "✕" : "☰";

        });


        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove(
                    "mobile-open"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.innerHTML = "☰";

            });

        });

    }


    /* =====================================================
       HERO SLIDER
       01 → ULAB
       02 → JOURNALISM
       03 → BUSINESS
       04 → TRAVEL
    ===================================================== */

    let currentSlide = 0;
    let heroTimer = null;
    let isChangingSlide = false;


    const showHeroSlide = (index) => {

        if (!heroSlides.length) return;

        if (index < 0) {
            index = heroSlides.length - 1;
        }

        if (index >= heroSlides.length) {
            index = 0;
        }

        currentSlide = index;


        heroSlides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });


        heroDots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    };


    const nextHeroSlide = () => {

        if (isChangingSlide) return;

        isChangingSlide = true;

        showHeroSlide(
            currentSlide + 1
        );

        setTimeout(() => {

            isChangingSlide = false;

        }, 900);

    };


    const previousHeroSlide = () => {

        if (isChangingSlide) return;

        isChangingSlide = true;

        showHeroSlide(
            currentSlide - 1
        );

        setTimeout(() => {

            isChangingSlide = false;

        }, 900);

    };


    const startHeroTimer = () => {

        clearInterval(heroTimer);

        heroTimer = setInterval(
            nextHeroSlide,
            7000
        );

    };


    if (heroSlides.length) {

        showHeroSlide(0);

        startHeroTimer();


        if (heroNext) {

            heroNext.addEventListener(
                "click",
                () => {

                    nextHeroSlide();

                    startHeroTimer();

                }
            );

        }


        if (heroPrev) {

            heroPrev.addEventListener(
                "click",
                () => {

                    previousHeroSlide();

                    startHeroTimer();

                }
            );

        }


        heroDots.forEach((dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    showHeroSlide(index);

                    startHeroTimer();

                }
            );

        });


        /* Pause slider while hovering */

        if (hero) {

            hero.addEventListener(
                "mouseenter",
                () => {

                    clearInterval(heroTimer);

                }
            );


            hero.addEventListener(
                "mouseleave",
                () => {

                    startHeroTimer();

                }
            );

        }

    }


    /* =====================================================
       HERO MOUSE PARALLAX
    ===================================================== */

    if (
        hero &&
        window.matchMedia(
            "(hover: hover)"
        ).matches
    ) {

        hero.addEventListener(
            "mousemove",
            event => {

                const activeSlide =
                    hero.querySelector(
                        ".hero-slide.active"
                    );

                if (!activeSlide) return;


                const background =
                    activeSlide.querySelector(
                        ".hero-background"
                    );

                const content =
                    activeSlide.querySelector(
                        ".hero-content"
                    );


                if (!background) return;


                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;


                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;


                background.style.transform =
                    `scale(1.08) translate(${x * -10}px, ${y * -10}px)`;


                if (content) {

                    content.style.transform =
                        `translate(${x * 4}px, ${y * 4}px)`;

                }

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                const activeSlide =
                    hero.querySelector(
                        ".hero-slide.active"
                    );

                if (!activeSlide) return;


                const background =
                    activeSlide.querySelector(
                        ".hero-background"
                    );

                const content =
                    activeSlide.querySelector(
                        ".hero-content"
                    );


                if (background) {

                    background.style.transform =
                        "scale(1.06) translate(0, 0)";

                }


                if (content) {

                    content.style.transform =
                        "translate(0, 0)";

                }

            }
        );

    }


    /* =====================================================
       KEYBOARD HERO CONTROL
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "ArrowRight" ||
                event.key === "ArrowDown"
            ) {

                nextHeroSlide();

                startHeroTimer();

            }


            if (
                event.key === "ArrowLeft" ||
                event.key === "ArrowUp"
            ) {

                previousHeroSlide();

                startHeroTimer();

            }

        }
    );


    /* =====================================================
       TOUCH / SWIPE HERO
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    if (hero) {

        hero.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        hero.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0].screenX;

                const distance =
                    touchEndX - touchStartX;


                if (Math.abs(distance) < 50) {
                    return;
                }


                if (distance < 0) {

                    nextHeroSlide();

                } else {

                    previousHeroSlide();

                }

                startHeroTimer();

            },
            { passive: true }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".service-card, " +
            ".showcase-project, " +
            ".about-preview-grid, " +
            ".achievement-card, " +
            ".life-card, " +
            ".statement-content, " +
            ".contact-cta-content"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.classList.add(
                            "is-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -45px 0px"
                }
            );


        revealElements.forEach(element => {

            element.classList.add(
                "reveal-ready"
            );

            revealObserver.observe(
                element
            );

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "is-visible"
            );

        });

    }


    /* =====================================================
       PROJECT IMAGE PARALLAX
    ===================================================== */

    document
        .querySelectorAll(".showcase-image")
        .forEach(imageBox => {

            const image =
                imageBox.querySelector("img");

            if (!image) return;


            imageBox.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        imageBox.getBoundingClientRect();


                    const x =
                        (event.clientX - rect.left) /
                        rect.width -
                        0.5;


                    const y =
                        (event.clientY - rect.top) /
                        rect.height -
                        0.5;


                    image.style.transform =
                        `scale(1.06) translate(${x * 6}px, ${y * 6}px)`;

                }
            );


            imageBox.addEventListener(
                "mouseleave",
                () => {

                    image.style.transform =
                        "scale(1) translate(0, 0)";

                }
            );

        });


    /* =====================================================
       LIFE IMAGE PARALLAX
    ===================================================== */

    document
        .querySelectorAll(".life-image")
        .forEach(imageBox => {

            const image =
                imageBox.querySelector("img");

            if (!image) return;


            imageBox.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        imageBox.getBoundingClientRect();


                    const x =
                        (event.clientX - rect.left) /
                        rect.width -
                        0.5;


                    const y =
                        (event.clientY - rect.top) /
                        rect.height -
                        0.5;


                    image.style.transform =
                        `scale(1.06) translate(${x * 7}px, ${y * 7}px)`;

                }
            );


            imageBox.addEventListener(
                "mouseleave",
                () => {

                    image.style.transform =
                        "scale(1) translate(0, 0)";

                }
            );

        });


    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ===================================================== */

    document
        .querySelectorAll(
            ".btn, " +
            ".section-button, " +
            ".shape-button, " +
            ".text-link"
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
                        `translate(${x * 0.06}px, ${y * 0.06}px)`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform = "";

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

                if (event.key !== "Enter") {
                    return;
                }


                const query =
                    searchInput.value
                        .trim()
                        .toLowerCase();


                if (!query) return;


                const searchableElements =
                    document.querySelectorAll(
                        "h1, h2, h3, p, a"
                    );


                let found = null;


                for (
                    const element
                    of searchableElements
                ) {

                    if (
                        element.textContent
                            .toLowerCase()
                            .includes(query)
                    ) {

                        found = element;

                        break;

                    }

                }


                if (found) {

                    found.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });


                    found.classList.add(
                        "search-highlight"
                    );


                    setTimeout(
                        () => {

                            found.classList.remove(
                                "search-highlight"
                            );

                        },
                        1800
                    );

                } else {

                    searchInput.classList.add(
                        "search-no-result"
                    );


                    setTimeout(
                        () => {

                            searchInput.classList.remove(
                                "search-no-result"
                            );

                        },
                        1000
                    );

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

    let cursorGlow =
        document.querySelector(
            ".cursor-glow"
        );


    if (!cursorGlow) {

        cursorGlow =
            document.createElement("div");

        cursorGlow.className =
            "cursor-glow";

        document.body.appendChild(
            cursorGlow
        );

    }


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
            "a, button, .service-card, " +
            ".showcase-image, .life-card"
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
       IMAGE LOAD
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

                    },
                    { once: true }
                );

            }

        });


    /* =====================================================
       CONTACT FORM
       Only if a form exists
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


                setTimeout(
                    () => {

                        button.textContent =
                            originalText;

                        button.classList.remove(
                            "form-success"
                        );

                    },
                    2200
                );

            }
        );

    }


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
