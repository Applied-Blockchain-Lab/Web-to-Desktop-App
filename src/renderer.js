const setButton = document.getElementById("btn");
const url = document.getElementById("url");
setButton.addEventListener("click", () => {
  window.electronAPI.setUrl(url.value);
});
