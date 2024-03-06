document.addEventListener("DOMContentLoaded", () => {
  console.log('hello World');
  const folderButton = document.getElementById("openButton");
  const closeButton = document.getElementById("closeButton");
  const folderModal = document.getElementById("folder-creation-modal");

  folderButton.addEventListener("click", function () {
    folderModal.classList.remove("hidden");
    console.log('test');
  });

  closeButton.addEventListener("click", function () {
    folderModal.classList.add("hidden");
  });
});

document
  .querySelector("#CreateAlbumForm")
  .addEventListener("submit", async(event) => {
    event.preventDefault();
 
  await fetchData(`/album`, "POST", {
    "title": event.target[0].value,
    "description": event.target[1].value,
    "date": event.target[2].value,
    "password": event.target[3].value,
  });
  window.location.reload();
});