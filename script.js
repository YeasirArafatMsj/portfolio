/* =========================================================
   YEASIR ARAFAT — HOME PAGE MASTER SCRIPT
   Slider + Dots + Auto Slide + Button Effects + Reveal
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HERO / FEATURED SLIDER
    ===================================================== */

    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");

    let currentSlide = 0;
    let slideTimer;


    function showSlide(index) {

        if (!slides.length) return;

        currentSlide = index;

        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });


        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    }


    function nextSlide() {

        if (!slides.length) return;

        currentSlide =
            (currentSlide + 1) % slides.length;

        showSlide(currentSlide);

    }


    function startSlider() {

        clearInterval(slideTimer);

        if (slides.length > 1) {

            slideTimer = setInterval(
                nextSlide,
                6000
            );

        }

    }


    /* DOT CLICK */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showSlide(index);

            startSlider();

        });

    });


    /* INITIAL SLIDE */

    if (slides.length) {

        showSlide(0);

        startSlider();

    }


    /* =====================================================
       SLIDER TOUCH / SWIPE SUPPORT
    ===================================================== */

    const slider =
        document.querySelector(".hero-slider");

    let touchStartX = 0;
    let touchEndX = 0;


    if (slider) {

        slider.addEventListener(
            "touchstart",
            (event) => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        slider.addEventListener(
            "touchend",
            (event) => {

                touchEndX =
                    event.changedTouches[0].screenX;

                const difference =
                    touchStartX - touchEndX;


                if (Math.abs(difference) < 50) {
                    return;
                }


                if (difference > 0) {

                    nextSlide();

                } else {

                    currentSlide =
                        (currentSlide - 1 + slides.length)
                        % slides.length;

                    showSlide(currentSlide);

                }


                startSlider();

            },
            { passive: true }
        );

    }


    /* =====================================================
       BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .portfolio-button, .about-button, .business-button, .travel-button, .contact-button, .more-button"
        );


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");

                ripple.classList.add("button-ripple");


                const rect =
                    this.getBoundingClientRect();


                ripple.style.left =
                    `${event.clientX - rect.left}px`;

                ripple.style.top =
                    `${event.clientY - rect.top}px`;


                this.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 700);

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .section-title, .project-row, .story-section, .business-section, .travel-section, .contact-section"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach((element) => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("revealed");

        });

    }


    /* =====================================================
       IMAGE PARALLAX
    ===================================================== */

    const parallaxImages =
        document.querySelectorAll(
            ".project-image img, .about-image img, .business-image img, .travel-image img"
        );


    window.addEventListener(
        "scroll",
        () => {

            const scrollY =
                window.scrollY;


            parallaxImages.forEach((image) => {

                const rect =
                    image.getBoundingClientRect();


                if (
                    rect.bottom < 0 ||
                    rect.top > window.innerHeight
                ) {
                    return;
                }


                const movement =
                    (window.innerHeight / 2 -
                        (rect.top + rect.height / 2))
                    * 0.025;


                image.style.transform =
                    `translateY(${movement}px) scale(1.04)`;

            });

        },
        { passive: true }
    );


    /* =====================================================
       CARD MOUSE TILT
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".project-row, .business-card, .travel-card"
        );


    cards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 850) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) / 35;

                const rotateY =
                    (centerX - x) / 35;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
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
                        document.querySelector(targetId);


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


    /* =====================================================
       ACTIVE NAVIGATION ON SCROLL
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );


    if (sections.length && navLinks.length) {

        window.addEventListener(
            "scroll",
            () => {

                let currentSection = "";


                sections.forEach((section) => {

                    const sectionTop =
                        section.offsetTop - 180;


                    if (
                        window.scrollY >= sectionTop
                    ) {

                        currentSection =
                            section.getAttribute("id");

                    }

                });


                navLinks.forEach((link) => {

                    link.classList.remove(
                        "active"
                    );


                    const href =
                        link.getAttribute("href");


                    if (
                        href &&
                        href === `#${currentSection}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });

            },
            { passive: true }
        );

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".nav-menu");


    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                mobileMenu.classList.toggle(
                    "mobile-open"
                );


                menuToggle.classList.toggle(
                    "active"
                );

            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove(
                            "mobile-open"
                        );

                        menuToggle.classList.remove(
                            "active"
                        );

                    }
                );

            });

    }


    /* =====================================================
       BUTTON HOVER GLOW
    ===================================================== */

    buttons.forEach((button) => {

        button.addEventListener(
            "mouseenter",
            () => {

                button.style.setProperty(
                    "--mouse-x",
                    "50%"
                );

                button.style.setProperty(
                    "--mouse-y",
                    "50%"
                );

            }
        );


        button.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    ((event.clientX - rect.left)
                        / rect.width) * 100;

                const y =
                    ((event.clientY - rect.top)
                        / rect.height) * 100;


                button.style.setProperty(
                    "--mouse-x",
                    `${x}%`
                );

                button.style.setProperty(
                    "--mouse-y",
                    `${y}%`
                );

            }
        );

    });


    /* =====================================================
       BACKGROUND MOUSE MOVEMENT
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroBackground =
        document.querySelector(
            ".hero-background"
        );


    if (hero && heroBackground) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth < 850) {
                    return;
                }


                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (event.clientX - rect.left)
                    / rect.width
                    - 0.5;


                const y =
                    (event.clientY - rect.top)
                    / rect.height
                    - 0.5;


                heroBackground.style.transform =
                    `scale(1.08)
                     translate(${x * -12}px, ${y * -12}px)`;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroBackground.style.transform =
                    "scale(1.08)";

            }
        );

    }


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    const cursorGlow =
        document.querySelector(
            ".cursor-glow"
        );


    if (cursorGlow) {

        document.addEventListener(
            "mousemove",
            (event) => {

                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;

            }
        );

    }


    /* =====================================================
       PROJECT IMAGE LOAD EFFECT
    ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach((image) => {

        image.addEventListener(
            "load",
            () => {

                image.classList.add(
                    "image-loaded"
                );

            }
        );

    });


    /* =====================================================
       PAGE LOAD
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add(
                "page-loaded"
            );

        }
    );


    /* =====================================================
       REDUCE MOTION ACCESSIBILITY
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (prefersReducedMotion.matches) {

        clearInterval(slideTimer);

        document.documentElement.style
            .scrollBehavior = "auto";

    }


});
