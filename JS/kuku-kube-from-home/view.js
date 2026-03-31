import { handleClick } from "./controller.js";

function renderKube(level) {
    let cells = []
    const dimensions = level + 1;
    console.debug('dimensions ', dimensions)

    const table = document.querySelector('table');
    const tbodyElement = document.createElement('tbody')
    table.appendChild(tbodyElement)
    console.debug(tbodyElement)


    for (let i = 0; i < dimensions; i++) {
        const rowElement = document.createElement('tr');
        tbodyElement.appendChild(rowElement);

        for (let j = 0; j < dimensions; j++) {
            const cell = document.createElement('td');
            cell.addEventListener('click', (e) => {
                handleClick(e);
            });
            rowElement.appendChild(cell);

            cells.push(cell);
        }
    }

    console.debug(cells);
    return cells
}


function highlightCell(cell) { //highlightCell
    cell.style.backgroundColor = 'red';
}


function removeKube(){
    document.querySelector('tbody').remove()

}

export {renderKube, highlightCell, removeKube}