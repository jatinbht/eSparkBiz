import "./game.js";

class Table {
    constructor(parent) {
        const tableNode = document.createElement('table');
        parent.appendChild(tableNode);

        // tbody
        const tbodyNode = document.createElement('tbody');
        tableNode.appendChild(tbodyNode);
        this.tbodyNode = tbodyNode;
    }

    addRow(){
        const rowNode = document.createElement('tr')
        this.tbodyNode.appendChild(rowNode)
        return new Row(rowNode, this)
    }

}

class Row {
    constructor(rowNode,table) {
        this.table = table
        this.rowNode = rowNode
    }

    #addCell(){
        const cellNode = document.createElement('td')
        this.rowNode.appendChild(cellNode)
        cellNode.textContent='cell'

        return this
    }

    #endRow(){
        return this.table
    }

    #generateTable(rowCount, columnCount){
        for(rowCount=0; rowCount <= Game.getDimension(); rowCount++){
            this.table.addRow()
            for (columnCount = 0; columnCount <= Game.getDimension(); columnCount++) {
                this.#addCell();
            }
            this.#endRow()
        }
        Game.incrementDimension();
    }
}