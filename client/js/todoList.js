// event Listener
document.getElementById("add-btn").addEventListener("click", addTask);
document
  .getElementById("task-container")
  .addEventListener("click", checkBtnEvent);
document.getElementById("task-container").addEventListener("click", deleteBtn);
document.getElementById("btnAi").addEventListener("click", generateTask);
document
  .getElementById("deleteAllTask")
  .addEventListener("click", deleteAllTask);

// takes user input and add new task //
function addTask(e) {
  e.preventDefault();
  if (document.getElementById("input-value").value != "") {
    // input value
    let userInput = document.getElementById("input-value").value;

    // create todo div that contain 2 divs
    let todoDiv = document.createElement("div");
    todoDiv.classList.add(
      "flex",
      "items-center",
      "justify-between",
      "pt-4",
      "pb-4",
      "bg-white",
      "rounded-[10px]",
      "shadow",
      "ml-4",
      "mr-4",
      "todoDiv"
    );
    todoDiv.id = "todoDiv";

    // create the first div that contain h2
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("ml-3");
    todoDiv.appendChild(contentDiv);

    // h2 that belong to the first div
    let contenth2 = document.createElement("h2");
    contenth2.classList.add("text-[#555555]", "text-lg", "font-semibold");
    contenth2.innerText = userInput;
    contentDiv.appendChild(contenth2);

    // create the second div that contain two btns
    let btnDiv = document.createElement("div");
    btnDiv.classList.add("mr-3", "flex", "items-center", "gap-2");
    todoDiv.appendChild(btnDiv);

    // create the first button
    let checkBtn = document.createElement("button");
    checkBtn.classList.add(
      "bg-[#555555]",
      "w-[38px]",
      "h-[38px]",
      "rounded-[9px]",
      "font-bold",
      "text-sm"
    );
    checkBtn.id = "checkBtn";
    checkBtn.innerHTML += `<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2.3"
      stroke="currentColor"
      class="w-6 h-6 text-[#f4f4f4] m-auto pointer-events-none"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>`;
    btnDiv.appendChild(checkBtn);

    // create the second btn
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add(
      "bg-[#ff4f4f]",
      "w-[38px]",
      "h-[38px]",
      "rounded-[9px]",
      "font-bold",
      "text-sm"
    );
    deleteBtn.id = "deleteBtn";
    deleteBtn.innerHTML = `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="2.3"
    stroke="currentColor"
    class="w-6 h-6 text-[#f4f4f4] m-auto pointer-events-none"
    >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
    </svg>`;
    btnDiv.appendChild(deleteBtn);

    let list = document.getElementById("task-container");
    list.appendChild(todoDiv);

    document.getElementById("input-value").value = "";
  } else {
    alert("the input is empty");
  }
}

// check complete btn
function checkBtnEvent(e) {
  let targetBtn = e.target;

  if (targetBtn.id === "checkBtn") {
    let btndiv = checkBtn.parentElement;
    let todoDiv = btndiv.parentElement;
    todoDiv.classList.add("line-through", "opacity-50");
  }
}

// delete btn
function deleteBtn(e) {
  let targetkBtn = e.target;

  if (targetkBtn.id === "deleteBtn") {
    let btndiv = checkBtn.parentElement;
    let todoDiv = btndiv.parentElement;
    todoDiv.remove();
  }
}

// send request to open ai
function generateTask() {
  let body = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "give me a not that hard task to do at home in my day max 5 words",
      },
    ],
  };

  let headers = {
    Authorization: "Bearer paste-your-chatgpt-key-here",
  };

  axios
    .post("https://api.openai.com/v1/chat/completions", body, {
      headers: headers,
    })
    .then((response) => {
      // let reply = response.data.choices[0].message.content;
      // console.log(reply)
      addApiResToList(response);
      console.log(response);
    });
}

// add api responde as a task
function addApiResToList(response) {
  let reply = response.data.choices[0].message.content;

  // create todo div that contain 2 divs
  let todoDiv = document.createElement("div");
  todoDiv.classList.add(
    "flex",
    "items-center",
    "justify-between",
    "pt-4",
    "pb-4",
    "bg-white",
    "rounded-[10px]",
    "shadow",
    "ml-4",
    "mr-4",
    "todoDiv"
  );

  // create the first div that contain h2
  let contentDiv = document.createElement("div");
  contentDiv.classList.add("ml-3");
  todoDiv.appendChild(contentDiv);

  // h2 that belong to the first div
  let contenth2 = document.createElement("h12");
  contenth2.classList.add("text-[#555555]", "text-lg", "font-semibold");
  contenth2.innerText = reply;
  contentDiv.appendChild(contenth2);

  // create the second div that contain two btns
  let btnDiv = document.createElement("div");
  btnDiv.classList.add("mr-3", "flex", "items-center", "gap-2");
  todoDiv.appendChild(btnDiv);

  // create the first button
  let checkBtn = document.createElement("button");
  checkBtn.classList.add(
    "bg-[#555555]",
    "w-[38px]",
    "h-[38px]",
    "rounded-[9px]",
    "font-bold",
    "text-sm"
  );
  checkBtn.id = "checkBtn";
  checkBtn.innerHTML += `<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.3"
        stroke="currentColor"
        class="w-6 h-6 text-[#f4f4f4] m-auto pointer-events-none"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>`;
  btnDiv.appendChild(checkBtn);

  // create the second btn
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add(
    "bg-[#ff4f4f]",
    "w-[38px]",
    "h-[38px]",
    "rounded-[9px]",
    "font-bold",
    "text-sm"
  );
  deleteBtn.id = "deleteBtn";
  deleteBtn.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2.3"
      stroke="currentColor"
      class="w-6 h-6 text-[#f4f4f4] m-auto pointer-events-none"
      >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
      </svg>`;
  btnDiv.appendChild(deleteBtn);

  let list = document.getElementById("task-container");
  list.appendChild(todoDiv);
}

// delete btn that remove all tasks by clicking on it
function deleteAllTask(e) {
  let list = document.querySelectorAll(".todoDiv");

  list.forEach((list) => {
    list.remove();
  });
}
