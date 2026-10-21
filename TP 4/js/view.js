import { state } from "./state.js";
import {
  getCustomer,
  getOrderTotal,
  getOrderDetails,
  getStats,
  getFilteredOrders
} from "./selectors.js";

const formatPrice = amount =>
  `${amount.toLocaleString("fr-FR")} MAD`;

export function renderStats() {
  const stats = getStats();

  document.querySelector("#total-customers").textContent =
    stats.customers;

  document.querySelector("#total-products").textContent =
    stats.products;

  document.querySelector("#total-orders").textContent =
    stats.orders;

  document.querySelector("#total-amount").textContent =
    formatPrice(stats.totalAmount);
}

export function renderOrders() {
  const container = document.querySelector("#orders-list");
  const orders = getFilteredOrders();

  if (!orders.length) {
    container.innerHTML =
      '<p class="text-center p-4">Aucune commande trouvée.</p>';
    return;
  }

  container.innerHTML = orders.map(order => {
    const customer = getCustomer(order);
    const total = getOrderTotal(order);

    const statusClass = {
      "Livree": "success",
      "En attente": "warning",
      "Annulee": "danger"
    }[order.status] || "secondary";

    return `
      <div class="col-md-6 col-xl-4">
        <article class="card order-card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between gap-2 mb-3">
              <h5 class="card-title">Commande #${order.id}</h5>
              <span class="badge text-bg-${statusClass}">
                ${order.status}
              </span>
            </div>

            <p class="mb-2">
              <strong>Client :</strong>
              ${customer ? customer.name : "Client introuvable"}
            </p>

            <p class="mb-2">
              <strong>Date :</strong> ${order.date}
            </p>

            <p class="order-total mb-3">
              ${formatPrice(total)}
            </p>

            <button
              class="btn btn-primary w-100"
              data-order-id="${order.id}"
              data-action="details">
              Voir le détail
            </button>
          </div>
        </article>
      </div>
    `;
  }).join("");
}

export function renderOrderDetails(orderId) {
  const order = state.orders.find(
    item => item.id === Number(orderId)
  );

  if (!order) return;

  const details = getOrderDetails(order);
  const customer = details.customer;

  document.querySelector("#modal-order-title").textContent =
    `Détail de la commande #${order.id}`;

  const itemsHTML = details.items.map(item => `
    <tr>
      <td>${item.product ? item.product.name : "Produit introuvable"}</td>
      <td>${item.product ? formatPrice(item.product.price) : "-"}</td>
      <td>${item.quantity}</td>
      <td>${formatPrice(item.lineTotal)}</td>
    </tr>
  `).join("");

  document.querySelector("#modal-order-body").innerHTML = `
    <p><strong>Client :</strong> ${customer ? customer.name : "Inconnu"}</p>
    <p><strong>Ville :</strong> ${customer ? customer.city : "Inconnue"}</p>
    <p><strong>Date :</strong> ${order.date}</p>
    <p><strong>Statut :</strong> ${order.status}</p>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>${itemsHTML}</tbody>
      </table>
    </div>

    <h5 class="text-end">
      Total : ${formatPrice(details.total)}
    </h5>
  `;

  const modalElement = document.querySelector("#orderModal");
  bootstrap.Modal.getOrCreateInstance(modalElement).show();
}

export function renderAll() {
  renderStats();
  renderOrders();
}
