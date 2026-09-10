import { createContext, useState } from "react"
import palavras from "../data/palavras"
import alfabeto from "../data/alfabeto"

export const GameContext = createContext()

export default function GameProvider({ children }) {
    const [errors, setErrors] = useState(0)
    const [chosenWord, setChosenWord] = useState([])
    const [word, setWord] = useState([])
    const [usedLetters, setUsedLetters] = useState([])
    const [wordColor, setWordColor] = useState("black")

    function sortWord() {
        const randomIndex = Math.floor(Math.random() * palavras.length)
        const selectedWord = palavras[randomIndex].toLowerCase()
        const letters = selectedWord.split("")

        setChosenWord(letters)

        const underlines = letters.map(() => "_")
        setWord(underlines)
    }

    function gameFinish() {
        setWord(chosenWord)
        setUsedLetters(alfabeto)
    }

    function clickedLetter(letter) {
        if (usedLetters.includes(letter)) return

        setUsedLetters(prev => [...prev, letter])

        if (chosenWord.includes(letter)) {
            rightLetter(letter)
        } else {
            wrongLetter()
        }
    }

    function rightLetter(letter) {
        const newWord = [...word]

        chosenWord.forEach((char, index) => {
            newWord[index] = letter
        })
    }

    function wrongLetter() {
        const newErrors = errors + 1
        setErrors(newErrors)

        if (newErrors === 6) {
            setWordColor("red")
            gameFinish()
        }
    }

    function gameStart() {
        setErrors(0)
        setUsedLetters([])
        setWordColor("black")
        sortWord()
    }

    return (
        <GameContext.Provider
            value={{
                errors,
                word,
                usedLetters,
                wordColor,
                gameStart,
                clickedLetter,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}