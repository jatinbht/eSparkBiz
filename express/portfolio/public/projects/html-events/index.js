function beforePrintHandler() {
    console.log('onbeforeprint called');
}

function afterPrintHandler() {
    console.log('onafterprint called');
}

const beforeUnloadHandler = () => {
    event.preventDefault(); //w/o this, not working
};

const nameInput = document.querySelector('#name');

nameInput.addEventListener('input', (event) => {
    if (event.target.value !== '') {
        window.addEventListener('beforeunload', beforeUnloadHandler);
    } else {
        window.removeEventListener('beforeunload', beforeUnloadHandler);
    }
});

function focusHandler() {
    console.log('focused');
}

function blurHandler() {
    //validate field when user focuses out
    console.log('blurred');
}

function focusInHandler() {
    console.log('focusin')
}
function focusOutHandler() {
    //validate field when user focuses out
    console.log('focusout')
}

function inputHandler(){ //generally used w/ sliders
    console.log('input')
}

function changeHandler(){
    console.log('change')
}

function clickHandler(){
    console.log('click')
}

function contextMenuHandler(e){
    e.preventDefault()
}

function dlbClickHandler() {
    console.log('double click')
}

function copyHandler(event){
    console.log(event);
    
}
function cutHandler(event){
    console.log(event);
    
}
function pasteHandler(event){
    console.log(event);
    
}

function handleDragStart(e) {
    stingifyDraggedData(e);
}

function handleDragOver(e) {
    allowDrop(e);
}

function handleDrop(e) {
    appendItem(e);
}

function stingifyDraggedData(e){
    const draggableElment = e.target

    e.dataTransfer.setData('text/plain', draggableElment.id)
}

function allowDrop(e){
    e.preventDefault()
}

function appendItem(e){
    const dropZone = e.currentTarget
    const draggedItemID = e.dataTransfer.getData('text/plain')
    const draggedItem = document.getElementById(draggedItemID)
    
    dropZone.appendChild(draggedItem)
}