const BASE_PATH = "./data/";

async function loadJSON(fileName) {
  const response = await fetch(`${BASE_PATH}${fileName}`);

  if (!response.ok) {
    throw new Error(`Impossible de charger ${fileName}`);
  }

  return await response.json();
}

export async function fetchData() {
  try {
    const [customers, products, orders] = await Promise.all([
      loadJSON("customers.json"),
      loadJSON("products.json"),
      loadJSON("orders.json")
    ]);

    return { customers, products, orders };
  } catch (error) {
    console.error("Erreur de chargement des données :", error);
    throw error;
  }
}