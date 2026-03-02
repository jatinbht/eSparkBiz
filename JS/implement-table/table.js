//management of states

import Row from './row.js';

export default class Table {
    static instance = null;

    constructor(parent, table) {
        // this.parent = parent;
        console.log(this); //debug
        // add tbody
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        this.tbody = tbody;

        this.i = 0;
    }

    static createOn(parent) {
        const table = document.createElement('table');
        parent.appendChild(table);
        Table.instance = new Table(parent, table);
        return Table.instance 
    }

    addRow() {
        const rowElement = document.createElement('tr');
        this.tbody.appendChild(rowElement);

        return new Row(rowElement, this);
    }

    static getTable(){
        return Table.instance; //? should i create a new table instance or use the older instance?  // use existing
    }

    clear(){
        this.tbody.innerHTML = ''
        this.i = 0;   //note: reset id counter
        return this;
    }

    generate(level) {
        this.clear();
    
        const size = level + 1;
        this.cells = [];
    
        for (let r = 0; r < size; r++) {
            const row = this.addRow();
    
            for (let c = 0; c < size; c++) {
                row.addCell("Cell");
            }
        }
    
        this.randomizeValidCell();
    }

    randomizeValidCell(){
        return Math.floor(Math.random()*this.cells.length)
    }
}

