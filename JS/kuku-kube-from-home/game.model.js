let state = { level: 1, cells: [], validCell: null };

function generateValidCell() {
    const randomCellsIndex = Math.floor(Math.random() * state.cells.length);
    state.validCell = state.cells[randomCellsIndex];
    console.debug('validCell from model ', state.validCell);
    return state.validCell
}

function setNextLevelState() {
    // document.querySelector('tbody').remove();
    state.cells = [];
    state.level++;
    state.validCell = null
    console.debug('setNextLevel ', state.level);

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

function setCells(cells){
    state.cells = cells
}

export {generateValidCell, setNextLevelState, isValid, resetState, getState, setCells}