import { Game, UI } from "./index";

describe("GameとUIの結合テスト", () => {
  let game: Game;
  let ui: UI;

  beforeEach(() => {
    document.body.innerHTML = `
        <div class="reactionBox"></div>
        <div class="verbalReaction"></div>
        <input class="answerClass" />
        <button class="button"></button>
        <div class="resetBox"></div>
      `;

    game = new Game();
    ui = new UI(game);
  });

  it("リセットボタンがクリックされたときにゲームがリセットされる", () => {
    for (let i = 10; i < 10; i++) {
      const button = document.querySelector(".button") as HTMLElement;
      button.click();
    }

    const resetButton = document.querySelector(".resetButton") as HTMLElement;
    resetButton?.click();

    expect(game.count).toBe(0);
    expect(document.querySelector(`.DisplayingTheCount`)).toBeNull;
    expect(document.querySelector(`.resetButton`)).toBeNull;
  });
});
