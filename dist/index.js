export class Game {
    constructor() {
        this.count = 0;
        this.targetNumber = this.generateNumber();
        console.log(this.targetNumber); // For debugging
    }
    generateNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }
    incrementCount() {
        this.count++;
    }
    resetGame() {
        this.count = 0;
        this.targetNumber = this.generateNumber();
    }
    evaluateGuess(answer) {
        if (this.targetNumber === answer) {
            return "おめでとう！正解です！";
        }
        else if (this.targetNumber - 1 <= answer &&
            answer <= this.targetNumber + 1) {
            return "!!惜しい!!ほぼ、正解！";
        }
        else if (this.targetNumber - 5 <= answer &&
            answer <= this.targetNumber + 5) {
            return "かなり、近いよ!!";
        }
        else if (1 <= answer && answer <= 100) {
            if (answer <= this.targetNumber - 50 ||
                this.targetNumber + 50 <= answer) {
                return "とんでもなく離れてる!";
            }
            else if (answer < this.targetNumber) {
                return "もっと大きい数だよ！";
            }
            else {
                return "もっと小さい数だよ！";
            }
        }
        else {
            return "1から100の間で入力してね";
        }
    }
}
export class UI {
    constructor(game) {
        this.game = game;
        this.reactionBox = document.querySelector(".reactionBox");
        this.verbalReaction = document.querySelector(".verbalReaction");
        this.answerClass = document.querySelector(".answerClass");
        this.button = document.querySelector(".button");
        this.resetBox = document.querySelector(".resetBox");
        this.addEventListeners();
    }
    addEventListeners() {
        var _a;
        (_a = this.button) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.handleButtonClick());
    }
    handleButtonClick() {
        var _a;
        this.game.incrementCount();
        this.updateCountDisplay();
        const answer = Number((_a = this.answerClass) === null || _a === void 0 ? void 0 : _a.value);
        if (this.game.count <= 10) {
            const resultMessage = this.game.evaluateGuess(answer);
            this.showResultMessage(resultMessage);
        }
        if (this.game.count === 10) {
            this.showResetButton();
        }
    }
    updateCountDisplay() {
        var _a;
        // DisplayingTheCountは、ifで生成された後指定できる
        let countDisplay = document.querySelector(".DisplayingTheCount");
        if (countDisplay === null) {
            countDisplay = document.createElement("p");
            countDisplay.classList.add("DisplayingTheCount");
            (_a = this.reactionBox) === null || _a === void 0 ? void 0 : _a.appendChild(countDisplay);
        }
        countDisplay.innerHTML = `挑戦回数: ${this.game.count}`;
    }
    showResultMessage(message) {
        if (this.verbalReaction !== null) {
            this.verbalReaction.innerHTML = message;
        }
    }
    showResetButton() {
        var _a;
        const resetButton = document.createElement("button");
        resetButton.innerHTML = "リセット";
        resetButton.classList.add("resetButton");
        (_a = this.resetBox) === null || _a === void 0 ? void 0 : _a.appendChild(resetButton);
        resetButton.addEventListener("click", () => {
            this.game.resetGame();
            this.clearMessages();
            this.removeElements();
            this.updateCountDisplay();
        });
    }
    clearMessages() {
        if (this.verbalReaction !== null) {
            this.verbalReaction.innerHTML = " ";
        }
    }
    removeElements() {
        const countDisplay = document.querySelector(".DisplayingTheCount");
        countDisplay === null || countDisplay === void 0 ? void 0 : countDisplay.remove();
        const resetButton = document.querySelector(".resetButton");
        resetButton === null || resetButton === void 0 ? void 0 : resetButton.remove();
        const trueMessage = document.querySelector(".tru");
        trueMessage === null || trueMessage === void 0 ? void 0 : trueMessage.remove();
    }
}
const game = new Game();
const ui = new UI(game);
