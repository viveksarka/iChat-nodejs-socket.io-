const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

const audiosend=new Audio('facebookchat.mp3');
const audiorecieve=new Audio('snapchat.mp3');
do {
    name = prompt('Please enter your name: ');
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    audiosend.play();
    scrollToBottom();

    // Send to server 
    socket.emit('message', msg);

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    audiorecieve.play();
    scrollToBottom();
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}




//const socket=io();
// let username;
// let textarea=document.querySelector('#textarea');
// let messagearea=document.querySelector('.message__area');
// console.log('hello');
// do{
//     username=prompt('please enter your name');
// }while(!username);
// textarea.addEventListener('keyup',(e)=>{
//     if(e.key === 'Enter'){
//         sendMessage(e.target.value);
//     }
// });
// function sendMessage(message){
//     let msg={
//         user:username,
//         message:message.trim(),
//     }
//     appendMessage(msg,'outgoing');  
//     textarea.value='';   
//     scrollToButtom();
//     socket.emit('message',msg);
// }
// function appendMessage(msg,type){
//     let mainDiv=document.createElement('div');
//     let className=type;
//     mainDiv.classList.add(className,'message');
//     let markup=`
//        <h4> ${msg.user} </h4>
//        <p> ${msg.message} </p>
//     `;
//     mainDiv.innerHTML=markup;
//     messagearea.appendChild(mainDiv);
// }
// socket.on('message',(msg)=>{
//     appendMessage('msg','incoming');
//     scrollToButtom();
// });
// function scrollToButtom(){
//     messagearea.scrollTop=messagearea.scrollHeight;
// }