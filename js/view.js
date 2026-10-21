
    export const renderItems = (items) => {
        const container = document.getElementById("destinations-list");

        if (!container) return;

        if (items.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <h4>Aucune destination trouvée</h4>
                    <p>Essayez de modifier votre recherche.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = items.map((item) => {
            const name = item.name.toLowerCase();

            let image = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800";

            if (name.includes("paris")) {
                image = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800";
            } else if (name.includes("marrakech") || name.includes("marrakesh")) {
                image = "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800";
            } else if (name.includes("chefchaouen")) {
                image = "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800";
            } else if (name.includes("plage") || name.includes("maldives")) {
                image = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800";
            } else if (name.includes("rome")) {
                image = "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800";
            }

            return `
                <div class="col-md-6 col-lg-4">
                    <div class="card destination-card h-100 shadow-sm">
                        <img
                            src="${image}"
                            class="card-img-top"
                            alt="${item.name}"
                            style="height:220px; object-fit:cover;"
                            loading="lazy"
                        >

                        <div class="card-body">
                            <span class="badge text-bg-info mb-2">
                                ${item.category}
                            </span>

                            <h5 class="card-title">${item.name}</h5>
                            <p class="text-muted">${item.country}</p>
                            <p>${item.description}</p>

                            <p class="fw-bold text-success">
                                ${item.price.toLocaleString("fr-FR")} MAD
                            </p>

                            <p>
                                ${item.active
                                    ? '<span class="badge text-bg-success">Disponible</span>'
                                    : '<span class="badge text-bg-secondary">Non disponible</span>'}
                            </p>

                            <button class="btn btn-primary"
                                data-detail-id="${item.id}">
                                Voir les détails
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    };


    export const renderStats = (items) => {
        const total = items.length;

        let activeCount = 0;
        let totalPrice = 0;

        items.forEach((item) => {
            if (item.active) {
                activeCount++;
            }

            totalPrice += item.price;
        });

        const average = total > 0
            ? Math.round(totalPrice / total)
            : 0;

        document.getElementById("total-count").textContent = total;
    document.getElementById("active-count").textContent = activeCount;
    document.getElementById("average-price").textContent =
        average.toLocaleString("fr-FR") + " MAD";
};


export const renderDetail = (item) => {
    const detail = document.getElementById("destination-detail");

    if (!detail || !item) return;

    detail.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Pays :</strong> ${item.country}</p>
        <p><strong>Catégorie :</strong> ${item.category}</p>
        <p><strong>Prix :</strong> ${item.price.toLocaleString("fr-FR")} MAD</p>
        <p><strong>Description :</strong> ${item.description}</p>
        <p><strong>Disponibilité :</strong>
            ${item.active ? "Disponible" : "Non disponible"}
        </p>
    `;

    detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
}