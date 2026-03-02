export default class Row {
    constructor(rowElement, table) {
        this.row = rowElement;
        this.table = table;

        console.log(this);
    }

    addCell(content) {
        const cellElement = document.createElement('td');
        cellElement.textContent = content;
        this.row.append(cellElement);

        this.table.i++;
        cellElement.setAttribute('id', `cellElement${this.table.i}`);

        console.log(this); //debug
        console.log(cellElement) //debug

        // onClick
        cellElement.addEventListener('click', (e) => {console.log(e.target.id); isCorrect(e.target.id);})
        

        return this;
    }

    endCell() {
        return this.table;
    }
}
