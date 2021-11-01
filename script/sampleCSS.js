async function restertAnimation(target) {
    const t = document.getElementById(target);
    t.classList.remove("animation");
    await new Promise(resolve => setTimeout(resolve, 100))
    t.classList.add("animation");
}