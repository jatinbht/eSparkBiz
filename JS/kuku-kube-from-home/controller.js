import {renderKube, highlightCell, removeKube} from './view.js'
import {generateValidCell, setNextLevelState, isValid, resetState, getState, setCells} from './game.model.js'

function start() {
    resetState()
    let {level} = getState()

    const cells = renderKube(level);
    setCells(cells)
    const validCell = generateValidCell(); //NOTE: can also be const validCell = ...
    console.debug('validCell from controller ', validCell)
    highlightCell(validCell)
}


function advanceLevel(){
    removeKube()
    setNextLevelState()

    let {level} = getState()

    const cells = renderKube(level);
    setCells(cells)
    const validCell = generateValidCell(); //NOTE: can also be const validCell = ...
    console.debug('validCell from controller ', validCell)
    highlightCell(validCell)
}



function handleClick(e) {
    const clickedCell = e.target;
    const {validCell} = getState()

    if (isValid(clickedCell, validCell)) return advanceLevel();
}

export {start, advanceLevel, handleClick}