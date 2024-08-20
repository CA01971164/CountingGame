import { Game, UI } from "./index";

describe("UIクラス", () => {
  let game: Game;
  let ui: UI;

  beforeEach(() => {
    document.body.innerHTML = `   <div class="reactionBox"></div>
    <div class="verbalReaction"></div>
    <div class="answerClass"></div>
    <button class="button"></button>
    <div class="resetBox"></div>
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
});
