export function loadPageContent(pageName) {
  const contentPath = "/src";
  fetch(`${contentPath}/${pageName}.html`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Page not found");
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("main-content").innerHTML = html;
    })
    .catch((error) => console.error("Failed to load page:", error));
}
