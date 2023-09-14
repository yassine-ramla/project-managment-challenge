const myInput = document.getElementById("myInput");
const dropdownBtn = document.getElementById("dropdown-btn");
const wordsRow = document.getElementById("words-row");
const words = document.getElementById("words");
const nmbrOfLines = document.getElementById("nmbrOfLines");
const nmbrOfWords = document.getElementById("nmbrOfWords");
const nmbrOfCharsI = document.getElementById("nmbrOfCharsI");
const nmbrOfCharsE = document.getElementById("nmbrOfCharsE");
const nmbrOfMost = document.getElementById("nmbrOfMost");
const sensitive = document.getElementById("sensitive");
const insensitive = document.getElementById("insensitive");
const loader = document.getElementById("loader");
const error = document.getElementById("error");
let caseSensitive = true;

sensitive.addEventListener("click", () => {
  caseSensitive = true;
  sensitive.style.backgroundColor = "#eb4235";
  sensitive.style.color = "white";
  insensitive.style.backgroundColor = "transparent";
  insensitive.style.color = "#222";
});

insensitive.addEventListener("click", () => {
  caseSensitive = false;
  insensitive.style.backgroundColor = "#eb4235";
  insensitive.style.color = "white";
  sensitive.style.backgroundColor = "transparent";
  sensitive.style.color = "#222";
});

function charsI(text) {
  let n = 0;
  for (let i = 0; i < text.length; i++) if (text[i] !== "\n") n++;
  return n;
}

function charsE(text) {
  let n = 0;
  for (let i = 0; i < text.length; i++) if (!/[ \n]/.test(text[i])) n++;
  return n;
}

function wordsQueueSensitive(wordsArray, text) {
  const wordsMap = new Map();
  new Set(wordsArray).forEach((e) => wordsMap.set(e, 1));
  for (const word of wordsMap.keys()) {
    wordsMap.set(word, text.match(new RegExp(`\\b${word}\\b`, "g")).length);
  }
  const wordsQueue = Array.from(wordsMap).sort((e1, e2) => e2[1] - e1[1]);
  return wordsQueue;
}

function wordsQueueInsensitive(wordsArray, text) {
  const wordsMap = new Map();
  new Set(wordsArray).forEach((e) => wordsMap.set(e.toLowerCase(), 1));
  for (const word of wordsMap.keys()) {
    wordsMap.set(word, text.match(new RegExp(`\\b${word}\\b`, "gi")).length);
  }
  const wordsQueue = Array.from(wordsMap).sort((e1, e2) => e2[1] - e1[1]);
  return wordsQueue;
}

myInput.addEventListener("change", () => {
  while (words.children.length !== 0) words.children[0].remove();
  const li = document.createElement("li");
  li.innerText = "no word is detected";
  words.appendChild(li);
  const fr = new FileReader();
  fr.onloadstart = () => {
    loader.style.display = "flex";
    nmbrOfLines.innerText = "-";
    nmbrOfWords.innerText = "-";
    nmbrOfCharsI.innerText = "-";
    nmbrOfCharsE.innerText = "-";
  };
  fr.onloadend = () => (loader.style.display = "none");
  fr.onerror = () => {
    error.style.backgroundColor = "#e74c41";
    error.style.color = "white";
    error.style.bottom = "20px";
    setTimeout(() => {
      error.style.backgroundColor = "transparent";
      error.style.color = "transparent";
      error.style.bottom = "-40px";
    }, 3000);
  };
  fr.readAsText(myInput.files[0]);
  fr.addEventListener("load", () => {
    const content = fr.result;
    nmbrOfLines.innerText = content.split("\n").length;
    const cleanWords = content.match(/\w+/g) || [];
    nmbrOfWords.innerText = cleanWords.length;
    nmbrOfCharsI.innerText = charsI(content);
    nmbrOfCharsE.innerText = charsE(content);
    const wordsSensitive = wordsQueueSensitive(cleanWords, content);
    const wordsInsensitive = wordsQueueInsensitive(cleanWords, content);
    const wordsSensitiveLength = wordsSensitive.length;
    const wordsInsensitiveLength = wordsInsensitive.length;
    if (caseSensitive) {
      if (wordsSensitiveLength !== 0) {
        words.children[0].remove();
        if (wordsSensitiveLength < 10)
          nmbrOfMost.innerText = wordsSensitiveLength;
        for (let i = 0; i < 10 && i < wordsSensitiveLength; i++) {
          const li = document.createElement("li");
          const span = document.createElement("span");
          li.innerHTML = `${wordsSensitive[i][0]}<span>${wordsSensitive[i][1]}</span>`;
          words.appendChild(li);
        }
      }
    } else {
      if (wordsInsensitiveLength !== 0) {
        words.children[0].remove();
        if (wordsInsensitiveLength < 10)
          nmbrOfMost.innerText = wordsInsensitiveLength;
        for (let i = 0; i < 10 && i < wordsInsensitiveLength; i++) {
          const li = document.createElement("li");
          const span = document.createElement("span");
          li.innerHTML = `${wordsInsensitive[i][0]}<span>${wordsInsensitive[i][1]}</span>`;
          words.appendChild(li);
        }
      }
    }
    sensitive.onclick = () => {
      if (wordsSensitiveLength !== 0) {
        while (words.children.length !== 0) words.children[0].remove();
        if (wordsSensitiveLength < 10)
          nmbrOfMost.innerText = wordsSensitiveLength;
        for (let i = 0; i < 10 && i < wordsSensitiveLength; i++) {
          const li = document.createElement("li");
          const span = document.createElement("span");
          li.innerHTML = `${wordsSensitive[i][0]}<span>${wordsSensitive[i][1]}</span>`;
          words.appendChild(li);
        }
      }
    };
    insensitive.onclick = () => {
      if (wordsInsensitiveLength !== 0) {
        while (words.children.length !== 0) words.children[0].remove();
        if (wordsInsensitiveLength < 10)
          nmbrOfMost.innerText = wordsInsensitiveLength;
        for (let i = 0; i < 10 && i < wordsInsensitiveLength; i++) {
          const li = document.createElement("li");
          const span = document.createElement("span");
          li.innerHTML = `${wordsInsensitive[i][0]}<span>${wordsInsensitive[i][1]}</span>`;
          words.appendChild(li);
        }
      }
    };
  });
});

dropdownBtn.addEventListener("click", () => {
  dropdownBtn.classList.toggle("up");
  wordsRow.classList.toggle("show");
});
