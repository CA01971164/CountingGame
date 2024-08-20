import { Game, UI } from "./index";

describe("Gameクラス", () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  test("１から１００までの数字を生成する", () => {
    expect(game.targetNumber).toBeGreaterThanOrEqual(1);
    expect(game.targetNumber).toBeLessThanOrEqual(100);
  });

  it("カウントを増加させる", () => {
    game.incrementCount();
    expect(game.count).toBe(1);
  });

  it("ゲームをリセットする", () => {
    game.incrementCount();
    game.resetGame();
    expect(game.count).toBe(0);
    expect(game.targetNumber).not.toBeNull();
  });

  it("正しい評価を行う", () => {
    game.targetNumber = 50;
    expect(game.evaluateGuess(50)).toBe("おめでとう！正解です！");
    expect(game.evaluateGuess(49)).toBe("!!惜しい!!ほぼ、正解！");
    expect(game.evaluateGuess(51)).toBe("!!惜しい!!ほぼ、正解！");
    expect(game.evaluateGuess(45)).toBe("かなり、近いよ!!");
    expect(game.evaluateGuess(55)).toBe("かなり、近いよ!!");
    expect(game.evaluateGuess(40)).toBe("もっと大きい数だよ！");
    expect(game.evaluateGuess(60)).toBe("もっと小さい数だよ！");
    game.targetNumber = 10;
    expect(game.evaluateGuess(60)).toBe("とんでもなく離れてる!");
    game.targetNumber = 70;
    expect(game.evaluateGuess(20)).toBe("とんでもなく離れてる!");
    expect(game.evaluateGuess(150)).toBe("1から100の間で入力してね");
  });
});
