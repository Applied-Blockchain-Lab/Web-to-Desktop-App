const setButton = document.getElementById("urlBtn");
const url = document.getElementById("url");
const appName = document.getElementById("name");
// selecting loading div
const loader = document.querySelector("#loading");


async function getHtmlFromUrl(providedUrl) {
  try {
    displayLoading();
    let response = await fetch(providedUrl);
    hideLoading();
    switch (response.status) {
      // status "OK"
      case 200:
        let responseText = await response.text();
        const doc = new DOMParser().parseFromString(responseText, "text/html");
        const title = doc.querySelector("title");
        console.log(title);
        appName.value = title.text;
        break;
      // status "Not Found"
      case 404:
        appName.value = "New App";
        break;
    }
  } catch (error){
    appName.value = "New App";
  }

}

// showing loading
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
}

url.addEventListener("focusout", () => {
  getHtmlFromUrl(url.value);
});

setButton.addEventListener("click", () => {
  if (appName.value.length > 20) {
    alert("Application Name must be less than 20 characters");
    return;
  }
  window.electronAPI.setAppNameAndUrl(appName.value, url.value);
});
