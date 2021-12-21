// window.onload = () => {
let modeBtn = document.querySelector('.mode-btn');
let navBtn = document.querySelector('.nav-hamburger');
let navCancel = document.querySelector('.nav-cancel');
let navBar = document.querySelector('.nav-bar');
let navOverlay = document.querySelector('.nav-overlay');
let navLinks = document.querySelectorAll('.nav-overlay > div');
const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;


// Landing Page Animations
function landingAnimation() {
    let tl = anime.timeline({
        complete: function (anim) {
            new Typed('.about-page-desc', {
                strings: ['a six packed ;-)', 'a full-stack Web Developer'],
                smartBackspace: true,
                typeSpeed: 50,
                showCursor: false,
                // startDelay: 3000,
            })
            new Typed('.about-page-text', {
                strings: ['i design and build websites and web apps, currently learning React.', 'check out my work and feel free to contact me for work and Collabs👍🏾'],
                typeSpeed: 50,
                backDelay: 3000,
                startDelay: 5000,
                fadeOut: true,
            })
            anime({
                targets: '.mode-btn',
                rotateZ: [0, 5],
                easing: 'easeInOutSine',
                direction: 'alternate',
                duration: 1000,
                loop: true,
            })
        }
    });
    tl.add({
        targets: '.about-page-header',
        easing: 'easeInOutExpo',
        opacity: [0, 1],
        scale: [0, 1],
        translateY: [200, 0],
        duration: 1500
    })
    if(width >= 768){
        tl.add({
            targets: navBar,

            translateX: [-200, 0],
            easing: 'easeInOutExpo',
            duration: 1000,
        })
    }
    tl.add({
        targets: modeBtn,
        easing: 'easeInOutExpo',
        opacity: [0, 1],
        scale: [0, 1],
        translateX: [100, 0],
        duration: 1000
    }, (width >= 768) ? '-=1000' : null)
    tl.add({
        targets: '.nav-hamburger svg path',
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1500,
        delay: function (el, i) {
            return i * 250
        },
        direction: 'alternate',
    }, '-=500')
};
landingAnimation();

// Change Theme
modeBtn.addEventListener('click', () => {
    anime({
        targets: modeBtn,
        rotateZ: 360,
        easing: 'easeInOutSine',
        complete: function(anim){
            const theme = document.querySelector("#theme-link");
            if (theme.getAttribute("href") == "light-theme.css") {
                theme.href = "dark-theme.css";
            } else {
                theme.href = "light-theme.css";
            }
        }
    })
})

//Nav Overlay
navBtn.addEventListener('click', () => {
    let overlayPop = anime.timeline({
        begin: function (anim) {
            navOverlay.style.visibility = "visible";
            navCancel.style.visibility = "visible";
            navBtn.style.visibility = "hidden";
        }
    });
    overlayPop.add({
        targets: navOverlay,
        opacity: [0, 1],
        translateX: [-500, 0],
        translateY: [-500, 0],
        easing: 'easeInOutCubic',
        duration: 800,
    });
    overlayPop.add({
        targets: '.nav-cancel svg path',
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 800,
        delay: function (el, i) {
            return i * 250
        },
        easing: 'easeInOutExpo'
    }, '-=500')
    overlayPop.play();
})

navCancel.addEventListener('click', () => {
    if(width < 768) {
        let overlayCollapse = anime.timeline({
            complete: function (anim) {
                navOverlay.style.visibility = "hidden";
                navCancel.style.visibility = "hidden";
                navBtn.style.visibility = "visible";
            }
        });
        overlayCollapse.add({
            targets: '.nav-cancel svg path',
            strokeDashoffset: [0, anime.setDashoffset],
            duration: 400,
            delay: function (el, i) {
                return i * 250
            },
            easing: 'easeInOutExpo'
        }, )
        overlayCollapse.add({
            targets: navOverlay,
            opacity: [1, 0],
            translateX: [0, -500],
            translateY: [0, -500],
            easing: 'easeInOutCubic',
            duration: 500,
        });
        overlayCollapse.play();
    }
})


// Get current page
function getCurrentPage() {
    let pages = document.querySelectorAll('.body-container section');
    // let previousPage;
    // let currentPage;
    // let nextPage;
    pages.forEach((e, i) => {
        let height = getComputedStyle(e).height;
        if (height !== '0px') {
            // previousPage = pages[i - 1]
            currentPage = e.className
        }
    })
    return currentPage
}

//Change Pages
navLinks.forEach(e => {
    e.addEventListener('click', ev => {
        let current = "." + getCurrentPage();
        let nextClass = ev.target.className;
        let strList = nextClass.split("-");
        let next = "." + strList[0] + "-page";
        // console.log(current, next)
        let changePageAnim = anime.timeline();
        changePageAnim.add({
            targets: current,
            rotateX: [0, 90],
            height: ['100%', '0%'],
            opacity: [1, 0],
            zIndex: 0,
            easing: 'easeInOutExpo',
            duration: 2000,
        })
        changePageAnim.add({
            targets: next,
            rotateX: 0,
            height: ['0%', '100%'],
            opacity: [0, 1],
            zIndex: 1,
            easing: 'easeInOutExpo',
            duration: 2000,
        }, '-=2000');
        navCancel.click();
        // if(width >= 768){
        //     e.style.boxShadow = '3px 3px 3px grey';
        // }
    })
})


// }