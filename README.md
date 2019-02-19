# Hangman

You guess English word generated randomly by guessing alphabets or full word before you reach score of 0.

## Getting Started

1. Install Visual Studio Code
2. Install Node
3. Open this project on Visual Studio Code.
4. Open up Terminal, run npm install within the directory.
5. Run npm install an-array-of-english-words --save.
6. Run npm start to run the project.
7. Open web browser, localhost:3000.

## Running the tests

Type any alphabet characters to guess, if you think you know the word, you can type whole word to guess. Type restart to restart the game. If you guess the letter correct, you get 1 point each. If you guessed it wrong, you lose 5 points. If you guess the word at the very first time, you receive 100 bonus points. For the second time, you receive 80 points, third time, 50 points, and etc,. No bonus points after exceeding 15 times of guesses. There is a maximum number of guesses you can make. You need to guess the word correctly before you reach 20 turns. If you guess same letter, it will warn you to guess other letters and this doesn't count toward number of turns you made. If you reach score of 0, the game automatically restarts, so you can make a guess for different word, generated randomly.

## Authors

* **Ny Lee**


