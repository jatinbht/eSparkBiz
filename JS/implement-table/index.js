import Table from "./table.js";

Table.createOn(document.body)
    .addRow()
        .addCell('Data1')
        .addCell('Data2')
        .endCell()
    .addRow()
        .addCell('data3')
        .addCell('data4')