
//プレイヤーHPの作成
let p1Hp = 100;
let p2Hp = 100;
let Guard = false;          //　ガード受付中か
let guardSuccess = false;   //　ガードに成功したか

// button class attack-buttonのdomを取得
    const attackButtons = document.querySelectorAll(".attack-button");

// ガードボタンのdomを取得
    const guardBtn = document.getElementById('guard');

// 各ボタンにクリックイベントを設定
// forEach - 
    attackButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('ボタン押されました');
            const type = button.id; // 'punch' か 'kick' を取得
            console.log(type);
            playerAttack(type); // 関数を実行
        });
    });



//****************************************************プレイヤー攻撃フェーズ****************************************** */
// ボタンの二重判定によるダブル攻撃を防ぐため、ボタンが一回押されたら消されるような処理をしている
// **attack-menuはボタン系全般のdivのこと*//
function playerAttack(type) {
    // ボタン非表示
    document.getElementById('attack-menu').style.display = 'none';

    const dmg = type === 'punch' ? 10 : 20;
    // 画像の切り替えは下のモーション関数で行うので、なくてもいいかなあ:::::::::::::::::::::::::::::::::::::::::::::::///
    // const anim = type === 'punch' ? 'punch-anim' : 'kick-anim';

    const p1 = document.getElementById('p1');
    // p1.classList.add(anim);
    //GUIDE::::::::::::::::::::::setTimeout(() => { 処理 }, ミリ秒);
    setTimeout(() => {
        p2Hp -= dmg;
        console.log("Enemy HP:"+p2Hp);
        updateUI();
        setTimeout(() => {
            enemyTurn();    //敵のターンへ
        }, 
        300);//秒数（ミリ秒）
    },200);
}
// **********************************************************************************************************************/



// ************************************************************************************ガードフェーズ********************/
//敵の攻撃フェーズ（ガードチャンス）
function enemyTurn() {
    document.getElementById('guard-menu').style.display = 'block';

    const p2 = document.getElementById('p2');

    setTimeout(() => {
        // モーションは下のプログラムで行うのでいらないかなあ::::::::::::::::::::::::::::::::::::::::::::::::
        // p2.classList.add('punch-anim'); // 敵の攻撃始動
        // プレイヤーの準備時間が1000ms
        Guard = true;
        guardSuccess = false;

        setTimeout(() => {
            Guard = false;
            // ガードに成功していなければダメージ
                if (!guardSuccess) {
                    console.log('ガード失敗...');
                    takeDamage(15); 
                }
            // p2.classList.remove('punch-anim');
                finishTurn();
        }, 600); // 受付時間
    }, 1000);
}

// **********************************ガードボタン読み取り************************/
    guardBtn.addEventListener('click', () => {
        if (Guard) { // enemyTurn関数でセットしたGuardフラグがtrueなら
            guardSuccess = true;
            console.log("ガード成功！");
        }
});

function takeDamage(dmg){
    p1Hp -= dmg;
        console.log("P1 HP :"+p1Hp);

}
// **************************************************************************************************************************




// function attemptGuard() {
//     if (isGuardWindowOpen) {
//       guardSuccess = true;
//       isGuardWindowOpen = false; // 二度押し防止
//       document.getElementById('msg').innerText = "ガード成功！反撃！";
      
//       // 反撃演出
//       const p1 = document.getElementById('p1');
//       p1.classList.add('counter-flash');
//       p2Hp -= 15; // 敵にダメージ
//       updateUI();
      
//       setTimeout(() => p1.classList.remove('counter-flash'), 200);
//     } else {
//       document.getElementById('msg').innerText = "ガード失敗！";
//     }
//   }

function finishTurn() {
    setTimeout(() => {
    //UIをプレイヤー攻撃に切り替え
    document.getElementById("guard-menu").style.display = 'none';
    // 攻撃ボタンを表示
    document.getElementById("attack-menu").style.display = 'block';
    
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
    const character_Name = document.getElementById('character_Name').textContent;
    console.log(character_Name);

// ボタンのDOM
    var punch = document.getElementById('punch');
    var kick = document.getElementById('kick');
    var guard = document.getElementById('guard');

// 写真のDOM
    var character_punch = document.getElementById('character_punch');
    var character_kick = document.getElementById('character_kick');
    var character_guard = document.getElementById('character_guard');

/************************************************************************************************************************************/

    var character_photo = document.getElementById('character_Img');

   function changeImage(motion){
        const fileName = `${character_Name}_${motion}.png`;
        console.log(fileName);
        character_photo.src = "images/character1/"+fileName;
        console.log(character_photo.src);
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
    waza.addEventListener('click',function(){
        changeImage('waza');
        console.log('waza');
    });



