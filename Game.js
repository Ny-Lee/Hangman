import { toUnicode } from 'punycode';

function random_string(words)
{
    return words[Math.floor(Math.random()*words.length)];
}
var words = require('an-array-of-english-words');
var selectedWord = random_string(words);
var selectedWordArray = selectedWord.split('');

function guessGenerator()
{
    var guess = "";
    for(var i = 0; i < selectedWordArray.length; i++){
        guess += "_ ";
    }
    return guess;
}
var guess = guessGenerator();

var usedAlphabets = [];
var score = 50;
var turnCount = 0;
var maxTurn = 20;

export default class Game{
    makeAMove(sInput)
    {
        let sReply = guess;
        let sReplyCopy = guess;
        console.log(usedAlphabets);
        if(usedAlphabets.includes(sInput.toLowerCase())){
            sReply = "You already guessed " + sInput + " Please try other letter.";
            return [sReply];
        }
        // allow input to be alphabet only
        if(!/^[a-zA-Z]+$/.test(sInput)){
            sReply = "Type letter only";
            return [sReply];
        }
        if(/^[a-zA-Z]+$/.test(sInput)){
            if(sInput.length == selectedWord.length){
                turnCount += 1;
                maxTurn -= 1;
            }
        }
        // reset everything
        if(sInput.toLowerCase() == "restart") {
            words = require('an-array-of-english-words');
            selectedWord = random_string(words);
            selectedWordArray = selectedWord.split('');
            guess = guessGenerator();
            usedAlphabets = [];
            score = 50;
            turnCount = 0;
            maxTurn = 10;
            sReply = guess;
            sReplyCopy = guess;
            return [sReply];
        }
        if(sInput.length == 1){
            if(!usedAlphabets.includes(sInput.toLowerCase())){
                usedAlphabets.push(sInput.toLowerCase());
            }
            for (var i = 0; i < selectedWord.length; i++){
                if(selectedWordArray[i] == sInput.toLowerCase()){
                    guess = guess.substring(0, i*2) + sInput.toLowerCase() + guess.substring(i*2 + 1);
                    sReply = guess;
                }
            }
            turnCount += 1;
            maxTurn -= 1;
            if(score > 0){
                if(!guess.includes("_")){
                    if(turnCount == 1){
                        score += 100;
                    }
                    else if(turnCount == 2){
                        score += 80;
                    }
                    else if(turnCount == 3){
                        score += 50;
                    }
                    else if(turnCount == 4){
                        score += 30;
                    }
                    else if(turnCount <= 5){
                        score += 20;
                    }
                    else if(turnCount <= 10){
                        score += 10;
                    }
                    else if(turnCount <= 13){
                        score += 5;
                    }
                    sReply = "The word was " + selectedWord + "! You won! You scored " + score;
                    return [sReply];
                }
            }
        }
        // win case 2
        if(selectedWord == sInput.toLowerCase()){
            turnCount += 1;
            if(turnCount == 1){
                score += 100;
            }
            else if(turnCount == 2){
                score += 80;
            }
            else if(turnCount == 3){
                score += 50;
            }
            else if(turnCount == 4){
                score += 30;
            }
            else if(turnCount <= 5){
                score += 20;
            }
            else if(turnCount <= 10){
                score += 10;
            }
            else if(turnCount <= 13){
                score += 5;
            }
            sReply = "The word was " + selectedWord + "! You won! You scored " + score;
            return [sReply];
        }
        // More than 1 character
        if(sInput.length > 1){
            sReply = "Please type 1 letter only.";
            return [sReply];
        }
        // guess is wrong
        if(sReply == sReplyCopy){
            score -= 5;
            if(score <= 0) {
                words = require('an-array-of-english-words');
                selectedWord = random_string(words);
                selectedWordArray = selectedWord.split('');
                guess = guessGenerator();
                usedAlphabets = [];
                score = 50;
                turnCount = 0;
                maxTurn = 20;
                sReply = guess;
                sReplyCopy = guess;
                sReply = "Your score is 0. You lost! New game started. Please guess.";
                return [sReply];
            }
            return ["Your score is " + score + "."];
        }
        // guess is right
        if(sReply != sReplyCopy){
            score += 1;
        }
        // game is over when score reaches 0
        if(score <= 0) {
            words = require('an-array-of-english-words');
            selectedWord = random_string(words);
            selectedWordArray = selectedWord.split('');
            guess = guessGenerator();
            usedAlphabets = [];
            score = 50;
            turnCount = 0;
            maxTurn = 20;
            sReply = guess;
            sReplyCopy = guess;
            sReply = "Your score is 0. You lost! New game started. Please guess.";
            return [sReply];
        }
        // maximum number of turns reached, can't continue game. 
        if(maxTurn == 0){
            words = require('an-array-of-english-words');
            selectedWord = random_string(words);
            selectedWordArray = selectedWord.split('');
            guess = guessGenerator();
            usedAlphabets = [];
            score = 50;
            turnCount = 0;
            maxTurn = 20;
            sReply = guess;
            sReplyCopy = guess;
            sReply = "Your score is 0. You lost! New game started. Please guess.";
            return [sReply];
        }
        return [sReply];
    }
}