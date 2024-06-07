document.addEventListener("DOMContentLoaded", () => { 
    console.log("welcome to socket.io");
    var socket = io();

    // let btn  = document.getElementById("btn");
    // btn.addEventListener("click", () => {
    //     socket.emit("from client")
    // })

    // socket.on("from server", () => {
    //     let div = document.getElementById("server");
    //     let p = document.createElement("p");
    //     p.textContent = "Recived the event message from server";
    //     div.appendChild(p);
    // })

    let input = document.getElementById("chatbox");
    let msgList = document.getElementById("msgList");
    let send = document.getElementById("send");

    send.addEventListener("click", () => {
        let msg =  input.value;
        socket.emit("new message", {
            message: msg
        });
        input.value = "";
    })

    socket.on("msg recieved", (data) => {
        let msg = document.createElement("li");
        msg.textContent = data.message;
        msgList.appendChild(msg);
    })
})