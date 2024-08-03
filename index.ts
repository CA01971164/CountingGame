const bun = document.querySelector(".bun");
let numb = Math.floor(Math.random() * 100) + 1;
console.log(numb);

class Mana {
  public count: number;
  constructor(count1: number) {
    this.count = count1;
  }
}

const mana1 = new Mana(0);

function cont(numb: number) {
  if (Number(mana1.count) < 10) {
    mana1.count = mana1.count + 1;
    if (Number(mana1.count) === 1) {
      let p = document.createElement("p");
      p.classList.add("c1");
      p.innerHTML = `挑戦回数: ${mana1.count}`;
      bun?.appendChild(p);
    } else {
      let aa = document.querySelector(".c1");
      if (aa !== null) {
        aa.innerHTML = `挑戦回数: ${mana1.count}`;
      }
    }
  } else if (Number(mana1.count) === 10) {
    let p = document.createElement("p");
    p.classList.add("tru");
    p.innerHTML = `正解は ${numb} でした。お疲れ様！`;
    bun?.appendChild(p);
    let button = document.createElement("button");
    button.innerHTML = "リセット";
    button.classList.add("reset");
    let ans = document.querySelector(".ans");
    ans?.appendChild(button);
    mana1.count++;
    ans?.addEventListener("click", () => {
      mana1.count = 0;
      let msg = document.querySelector(".msg");
      if (msg !== null) {
        msg.innerHTML = " ";
      }

      let c1 = document.querySelector(".c1");
      c1?.remove();
      let ans = document.querySelector(".ans");

      if (ans && ans.firstChild) {
        ans.removeChild(ans.firstChild);
      }

      let tru = document.querySelector(".tru");
      tru?.remove();
    });
  } else {
    console.log("もう一度更新してね");
  }
}

function kazu(numb: number) {
  if (Number(mana1.count) < 10) {
    const text = document.querySelector(".text") as HTMLInputElement;
    let val: string | number = text?.value;
    val = Number(val);
    numb = Number(numb);
    let msg = document.querySelector(".msg");
    if (1 <= val && val <= 100) {
      if (numb === val) {
        if (msg !== null) {
          msg.innerHTML = " おめでとう！正解です！";
        }
      } else if (numb - 1 <= val && val <= numb + 1) {
        if (msg !== null) {
          msg.innerHTML = " !!惜しい!!ほぼ、正解！";
        }
      } else if (numb - 5 <= val && val <= numb + 5) {
        if (msg !== null) {
          msg.innerHTML = " かなり、近いよ!!";
        }
      } else if (val <= numb - 50 || numb + 50 <= val) {
        if (msg !== null) {
          msg.innerHTML = " とんでもなく離れてる!";
        }
      } else if (val < numb) {
        if (msg !== null) {
          msg.innerHTML = "もっと大きい数だよ！";
        }
      } else if (numb < val) {
        if (msg !== null) {
          msg.innerHTML = "もっと小さい数だよ！";
        }
      } else {
        if (msg !== null) {
          msg.innerHTML = "1から100の間で入力してね";
        }
      }
    }
  }
}

let button = document.querySelector(".button");
button?.addEventListener("click", () => cont(numb));
button?.addEventListener("click", () => kazu(numb));
