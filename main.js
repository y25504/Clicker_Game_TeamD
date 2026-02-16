// javascはここに入れてください
//プレイヤーHPの作成
let p1Hp = 100,p2Hp = 100;
let 

function Damage(dmg) {
    p1Hp -= dmg;
    updateUI();
    const p1 = document.getElementById('p1');
}

function finishTurn() {
    setTimeout(() => {
    //UIをプレイヤー攻撃に切り替え
    document.getElementById().style.display = 'none';
    document.getElementById().style.display = 'block';
    //決着判定
    //p1（プレイヤー）のHPのみ0以下の場合（敗北）
    if (p1Hp <= 0) {
        document.getElementById('msg').innerText = "K.O.";
        alert("YOU LOSE...");
    
    //p2（CPU）のHPのみ0以下の場合（勝利）
    }else if(p2Hp <= 0) {
        document.getElementById('msg').innerText = "K.O.";
        alert("YOU WIN!");
    }else if(p1Hp <= 0 && p2Hp <=0) {
        document.getElementById('msg').innerText = "K.O.";
        alert("DRAW");
    }else {
        NextTurn();
    }
    }, 1000);
}

//HPバー(UI)の表示更新
function updateUI() {
    document.getElementById('p1-Hp').style.width = Math.max(0, p1Hp) + "%";
    document.getElementById('p2-Hp').style.width = Math.max(0, p2Hp) + "%";
}