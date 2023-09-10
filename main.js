const myInput = document.getElementById("myInput");

myInput.addEventListener("change", () => {
  const fr = new FileReader();
  fr.readAsText(myInput.files[0]);
  fr.addEventListener("load", () => {
    const content = fr.result;
    console.log(content.length);
  });
});
