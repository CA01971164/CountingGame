class Game {
  public count: number;
  public targetNumber: number;

  constructor() {
    this.count = 0;
    this.targetNumber = this.generateNumber();
    console.log(this.targetNumber); // For debugging
  }

  private generateNumber(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  public incrementCount(): void {
    this.count++;
  }

  public resetGame(): void {
    this.count = 0;
    this.targetNumber = this.generateNumber();
  }

  public evaluateGuess(answer: number): string {
    if (this.targetNumber === answer) {
      return "おめでとう！正解です！";
    } else if (this.targetNumber - 1 <= answer && answer <= this.targetNumber + 1) {
      return "!!惜しい!!ほぼ、正解！";
    } else if (this.targetNumber - 5 <= answer && answer <= this.targetNumber + 5) {
      return "かなり、近いよ!!";
    } else if (answer <= this.targetNumber - 50 || this.targetNumber + 50 <= answer) {
      return "とんでもなく離れてる!";
    } else if (answer < this.targetNumber) {
      return "もっと大きい数だよ！";
    } else if (this.targetNumber < answer) {
      return "もっと小さい数だよ！";
    } else {
      return "1から100の間で入力してね";
    }
  }
}

class UI {
  private game: Game;
  private reactionBox: HTMLElement | null;
  private verbalReaction: HTMLElement | null;
  private answerClass: HTMLInputElement | null;
  private button: HTMLElement | null;
  private resetBox: HTMLElement | null;

  constructor(game: Game) {
    this.game = game;
    this.reactionBox = document.querySelector(".reactionBox");
    this.verbalReaction = document.querySelector(".verbalReaction");
    this.answerClass = document.querySelector(".answerClass") as HTMLInputElement;
    this.button = document.querySelector(".button");
    this.resetBox = document.querySelector(".resetBox");

    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.button?.addEventListener("click", () => this.handleButtonClick());
  }

  private handleButtonClick(): void {
    this.game.incrementCount();
    this.updateCountDisplay();
    const answer = Number(this.answerClass?.value);

    if (this.game.count <= 10) {
      const resultMessage = this.game.evaluateGuess(answer);
      this.showResultMessage(resultMessage);
    }

    if (this.game.count === 10) {
      this.showResetButton();
    }
  }

  private updateCountDisplay(): void {
    // DisplayingTheCountは、ifで生成された後指定できる
    let countDisplay = document.querySelector(".DisplayingTheCount");

    if (countDisplay === null) {
      countDisplay = document.createElement("p");
      countDisplay.classList.add("DisplayingTheCount");
      this.reactionBox?.appendChild(countDisplay);
    }

    countDisplay.innerHTML = `挑戦回数: ${this.game.count}`;
  }

  private showResultMessage(message: string): void {
    if (this.verbalReaction !== null) {
      this.verbalReaction.innerHTML = message;
    }
  }

  private showResetButton(): void {
    const resetButton = document.createElement("button");
    resetButton.innerHTML = "リセット";
    resetButton.classList.add("resetButton");
    this.resetBox?.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      this.game.resetGame();
      this.clearMessages();
      this.removeElements();
      this.updateCountDisplay();
    });
  }

  private clearMessages(): void {
    if (this.verbalReaction !== null) {
      this.verbalReaction.innerHTML = " ";
    }
  }

  private removeElements(): void {
    const countDisplay = document.querySelector(".DisplayingTheCount");
    countDisplay?.remove();

    const resetButton = document.querySelector(".resetButton");
    resetButton?.remove();

    const trueMessage = document.querySelector(".tru");
    trueMessage?.remove();
  }
}

const game = new Game();
const ui = new UI(game);
