document.addEventListener("DOMContentLoaded", () => {
  const images = [...document.querySelectorAll("img")];
  if (!images.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Image gallery");
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close image">&times;</button>
    <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
    <img class="lightbox-image" alt="">
    <button class="lightbox-next" aria-label="Next image">&#10095;</button>
    <p class="lightbox-caption"></p>
  `;
  document.body.appendChild(lightbox);

  const displayedImage = lightbox.querySelector(".lightbox-image");
  const caption = lightbox.querySelector(".lightbox-caption");
  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    const source = images[currentIndex];
    displayedImage.src = source.currentSrc || source.src;
    displayedImage.alt = source.alt || "";
    caption.textContent = source.alt || "";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
  }

  images.forEach((image, index) => {
    image.style.cursor = "zoom-in";
    image.addEventListener("click", () => {
      showImage(index);
      lightbox.classList.add("open");
    });
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showImage(currentIndex - 1));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => showImage(currentIndex + 1));

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
  });
});