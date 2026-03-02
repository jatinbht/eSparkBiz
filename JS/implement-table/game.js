import Table from "./table.js";

let level = 1;
const table = Table.createOn(document.body);

export function isCorrect(cellElementId) {
    if (cellElementId=='cellElement1') { //todo: randomize the valid cell //todo: validate using cell reference object
        getNextLevel();
    } else {
        document.write('Game Over') //todo: allow user to retry
    }
}

export function getNextLevel() { //todo: make table generation/increment dynamic
    // Table.getTable()
    //     .clear()
    //     .addRow()
    //         .addCell('Data1')
    //         .addCell('Data2')
    //         .endCell()
    //     .addRow()
    //         .addCell('data3')
    //         .addCell('data4')
    //         .endCell()
    //     .addRow()
    //         .addCell('data5')
    //         .addCell('data6')
    //         .endCell()

    table.generate(level);
    level++;
}

export function gameOver() {
    document.write("Game Over");
}