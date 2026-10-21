import { state } from "./state.js";
import { fetchData } from "./dataService.js";
import { renderAll, renderOrderDetails } from "./view.js";

function showError(message) {
  const errorElement = document.querySelector("#error-message");

  errorElement.textContent = message;
  errorElement.classList.remove("d-none");
}

function hideError() {
  const errorElement = document.querySelector("#error-message");

  errorElement.textContent = "";
  errorElement.classList.add("d-none");
}

function setupEvents() {
  const searchInput = document.querySelector("#search-input");
  const statusFilter = document.querySelector("#status-filter");
  const categoryFilter = document.querySelector("#category-filter");
  const ordersList = document.querySelector("#orders-list");

  searchInput.addEventListener("input", event => {
    state.search = event.target.value.trim();
    renderAll();
  });

  statusFilter.addEventListener("change", event => {
    state.selectedStatus = event.target.value;
    renderAll();
  });

  categoryFilter.addEventListener("change", event => {
    state.selectedCategory = event.target.value;
    renderAll();
  });

  ordersList.addEventListener("click", event => {
    const button = event.target.closest('[data-action="details"]');

    if (button) {
      renderOrderDetails(button.dataset.orderId);
    }
  });
}

async function init() {
  try {
    hideError();

    state.loading = true;

    const data = await fetchData();

    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;

    setupEvents();
    renderAll();
  } catch (error) {
    showError(
      "Impossible de charger les données. Vérifiez les fichiers JSON et relancez Live Server."
    );
  } finally {
    state.loading = false;
  }
}

init();
