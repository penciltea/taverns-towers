export async function getAllTowns() {
    const res = await fetch("/api/towns");
    if (!res.ok) throw new Error("Failed to fetch towns");
    return res.json();
}