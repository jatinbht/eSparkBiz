class Table {
    constructor(parent) {
        const tableNode = document.createElement('table');
        parent.appendChild(tableNode);

        const tbodyNode = document.createElement('tbody');
        tableNode.appendChild(tbodyNode);

        this.tbodyNode = tbodyNode;
    }

    #create(parent) {
        return new Table(parent);
    }

    #addRow() {
        const rowNode = document.createElement('tr');
        this.tbodyNode.appendChild(rowNode);

        return new Row();
    }
}
