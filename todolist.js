// selectors

let ulDom = document.querySelector("#list");
let taskDom = document.querySelector("#task");
let btnDom = document.querySelector("#liveToastBtn");
let taskList = { id: "", task: "", check: false };
let taskArr = [];
let i = 0;

// events

btnDom.addEventListener("click", newItem);

// localStorage

if (localStorage.getItem("List Items")) {
  taskArr = JSON.parse(localStorage.getItem("List Items"));
  taskArr.forEach(function (item) {
    i++;
    item.id = `id${i}`;
    localStorage.setItem("List Items", JSON.stringify(taskArr));

    let newLi = document.createElement(`li`);
    newLi.setAttribute("id", `id${i}`);
    newLi.innerHTML = `<span>${item.task}</span> 
    <span class="time" id="time${i}" ></span>
    <input  type="text">
      <button class="delete bi bi-trash3 text-dark" 
      onclick="removeListitem(${i})"
      > </button>
      <button type="submit" class="edit bi bi-pencil-square text-dark"
      onclick="editItem(${i})"
      > </button>
      `;
    ulDom.append(newLi);
    let d = new Date();

    let time = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} `;
    document.querySelector(`#time${i}`).innerText = time;

    if (taskArr[i - 1].check) {
      let check = document.querySelector(`#id${i}`);
      let checkClass = ["checked", "bi", "bi-clipboard-check"];
      check.classList.add(...checkClass);
    }
  });
}

if (document.querySelector(".checked") === null) {
  document.getElementById("customSwitch1").disabled = true;
}

if (JSON.parse(localStorage.getItem("customSwitch1"))) {
  let hideItem = document.querySelectorAll(".checked");
  for (let a = 0; a < hideItem.length; a++) {
    hideItem[a].classList.toggle("hide");
    document.getElementById("customSwitch1").checked = true;
  }
}

// functions

// functions // listeye yeni eleman ekleme ve uyarılar
function newItem(e) {
  e.preventDefault();

  if (taskDom.value.trim().length > 0) {
    i++;
    taskList.task = taskDom.value;
    taskList.id = `id${i}`;
    taskArr.push(taskList);
    localStorage.setItem("List Items", JSON.stringify(taskArr));
    taskArr = JSON.parse(localStorage.getItem("List Items"));

    let newLi = document.createElement(`li`);
    newLi.setAttribute("id", `id${i}`);
    newLi.innerHTML = `<span>${taskDom.value}</span>
        <input type="text">
        <span class="time" id="time${i}" ></span>
        <button class="delete bi bi-trash3 text-dark"
        onclick="removeListitem(${i})"
        > </button>
        <button type="submit" class="edit bi bi-pencil-square text-dark"
        onclick="editItem(${i})"
        > </button>
        `;
    ulDom.append(newLi);
    let d = new Date();
    let time = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    document.querySelector(`#time${i}`).innerText = time;

    taskDom.value = "";

    $("#liveToast-scc").toast("show");
  } else {
    $("#liveToast-err").toast("show");
  }
}

// functions // check
document.addEventListener("click", (item) => {
  if (item.target.matches("li")) {
    let itemID = item.target.id;

    let itemIndex = taskArr.findIndex(function (indexNo) {
      return JSON.stringify(indexNo).indexOf(`${itemID}`) >= 0;
    });

    taskArr[itemIndex].check = !taskArr[itemIndex].check;
    localStorage.setItem("List Items", JSON.stringify(taskArr));
    taskArr = JSON.parse(localStorage.getItem("List Items"));

    let checked = document.querySelector(`#${itemID}`);

    checked.classList.toggle("checked");
    checked.classList.toggle("bi");
    checked.classList.toggle("bi-clipboard-check");
    console.log("j6j");

    if (document.querySelector(".checked") === null) {
      document.getElementById("customSwitch1").disabled = true;
    } else {
      document.getElementById("customSwitch1").disabled = false;
    }

    if (document.getElementById("customSwitch1").checked == true) {
      checked.classList.toggle("hide");
    }
  }
});

// functions // eleman silme
function removeListitem(j) {
  const item = document.querySelector(`#id${j}`);

  let index = taskArr.findIndex(function (indexNo) {
    return JSON.stringify(indexNo).indexOf(`id${j}`) >= 0;
  });
  taskArr.splice(index, 1);
  localStorage.setItem("List Items", JSON.stringify(taskArr));
  taskArr = JSON.parse(localStorage.getItem("List Items"));
  item.remove();
}

// functions // edit
function editItem(j) {
  const item = document.querySelector(`#id${j}`);

  let index = taskArr.findIndex(function (indexNo) {
    return JSON.stringify(indexNo).indexOf(`id${j}`) >= 0;
  });

  let editInput = item.querySelector("input[type=text]");
  let label = item.querySelector("span");
  let containClass = item.classList.contains("editMode");

  if (containClass) {
    label.innerText = editInput.value;
    let itemIndex = taskArr.findIndex(function (indexNo) {
      return JSON.stringify(indexNo).indexOf(`${item.id}`) >= 0;
    });
    taskArr[itemIndex].task = label.innerText;
    localStorage.setItem("List Items", JSON.stringify(taskArr));
    taskArr = JSON.parse(localStorage.getItem("List Items"));
  } else {
    editInput.value = label.innerText;
  }
  item.classList.toggle("editMode");
}

// functions // hide
function hide() {
  let hideItem = document.querySelectorAll(".checked");
  for (let a = 0; a < hideItem.length; a++) {
    hideItem[a].classList.toggle("hide");

    var checkbox = document.getElementById("customSwitch1");
    localStorage.setItem("customSwitch1", checkbox.checked);
  }
}
