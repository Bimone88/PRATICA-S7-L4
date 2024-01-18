document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "2ssoal5tbJRuki6NJNOGOfejksrLvx7WeL7sucaxFCLyotnPU9WOkRCB";
  const loadImagesBtn = document.getElementById("loadImagesBtn");
  const loadSecondaryImagesBtn = document.getElementById(
    "loadSecondaryImagesBtn"
  );
  const imageContainer = document.getElementById("imageContainer");

  loadImagesBtn.addEventListener("click", function () {
    fetchData("your-query");
  });

  loadSecondaryImagesBtn.addEventListener("click", function () {
    fetchData("your-secondary-query");
  });

  function fetchData(query) {
    fetch(`https://api.pexels.com/v1/search?query=${query}`, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        displayImages(data.photos);
      })
      .catch((error) => console.error("Errore nella richiesta:", error));
  }

  function displayImages(photos) {
    imageContainer.innerHTML = "";
    photos.forEach((photo) => {
      const card = document.createElement("div");
      card.classList.add("card", "col-md-4", "mb-3");

      card.innerHTML = `
            <img src="${photo.src.medium}" class="card-img-top" alt="${photo.photographer}">
            <div class="card-body">
              <h5 class="card-title">${photo.photographer}</h5>
              <p class="card-text">ID: ${photo.id}</p>
              <button class="btn btn-danger" onclick="hideCard(${photo.id})">Hide</button>
            </div>
          `;

      imageContainer.appendChild(card);
    });
  }

  function hideCard(id) {
    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
      card.style.display = "none";
    }
  }
});
