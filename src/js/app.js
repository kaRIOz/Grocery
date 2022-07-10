// Grocery Class : Request a Grocery
class Grocery {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.date = new Date().toDateString();
  }
}

// UI Class : Handle UI Tasks

class UI {
  static DisplayGrocery() {
    const groceries = LS.getFromLS();

    groceries.forEach((grocery) => UI.addGroceryTOList(grocery));
  }

  static addGroceryTOList(grocery) {
    const myList = document.querySelector(".myList");
    const lists = document.createElement("div");

    lists.innerHTML = `
    
          <div class="sigleItem px-2 py-1 mb-2 hover:shadow-[0_0_5px_rgba(230,234,227,0.3)] ease-in duration-300 rounded-xl">
                <div class="flex flex-items-center justify-between">
                    <h1 class="output-title text-lg text-slate-200 capitalize font-semibold">${grocery.title}</h1>
                    <button class="delete flex items-center justify-center text-red-800 font-bold w-8 h-8 rounded-full border-2 border-slate-800 cursor-pointer hover:border-red-800">X</button>
                </div>
                <div>
                    <p class="text-lg italic text-slate-400 tracking-wider">${grocery.description}
                    </p>
                    <span class="date text-slate-400 text-sm">${grocery.date}</span>
                </div>
           </div>
    
    `;

    myList.appendChild(lists);
  }

  static RemoveBtn(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();

      // removed alert
      UI.showAlert("Grocery Removed", "amber");
    }
  }

  static showAlert(message, alertType) {
    const myAlert = document.getElementById("myAlert");
    myAlert.innerHTML = `<h2 class="text-center text-xl text-slate-200 rounded-xl p-2 bg-${alertType}-500">${message}</h2>`;

    // remove alert

    setTimeout(() => (myAlert.innerHTML = ""), 2000);
  }

  static clearInputs() {
    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
  }
}

// Store Class : Handle Storage
class LS {
  static getFromLS() {
    const sotredGrocery = JSON.parse(localStorage.getItem("groceries")) || [];

    return sotredGrocery;
  }

  static addTOLS(grocery) {
    const groceries = LS.getFromLS();

    groceries.push(grocery);

    localStorage.setItem("groceries", JSON.stringify(groceries));
  }

  static removeFromLS(id) {
    const groceries = LS.getFromLS();

    groceries.forEach((grocery, index) => {
      if (grocery.date === id) {
        groceries.splice(index, 1);
      }
    });
    localStorage.setItem("groceries", JSON.stringify(groceries));
  }
}

// Events : Display list
document.addEventListener("DOMContentLoaded", UI.DisplayGrocery);

//  Add TO list

document.querySelector(".add-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const date = document.querySelector(".date");

  // validation

  if (!title || !description) {
    UI.showAlert("Please Fill The Fields", "red");
  } else {
    // initial state
    const grocery = new Grocery(title, description, date);

    //   add to list

    UI.addGroceryTOList(grocery);

    // add to store

    LS.addTOLS(grocery);

    // show added alert
    UI.showAlert("Grocery Added", "green");
    //   clear inputs

    UI.clearInputs();
  }
});

// Remove a list

document.querySelector(".myList").addEventListener("click", (e) => {
  UI.RemoveBtn(e.target);

  LS.removeFromLS(e.target.textContent);
});
