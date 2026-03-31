```import {renderKube, highlightCell, removeKube} from './view.js'
import {generateValidCell, getNextLevelState, isValid, resetState} from './game.model.js'

function start() {
    let {level, cells, validCell} = resetState()

    renderKube(level, cells);
    validCell = generateValidCell();
    console.debug('validCell ', validCell)
    highlightCell(validCell)
}


function advanceLevel(){
    removeKube()
    let {cells, level, validCell} = getNextLevelState()

    renderKube(level, cells);
    validCell = generateValidCell();
    highlightCell(validCell)
}



function handleClick(e) {
    const clickedCell = e.target;

    if (isValid(clickedCell, validCell)) return advanceLevel();
}

export {start, advanceLevel, handleClick}``` ```import { handleClick } from "./controller.js";

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

export {renderKube, highlightCell, removeKube}``` ```import {start} from './controller.js'

start()``` ```let state = { level: 1, cells: [], validCell: null };

function generateValidCell() {
    const randomCellsIndex = Math.floor(Math.random() * state.cells.length);
    const validCell = state.cells[randomCellsIndex];
    console.debug('validCell ', validCell);
    return validCell
}

function getNextLevelState() {
    // document.querySelector('tbody').remove();
    state.cells = [];
    state.level++;
    state.validCell = null
    console.debug(level);

    // renderKube();
    // generateValidCell();
    // highlightValidCell();
}

function isValid(clickedCell, validCell) {
    if (clickedCell === validCell) return true;
    return false;
}

function resetState() {
    state.level = 1;
    state.cells = [];
    state.validCell = null;

    return state
}

function getState(){
    return state
}

export {generateValidCell, getNextLevelState, isValid, resetState, getState}``` ```<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="./style.css">
</head>

<body>
    <table>
    </table>
    <script type="module" src="./index.js"></script>
</body>
</html>```