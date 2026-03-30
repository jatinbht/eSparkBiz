let state = { level: 1, cells: [], validCell: null };

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

export {generateValidCell, getNextLevelState, isValid, resetState, getState}