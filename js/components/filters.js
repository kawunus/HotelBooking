export const initFilters = () => {
  const priceSlider = document.getElementById('price-filter');
  const priceValueDisplay = document.getElementById('price-value');
  const amenityCheckboxes = document.querySelectorAll('.amenity-filter');
  const cards = document.querySelectorAll('.card');

  const applyFilters = () => {
    const maxPrice = parseInt(priceSlider.value);

    const selectedAmenities = Array.from(amenityCheckboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    cards.forEach((card) => {
      const cardPrice = parseInt(card.dataset.price);
      const cardAmenities = card.dataset.amenities
        ? card.dataset.amenities.split(',')
        : [];

      const isPriceValid = cardPrice <= maxPrice;

      const isAmenitiesValid = selectedAmenities.every((amenity) =>
        cardAmenities.includes(amenity)
      );

      if (isPriceValid && isAmenitiesValid) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      priceValueDisplay.textContent = e.target.value;
      applyFilters();
    });
  }

  amenityCheckboxes.forEach((cb) => {
    cb.addEventListener('change', applyFilters);
  });
};
