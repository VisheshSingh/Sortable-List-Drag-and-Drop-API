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
}
