export class Table {
    // static instances = {}
    tableRegistry = new Map()

    constructor(tableElement) {
        this.table = tableElement;
        this.tbody = tableElement.querySelector('tbody');
    }

    static getInstance(name) {
        if (!Table.instances[name]) {
            const table = new Table(name);
            Table.instances[name] = table;
        }
        return Table.instances[name];
    }

    addRow() {
        const firstRow = this.tbody.firstElementChild;

        const clone = firstRow.cloneNode(true);
        this.tbody.appendChild(clone);
    }

    removeRow() {
        const lastRow = tbody.lastElementChild;

        if (tbody.children.length > 1) tbody.removeChild(lastRow);
    }
}
