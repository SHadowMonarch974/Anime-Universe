/*======================================
        SCROLL REVEAL ANIMATION
======================================*/

const revealElements = document.querySelectorAll(".reveal");

const revealOptions = {

    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px"

};

const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("active");

        observer.unobserve(entry.target);

    });

}, revealOptions);


/*======================================
            INITIALIZE
======================================*/

revealElements.forEach(element => {

    revealObserver.observe(element);

});