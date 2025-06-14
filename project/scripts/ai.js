const yearSpan = document.querySelector("footer span");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last modified: ${lastModified}`;

const navigation = document.querySelector("#navigation");
const hamburgerButton = document.getElementById('hamburgerButton');
const headerTitle = document.querySelector('h1');
const themeImg = document.getElementById('theme');
const sendMsgButton = document.getElementById('send_msg_button');
const profileForm = document.getElementById('form1');
let profileCards = document.getElementById(`profileCards`);
const getStudyPlanButton = document.getElementById('getStudyPlan');
let params = new URLSearchParams(window.location.search);
let createNewUser = params.get('createNewUser');
document.getElementsByTagName('main')[0].style.height = '70vh';

// let profileData = getProfileData() || [];

// ================= DISPLAY SECTION ================= 
// if (profileData.length>0 && !createNewUser){
//     profileForm.style.display = "none";
//     displayProfiles();
// }

// function displayProfiles(){
//     document.getElementsByTagName('main')[0].style.height = '';
//     document.getElementsByTagName('main')[0].style.display = 'flex';
//     document.getElementsByTagName('main')[0].style.justifyContent = 'center';
//     let profileCardIndex = 0;
//     profileData.forEach(profile => {
//         let profileCard = document.createElement('section');
//         profileCard.classList.add('profileCard');

//         if (profile.selected){
//             profileCard.id = 'profileSelected';
//         }

//         let profileCardName = document.createElement('legend');
//         profileCardName.style.fontWeight = 'bold';
//         profileCardName.textContent = profile.profileName;

//         let profileCardLevel = document.createElement('legend');
//         profileCardLevel.textContent = `Level: ${profile.level}`;

//         let profileCardGoalDate = document.createElement('legend');
//         profileCardGoalDate.textContent = `Goal Date: ${profile.goalDate}`;

//         let profileCardGoal = document.createElement('legend');
//         profileCardGoal.textContent = `Goal: "${profile.goal}"`;

//         let profileCardSelectButton = document.createElement('button');
//         profileCardSelectButton.classList.add('profileCardSelectButton');
//         profileCardSelectButton.textContent = 'Select';
//         profileCardSelectButton.setAttribute('data-index', profileCardIndex);

//         let profileCardDeleteButton = document.createElement('button');
//         profileCardDeleteButton.classList.add('profileCardDeleteButton');
//         profileCardDeleteButton.textContent = 'Delete';
//         profileCardDeleteButton.setAttribute('data-index', profileCardIndex);
        
//         profileCard.appendChild(profileCardName);
//         profileCard.appendChild(profileCardLevel);
//         profileCard.appendChild(profileCardGoalDate);
//         profileCard.appendChild(profileCardGoal);
//         profileCard.appendChild(profileCardDeleteButton);
//         if (!profile.selected){
//             profileCard.appendChild(profileCardSelectButton);
//         }

//         profileCards.appendChild(profileCard);
//         profileCardIndex += 1;
//     })
//     let createNewProfileButton = document.createElement('button');
//     createNewProfileButton.classList.add('createNewProfileButton');
//     createNewProfileButton.textContent = 'Create New Profile';
//     profileCards.appendChild(createNewProfileButton);
//     console.log(profileCards.children.length);
//     if (profileCards.children.length < 3){
//         document.getElementsByTagName('main')[0].style.minHeight = '70vh';
//     } else {
//         document.getElementsByTagName('main')[0].style.minHeight = '0';
//     }
// }

// function getProfileData(){
//     let profileData = JSON.parse(localStorage.getItem(`profileData`));
//     if (profileData){
//         return sortedProfiles = [...profileData].sort((a, b) => {
//             return (b.selected === true) - (a.selected === true);
//         });
//     } else{
//         return [];
//     }
// }

// // ================= HANDLE PROFILE DATAS SECTION ================= 
// document.getElementById('form1').addEventListener('submit', function(event) {
    
//     event.preventDefault(); 

//     let profileName = document.querySelector('input[name="userName"]').value;
//     let level = document.querySelector('select[name="level"]').value;
//     let goalDate = document.querySelector('input[name="goalDate"]').value;
//     let goal = document.querySelector('textarea[name="goal"]').value;

//     // set all profiles as not selected
//     profileData = profileData.map(profile => ({ ...profile, selected: false }));

//     // get the next chat id
//     let nextChatId = 1;
//     profileData.forEach(profile => {
//         if (profile.chats) {
//             profile.chats.forEach(chat => {
//                 if (chat.id >= nextChatId) nextChatId = chat.id + 1;
//             });
//         }
//     });

//     let newProfile = { 
//         profileName: profileName,
//         level: level,
//         goalDate: goalDate,
//         goal: goal,
//         selected: true,
//         chats: [
//             {
//                 id: nextChatId,
//                 messages: [
//                     {
//                         role: "system",
//                         content: "You are a Music Teacher, from 'learn music' website. Your role is to create musical study plans based on the user needs."
//                     },
//                     {
//                         role: "user",
//                         content: `Hi, my name is ${profileName}, my level is ${level}, my date to achieve my goal is ${goalDate} and my goal is ${goal}. Please, create a study plan for me.`
//                     }
//                 ]
//             }
//         ]
//     };
//     profileData.push(newProfile);

//     localStorage.setItem('profileData', JSON.stringify(profileData));
//     window.location.href = 'profile.html';
// });

// const createNewProfileButton = document.querySelector('.createNewProfileButton');

// if (createNewProfileButton){
//     createNewProfileButton.addEventListener('click', function(){
//         createNewUser = true;
//         window.location.href = `profile.html?createNewUser=${encodeURIComponent(createNewUser)}`;
//     })
// }

// let profileCardDeleteButtons = document.querySelectorAll('.profileCardDeleteButton');
// profileCardDeleteButtons.forEach(profileCardDeleteButton => {
//     profileCardDeleteButton.addEventListener('click', function() {
//         let index = this.getAttribute('data-index');
//         if (index !== null) {
//             if (profileData.length > 1){
//                 profileData.splice(index, 1);
//                 profileData[0].selected = true;
//                 localStorage.setItem('profileData', JSON.stringify(profileData));
//             } else {
//                 localStorage.removeItem('profileData');
//             }
//             window.location.reload();
//         }
//     });
// });

// let profileCardSelectButtons = document.querySelectorAll('.profileCardSelectButton');
// profileCardSelectButtons.forEach(profileCardSelectButton => {
//     profileCardSelectButton.addEventListener('click', function() {
//         let index = this.getAttribute('data-index');
//         if (index !== null) {
//             profileData.forEach(profile => {
//                 profile.selected = false;
//             });
//             profileData[index].selected = true;
//             localStorage.setItem('profileData', JSON.stringify(profileData));
//             window.location.reload();
//         }
//     });
// });

// ================= THEME SECTION ================= 
let theme = getTheme() || `light`;

if (theme === 'dark'){
    document.documentElement.classList.add('dark');
    themeImg.setAttribute(`src`,`images/light.svg`);
    send_msg_button
} else {
    themeImg.setAttribute(`src`,`images/dark.svg`);
}

function getTheme(){
    return JSON.parse(localStorage.getItem(`theme`));
}

function setTheme(){
    localStorage.setItem(`theme`, JSON.stringify(theme));
};

themeImg.addEventListener('click', function(){
    document.documentElement.classList.toggle('dark');
    if (document.documentElement.classList == 'dark'){
        theme = `dark`;
        themeImg.setAttribute(`src`,`images/light.svg`);
        sendMsgButton.setAttribute('src','images/dark_send.svg');
    } else {
        theme = `light`;
        themeImg.setAttribute(`src`,`images/dark.svg`);
        sendMsgButton.setAttribute('src','images/light_send.svg');
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
