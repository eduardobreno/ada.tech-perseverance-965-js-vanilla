import "./style.css";

const items = document.querySelectorAll(".item");
const columns = document.querySelectorAll(".column");

let dragItem: HTMLDivElement;

function dragStart(this: HTMLDivElement) {
  setTimeout(() => {
    this.className = "invisible";
  }, 10);
  dragItem = this;
  console.log("começou a arrastar");
}

function dragEnd(this: HTMLDivElement) {
  console.log("terminou de arrastar");
  this.className = "item";
}

function dragDrop(this: HTMLDivElement, event: Event) {
  event.preventDefault();
  console.log("drop aqui", event);
  this.append(dragItem);
}

function dragOver(event: Event) {
  event.preventDefault();
  console.log("arrastou por cima");
}

items.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
});

columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("drop", dragDrop);
});
