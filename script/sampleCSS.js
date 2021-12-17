function init() {
    scrolleAnimation();
}

function scrolleAnimation() {
    const l = document.querySelectorAll(".scrolleAnimation");
    const margin = 150;
    console.log(l);
    window.addEventListener("scroll", () => {
        l.forEach(t => {
            const rect = t.getBoundingClientRect().top;
            const scroll = window.pageYOffset || document.documentElement.scrollTop;
            const offset = rect + scroll;
            const windowHeight = window.innerHeight;
            if (scroll > offset - windowHeight + margin) {
                t.classList.add('animation');
            }
        });
    });
}

async function restertAnimation(target) {
    const t = document.getElementById(target);
    t.classList.remove("animation");
    await new Promise(resolve => setTimeout(resolve, 100))
    t.classList.add("animation");
}

function deleteAnimation(target) {
    const t = document.getElementById(target);
    t.classList.remove("animation");
}