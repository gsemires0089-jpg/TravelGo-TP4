
import { state } from "./state.js";
import { fetchData } from "./dataService.js";
import {
    renderItems,
    renderStats,
    renderDetail
} from "./view.js";
const getFilteredItems = () => {
    return state.items.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(state.search.toLowerCase()) ||
            item.country.toLowerCase().includes(state.search.toLowerCase());

        const matchesCategory =
            state.category === "all" ||
            item.category === state.category;

        const matchesActive =
            !state.activeOnly || item.active;

        return matchesSearch && matchesCategory && matchesActive;
    });
};
const render = () => {
    const items = getFilteredItems();

    renderItems(items);
    renderStats(state.items);
};
const setupEvents = () => {
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");
    const activeFilter = document.getElementById("active-filter");
    const destinationsList = document.getElementById("destinations-list");

    searchInput.addEventListener("input", (event) => {
        state.search = event.target.value.trim().toLowerCase();
        render();
    });

    categoryFilter.addEventListener("change", (event) => {
        state.category = event.target.value;
        render();
    });

    activeFilter.addEventListener("change", (event) => {
        state.activeOnly = event.target.checked;
        render();
    });

    destinationsList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-detail-id]");

        if (!button) return;

        const id = Number(button.dataset.detailId);
        const item = state.items.find((destination) => destination.id === id);

        if (item) {
            renderDetail(item);
        }
    });
};
const init = async () => {
    try {
        state.items = await fetchData();

        setupEvents();
        render();

    } catch (error) {
        console.error(error);

        const errorMessage = document.getElementById("error-message");

        if (errorMessage) {
            errorMessage.textContent =
                "Erreur : impossible de charger les destinations. Vérifiez data/data.json.";
        }
    }
};

init();
