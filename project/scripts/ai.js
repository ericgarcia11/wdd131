const yearSpan = document.querySelector("footer span");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last modified: ${lastModified}`;

const navigation = document.querySelector("#navigation");
const hamburgerButton = document.getElementById('hamburgerButton');
const headerTitle = document.querySelector('h1');
const themeImg = document.getElementById('theme');
let sendMsgButton = document.getElementById('send_msg_button');
const sadFaceImg = document.getElementById('sadFaceImg');
const profileForm = document.getElementById('form1');
let profileCards = document.getElementById(`profileCards`);
const getStudyPlanButton = document.getElementById('getStudyPlan');
let params = new URLSearchParams(window.location.search);
const sectionGetStarted = document.getElementById('getStarted');
let createNewUser = params.get('createNewUser');
const today = new Date();
const todayDate = today.toISOString().split('T')[0];
// document.getElementsByTagName('main')[0].style.height = '70vh';

let profileSelectedData = getChatsData() || null;

// ================= DISPLAY SECTION ================= 
if(profileSelectedData){
    sectionGetStarted.style.display = "none";
    displayChatData();
}

function displayChatData(){ 
    // let chatIndex = 0;  
    let divAiContainer = document.createElement('div');
    divAiContainer.id = 'aiContainer';
    let sectionChats = document.createElement('section');
    sectionChats.id = 'chats';
    let sectionChat = document.createElement('section');
    sectionChat.id = 'chat';
    let divChatMessages = document.createElement('div');
    divChatMessages.id = 'chatMessages';
    let divChatInput = document.createElement('div');
    divChatInput.id = 'chatInput';
    let textareaMessageInput = document.createElement('textarea');
    textareaMessageInput.id = 'userMessageInput';
    textareaMessageInput.required = true;
    textareaMessageInput.setAttribute('placeholder','what is a harmonic field?');
    let buttonSendMsg = document.createElement('button');
    buttonSendMsg.type = 'submit';
    let imgSendMsg = document.createElement('img');
    imgSendMsg.id = 'send_msg_button';
    imgSendMsg.alt = 'send msg button';
    buttonSendMsg.appendChild(imgSendMsg);
    divChatInput.appendChild(textareaMessageInput);
    divChatInput.appendChild(buttonSendMsg);

    // newChat div button
    let buttonNewChat= document.createElement('button');
    // divChatsItem.classList.add('chats');
    buttonNewChat.textContent = `Create New Chat`;
    buttonNewChat.id = 'buttonNewChat';
    sectionChats.appendChild(buttonNewChat);

    profileSelectedData.chats.slice().reverse().forEach((chat,i) => {
        const chatIndex = profileSelectedData.chats.length - 1 - i;
        let divChatsItem = document.createElement('div');
        divChatsItem.classList.add('chats');
        divChatsItem.textContent = `${chat.messages[chat.messages.length-1].content.substring(0, 22)}...`;
        divChatsItem.setAttribute('data-index', chatIndex);
        sectionChats.appendChild(divChatsItem);
        // chatIndex += 1;
    })
    
    let chat = getSelectedChat(profileSelectedData);
    // let chat = profileSelectedData.chats.forEach(chat => {
    //     if (chat.selected){
    //         return chat;
    //     }
    // }) || profileSelectedData.chats[profileSelectedData.chats.length -1];
    
    chat.messages.forEach(message => {
        if (message.role == 'user'){
            let divMessage = document.createElement('div');
            divMessage.classList.add('userMessage');
            let userMessageContent = message.content;
            if(message.content.includes('####')){
                userMessageContent = message.content.split('####')[1];
            }
            divMessage.textContent = userMessageContent;
            divChatMessages.appendChild(divMessage);
        } if(message.role == 'model'){
            let divMessage = document.createElement('div');
            divMessage.classList.add('aiMessage');
            divMessage.textContent = message.content;
            divChatMessages.appendChild(divMessage);
        } 
    })

    sectionChat.appendChild(divChatMessages);
    sectionChat.appendChild(divChatInput);
    divAiContainer.appendChild(sectionChats);
    divAiContainer.appendChild(sectionChat);

    let theme = getTheme() || `light`;
    if (theme === 'dark'){
        imgSendMsg.setAttribute('src','images/dark_send.svg');
    } else {
        imgSendMsg.setAttribute('src','images/light_send.svg'); 
    }

    document.querySelector('main').appendChild(divAiContainer);

    // checking if is the first time opening this chat, to generate the first message.
    let profileSelected = getSelectedProfile();
    if (profileSelected){
        let chatSelected = getSelectedChat(profileSelected);
        if (chatSelected.messages.length == 2){
            genAiMessage(profileSelected, chatSelected);
        }
    }
    scrollDown();
}

function getChatsData(){
    let profileData = JSON.parse(localStorage.getItem(`profileData`));
    if (profileData && profileData.length > 0){
        let sortedProfiles = [...profileData].sort((a, b) => {
            return (b.selected === true) - (a.selected === true);
        });
        return sortedProfiles[0];
    } else{
        return null;
    }
}

// // ================= HANDLE CHAT SECTION ================= 

function displayNewMessage(newMessage){
    let divChatMessages = document.getElementById('chatMessages');
    if (newMessage.role == 'user'){
        let divMessage = document.createElement('div');
        divMessage.classList.add('userMessage');
        if(newMessage.content.includes('####')){
            newMessage.content = newMessage.content.split('####')[1];
        }
        divMessage.textContent = newMessage.content;
        divChatMessages.appendChild(divMessage);
    } if(newMessage.role == 'model'){
        let divMessage = document.createElement('div');
        divMessage.classList.add('aiMessage');
        divMessage.textContent = newMessage.content;
        divChatMessages.appendChild(divMessage);
    } 
}

function updateChat(profileId, chatId, messages){
    let profileData = JSON.parse(localStorage.getItem(`profileData`));
    profileData.forEach(profile =>{
        if(profile.id === profileId){
            profile.chats.forEach(chat => {
                if(chat.id === chatId){
                    chat.messages = messages;
                }
            });
        }
    })
    localStorage.setItem(`profileData`, JSON.stringify(profileData));
    // console.log(profileData);
}

function getSelectedProfile(){
    let profileData = JSON.parse(localStorage.getItem(`profileData`));
    return profileData.find(profile => profile.selected);
}

function getSelectedChat(profileSelected){
    let chatSelected = profileSelected.chats.find(chat => chat.selected);
    if (!chatSelected){
        chatSelected = profileSelected.chats[profileSelected.chats.length -1];
    }
    return chatSelected;
}

function scrollDown(){
    let chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function genAiMessage(profileSelected, chatSelected){
    // fetch('https://ai.sobressai.com.br/assistant/run', {
    let divChatMessages = document.getElementById('chatMessages');
    let divMessage = document.createElement('div');
    divMessage.classList.add('aiMessage');
    divMessage.textContent = 'Loading...';
    divChatMessages.appendChild(divMessage);
    scrollDown();

    fetch('https://ai.sobressai.com.br/assistant/run', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'class_project'
        },
        body: JSON.stringify({
            user_id: profileSelected.id,
            codsite: chatSelected.id,
            messages: chatSelected.messages
        })
    })
    .then(response => response.json())  
    .then(data => {
        // console.log(data.response);
        newMessage = {"role":"model", "content":data.response};
        chatSelected.messages.push(newMessage);
        updateChat(profileSelected.id, chatSelected.id, chatSelected.messages);
        divChatMessages.removeChild(divChatMessages.lastChild);
        displayNewMessage(newMessage); 
        scrollDown();
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
}

function createNewChat(profile){
    let nextChatId = 1;
 
    if (profile.chats) {
        profile.chats.forEach(chat => {
            if (chat.id >= nextChatId) nextChatId = chat.id + 1;
        });
    }

    let newChat = {
        id: nextChatId,
        selected: true,
        messages: [
            {
                role: "system",
                content: "You are a Music Teacher, from 'learn music' website. Your role is to create musical study plans based on the user needs."
            }
        ]
    } 
    
    let profileData = JSON.parse(localStorage.getItem(`profileData`));
    profileData.forEach(profileFor =>{
        if(profileFor.id === profile.id){
            profileFor.chats.forEach(chat =>{
                chat.selected = false;
            })
            profileFor.chats.push(newChat);
        }
    })
    localStorage.setItem(`profileData`, JSON.stringify(profileData));
    console.log(profileData);
}

let buttonSendMsg = document.getElementById('send_msg_button');
if (buttonSendMsg){
    document.getElementById('userMessageInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); 
            document.getElementById('send_msg_button').click();
        }
    });

    buttonSendMsg.addEventListener('click', function(){
        let userMessage = document.getElementById('userMessageInput').value;
        if(!userMessage){
            return null;
        }
        let divChatMessages = document.getElementById('chatMessages'); 
        if (divChatMessages.lastChild){
            if (divChatMessages.lastChild.textContent === `Loading...`){
                return null
            } 
        }
        let profileSelected = getSelectedProfile();
        if (!profileSelected){
            return null;
        }
        let textArea = document.getElementById('userMessageInput');
        let chatSelected = getSelectedChat(profileSelected);
        let newMessage = {"role":"user", "content": `Today is ${todayDate}####${userMessage}`};
        // console.log(newMessage);
        // console.log(chatSelected.messages);
        chatSelected.messages.push(newMessage);
        // console.log(chatSelected.messages);
        updateChat(profileSelected.id, chatSelected.id, chatSelected.messages)
        // console.log(profileSelected);
        displayNewMessage(newMessage);
        scrollDown();
        textArea.value = '';
        genAiMessage(profileSelected, chatSelected);
    })
}

let buttonNewChat = document.getElementById('buttonNewChat');
if (buttonNewChat){
    buttonNewChat.addEventListener('click', function(){
        let profile = getSelectedProfile();
        if(!profile){
            return null;
        } else {
            createNewChat(profile);
            window.location.reload();
        }
    })

    let divChatsItems = document.querySelectorAll('.chats');
    divChatsItems.forEach(divChatsItem => {
        divChatsItem.addEventListener('click', function() {
            let index = this.getAttribute('data-index');
            if (index !== null) {
                // definir este chat 'this' como o selected
                let profileData = JSON.parse(localStorage.getItem(`profileData`));
                let profileSelected = getSelectedProfile();
                profileData.forEach(profile =>{
                    if(profile.id === profileSelected.id){
                        let chatSelectedByUser = profile.chats[index];
                        profile.chats.forEach(chat =>{
                                chat.selected = false;
                        })
                        profile.chats.forEach(chat =>{
                            if(chat.id === chatSelectedByUser.id){
                                chat.selected = true;
                            }
                        })
                    }
                })
                localStorage.setItem(`profileData`, JSON.stringify(profileData));
                window.location.reload();
            }
        });
    });
}

// ==========================================================
if(!sendMsgButton){
    const getStartedButton = document.getElementById('getStartedButton');
    getStartedButton.addEventListener('click', function(){
        window.location.href = 'profile.html?createNewUser=true';
    })
}

// ================= THEME SECTION ================= 
let theme = getTheme() || `light`;

if (theme === 'dark'){
    document.documentElement.classList.add('dark');
    themeImg.setAttribute(`src`,`images/light.svg`);
    let sendMsgButton = document.getElementById('send_msg_button');
    if(sendMsgButton){
        sendMsgButton.setAttribute('src','images/dark_send.svg');
    } else {
        sadFaceImg.setAttribute('src','images/sad_dark.svg');
    }
} else {
    themeImg.setAttribute(`src`,`images/dark.svg`);
    if(sendMsgButton){
        sendMsgButton.setAttribute('src','images/light_send.svg');
    } else {
        sadFaceImg.setAttribute('src','images/sad_light.svg');
    }  
}

function getTheme(){
    return JSON.parse(localStorage.getItem(`theme`));
}

function setTheme(){
    localStorage.setItem(`theme`, JSON.stringify(theme));
};

themeImg.addEventListener('click', function(){
    document.documentElement.classList.toggle('dark');
    sendMsgButton = document.getElementById('send_msg_button');
    if (document.documentElement.classList == 'dark'){
        theme = `dark`;
        themeImg.setAttribute(`src`,`images/light.svg`);
        if(sendMsgButton){
            sendMsgButton.setAttribute('src','images/dark_send.svg');
        } else {
            sadFaceImg.setAttribute('src','images/sad_dark.svg');
        }
    } else {
        theme = `light`;
        themeImg.setAttribute(`src`,`images/dark.svg`);
        if(sendMsgButton){
            sendMsgButton.setAttribute('src','images/light_send.svg');
        } else {
            sadFaceImg.setAttribute('src','images/sad_light.svg');
        }
    }
    setTheme();
})

// ================= HAMBURGUER BUTTON SECTION ================= 
hamburgerButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamburgerButton.textContent = navigation.classList.contains("open") ? "✖" : "☰";
    if (navigation.classList.contains("open")){
        document.querySelector('header').removeChild(hamburgerButton);
        navigation.insertBefore(hamburgerButton, navigation.firstChild);
    } else {
        document.querySelector('header').appendChild(hamburgerButton);
    }
});

headerTitle.addEventListener('click', function(){
    window.location.href = 'home.html';
})
