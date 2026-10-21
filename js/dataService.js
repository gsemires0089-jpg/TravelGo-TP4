export const fetchData = async () => {
    try {
        const response = await fetch("./data/data.json");

        if (!response.ok) {
            throw new Error("Impossible de charger les destinations.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur de chargement :", error);
        throw error;
    }
};