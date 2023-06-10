var socket = io();
var name;
      let textarea = document.querySelector("#textarea");
      let messageArea = document.querySelector(".message__area");
      do{
      var name = prompt("Enter a   name....");
      console.log(name +'connected');
      }while(!name)
      textarea.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          sendmessage(e.target.value);
        }
      });
      function sendmessage(message) {
        let msg = {
          user: name,
          message: message.trim(),
        };
        addmessage(msg, "outgoing");
        textarea.value = "";
        scrollToBottom();
        socket.emit("message", msg);
      }
      function addmessage(msg, type) {
        let maindiv = document.createElement("div");
        let classname = type;
        maindiv.classList.add(classname, "message");
        let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
        maindiv.innerHTML = markup;
        messageArea.appendChild(maindiv);
      }

      socket.on("message", (msg) => {
        addmessage(msg, "incoming");
        scrollToBottom();
      });
      function scrollToBottom() {
        messageArea.scrollTop = messageArea.scrollHeight;
      }