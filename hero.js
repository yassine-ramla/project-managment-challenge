const menu = document.getElementById("menu");
const openMenu = document.getElementById("open-menu");
const about = document.getElementById("about");
const events = document.getElementById("events");
const join = document.getElementById("join");
const symbol = document.getElementById("symbol");
const phrases = ["somthing special.", "be part of it!"];

openMenu.addEventListener("click", () => {
  menu.classList.toggle("show");
});

about.addEventListener("click", () => {
  about.classList.add("selected");
  events.classList.remove("selected");
  join.classList.remove("selected");
});

events.addEventListener("click", () => {
  events.classList.add("selected");
  about.classList.remove("selected");
  join.classList.remove("selected");
});

join.addEventListener("click", () => {
  join.classList.add("selected");
  events.classList.remove("selected");
  about.classList.remove("selected");
});

let i = 0,
  j = 0;

function typingEffect() {
  symbol.innerHTML += phrases[i][j];
  j++;
  if (j === phrases[i].length) {
    j = 0;
    if (i === 0) i = 1;
    else i = 0;
    setTimeout(() => {
      symbol.innerHTML = "";
      typingEffect();
    }, 2000);
  } else {
    setTimeout(() => {
      typingEffect();
    }, 150);
  }
}

typingEffect();
