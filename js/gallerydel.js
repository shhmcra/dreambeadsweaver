// Get all the image elements in the gallery
var images = document.querySelectorAll('#gallery img');

// Add click event listeners to each image
images.forEach(function(image) {
  image.addEventListener('click', enlargeImage);
});

// Function to enlarge the clicked image
function enlargeImage() {
  // Create a modal element
  var modal = document.createElement('div');
  modal.classList.add('modal');

  // Create an image element for the enlarged image
  var enlargedImage = document.createElement('img');
  enlargedImage.src = this.src;
  enlargedImage.alt = this.alt;

  // Append the enlarged image to the modal
  modal.appendChild(enlargedImage);

  // Add event listener to close the modal when clicked
  modal.addEventListener('click', function() {
    modal.remove();
  });

  // Append the modal to the body
  document.body.appendChild(modal);
}
