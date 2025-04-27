const API_URL = "http://gamf.nhely.hu/ajax2/";
const CODE = "ABCDEF123";  // Itt a saját NEPTUN+kódod legyen!

document.getElementById("loadData").addEventListener("click", loadData);
document.getElementById("createData").addEventListener("click", createData);
document.getElementById("getDataForId").addEventListener("click", getDataForId);
document.getElementById("updateData").addEventListener("click", updateData);
document.getElementById("deleteData").addEventListener("click", deleteData);

function loadData() {
  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      op: "read",
      code: CODE
    })
  })
  .then(response => response.json())
  .then(data => {
    const dataList = document.getElementById("dataList");
    dataList.innerHTML = "";

    let heightSum = 0;
    let maxHeight = 0;

    data.list.forEach(item => {
      const div = document.createElement("div");
      div.textContent = `ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}`;
      dataList.appendChild(div);

      heightSum += parseInt(item.height);
      if (parseInt(item.height) > maxHeight) {
        maxHeight = parseInt(item.height);
      }
    });

    const avgHeight = (heightSum / data.list.length).toFixed(2);

    const stats = document.createElement("div");
    stats.innerHTML = `<br>Magasság összesen: ${heightSum} <br>Átlag: ${avgHeight} <br>Legnagyobb: ${maxHeight}`;
    dataList.appendChild(stats);
  });
}

function createData() {
  const name = document.getElementById("name").value.trim();
  const height = document.getElementById("height").value.trim();
  const weight = document.getElementById("weight").value.trim();

  if (!name || !height || !weight || name.length > 30) {
    alert("Hibás adatok! Név max 30 karakter, minden mező kötelező.");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      op: "create",
      code: CODE,
      name: name,
      height: height,
      weight: weight
    })
  })
  .then(response => response.text())
  .then(result => {
    document.getElementById("result").textContent = "Hozzáadás eredmény: " + result;
    loadData();
  });
}

function getDataForId() {
  const id = document.getElementById("updateId").value.trim();

  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      op: "read",
      code: CODE
    })
  })
  .then(response => response.json())
  .then(data => {
    const item = data.list.find(x => x.id === id);
    if (item) {
      document.getElementById("updateName").value = item.name;
      document.getElementById("updateHeight").value = item.height;
      document.getElementById("updateWeight").value = item.weight;
    } else {
      alert("Nincs ilyen ID!");
    }
  });
}

function updateData() {
  const id = document.getElementById("updateId").value.trim();
  const name = document.getElementById("updateName").value.trim();
  const height = document.getElementById("updateHeight").value.trim();
  const weight = document.getElementById("updateWeight").value.trim();

  if (!id || !name || !height || !weight || name.length > 30) {
    alert("Hibás adatok! Név max 30 karakter, minden mező kötelező.");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      op: "update",
      id: id,
      code: CODE,
      name: name,
      height: height,
      weight: weight
    })
  })
  .then(response => response.text())
  .then(result => {
    document.getElementById("result").textContent = "Módosítás eredmény: " + result;
    loadData();
  });
}

function deleteData() {
  const id = document.getElementById("deleteId").value.trim();

  if (!id) {
    alert("Adj meg ID-t!");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      op: "delete",
      id: id,
      code: CODE
    })
  })
  .then(response => response.text())
  .then(result => {
    document.getElementById("result").textContent = "Törlés eredmény: " + result;
    loadData();
  });
}
