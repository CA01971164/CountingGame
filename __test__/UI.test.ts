import { Game, UI } from "../src/index";

describe("UIクラス", () => {
  let game: Game;
  let ui: UI;

  beforeEach(() => {
    document.body.innerHTML = `   <div class="reactionBox"></div>
    <div class="verbalReaction"></div>
    <div class="answerClass"></div>
    <button class="button"></button>
    <div class="resetBox"></div>
    <button class="resetButton">リセット</button>
    `;

    game = new Game();
    ui = new UI(game);
  });

  it("正しく初期化する", () => {
    const reactionBox = document.querySelector(".reactionBox");
    const verbalReaction = document.querySelector(".verbalReaction");
    const answerClass = document.querySelector(".answerClass");
    const button = document.querySelector(".button");
    const resetBox = document.querySelector(".resetBox");

    expect(reactionBox).not.toBeNull();
    expect(verbalReaction).not.toBeNull();
    expect(answerClass).not.toBeNull();
    expect(button).not.toBeNull();
    expect(resetBox).not.toBeNull();
  });

  it("ボタンクリック時にカウントを正しくする", () => {
    const button = document.querySelector(".button") as HTMLElement;
    button.click();

    const countDisplay = document.querySelector(".DisplayingTheCount");
    expect(countDisplay).not.toBeNull();
    expect(countDisplay?.innerHTML).toBe(`挑戦回数: 1`);
  });

  it("ユーザーの入力に応じて、基づくメッセージを表示する", () => {
    const input = document.querySelector(".answerClass") as HTMLInputElement;
    input.value = "50";
    game.targetNumber = 50;

    const button = document.querySelector(".button") as HTMLElement;
    button.click();

    const verbalReaction = document.querySelector(".verbalReaction");

    expect(verbalReaction?.innerHTML).toBe("おめでとう！正解です！");
  });

  it("10回の試行後にリセットボタンを表示する", () => {
    for (let i = 10; i < 10; i++) {
      const button = document.querySelector(".button") as HTMLElement;
      button.click();
    }

    const resetButton = document.querySelector(".resetButton");
    expect(resetButton).not.toBeNull();
  });
});
