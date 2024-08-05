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

  public evaluateGuess(val: number): string {
    if (this.targetNumber === val) {
      return "おめでとう！正解です！";
    } else if (this.targetNumber - 1 <= val && val <= this.targetNumber + 1) {
      return "!!惜しい!!ほぼ、正解！";
    } else if (this.targetNumber - 5 <= val && val <= this.targetNumber + 5) {
      return "かなり、近いよ!!";
    } else if (val <= this.targetNumber - 50 || this.targetNumber + 50 <= val) {
      return "とんでもなく離れてる!";
    } else if (val < this.targetNumber) {
      return "もっと大きい数だよ！";
    } else if (this.targetNumber < val) {
      return "もっと小さい数だよ！";
    } else {
      return "1から100の間で入力してね";
    }
  }
}

class UI {
  private game: Game;
  private bun: HTMLElement | null;
  private msg: HTMLElement | null;
  private text: HTMLInputElement | null;
  private button: HTMLElement | null;
  private ans: HTMLElement | null;

  constructor(game: Game) {
    this.game = game;
    this.bun = document.querySelector(".bun");
    this.msg = document.querySelector(".msg");
    this.text = document.querySelector(".text") as HTMLInputElement;
    this.button = document.querySelector(".button");
    this.ans = document.querySelector(".ans");

    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.button?.addEventListener("click", () => this.handleButtonClick());
  }

  private handleButtonClick(): void {
    this.game.incrementCount();
    this.updateCountDisplay();
    const val = Number(this.text?.value);

    if (this.game.count <= 10) {
      const resultMessage = this.game.evaluateGuess(val);
      this.showResultMessage(resultMessage);
    }

    if (this.game.count === 10) {
      this.showResetButton();
    }
  }

  private updateCountDisplay(): void {

    // このciのクラスの値は、ifで生成された後指定できる
    let countDisplay = document.querySelector(".c1");    

    if (countDisplay === null) {
      countDisplay = document.createElement("p");
      countDisplay.classList.add("c1");
      this.bun?.appendChild(countDisplay);
    }

    countDisplay.innerHTML = `挑戦回数: ${this.game.count}`;
  }

  private showResultMessage(message: string): void {
    if (this.msg !== null) {
      this.msg.innerHTML = message;
    }
  }

  private showResetButton(): void {
    const resetButton = document.createElement("button");
    resetButton.innerHTML = "リセット";
    resetButton.classList.add("reset");
    this.ans?.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      this.game.resetGame();
      this.clearMessages();
      this.removeElements();
      this.updateCountDisplay();
    });
  }

  private clearMessages(): void {
    if (this.msg !== null) {
      this.msg.innerHTML = " ";
    }
  }

  private removeElements(): void {
    const countDisplay = document.querySelector(".c1");
    countDisplay?.remove();

    const resetButton = document.querySelector(".reset");
    resetButton?.remove();

    const trueMessage = document.querySelector(".tru");
    trueMessage?.remove();
  }
}

const game = new Game();
const ui = new UI(game);
