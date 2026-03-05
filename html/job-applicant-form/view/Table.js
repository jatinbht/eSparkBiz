class Table {
    constructor(name) {
        this.name = name
        this.tbody = document.createElement('tbody');

    }

    getInstance(name) {
        if (!(name instanceof Table)) {
            instance = new Table(name);
        }
        return instance;
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
