const draggableList = document.getElementById('draggable-list');
const checkOrderBtn = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffet',
  'Bernard Arnault',
  'Carlog Slim Hilu',
  'Amancio Ortega',
  'Larry Elison',
  'Mark Zuckerberg',
  'Micheal Bloomberg',
  'Larry Page'
];

// Store items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
      console.log(person);
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines" ></i>
            </div>
        `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
  addEventListeners();
}

function dragStart() {
  //   console.log('Event: ', 'dragStart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  //   console.log(dragStartIndex);
}
function dragEnter() {
  //   console.log('Event: ', 'dragEnter');
  this.classList.add('over');
}
function dragLeave() {
  //   console.log('Event: ', 'dragLeave');
  this.classList.remove('over');
}
function dragOver(e) {
  //   console.log('Event: ', 'dragOver');
  e.preventDefault();
}
function dragDrop() {
  //   console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

function swapItems(startIndex, endIndex) {
  const itemOne = listItems[startIndex].querySelector('.draggable');
  const itemTwo = listItems[endIndex].querySelector('.draggable');

  //SWAP
  listItems[startIndex].appendChild(itemTwo);
  listItems[endIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.add('right');
      listItem.classList.remove('wrong');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItem = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });
  dragListItem.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('drop', dragDrop);
  });
}

checkOrderBtn.addEventListener('click', checkOrder);
