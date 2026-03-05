import { Table } from './Table.js';

document.addEventListener('click', (e) => {
    const table = Table.getInstance('table');

    const actionElement = e.target.closest('[data-action]');

    if (actionElement.dataset.action === 'add') {
        table.addRow(this);
    }
});
