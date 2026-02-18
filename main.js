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






































































































// オイカワの担当場所(date:02/16)
// **************************************モーションプログラム****************************************************************//
// *概要
//****punch,kickのボタンに応じてキャラクターの画像を変更する。imgの名前は、
//**キャラクター名_punch,キャラクター名_kick、キャラクター名_guard、キャラクター名_技名とする。(拡張子はpng) */
//****画像表示のdomは、character_Img　とする。 */

//*使用する関数について */
//*changeImage*****//
//***fileNameに、character_Name_とmotionを組み合わせた名前を代入 */
        //*それをcharacter_Imgに代入することで、ボタンとキャラクタに応じて写真を変更できる！/

// キャラクター名の変数
    const character_Name = document.getElementById('character_Name');

// ボタンのDOM
    var punch = document.getElementById('punch');
    var kick = document.getElementById('kick');
    var guard = document.getElementById('guard');

// 写真のDOM
    var character_punch = document.getElementById('character_punch');
    var character_kick = document.getElementById('character_kick');
    var character_guard = document.getElementById('character_guard');

/************************************************************************************************************************************/

    var character_Img = document.getElementById('character.Img');

    function changeImage(motion){
        const fileName = `${character_Name}_${motion}.png`;
        character_Img = fileName;
    }

    // パンチの処理
    punch.addEventListener('click',function(){
        changeImage('punch');
        console.log('punch');
    });

    // キックの処理
    kick.addEventListener('click',function(){
        changeImage('kick');
        console.log('kick');
    });

    // ガードの処理
    guard.addEventListener('click',function(){
        changeImage('guard');
        console.log('guard');
    });

    // 技の処理
    guard.addEventListener('click',function(){
        changeImage('waza');
        console.log('waza');
    });



