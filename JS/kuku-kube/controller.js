import {renderKube, highlightCell, removeKube} from './view.js'
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

export {start, advanceLevel, handleClick}