$(() => {

  const $propertyListings = $(`
  <section class="property-listings" id="property-listings">
      <p>Loading...</p>
    </section>
  `);
  window.$propertyListings = $propertyListings;

  window.propertyListings = {};

  function addListing(listing) {
    $propertyListings.append(listing);
  }
  function clearListings() {
    $propertyListings.empty();
  }
  window.propertyListings.clearListings = clearListings;

  function addProperties(properties, isReservation = false) {
    clearListings();
    for (const propertyId in properties) {
      const property = properties[propertyId];
      const listing = propertyListing.createListing(property, isReservation);
      addListing(listing);
    }

    
    $propertyListings.submit(function(event) {
      event.preventDefault();
      const $form = $(event.target);
      const data = $form.serialize();
      reserveProperty(data)
      .then(console.log('TODO show reservations')) //spoof a click on the reservations button
      .catch(err => console.error(err));
    });
  }
  window.propertyListings.addProperties = addProperties;

});