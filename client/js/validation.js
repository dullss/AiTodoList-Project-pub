document.getElementById("contactUsForm").addEventListener("submit", validation);

function validation(e) {

    // calling inputs
    let name = document.getElementById("name").value;
    let nameInput = document.getElementById("name");
    let email = document.getElementById("email").value;
    let emailInput = document.getElementById("email");
    let number = document.getElementById("number").value;
    let numberInput = document.getElementById("number");
    let subject = document.getElementById("subject").value;
    let subjectInput = document.getElementById("subject");
    let message = document.getElementById("message").value;
    let messageInput = document.getElementById("message");
    let redMessage = document.getElementById("redMessage");
    
    // fullName validator
    if(name === "") {
        redMessage.innerText += " please fill your full name,";
        nameInput.classList.add("border-red-500");
        e.preventDefault();
    } else {
        redMessage.innerText = "";
        nameInput.classList.remove("border-red-500");
        nameInput.classList.add("border-green-500")
    }

    // email validator
    if(email === "") {
        redMessage.innerText += " please fill your email,";
        emailInput.classList.add("border-red-500");
        e.preventDefault();
    } else {
        redMessage.innerText = "";
        emailInput.classList.remove("border-red-500");
        emailInput.classList.add("border-green-500");
    }

    // number validator
    if(number.length < 10 || number.length > 10) {
        redMessage.innerText += " wrong number,";
        numberInput.classList.add("border-red-500");
        e.preventDefault();
    } else {
        redMessage.innerText = "";
        numberInput.classList.remove("border-red-500");
        numberInput.classList.add("border-green-500");
    }

    // subject validator 
    if(subject === "") {
        redMessage.innerText += " please fill the subject input,";
        subjectInput.classList.add("border-red-500");
        e.preventDefault();
    } else {
        redMessage.innerText = "";
        subjectInput.classList.remove("border-red-500");
        subjectInput.classList.add("border-green-500");
    }
    
    // message validator
    if(message === "") {
        redMessage.innerText += " please fill the message input,";
        messageInput.classList.add("border-red-500");
        e.preventDefault();
    } else {
        redMessage.innerText = "";
        messageInput.classList.remove("border-red-500");
        messageInput.classList.add("border-green-500");
    }
}