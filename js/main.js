const gameKeys = document.querySelector('.gameKeys');
let alphabet = "abcdefghijklmnopqrstuvwxyz"
let alphabetArray = alphabet.split('')
const words = ["bouteille", "casserole", "fourchette", "spatule", "passoire", "cocorico"]
const displayedWord = document.querySelector(".displayedWord")
const victoryDiv = document.querySelector(".victory")
let secretWord
let displayedSecretWord
let mistakenLetters
let maxErrors = 3
let errors
console.log("DEBUT : ", displayedSecretWord)


console.log(document.querySelectorAll('.keyButton') )

function checkSecretWordForLetter(letterToFind) {
    if(!secretWord.includes(letterToFind))
    {
        return false
    }
    let indexes= []

    let secretWordArray = secretWord.split('')

    for(let i = 1; i < secretWordArray.length -1; i++)
    {
        if(secretWordArray[i] === letterToFind)
        {
            indexes.push(i)
        }
    }


    return indexes

}

function playLetter(playedLetter) {

    console.log(playedLetter)
    let indexes = checkSecretWordForLetter(playedLetter)

    if(!indexes){
     return wrongLetter(playedLetter)

    }

    return addLetterToWord(playedLetter, indexes)


}

function addLetterToWord(letterToAdd, indexes) {
   let displayedSecretWordArray = displayedSecretWord.split('')

    indexes.forEach(index => {
        displayedSecretWordArray[index] = letterToAdd
    })

    console.log("MILIEU : ", displayedSecretWord)

    displayedSecretWord = displayedSecretWordArray.toString().replaceAll(',', '')
    console.log("FIN : ", displayedSecretWord)
    displayGameWord()
    disableUsedLettersFromKeyboard()
    checkForWinOrLost()

}

function createKeyboard(){
    alphabetArray.forEach((letter) => {
        let newKey = document.createElement("button");
        newKey.classList.add('btn');
        newKey.classList.add('keyButton');
        newKey.id = letter;
        newKey.classList.add('btn-outline-primary');
        newKey.textContent = letter;

        gameKeys.appendChild(newKey);


    })
    document.querySelectorAll('.keyButton').forEach((gameKey) => {
        gameKey.addEventListener('click', e => {

            console.log(gameKey.id);
        })
    })

    wireKeyButtons()

}
function initGame() {
    errors = 0
    mistakenLetters = []
    createKeyboard()
    pickRandomWord()
    prepareDisplayedSecretWord()
    displayGameWord()
    disableUsedLettersFromKeyboard()
}
function pickRandomWord(){
    let randomIndex = Math.floor(Math.random() * words.length);
     secretWord = words[randomIndex];
}
function displayGameWord(){
    displayedWord.innerHTML = displayedSecretWord
}
function prepareDisplayedSecretWord(){
    displayedSecretWord = ""
    // premiere et derniere lettre
    // et les lettres similaires à ces dernieres dans le mot. Ex bouteille
    //                                                          B___E___E
    let firstLetter = secretWord[0]
    console.log(firstLetter)
    let lastLetter = secretWord[secretWord.length - 1]

    for(let i = 0; i < secretWord.length; i++){
        displayedSecretWord += "_"
    }

    let displayedSecretWordArray = displayedSecretWord.split('')

    displayedSecretWordArray[0] = firstLetter
    displayedSecretWordArray[displayedSecretWord.length - 1] = lastLetter

   let secretWordArray = secretWord.split('')

    for(let i = 0; i < secretWordArray.length; i++){


        if(i === 0 && i === secretWord.length){ break }

        switch(secretWord[i]){

            case firstLetter:
                displayedSecretWordArray[i] = secretWord[i]
                break;
            case lastLetter:
                displayedSecretWordArray[i] = secretWord[i]
                break;


        }

    }

   displayedSecretWord = displayedSecretWordArray.toString().replaceAll(',', '')


}

function wireKeyButtons(){
    const allButtons = document.querySelectorAll('.keyButton')
    allButtons.forEach(button => {
        button.addEventListener('click', e => {
            playLetter(button.id)
        })
    })
}

function disableUsedLettersFromKeyboard() {
    document.querySelectorAll('.keyButton').forEach(button => {
        if(displayedSecretWord.includes(button.id) || mistakenLetters.includes(button.id)){
            button.disabled = true
        }
    })
}
function wrongLetter(mistakenLetter) {
    errors++
    checkForWinOrLost()

    mistakenLetters.push(mistakenLetter)
    disableUsedLettersFromKeyboard()
    checkForWinOrLost()
}
function checkForWinOrLost() {
    console.log('avant verif errors')
    if(errors >= maxErrors){
      return  gameOver()
    }
    console.log('apres verif errors')

    if(displayedSecretWord === secretWord ){
        console.log('victoire')

      return  victory()
    }
}
function gameOver(){
    console.log('game over')
}
function victory(){
    victoryDiv.style.display = "flex"
}


initGame()