const menu = document.getElementById("menu");
const openMenu = document.getElementById("open-menu");
const about = document.getElementById("about");
const events = document.getElementById("events");
const join = document.getElementById("join");
const symbol = document.getElementById("symbol");
const phrases = ["somthing special.", "be part of it!"];
const themeSwitch = document.getElementById("theme-switch");
const themeSwitchButton = document.getElementById("switch-btn");
const logo = document.getElementById("logo");

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

themeSwitch.addEventListener("click", () => {
  const root = document.documentElement;
  const textColor = getComputedStyle(root).getPropertyValue("--text");
  const primaryColor = getComputedStyle(root).getPropertyValue("--primary");
  const secondary1Color =
    getComputedStyle(root).getPropertyValue("--secondary1");
  const secondary2Color =
    getComputedStyle(root).getPropertyValue("--secondary2");
  const secondary3Color =
    getComputedStyle(root).getPropertyValue("--secondary3");
  const accent1Color = getComputedStyle(root).getPropertyValue("--accent1");
  const accent2Color = getComputedStyle(root).getPropertyValue("--accent2");
  const neutral1Color = getComputedStyle(root).getPropertyValue("--neutral1");
  const neutral2Color = getComputedStyle(root).getPropertyValue("--neutral2");

  if (textColor === "#fff") {
    logo.innerHTML =
      '<img src="./images/gdsc-logo.svg" alt="gdsc esi sba" width="75%">';
    themeSwitchButton.style.left = "3px";
    themeSwitchButton.style.borderRadius = "50%";
    root.style.setProperty("--text", "#eee");
    root.style.setProperty("--primary", "#00adb5");
    root.style.setProperty("--secondary1", "#222831");
    root.style.setProperty("--secondary2", "#393e46");
    root.style.setProperty("--secondary3", "#eee");
    root.style.setProperty("--accent1", "#eee");
    root.style.setProperty("--accent2", "#393e46");
    root.style.setProperty("--neutral1", "#a8d4c7");
    root.style.setProperty("--neutral2", "#222831");
  } else {
    logo.innerHTML = "<p>GDSC-ESI-SBA</p>";
    themeSwitchButton.style.left = "36px";
    themeSwitchButton.style.borderRadius = "50% 0 0 50%";
    root.style.setProperty("--text", "#fff");
    root.style.setProperty("--primary", "#4688f1");
    root.style.setProperty("--secondary1", "#d7332e");
    root.style.setProperty("--secondary2", "#dd8e8c");
    root.style.setProperty("--secondary3", "#ffe4e4");
    root.style.setProperty("--accent1", "#f9bd03");
    root.style.setProperty("--accent2", "#feeec5");
    root.style.setProperty("--neutral1", "#a8d4c7");
    root.style.setProperty("--neutral2", "#fff");
  }
});
