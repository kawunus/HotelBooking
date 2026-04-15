import { calculateDaysBetween } from '../utils/helpers.js';

export const initCalculator = () => {
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.querySelector('.modal__close');
  const bookButtons = document.querySelectorAll('.card__link-btn');
  const form = document.getElementById('booking-form');

  const hotelNameEl = document.getElementById('modal-hotel-name');
  const basePriceEl = document.getElementById('modal-base-price');
  const checkInInput = document.getElementById('check-in');
  const checkOutInput = document.getElementById('check-out');
  const totalNightsEl = document.getElementById('total-nights');
  const totalPriceEl = document.getElementById('total-price');

  let currentBasePrice = 0;

  const today = new Date().toISOString().split('T')[0];
  checkInInput.min = today;
  checkOutInput.min = today;

  const recalculateTotal = () => {
    const nights = calculateDaysBetween(
      checkInInput.value,
      checkOutInput.value
    );
    totalNightsEl.textContent = nights;
    totalPriceEl.textContent = nights * currentBasePrice;
  };

  bookButtons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      const card = this.closest('.card');
      const hotelName = card.querySelector('.card__title').textContent;
      currentBasePrice = parseInt(card.dataset.price);

      hotelNameEl.textContent = hotelName;
      basePriceEl.textContent = currentBasePrice;

      form.reset();
      recalculateTotal();

      modal.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  checkInInput.addEventListener('change', () => {
    checkOutInput.min = checkInInput.value;
    recalculateTotal();
  });

  checkOutInput.addEventListener('change', recalculateTotal);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nights = parseInt(totalNightsEl.textContent);

    if (nights === 0) {
      alert('Please select valid dates.');
      return;
    }

    const bookingData = {
      hotel: hotelNameEl.textContent,
      checkIn: checkInInput.value,
      checkOut: checkOutInput.value,
      totalPrice: parseInt(totalPriceEl.textContent),
    };

    localStorage.setItem('lastBooking', JSON.stringify(bookingData));
    alert('Booking confirmed! Saved to LocalStorage.');
    modal.classList.remove('active');
  });
};
