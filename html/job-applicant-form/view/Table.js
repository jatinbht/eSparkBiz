class Table {
    constructor() {
        this.tbody = document.createElement('tbody');
    }

    addRow() {
        const firstRow = tbody.firstElementChild;

        const clone = firstRow.cloneNode(true);
        tbody.appendChild(clone);
    }

    removeRow() {
        const lastRow = tbody.lastElementChild;

        if (tbody.children.length > 1) tbody.removeChild(lastRow);
    }
}
