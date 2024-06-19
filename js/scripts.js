function observerStuff() {
    const slideIntoViewport = (item, observer) => {
        let listItems = [...document.getElementsByClassName("slide")];

        if (item[0].boundingClientRect.top < 0) {
            //Above viewport
            listItems.forEach((entry) => {
                entry.classList.toggle("skip-slide", true);
            });
        }
        if (item[0].isIntersecting) {
            listItems.forEach((entry) => {
                entry.classList.toggle("slide-in", item[0].isIntersecting);
            });
            document
                .getElementById("scroll-arrow")
                .classList.toggle("faded", true);
        }
    };

    const obs = new IntersectionObserver(slideIntoViewport);
    // let items = [...document.getElementsByClassName("list-item")];
    // items.forEach((el) => {
    //     obs.observe(el, {});
    // });
    obs.observe(document.getElementById("experience"), {});

    const fadeIntoViewport = (item, observer) => {
        let skillItems = document.getElementsByClassName("skill-box");
        skillItems = [...skillItems];
        if (item[0].isIntersecting) {
            skillItems.forEach((skill) => {
                skill.classList.toggle("faded", item[0].isIntersecting);
            });
        }
    };

    const obs2 = new IntersectionObserver(fadeIntoViewport);
    obs2.observe(document.getElementById("skills"), {});

    let skillItems = document.getElementsByClassName("skill-box");
    skillItems = [...skillItems];
    skillItems.forEach((skill, ndx) => {
        let delay = 1 + ndx * 0.5;
        skill.style.transition = delay + "s";

        let bar = [...skill.getElementsByTagName("rect")][0];
        console.log(bar);
        bar.style["transition-delay"] = delay + "s";
    });
}

function skillBars() {
    let skills = document.getElementsByClassName("skill");
    let baseColor = "#008080";
    skills = [...skills];
    skills.forEach((skill, ndx) => {
        newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        newSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        newSvg.setAttribute("viewBox", "0 0 200 20");
        newSvg.setAttribute("class", "skill-bar right");

        let isRight = skill.classList.contains("right");
        let width = (parseFloat(skill.getAttribute("level")) / 10) * 200;
        let startPos = isRight ? 200 - width : 0;
        let color = darken(baseColor, ndx * 15);
        bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bar.setAttribute("x", "" + startPos);
        bar.setAttribute("y", "0");
        // bar.setAttribute("height", "100%");
        // bar.setAttribute("width", "" + width)
        bar.style.height = "100%";
        bar.style.width = "" + width;
        bar.setAttribute("fill", color);
        bar.setAttribute("class", isRight ? "right" : "");

        newSvg.appendChild(bar);
        if (isRight) {
            skill.before(newSvg);
        } else {
            skill.after(newSvg);
        }
    });
}

function darken(color, amount) {
    let { r, g, b } = hexToRgb(color);
    let newR = r - amount > 0 ? r - amount : 0;
    let newG = g - amount > 0 ? g - amount : 0;
    let newB = b - amount > 0 ? b - amount : 0;
    return rgbToHex(newR, newG, newB);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
skillBars();
observerStuff();
