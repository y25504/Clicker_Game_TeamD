// javascはここに入れてください
// javascはここに入れてください
//プレイヤーHPの作成
let p1Hp = 100;
let p2Hp = 100;
let Guard = false;          //　ガード受付中か
let guardSuccess = false;   //　ガードに成功したか

function Damage(dmg) {
    p1Hp -= dmg;
    updateUI();
    document.getElementById('p1').classList.add('shake');
    setTimeout(() => document.getElementById('p1').classList.remove('shake'), 300);
}

//プレイヤーの攻撃
function playerAttack(type) {
    document.getElementById('attack-menu').style.display = 'none';
    const dmg = type === 'punch' ? 10 : 20;
    const anim = type === 'punch' ? 'punch-anim' : 'kick-anim';

    const p1 = document.getElementById('p1');
    p1.classList.add(anim);

    setTimeout(() => {
        p2Hp -= dmg;
        updateUI();
        document.getElementById('p2').classList.add('shake');
        setTimeout(() => {
            p1.classList.remove(anim);
            document.getElementById('p2').classList.remove('shake');
            enemyTurn();    //敵のターンへ
        }, 300);
    },200);
}

//敵の攻撃フェーズ（ガードチャンス）
function enemyTurn() {
    document.getElementById('guard-menu').style.display = 'block';

    const p2 = document.getElementById('p2');

    setTimeout(() => {
        p2.classList.add('punch-anim'); // 敵の攻撃始動
        Guard = true;
        guardSuccess = false;
        setTimeout(() => {
            Guard = false;
            // ガードに成功していなければダメージ
            if (!guardSuccess) {
                takeDamage(15);
            }
      
            p2.classList.remove('punch-anim');
            finishTurn();
        }, 600); // 受付時間
    }, 1000);
}

// 3. ガードボタンを押した時の処理
function attemptGuard() {
    if (isGuardWindowOpen) {
      guardSuccess = true;
      isGuardWindowOpen = false; // 二度押し防止
      document.getElementById('msg').innerText = "ガード成功！反撃！";
      
      // 反撃演出
      const p1 = document.getElementById('p1');
      p1.classList.add('counter-flash');
      p2Hp -= 15; // 敵にダメージ
      updateUI();
      
      setTimeout(() => p1.classList.remove('counter-flash'), 200);
    } else {
      document.getElementById('msg').innerText = "ガード失敗！";
    }
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

    //p1（プレイヤー）とp2（CPU）両方のHPが0以下の場合（引き分け）    
    }else if(p1Hp <= 0 && p2Hp <=0) {
        document.getElementById('msg').innerText = "K.O.";
        alert("DRAW");
    //次のターンへ
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



