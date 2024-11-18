const gameKeys = document.querySelector('.gameKeys');
let alphabet = "abcdefghijklmnopqrstuvwxyz"
let alphabetArray = alphabet.split('')
const words = ["bouteille", "casserole", "fourchette", "spatule", "passoire", "cocorico"]
const displayedWord = document.querySelector(".displayedWord")
let secretWord
let displayedSecretWord


console.log(document.querySelectorAll('.keyButton') )



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

}
function initGame() {
    createKeyboard()
    pickRandomWord()
    prepareDisplayedSecretWord()
    displayGameWord()
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






initGame()