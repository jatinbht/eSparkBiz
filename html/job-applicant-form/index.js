function addRow(button){//debug
    console.log(button)//debug
    const tbody = document.querySelector('table tbody')
    const firstRow = document.querySelector('table tbody tr')
    console.log(tbody, firstRow);

    const clone = firstRow.cloneNode(true)
    clone.setAttribute('style', 'visibility: visible;')
    
    tbody.appendChild(clone)
}

function removeRow(){
    const tbody = document.querySelector('table tbody')
    const lastRow = document.querySelector('table tbody').lastElementChild

    tbody.removeChild(lastRow)
}