import { fetchData, updateEntry, deleteEntry, saveData } from './admin-data.js';

const ADMIN_PASSWORD = "123"; // Change this to a secure password in production
let data = [];

document.addEventListener('DOMContentLoaded', () => {
    const passwordPrompt = document.getElementById('password-prompt');
    const adminPanel = document.getElementById('admin-panel');

    // Show password prompt initially
    passwordPrompt.style.display = 'flex';
    adminPanel.style.display = 'none';
});

window.checkPassword = function() {
    const passwordInput = document.getElementById('admin-password').value;
    const passwordPrompt = document.getElementById('password-prompt');
    const adminPanel = document.getElementById('admin-panel');
    const errorMessage = document.getElementById('password-error');

    if (passwordInput === ADMIN_PASSWORD) {
        passwordPrompt.style.display = 'none';
        adminPanel.style.display = 'block';
        loadAdminData();
    } else {
        errorMessage.style.display = 'block';
    }
};

async function loadAdminData() {
    data = await fetchData();
    const tableBody = document.getElementById('admin-table-body');
    const filterType = document.getElementById('filter-type');
    const filterTour = document.getElementById('filter-tour');
    const filterDate = document.getElementById('filter-date');

    function renderTable(filteredData) {
        tableBody.innerHTML = '';
        filteredData.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.setAttribute('data-index', index);
            row.innerHTML = `
                <td class="type">${entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}</td>
                <td class="name">${entry.name}</td>
                <td class="email">${entry.email}</td>
                <td class="tour">${entry.tour}</td>
                <td class="date">${entry.date || 'N/A'}</td>
                <td class="guests">${entry.guests || 'N/A'}</td>
                <td class="message">${entry.message !== 'N/A' ? entry.message : (entry.customTourDesc || 'N/A')}</td>
                <td class="timestamp">${new Date(entry.timestamp).toLocaleString()}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editEntry(${index})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteEntry(${index})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function applyFilters() {
        let filteredData = [...data];
        
        const typeFilter = filterType.value;
        if (typeFilter !== 'all') {
            filteredData = filteredData.filter(entry => entry.type === typeFilter);
        }

        const tourFilter = filterTour.value;
        if (tourFilter !== 'all') {
            filteredData = filteredData.filter(entry => entry.tour === tourFilter);
        }

        const dateFilter = filterDate.value;
        if (dateFilter) {
            filteredData = filteredData.filter(entry => entry.date === dateFilter);
        }

        renderTable(filteredData);
    }

    renderTable(data);

    filterType.addEventListener('change', applyFilters);
    filterTour.addEventListener('change', applyFilters);
    filterDate.addEventListener('change', applyFilters);
}

window.editEntry = function(index) {
    const row = document.querySelector(`tr[data-index="${index}"]`);
    const entry = data[index];

    row.innerHTML = `
        <td><input type="text" value="${entry.type}" readonly></td>
        <td><input type="text" class="edit-name" value="${entry.name}"></td>
        <td><input type="email" class="edit-email" value="${entry.email}"></td>
        <td>
            <select class="edit-tour">
                <option value="Gorilla Trekking Adventure" ${entry.tour === 'Gorilla Trekking Adventure' ? 'selected' : ''}>Gorilla Trekking Adventure</option>
                <option value="Savanna Safari Experience" ${entry.tour === 'Savanna Safari Experience' ? 'selected' : ''}>Savanna Safari Experience</option>
                <option value="Nile River Adventure" ${entry.tour === 'Nile River Adventure' ? 'selected' : ''}>Nile River Adventure</option>
                <option value="Murchison Falls Safari" ${entry.tour === 'Murchison Falls Safari' ? 'selected' : ''}>Murchison Falls Safari</option>
                <option value="Kidepo Valley Wilderness" ${entry.tour === 'Kidepo Valley Wilderness' ? 'selected' : ''}>Kidepo Valley Wilderness</option>
                <option value="Lake Mburo Getaway" ${entry.tour === 'Lake Mburo Getaway' ? 'selected' : ''}>Lake Mburo Getaway</option>
                <option value="Cultural Immersion Tour" ${entry.tour === 'Cultural Immersion Tour' ? 'selected' : ''}>Cultural Immersion Tour</option>
                <option value="Birdwatching Extravaganza" ${entry.tour === 'Birdwatching Extravaganza' ? 'selected' : ''}>Birdwatching Extravaganza</option>
                <option value="Mount Elgon Hiking Expedition" ${entry.tour === 'Mount Elgon Hiking Expedition' ? 'selected' : ''}>Mount Elgon Hiking Expedition</option>
                <option value="Custom Tour" ${entry.tour === 'Custom Tour' ? 'selected' : ''}>Custom Tour</option>
            </select>
        </td>
        <td><input type="date" class="edit-date" value="${entry.date || ''}" ${entry.type === 'inquiry' ? 'disabled' : ''}></td>
        <td><input type="number" class="edit-guests" value="${entry.guests || ''}" min="1" ${entry.type === 'inquiry' ? 'disabled' : ''}></td>
        <td><textarea class="edit-message">${entry.message !== 'N/A' ? entry.message : (entry.customTourDesc || '')}</textarea></td>
        <td>${new Date(entry.timestamp).toLocaleString()}</td>
        <td>
            <button class="action-btn save-btn" onclick="saveEntry(${index})">Save</button>
            <button class="action-btn delete-btn" onclick="deleteEntry(${index})">Delete</button>
        </td>
    `;
};

window.saveEntry = async function(index) {
    const row = document.querySelector(`tr[data-index="${index}"]`);
    const name = row.querySelector('.edit-name').value;
    const email = row.querySelector('.edit-email').value;
    const tour = row.querySelector('.edit-tour').value;
    const date = row.querySelector('.edit-date').value || 'N/A';
    const guests = row.querySelector('.edit-guests').value || 'N/A';
    const message = row.querySelector('.edit-message').value;

    const updatedEntry = {
        ...data[index],
        name,
        email,
        tour,
        date: data[index].type === 'booking' ? date : 'N/A',
        guests: data[index].type === 'booking' ? guests : 'N/A',
        message: data[index].type === 'inquiry' ? message : 'N/A',
        customTourDesc: data[index].type === 'booking' && tour === 'Custom Tour' ? message : 'N/A'
    };

    await updateEntry(index, updatedEntry);
    data = await fetchData();
    loadAdminData();
};

window.deleteEntry = async function(index) {
    if (confirm('Are you sure you want to delete this entry?')) {
        await deleteEntry(index);
        data = await fetchData();
        loadAdminData();
    }
};

window.exportToCSV = async function() {
    const data = await fetchData();
    const headers = ['Type', 'Name', 'Email', 'Tour', 'Date', 'Guests', 'Message/Custom Desc', 'Timestamp'];
    const rows = data.map(entry => [
        entry.type,
        entry.name,
        entry.email,
        entry.tour,
        entry.date || 'N/A',
        entry.guests || 'N/A',
        entry.message !== 'N/A' ? entry.message : (entry.customTourDesc || 'N/A'),
        new Date(entry.timestamp).toLocaleString()
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `safari_rush_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
    URL.revokeObjectURL(url);
};