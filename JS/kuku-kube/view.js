import { handleClick } from "./controller.js";

function renderKube(level, cells) { //param = level
    const dimensions = level + 1;
    console.debug(level)

    const table = document.querySelector('table');
    const tbodyElement = document.createElement('tbody')
    table.appendChild(tbodyElement)
    console.debug(tbodyElement)


    for (let i = 0; i <= dimensions; i++) {
        const rowElement = document.createElement('tr');
        tbodyElement.appendChild(rowElement);

        for (let j = 0; j <= dimensions; j++) {
            const cell = document.createElement('td');
            cell.addEventListener('click', (e) => {
                handleClick(e);
            });
            rowElement.appendChild(cell);

            cells.push(cell); //!!! manipulation of state in view
        }
    }

    console.debug(cells);
}


function highlightCell(validCell) { //highlightCell
    validCell.style.backgroundColor = 'red';
}


function removeKube(){
    document.querySelector('tbody').remove()

}

export {renderKube, highlightCell, removeKube}