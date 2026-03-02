
//************************************************初期設定ゾーン************************************* */
// ***Version2.0
//プレイヤーHP
let p1Hp = 100;
// 敵HP
let p2Hp = 100;
let Guard = false;          //　ガード受付中か
let guardSuccess = false;   //　ガードに成功したか

// プレイヤーの攻撃力
let dmg = 10;
// ダメージを掛け算方式にしたので下の変数が必要になりました...
var dmg_defaultVal = dmg;

// 敵の攻撃力（ガードを失敗したときにくらうダメージ量）
let enemy_damage = 50;

// 前ターンの敵キャラ名前保持(同じキャラが次出てこないようにするために使用)
let lastEnemyName = "";

// クリックして攻撃を行うので、それを許可するか否か
let canAttack = true;

// リスタート時のボタンdom
var yes = document.getElementById('yes');
var no = document.getElementById('no');

// 勝数（勝利毎に+1）
var win_count = 0;
// 何回勝利でクリアとするか
// var clear_count = 3;

// タイマー設定
let timeLeft = 60; // 制限時間
let timerLeft_default = timeLeft;
let timerId = null; // タイマーを止めるためのID
let timer_running = false;

// ***待ち時間変更用変数
let waitTime_val = 500;

// フェーズが終了してから、タイムアップ処理をいれるため、作成した変数
let timeover = false

// オーディオ設定
let currentBGM = null;

// 脳汁モード
let enemyturn_count = 0;
let finishturn_count = 0;
let fever_flag = false;
let fever_count = 0;

// 


// 最初に名前を設定することで、nullエラーを防ぐ！！
enemy_random();

// タイマーの初期値をhtml側に反映させる
document.querySelector(".timer").innerText = `${timeLeft}`;






// *******************************************ボタン読み取り*************************************/
    // ******リスタートのボタン読み
    if (yes) {
        yes.addEventListener('click', () => {
            // ボタンが押された際、やり直しの画面が出ているかどうかのチェック
            if (document.getElementById('msg').innerText == "やり直しますか？") {
                console.log('リスタート確定');
                sound("sounds/button.mp3");


                // タイマーをリセット
                timer_running = false;
                timeLeft = timerLeft_default;
                clearInterval(timerId);
                const timerDom = document.querySelector('.timer');
                if (timerDom) timerDom.innerText = timeLeft;

                

                    // hpを回復させる
                    p1Hp = 100;
                    p2Hp = 100;

                    finishturn_count = 0;
                    enemyturn_count = 0;

                win_count = 0;
                document.getElementById("score").innerText = "Score\n"+ win_count;

                updateUI();

                canAttack = true; // 攻撃許可を戻す[
                
                // enemy_random();
                changeImage_enemy('default');
                character_photo.src = `images/character1/${character_Name_item}_default.png`;

                document.getElementById('msg').innerText = "攻撃フェーズ";

                // ボタン系非表示
                document.querySelector('.attack-menu_container').style.display = 'none';
                document.querySelector(".guard-menu").style.display = 'none';
            }
        });
    }

    //******* */


    //********クリア後の読み取り */
    // *******yesでリスタート関数に飛ぶ
    if (yes) {
        yes.addEventListener('click', () => {
            if (document.getElementById('msg').innerText == `TIME UP!\n最終撃破数: ${win_count}体`) {
                console.log("クリア後ボタン読み取り");
                sound("sounds/button.mp3");
                canAttack = false;
            
                    // hpを回復させる
                    p1Hp = 100;
                    p2Hp = 100;

                finishturn_count = 0;
                enemyturn_count = 0

                //スコアをリセット
                win_count = 0;
                document.getElementById("score").innerText = "Score\n"+ win_count;


                updateUI();
                canAttack = true; // 攻撃許可を戻す
                // enemy_random();
                changeImage_enemy('default');
                character_photo.src = `images/character1/${character_Name_item}_default.png`;

                // document.getElementById('msg').innerText = "攻撃フェーズ";
                restart();

                // document.querySelector(".guard-menu").style.display = 'none';
                // document.querySelector('.attack-menu_container').style.display = 'none';

            }
        });
    }

    //************************* */

//************************************************************************************* */


// ボタン非表示
document.querySelector('.attack-menu_container').style.display = 'none';



// １回目の攻撃フェーズで、ガードボタンを無効化
document.querySelector(".guard-menu").style.display = 'none';
// 初期状態は攻撃フェーズ
document.getElementById('msg').innerText = "攻撃フェーズ";
changeImage_enemy('default');
timeover = false;


// ガードボタンのdomを取得
    const guardBtn = document.getElementById('guard');

//************************************************************************************************ */




//****************************************************プレイヤー攻撃フェーズ****************************************** */
// ボタンの二重判定によるダブル攻撃を防ぐため、ボタンが一回押されたら消されるような処理をしている
// **attack-menuはボタン系全般のdivのこと*//
function playerAttack(type) {
    console.log("攻撃ターン");
    canAttack = false;
    console.log(type);


    if(!timer_running){
        startTimer();
        timer_running = true;
        // 最初に押されたときだけ、bgmを付ける
        bgm("sounds/normal_music.mp3");
        console.log("タイマー起動");
    }

    // !フィーバーかどうか判定
    if(fever_flag == true && fever_count == 0){
        bgm("sounds/Attack!_music.mp3");
        document.getElementById('msg').innerText = "🔥 FEVER MODE !!! 🔥";
        fever_count++;
        fever();
    }



    if(fever_flag){
        // フィーバー中はどの攻撃でも特大ダメージ
        dmg = 100; 
        sound("sounds/fever_punch.mp3");
    }else{
        // 攻撃に応じてダメージが変わる＿その調整エリア
        //  !１０が最大値
        enemy_Name = document.getElementById("enemy_Name_item").textContent;
        switch (type){
            case "punch":
                sound("sounds/punch.mp3");
                console.log("パンチ");
                if (enemy_Name == "whitekong")
                    dmg*= 10;
                

                if (enemy_Name == "greendragon")
                    dmg*= 1;


                if (enemy_Name == "death")
                    dmg*= 1;

                break;

            case "kick":
                sound("sounds/kick.mp3");
                console.log("キック");
                if (enemy_Name == "whitekong"){
                    dmg*= 1;
                }
                if (enemy_Name == "greendragon"){
                    dmg*= 10;
                }
                if (enemy_Name == "death"){
                    dmg*= 1;
                }

                break;

            case "waza":
                sound("sounds/waza.mp3");
                console.log("技");
                if (enemy_Name == "whitekong"){
                    dmg*= 1;
                }
                if (enemy_Name == "greendragon"){
                    dmg*= 1;
                }
                if (enemy_Name == "death"){
                    dmg*= 10;
                }

            default :
            ("攻撃タイプが入力されていないエラー");
    }
}

        console.log(dmg);
        p2Hp -= dmg;
        console.log("Enemy HP:"+p2Hp);

        dmg = dmg_defaultVal;
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
    enemyturn_count++;
    console.log("enemyturn_count :"+enemyturn_count);

    console.log("ガードフェーズ");
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
                    sound("sounds/damage.mp3");
                    console.log('ガード失敗...');
                    takeDamage(enemy_damage); 
                }else {
                    console.log('ガード成功');
                    sound("sounds/guard_success.mp3");
                    p2Hp -= 5;
                }
                updateUI();
                finishTurn();
        }, 600); // 受付時間

    }, 800);// 敵の攻撃時間
}

// **********************************ガードボタン読み取り************************/
    guardBtn.addEventListener('click', () => {
        sound("sounds/guard_kamae.mp3");
        console.log("ガードボタンが押された");
        // ガードモーション
        changeImage_player("guard");

        if (Guard) { // enemyTurn関数でセットしたGuardフラグがtrueなら
            guardSuccess = true;
            guard = false;
        } else {
            guardSuccess = false;
            console.log("タイミング失敗");
        }
});

function takeDamage(dmg){
    console.log("被ダメージ計算");
    p1Hp -= dmg;
        console.log("P1 HP :"+p1Hp);
}
// **************************************************************************************************************************


// ************************************フェーズ終了************************************************************************//

function finishTurn() {
    finishturn_count++;

    console.log("ターンエンド");
    canAttack = false;

    // フィーバー中は、待ち時間を0にする
    let waitTime = fever_flag ? 0: waitTime_val;

    setTimeout(() => {
    //UIをプレイヤー攻撃に切り替え
        document.querySelector(".guard-menu").style.display = 'none';
        console.log('ガードメニューを非表示');
    // 攻撃ボタンを表示
        document.querySelector(".attack-menu_container").style.display = 'block';
        console.log("攻撃メニューを表示");

    
    //決着判定
    //p1（プレイヤー）のHPのみ0以下の場合（敗北）
    if (p1Hp <= 0) {
        clearInterval(timerId);
        timeLeft = timerLeft_default;
        sound("sounds/lose.mp3");
        document.getElementById('msg').innerText = "K.O.";
        alert("YOU LOSE...");
        restart();
        return;
    
    // 敵に勝ち、かつタイムオーバー待ちだった場合
    }
    if(p2Hp <= 0 && timeover == true){
        console.log("ゲーム終了");
        timeUp();



    }else if(p2Hp <= 0) {
        console.log("K.O");
        document.getElementById('msg').innerText = "K.O.";  
        // 勝数に加算
        win_count++;
        console.log("win_count :"+ win_count);
            
        document.getElementById("score").innerText = "Score\n"+ win_count;
        NextTurn();
        return;

    //次のターンへ
    }else {
        document.querySelector('.attack-menu_container').style.display = 'none';
        document.querySelector(".guard-menu").style.display = 'none';
        document.getElementById('msg').innerText = "攻撃フェーズ";
        // canAttackをtrueにすれば再度攻撃ができる（クリックを受け付ける）
        canAttack = true;

        // キャラクター、敵をデフォルト画像に直す
        character_photo.src = `images/character1/${character_Name_item}_default.png`;
        changeImage_enemy('default');

        }
    }, waitTime);
}


    function NextTurn(){
    console.log("次のターン開始");
    // !脳汁モードの判定!!!
    console.log("finishturn_count"+finishturn_count);
    console.log("enemyturn_count"+enemyturn_count);

        if(finishturn_count == 5 && enemyturn_count == 0){
            if(fever_flag == false){
                sound("sounds/fever_win.mp3");
            }
            fever_flag = true;
        }

        // *５ターン経過時点で、フィーバー条件は一度リセットする
        if(finishturn_count >= 5){
            finishturn_count = 0;
            enemyturn_count = 0;
        }

    // ボタン非表示
        document.querySelector('.attack-menu_container').style.display = 'none';
        
        canAttack = true;
        enemy_random();

        p2Hp = 100;

            updateUI();

            document.getElementById('msg').innerText = "攻撃フェーズ";

            // キャラクターと敵をデフォルト画像に変更
            character_photo.src = `images/character1/${character_Name_item}_default.png`;
            changeImage_enemy('default');

            console.log(character_photo);
        }
        



// ************************************HPの更新******************************************************************
//*********************攻撃フェーズ、ガードフェーズの際、この関数が使われる****************************** */
function updateUI() {
    console.log("UIの更新");

    //*******************************数値を一定の範囲に収めるのがMath.max***************************** */
    //************************.style.widthでhtmlの横幅を書き換える */
        document.getElementById('p1-Hp').style.width = Math.max(0, p1Hp) + "%";
        document.getElementById('p2-Hp').style.width = Math.max(0, p2Hp) + "%";


        document.getElementById('p1-Hp-text').textContent = Math.max(0,p1Hp);
        document.getElementById('p2-Hp-text').textContent = Math.max(0,p2Hp);
        console.log("プレイヤーのHPを調整");

}



// **************************マウス読み取り***************************************************
// 画面全体（window）に対してマウスダウンイベントを監視
// クリックされたら、変数に1を入れる

let isLeftDown = false;
let isRightDown = false;

window.addEventListener('mousedown', (event) => {
    if (!canAttack || timeover) return;

    // ボタン番号を変数に保存（setTimeoutの中で確実に使うため）
    const buttonNum = event.button;

    if (buttonNum === 0) isLeftDown = true;
    if (buttonNum === 2) isRightDown = true;

    // 1. ホイール
    if (buttonNum === 1) {
        canAttack = false;
        changeImage_player('waza');
        playerAttack("waza");
        return;
    }

    // 2. 同時押し
    if (isLeftDown && isRightDown) {
        canAttack = false;
        isLeftDown = false;
        isRightDown = false;
        changeImage_player('waza');
        playerAttack("waza");
        return;
    }

    // 3. 単発判定 (ここを修正)
    setTimeout(() => {
        if (!canAttack) return;

        // event.button ではなく、保存しておいた buttonNum を使う
        if (buttonNum === 0 && !isRightDown) {
            canAttack = false;
            changeImage_player('punch');
            playerAttack("punch");
        } 
        else if (buttonNum === 2 && !isLeftDown) {
            canAttack = false;
            changeImage_player('kick');
            playerAttack("kick");
        }
    }, 50); 
});

// 1. 右クリックメニュー（コンテキストメニュー）を完全に禁止
window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
}, false);

// 2. ホイールクリック（中央ボタン）によるオートスクロールを無効化
// 'mousedown' だけでなく 'auxclick' でも preventDefault() を呼ぶのが最も確実です
window.addEventListener('mousedown', (event) => {
    if (event.button === 1) {
        event.preventDefault();
    }
}, { passive: false });

window.addEventListener('auxclick', (event) => {
    if (event.button === 1) {
        event.preventDefault();
    }
}, false);


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
    const enemies = ["whitekong", "greendragon","death","flower"];

    // 2. ランダムに1つ選ぶ
    const randomName = enemies[Math.floor(Math.random() * enemies.length)];

    if(randomName == lastEnemyName){
        console.log("前の敵が出そうなので再帰します!!");
        return enemy_random();
    }

    lastEnemyName = randomName;

    // 3. 画面の中身を書き換える
    console.log("敵の名前" + randomName);
    document.getElementById("enemy_Name_item").textContent = randomName;
    // todo defaultのところにモーションを持ってくる
    document.getElementById("enemy_Img").src = `images/${randomName}/${randomName}_default.png`;
    }





    // ***************************リスタート処理*******************************************
    

function restart(){
    canAttack = false;

    if (currentBGM) {
        console.log(currentBGM);
        currentBGM.pause();
        console.log("bgmを止めます");
        currentBGM.currentTime = 0;
    }

    console.log("リスタート");
    document.getElementById('msg').innerText = "やり直しますか？";
    // ボタンを表示
        document.querySelector('.attack-menu_container').style.display = 'block';
        document.getElementById('waza').style.display = 'none';
    }



// **********************************タイマー*****************************************

function startTimer() {
    // もし既に動いていたら一旦止める（二重起動防止）
    if (timerId) clearInterval(timerId);

    timerId = setInterval(() => {
        timeLeft--;
        console.log(timeLeft);

        // フィーバー中は、タイマー停止
        if(fever_flag){
            return;
        }
        
        // UIの表示を更新（HTMLに class="timer" がある前提）
        const timerDom = document.querySelector('.timer');
        if (timerDom) {
            timerDom.innerText = timeLeft;
        }

        // 0秒になったら
        if (timeLeft <= 0) {
            // clearintervalでタイマーを止める
            clearInterval(timerId);
            timeover = true;
            console.log("タイムアップ。フェーズ終了待ち");
        }
    }, 1000);
}

function timeUp() {
    canAttack = false;
    timer_running = false;
    timeover = false;
    clearInterval(timerId);
    timeLeft = timerLeft_default;

    if (currentBGM) {
        currentBGM.pause();
        console.log("bgmを止めます");
        currentBGM.currentTime = 0;
        currentBGM = null;
    }
    

    sound("sounds/handcrap.mp3");
    document.querySelector('.attack-menu_container').style.display = 'block';
    document.getElementById('msg').innerText = `TIME UP!\n最終撃破数: ${win_count}体`;
    // この後、ボタンが押されたら、リスタートに飛ぶ
    
    }



// ***********************************************音関係********************************************************
function bgm(src){

    if (!currentBGM) {
        currentBGM = new Audio(src);
        currentBGM.volume = 0.3;
        currentBGM.loop = true;
    }else{
        // includesを使い、srcの中身を確認。おなじ曲名であれば、曲チェンジをしない。
        if(!currentBGM.src.includes(src)){
            currentBGM.src = src;
        }
    }
    currentBGM.currentTime = 0;
    currentBGM.play();

}





function sound(src){
    console.log("サウンド再生");

            const punch_sound = new Audio(src);
            punch_sound.volume = 0.5;
            punch_sound.play();

}

function fever(){
        console.log("フィーバー発動！タイマー停止");
            
            // 演出：背景を一時的に派手にする（CSSの調整が必要な場合があります）
            document.body.style.backgroundColor = "gold";


            // 演出：メッセージを書き換える
            document.getElementById('msg').innerHTML = "<span style='color:white; font-size:1.5em;'>💥FEVER TIME💥</span>";

            const timerDom = document.querySelector(".timer");
            if (timerDom) {
                timerDom.innerText = "0"; 
                timerDom.style.color = "#13110b";
    }
            
            // n秒間だけ
            setTimeout(() => {
                stopFever();
            }, 20000); // 5000ミリ秒 = 5秒
    }

function stopFever(){
    if (!fever_flag) return; 

    fever_flag = false;
    fever_count = 0;
    document.body.style.backgroundColor = ""; 
    document.getElementById('msg').innerText = "攻撃フェーズ";
    
    // 表示を本来の残り時間に戻す
    const timerDom = document.querySelector('.timer');
    if (timerDom) {
        timerDom.innerText = timeLeft; 
        timerDom.style.color = ""; 
    }

    bgm("sounds/normal_music.mp3");
    console.log("フィーバー終了：タイマー再開");
    finishturn_count = 0;
    enemyturn_count = 0
}

    