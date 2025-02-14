export async function getExperience() {
    try {
        const response = await fetch("/api/getExperience");

        if (!response.ok) {
            throw new Error(`Error fetching experience: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching experience:", error);
        return { experience: { items: [] } };
    }
}
