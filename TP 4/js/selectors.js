import { state } from "./state.js";

// Retrouver le client d'une commande
export function getCustomer(order) {
  return state.customers.find(
    customer => customer.id === order.customerId
  );
}

// Retrouver un produit
export function getProduct(productId) {
  return state.products.find(
    product => product.id === productId
  );
}

// Calculer le montant d'une ligne
export function getLineTotal(item) {
  const product = getProduct(item.productId);

  if (!product) return 0;

  return product.price * item.quantity;
}

// Calculer le montant total d'une commande
export function getOrderTotal(order) {
  let total = 0;

  order.items.forEach(item => {
    total += getLineTotal(item);
  });

  return total;
}

// Préparer les informations complètes d'une commande
export function getOrderDetails(order) {
  const customer = getCustomer(order);

  const items = order.items.map(item => {
    const product = getProduct(item.productId);

    return {
      product,
      quantity: item.quantity,
      lineTotal: getLineTotal(item)
    };
  });

  return {
    order,
    customer,
    items,
    total: getOrderTotal(order)
  };
}

// Rechercher et filtrer les commandes
export function getFilteredOrders() {
  return state.orders.filter(order => {
    const customer = getCustomer(order);

    const matchesSearch =
      !state.search ||
      customer?.name.toLowerCase().includes(
        state.search.toLowerCase()
      );

    const matchesStatus =
      state.selectedStatus === "Tous" ||
      order.status === state.selectedStatus;

    const matchesCategory =
      state.selectedCategory === "Toutes" ||
      order.items.some(item => {
        const product = getProduct(item.productId);
        return product?.category === state.selectedCategory;
      });

    return matchesSearch && matchesStatus && matchesCategory;
  });
}

// Préparer les statistiques
export function getStats() {
  let totalAmount = 0;

  state.orders.forEach(order => {
    totalAmount += getOrderTotal(order);
  });

  return {
    customers: state.customers.length,
    products: state.products.length,
    orders: state.orders.length,
    totalAmount
  };
}
