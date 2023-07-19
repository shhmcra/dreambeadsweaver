document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();


  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var address = document.getElementById('address').value;
  var contactNumber = document.getElementById('contactNumber').value;
  var postalCode = document.getElementById('postalCode').value;
  var orderCode = document.getElementById('orderCode').value;
  var message = document.getElementById('message').value;


  if (!name || !email || !address || !contactNumber || !postalCode || !orderCode) {
    alert('Please fill in all fields');
    return;
  }


  emailjs.init('dB1J2KKBY5PoNkICF');

  var templateParams = {
    name: name,
    email: email,
    address: address,
    contactNumber: contactNumber,
    postalCode: postalCode,
    orderCode: orderCode,
    message: message,
  };


  emailjs.send('service_qo8hbhr', 'template_3dt9svk', templateParams)
    .then(function(response) {
      alert('Message sent successfully');
      document.getElementById('contactForm').reset();
    })
    .catch(function(error) {
      alert('An error occurred: ' + error.message);
    });
});



function redirectToURL() {
  window.location.href = 'info.html';
}
