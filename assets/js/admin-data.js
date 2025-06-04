// Simulated Backend API using localStorage
const STORAGE_KEY = 'safariRushData';

export const fetchData = async () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveData = async (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
};

export const updateEntry = async (index, updatedEntry) => {
    const data = await fetchData();
    data[index] = updatedEntry;
    await saveData(data);
    return updatedEntry;
};

export const deleteEntry = async (index) => {
    const data = await fetchData();
    data.splice(index, 1);
    await saveData(data);
    return true;
};