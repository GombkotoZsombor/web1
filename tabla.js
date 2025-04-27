const form = document.getElementById('form');
const tbody = document.querySelector('#table tbody');
const searchInput = document.getElementById('search');

let data = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const height = document.getElementById('height').value;
  const weight = document.getElementById('weight').value;
  
  if (name.length >= 2 && age && height && weight) {
    data.push({ name, age, height, weight });
    renderTable();
    form.reset();
  }
});

searchInput.addEventListener('input', renderTable);

function renderTable() {
  const search = searchInput.value.toLowerCase();
  tbody.innerHTML = '';
  data
    .filter(row => Object.values(row).some(val => val.toString().toLowerCase().includes(search)))
    .forEach((row, i) => {
      const tr = document.createElement('tr');
      for (let key in row) {
        const td = document.createElement('td');
        td.textContent = row[key];
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    });
}
