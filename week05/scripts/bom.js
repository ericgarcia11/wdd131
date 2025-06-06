const button = document.querySelector('button');
const input = document.querySelector('#favchap');
const list = document.querySelector('#list');

let chaptersArray = getChapterList() || [];

chaptersArray.forEach(chapter => {
    displayList(chapter);
});

console.log(`I don't copy code. instead of, I always try to understand it and to create my own code and logic when it is allowed.`);

function setChapterList(){
    localStorage.setItem(`favBomList`, JSON.stringify(chaptersArray));
};

function getChapterList (){
    return JSON.parse(localStorage.getItem(`favBomList`));
}

function deleteChapter(chapter){
    chapter = chapter.slice(0,chapter.length-1);
    chaptersArray = chaptersArray.filter((item) => item !== chapter);
    setChapterList();
}

function displayList(item){
    let li = document.createElement('li');
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    li.textContent = item;
    deleteButton.textContent = '❌';
    li.append(deleteButton);
    list.append(li);

    deleteButton.addEventListener('click', function(){
        deleteChapter(li.textContent);
        list.removeChild(li);
        input.focus();
    })
};

button.addEventListener('click', function(){
    if (input.value.trim() !== ''){
        displayList(input.value);
        chaptersArray.push(input.value);
        setChapterList();
        input.value = ``;
        input.focus();
    }
});

// button.addEventListener('click', function(){
//     if (input.value.trim() !== ''){
//         const li = document.createElement('li');
//         const deleteButton = document.createElement('button');
//         li.textContent = input.value;
//         deleteButton.textContent = '❌';
//         li.appendChild(deleteButton);
//         list.appendChild(li);

//         deleteButton.addEventListener('click', function(){
//             list.removeChild(li);
//             input.focus();
//         })

//         input.value = '';
//         input.focus();
//     }
// });