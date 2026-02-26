
//************************************************初期設定ゾーン************************************* */

//プレイヤーHPの作成
let p1Hp = 100;
let p2Hp = 100;
let Guard = false;          //　ガード受付中か
let guardSuccess = false;   //　ガードに成功したか

let damage = 100;
let canAttack = true;

// 最初に名前を設定することで、nullエラーを防ぐ！！
enemy_random();

// ボタン非表示
document.querySelector('.attack-menu_container').style.display = 'none';



// １回目の攻撃フェーズで、ガードボタンを無効化
document.querySelector(".guard-menu").style.display = 'none';
// 初期状態は攻撃フェーズ
document.getElementById('msg').innerText = "攻撃フェーズ";
changeImage_enemy('default');

// button class attack-buttonのdomを取得
    const attackButtons = document.querySelectorAll(".attack-button_item");

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
//************************************************************************************************ */


//****************************************************プレイヤー攻撃フェーズ****************************************** */
// ボタンの二重判定によるダブル攻撃を防ぐため、ボタンが一回押されたら消されるような処理をしている
// **attack-menuはボタン系全般のdivのこと*//
function playerAttack(type) {

    console.log('type');

    let dmg = 0;
        enemy_Name = document.getElementById("enemy_Name_item").textContent;


    // **********************************************白コングにはパンチが効く
    //***********************************************緑ドラゴンにはキックが効く */
    //***********************************************追加キャラには崩しが効く */
    switch (type){
        case "punch":
            console.log("パンチ");
            if (enemy_Name == "whitekong"){
                dmg = 100;
            }
            if (enemy_Name == "greendragon")
                dmg = 0;
            break;
        case "kick":
            console.log("キック");
            if (enemy_Name == "whitekong"){
                dmg = 0;
            }
            if (enemy_Name == "greendragon"){
                dmg = 100;
            }
            break;
        case "breakdown":
            console.log("崩し");
            break;
        default :
        ("攻撃タイプが入力されていないエラー");
    }


        p2Hp -= dmg;
        console.log("Enemy HP:"+p2Hp);
        updateUI();
        
        // 敵HPが0以下になったら、勝敗判定の関数を呼び出す
        if(p2Hp <= 0){
            finishTurn();
            // playerAttack関数を終わらせる
            return;
        }else{
            enemyTurn();
        }

}
// **********************************************************************************************************************/



// ************************************************************************************ガードフェーズ********************/
//敵の攻撃フェーズ（ガードチャンス）
function enemyTurn() {
    document.getElementById('msg').innerText = "敵のフェーズ";
    document.querySelector('.guard-menu').style.display = 'block';

      // マウスクリック無効化
        canAttack = false;

    //*******敵のモーションプログラム(punch,kick,wazaの中からランダムで)************************************************ */
    //*******motionsの配列をいじることで、技が出る確率を調整できる* */
        const motions = ['punch', 'kick', 'waza'];
        const randomIndex = Math.floor(Math.random() * motions.length);
        changeImage_enemy(motions[randomIndex]);

    setTimeout(() => {

        Guard = true;
        guardSuccess = false;

        setTimeout(() => {
            Guard = false;
            // ガードに成功していなければダメージ
                if (!guardSuccess) {
                    console.log('ガード失敗...');
                    takeDamage(damage); 
                }else {
                    console.log('ガード成功');
                    p2Hp -= 5;
                }
            // p2.classList.remove('punch-anim');
                updateUI();
                finishTurn();
        }, 600); // 受付時間

    }, 800);// 敵の攻撃時間
}

// **********************************ガードボタン読み取り************************/
    guardBtn.addEventListener('click', () => {
        console.log("ガードボタンが押された");
        if (Guard) { // enemyTurn関数でセットしたGuardフラグがtrueなら
            guardSuccess = true;
            guard = false;
        } else {
            guardSuccess = false;
            console.log("タイミング失敗");
        }
});

function takeDamage(dmg){
    p1Hp -= dmg;
        console.log("P1 HP :"+p1Hp);
}
// **************************************************************************************************************************


// ************************************フェーズ終了************************************************************************//

function finishTurn() {
    setTimeout(() => {
        enemy_random();
    //UIをプレイヤー攻撃に切り替え
        document.querySelector(".guard-menu").style.display = 'none';
        console.log('ガードメニューを非表示');
    // 攻撃ボタンを表示
        document.querySelector(".attack-menu_container").style.display = 'block';
        console.log("攻撃メニューを表示");
    
    //決着判定
    //p1（プレイヤー）のHPのみ0以下の場合（敗北）
    if (p1Hp <= 0) {
        document.getElementById('msg').innerText = "K.O.";
        alert("YOU LOSE...");
        restart();
    
    //p2（CPU）のHPのみ0以下の場合（勝利）
    }else if(p2Hp <= 0) {
        document.getElementById('msg').innerText = "K.O.";
        NextTurn();

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


    function NextTurn(){
    console.log("次のターン開始");

    // ボタン非表示
        document.querySelector('.attack-menu_container').style.display = 'none';
        
        canAttack = true;
        changeImage_enemy('default');

        // メッセージを攻撃フェーズに直す
        // キャラクタの画像を通常に戻す
            p2Hp = 100;
            updateUI();
            enemy_random('default');
            

            document.getElementById('msg').innerText = "攻撃フェーズ";
            character_photo.src = `images/character1/${character_Name_item}_default.png`;
            console.log(character_photo);
        }
        

// ************************************HPの更新******************************************************************
//*********************攻撃フェーズ、ガードフェーズの際、この関数が使われる****************************** */
function updateUI() {

    //*******************************数値を一定の範囲に収めるのがMath.max***************************** */
    //************************.style.widthでhtmlの横幅を書き換える */
        document.getElementById('p1-Hp').style.width = Math.max(0, p1Hp) + "%";
        document.getElementById('p2-Hp').style.width = Math.max(0, p2Hp) + "%";


        document.getElementById('p1-Hp-text').textContent = Math.max(0,p1Hp);
        document.getElementById('p2-Hp-text').textContent = Math.max(0,p2Hp);
        console.log("プレイヤーのHPを調整");

}



// **************************マウス読み取り***************************************************
// ! **************************eventlistner何回も呼び出すと連打バグの原因になる!!!!*******
// 画面全体（window）に対してマウスダウンイベントを監視
// クリックされたら、変数に1を入れる

    window.addEventListener('mousedown', (event) => {
        // ********breakdownはデブ相手に使う（崩し）***********************************
        // クリックを許可するか否か
            if (!canAttack)
                return;

                switch (event.button) {
                    case 0:
                        console.log("左クリックされました");
                        // クリックされたら、それ以降のクリックを無効化、連打を防止する
                        changeImage_player('punch');
                        playerAttack("punch");
                        
                    break;
                    case 1:
                        console.log("ホイール（中央）クリックされました");

                    break;
                    case 2:
                        console.log("右クリックされました");
                        changeImage_player('kick');
                        playerAttack("kick");

                    break;
                }

    });

    // 画面全体で右クリックメニュー（コンテキストメニュー）を禁止する
    window.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

// オイカワの担当場所(date:02/16)
// **************************************モーションプログラム****************************************************************//
// *概要
//****punch,kickのボタンに応じてキャラクターの画像を変更する。imgの名前は、
//**キャラクター名_punch,キャラクター名_kick、キャラクター名_guard、キャラクター名_技名とする。(拡張子はpng) */
//****画像表示のdomは、character_Img　とする。 */

//*使用する関数について */
//*changeImage_player*****//
//***fileNameに、character_Name_item_とmotionを組み合わせた名前を代入 */
        //*それをcharacter_Imgに代入することで、ボタンとキャラクタに応じて写真を変更できる！/

// キャラクター名の変数
    const character_Name_item = document.getElementById('character_Name_item').textContent;
    console.log(character_Name_item);

// ボタンのDOM
    // var punch = document.getElementById('punch');
    // var kick = document.getElementById('kick');
    // var guard = document.getElementById('guard');

// 写真のDOM
    var character_punch = document.getElementById('character_punch');
    var character_kick = document.getElementById('character_kick');
    var character_guard = document.getElementById('character_guard');

/************************************************************************************************************************************/

    var character_photo = document.getElementById('character_Img');

    function changeImage_player(motion){
        const fileName = `${character_Name_item}_${motion}.png`;
        console.log(fileName);
        character_photo.src = "images/character1/"+fileName;
        console.log(character_photo.src);
    } 

    // パンチの処理
    punch.addEventListener('click',function(){
        changeImage_player('punch');
        console.log('punch');
    });

    // キックの処理
    kick.addEventListener('click',function(){
        changeImage_player('kick');
        console.log('kick');
    });

    // ガードの処理
    guard.addEventListener('click',function(){
        changeImage_player('guard');
        console.log('guard');
    });

    // 技の処理
    waza.addEventListener('click',function(){
        changeImage_player('waza');
        console.log('waza');
    });


    //****************************************************敵のモーション(動作は上のモーションプログラムと同じ)******************************************/
    function changeImage_enemy(motion){
        var enemy_Name = document.getElementById("enemy_Name_item").textContent;
        var enemy_photo = document.getElementById('enemy_Img');

        
        // ファイルの名前を指定
        console.log("enemy_Name: " + enemy_Name);
        const fileName = `${enemy_Name}_${motion}.png`;
        console.log(fileName);

        // 上で決めた名前をsrcに入れる（ディレクトリを指定）
        enemy_photo.src = "images/" + enemy_Name + "/" +fileName;   
        console.log( "enemy_photo :" + enemy_photo.src);
    } 


// ****************************敵をランダムに変更する処理*****************************
function enemy_random(){
    // 1. 名前のリスト
    const enemies = ["whitekong", "greendragon"];

    // 2. ランダムに1つ選ぶ
    const randomName = enemies[Math.floor(Math.random() * enemies.length)];

    // 3. 画面の中身を書き換える
    console.log("敵の名前" + randomName);
    document.getElementById("enemy_Name_item").textContent = randomName;
    // todo defaultのところにモーションを持ってくる
    document.getElementById("enemy_Img").src = `images/${randomName}/${randomName}_default.png`;
    }


function restart(){
    document.getElementById('msg').innerText = "やり直しますか？";

    // ボタンを表示
        document.querySelector('.attack-menu_container').style.display = 'block';

            var yes = document.getElementById('yes');
            var no = document.getElementById('no');

        yes.addEventListener('click',function(){
            console.log('yes');
            p1Hp = 100;
            NextTurn();
    });
    



}
