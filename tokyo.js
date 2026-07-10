/*======================================
            REVEAL ANIMATION
======================================*/

const revealSections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

        }

    });

},{
    threshold:0.2
});


revealSections.forEach(section => {

    observer.observe(section);

});



/*======================================
            MUSIC PANEL
======================================*/

const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");
const volumeSlider = document.getElementById("volume-slider");


if(music && musicBtn && volumeSlider){


    const savedVolume = localStorage.getItem("musicVolume");


    if(savedVolume !== null){

        volumeSlider.value = savedVolume;
        music.volume = savedVolume / 100;

    }
    else{

        music.volume = 0.5;
        volumeSlider.value = 50;

    }



    musicBtn.addEventListener("click",()=>{


        if(music.paused){


            music.play().catch(()=>{});

            musicBtn.innerHTML="❚❚";

            musicBtn.classList.add("playing");


        }
        else{


            music.pause();

            musicBtn.innerHTML="▶";

            musicBtn.classList.remove("playing");


        }


    });



    volumeSlider.addEventListener("input",()=>{


        music.volume = volumeSlider.value / 100;


        localStorage.setItem(
            "musicVolume",
            volumeSlider.value
        );


    });


}



/*======================================
                LOADER
======================================*/


window.addEventListener("load",()=>{


    const loader=document.getElementById("loader");


    if(!loader) return;



    setTimeout(()=>{


        loader.classList.add("hide");



        if(music && music.paused){


            music.play()
            .then(()=>{


                if(musicBtn){

                    musicBtn.innerHTML="❚❚";

                    musicBtn.classList.add("playing");

                }


            })
            .catch(()=>{

                console.log("Autoplay blocked");

            });


        }



        setTimeout(()=>{


            loader.remove();


        },1000);



    },3000);



});



/*======================================
                NAVBAR
======================================*/


const navbar=document.querySelector(".navbar");

const menuToggle=document.getElementById("menu-toggle");

const leftLinks=document.querySelector(".left-links");

const rightLinks=document.querySelector(".right-links");

const navLinks=document.querySelectorAll(".nav-links a");

const pageSections=document.querySelectorAll("section");



/*======================================
            MOBILE MENU
======================================*/


if(menuToggle){


    menuToggle.addEventListener("click",()=>{


        leftLinks?.classList.toggle("show");

        rightLinks?.classList.toggle("show");


    });


}



/*======================================
        NAVBAR SCROLL + ACTIVE LINK
======================================*/


window.addEventListener("scroll",()=>{


    if(navbar){


        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );


    }



    let current="";



    pageSections.forEach(section=>{


        const top =
        section.offsetTop - 180;


        const height =
        section.offsetHeight;



        if(
            window.scrollY >= top &&
            window.scrollY < top + height
        ){

            current=section.id;

        }


    });



    navLinks.forEach(link=>{


        link.classList.remove("active");


        if(
            link.getAttribute("href")
            === "#" + current
        ){

            link.classList.add("active");

        }


    });


});



/*======================================
        CLOSE MOBILE MENU
======================================*/


navLinks.forEach(link=>{


    link.addEventListener("click",()=>{


        leftLinks?.classList.remove("show");

        rightLinks?.classList.remove("show");


    });


});



/*======================================
            SMOOTH SCROLL
======================================*/


navLinks.forEach(link=>{


    link.addEventListener("click",(e)=>{


        const target =
        document.querySelector(
            link.getAttribute("href")
        );



        if(!target) return;



        e.preventDefault();



        target.scrollIntoView({

            behavior:"smooth"

        });


    });


});