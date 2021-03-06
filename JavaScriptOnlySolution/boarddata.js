/**
 * Created with JetBrains WebStorm.
 * User: shared
 * Date: 5/31/12
 * Time: 6:58 PM
 * To change this template use File | Settings | File Templates.
 * sboard.kifList is an array containing kifu data.
 */
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}// define Object.create in case the JS engined does not support the method.
var SSHACK = SSHACK || {};
SSHACK.board = (function () {
    var theBoard = {}, //temporary variable storage
        tpl = { //define tpl object
            /* p=pawn, l=lance, L=promoted lance, s=silver, S=promoted Silver, g=gold, r=rook, R=promoted Rook, b=bishop, B=promoted Bishop
             k=king 11=1a, 12=1b etc.,
             */
            filePathKoma: '../assets/components/shogiboard/images/koma/koma_ryoko_1/',
            filePathGrid: '../assets/components/shogiboard/images/masu/',
            filePathBoard: '../assets/components/shogiboard/images/ban/',
            filePathFocus: '../assets/components/shogiboard/images/focus/',
            banImage: 'ban_kaya_a.png',
            gridImage: 'masu_dot.png',
            markerImage: 'focus_trpt_g.png',
            markerAt: "lostworld",
            //refer to marker location and pattern "lost world" coordination is off the page
            onBoard: {G: ['11l', '21n', '31s', '41g', '51k', '61g', '71s', '81n', '91l', '22b', '82r', '13p', '23p', '33p', '43p', '53p', '63p', '73p', '83p', '93p'],
                S: ['19l', '29n', '39s', '49g', '59k', '69g', '79s', '89n', '99l', '28r', '88b', '17p', '27p', '37p', '47p', '57p', '67p', '77p', '87p', '97p']},
            // onBoard denotes pieces already on board. G array lists Gote side pieces. S array lists Sente side pieces.
            onHand: { S: [],  G: [] },
            // onhand denotes pieces on hand
            //moves: [],
            // moves is an array of moves. for first char, * is comment, s or g shows side.
            // second char is either - (move) or d for drop. cordinateion in /to/from order.
            index: 0,
            caption: "JSShogiBoard&#0169;",
            smooth: 0, //delay in miliseconds.  normally 400 or 0
            mysteryMoves: 0,
            tesuu: 0 //indicate where the display index should be.


        };
    return {
        kifuList : [],

        addKif : function (args) {

            theBoard = Object.create(tpl);

            if (args.onBoard !== undefined) {
                theBoard.onBoard = args.onBoard;
            }
            if (args.onHand !== undefined) {
                theBoard.onHand = args.onHand;
            }
            if (args.caption !== undefined) {
                theBoard.caption = args.caption;
            }
            if (args.initialComment !== undefined) {
                theBoard.initialComment = args.initialComment;
            }
            if (args.markerAt !== undefined) {
                theBoard.markerAt = args.markerAt;
            }


            if (args.moves !== undefined) {
                theBoard.moves = args.moves;
            }
            if (args.smooth !== undefined) {
                theBoard.smooth = args.smooth;
            }
            if (args.mysteryMoves !== undefined) {
                theBoard.mysteryMoves = args.mysteryMoves;
            }
            if (args.tesuu !== undefined) {
                theBoard.tesuu = args.tesuu;
            }
            this.kifuList.push(theBoard);
        }
    };
}()); // this 'returns' object literal with private variables.


SSHACK.board.data = {};
SSHACK.board.data.tesuu = 12;
SSHACK.board.data.onHand = { S: ['g', 'g', 'l', 'p'], G: ['b', 'l', 'l', 'p'] };
SSHACK.board.data.moves = [
    "*this is a comment that should go to comment line",
    "s-2627 *here, the sente moves a piece from 27 to 26",
    "g-8483",
    "s-2526",
    "g-7261",
    "s-2425",
    "g-2423 *capturing the piece is implied",
    "s-2428",
    "gd23p",
    "s+2324*promotion effect is nice",
    "g-3241",
    "s-2223",
    "g-0031 *capture the same should be treated nicely.",
    "x"
];
SSHACK.board.data.initialComment = "Don't worry about extra shogi piece.  I am just tyring to ensure the program works.<br>" +
    "駒の数が多いのはご愛嬌です。";

SSHACK.board.addKif(SSHACK.board.data);


//now parepare another shogiboard data object
SSHACK.board.data = {};
SSHACK.board.data.caption = "The latest Yagura 3g silver -矢倉３七銀2012年最新型";
SSHACK.board.data.initialComment = "The program can show branch moves when available.Main course follows the actual game played by Hirose and Watanabe" +
    "on October 2012.";
SSHACK.board.data.moves = [
    "*One of the reasons for Yagura's steady popularity is this thanks to Miyata's discovery of  p-65(６五歩).  Let's take a look.",
    "s-7677=1:７六歩",
    "g-8483=2:８四歩",
    "s-6879=3:６八銀",
    "g-3433=4:３四歩",
    "s-6667=5:６六歩",
    "g-6271=6:６二銀",
    "s-5657=7:５六歩",
    "g-5453=8:５四歩",
    "s-4839=9:４八銀",
    "g-4231=10:４二銀",
    "s-5849=11:５八金",
    "g-3241=12:３二金",
    "s-7869=13:７八金",
    "g-4151=14:４一玉",
    "s-6959=15:６九玉",
    "g-7473=16:７四歩",
    "s-6758=17:６七金",
    "g-5261=18:５二金",
    "s-7768=19:７七銀",
    "g-3342=20:３三銀",
    "s-7988=21:７九角",
    "g-3122=22:３一角",
    "s-3637=23:３六歩",
    "g-4443=24:４四歩",
    "s-3748=25:３七銀",
    "g-6431=26:６四角",
    "s-6879=27:６八角",
    "g-4352=28:４三金",
    "s-7969=29:７九玉",
    "g-3141=30:３一玉",
    "s-8879=31:８八玉",
    "g-2231=32:２二玉",
    "s-4637=33:４六銀",
    "g-5362J34:５三銀",
    "s-3729=35:３七桂",
    "g-7364=36:７三角",
    "s-1617=37:１六歩",
    "g-1413=38:１四歩",
    "s-2627=39:２六歩",
    "g-2433=40:２四銀",
    "s-3828=41:３八飛",
    "g-9493=42:９四歩",
    "s-1819=43:１八香",
    "g-9594=44:９五歩",
    "s-6566=45:６五歩",
    "g-8584J46:８五歩",
    "s-2537=47:２五桂",
    "g-4253J48:４二銀",
    "s-5556J49:５五歩",
    "g-4544J50:４五歩",
    "s-0046=51:同　銀",
    "g-5573J52:５五角",
    "s-4647J53:４六歩",
    "g-8685=54:８六歩",
    "s-0087=55:同　歩",
    "g-0082=56:同　飛",
    "sd87p=57:８七歩打",
    "g-8286=58:８二飛",
    "s-5768=59:５七角",
    "g-3321=60:３三桂",
    "s-5645=61:５六銀",
    "g-4455=62:４四角",
    "s-4857J63:４八角",
    "g-7381=64:７三桂",
    "s-4546=65:４五歩",
    "g-5344=66:５三角",
    "s+3325=67:３三桂成",
    "g-0042=68:同　銀",
    "s-1516=69:１五歩",
    "g-0014=70:同　歩",
    "s-3748=71:３七角",
    "gd55n=72:５五桂打",
    "s-0056=73:同　銀",
    "g-0054=74:同　歩",
    "s-0037=75:同　角",
    "g-8382=76:８三飛",
    "sd44nJ77:４四桂打",
    "g-4232J78:４二金",
    "sd25n=79:２五桂打",
    "g-0024=80:同　銀",
    "s-0026=81:同　歩",
    "gd86p=82:８六歩打",
    "s-0077=83:同　銀",
    "gd94n=84:９四桂打",
    "s-3536=85:３五歩",
    "g-0034=86:同　歩",
    "sd34p=87:３四歩打",
    "g-0043=88:同　金",
    "sd54p=89:５四歩打",
    "g-8653=90:８六角",
    "s-0087=91:同　歩",
    "g-0094=92:同　桂",
    "sd87p=93:８七歩打",
    "g+7886=94:７八桂成",
    "s-0088=95:同　玉",
    "gd47s=96:４七銀打",
    "sd32s=97:３二銀打",
    "g-0042=98:同　金",
    "s+0044=99:同　桂成",
    "g-0022=100:同　玉",
    "s+5354=101:５三歩成",
    "g+3847=102:３八銀成",
    "sd43b=103:４三角打",
    "g-2232=104:２二玉",
    "s+3355=105:３三角成",
    "g-0034=106:同　金",
    "sd34n=107:３四桂打",
    "g-0033=108:同　金",
    "sd32g=109:３二金打",
    "g-1322=110:１三玉",
    "s-1518=111:１五香",
    "gd14p=112:１四歩打",
    "sd22s=113:２二銀打",
    "g-1213=114:１二玉",
    "s-1415=115:１四香",
    "g-x=116:投了",
    "C:78手",
    "g-0033=78:同　銀",
    "s-0045=79:同　歩",
    "g-0043=80:同　金",
    "sd54p=81:５四歩打",
    "C:77手",
    "s-4838=77:４八飛",
    "gd47p=78:４七歩打",
    "s-0048=79:同　飛",
    "gd58s=80:５八銀打",
    "C:63手",
    "s-4546=63:４五歩",
    "g-2644=64:２六角",
    "s-6657=65:６六角",
    "g-2524=66:２五銀",
    "C:53手",
    "s-4668=53:４六角",
    "g-0055=54:同　角",
    "s-0047=55:同　歩",
    "gd47b=56:４七角打",
    "C:52手",
    "g-5554=52:５五歩",
    "s-7576=53:７五歩",
    "gd44p=54:４四歩打",
    "s-7475=55:７四歩",
    "g-6273=56:６二角",
    "s-4668=57:４六角*No, Gote can not take a silver (Bishop can then fork King and Rook)",
    "g-4544=58:４五歩",
    "s-5546=59:５五角",
    "C:50手",
    "g-0054=50:同　歩",
    "s-1516=51:１五歩",
    "g-0014=52:同　歩",
    "s-3536=53:３五歩",
    "g-0034J54:同　歩",
    "s-0046=55:同　銀",
    "g-0024=56:同　銀",
    "s-0038=57:同　飛",
    "gd34p=58:３四歩打",
    "s-3835=59:３八飛",
    "C:54手",
    "g-4544=54:４五歩",
    "s-0046=55:同　銀",
    "g-3534=56:３五歩",
    "s-7576=57:７五歩",
    "C:49手",
    "s-3536=49:３五歩",
    "g-0024=50:同　銀",
    "s-0046=51:同　銀",
    "g-0034=52:同　歩",
    "s-1516=53:１五歩",
    "g-0014=54:同　歩",
    "s-6465=55:６四歩",
    "g-0073J56:同　角",
    "s-3538=57:３五飛",
    "gd24sJ58:２四銀打",
    "s-6535=59:６五飛",
    "g-7381=60:７三桂",
    "s-6665=61:６六飛",
    "g-2524=62:２五銀",
    "s-0026=63:同　歩",
    "gd65n=64:６五桂打",
    "s-2425=65:２四歩",
    "g-0023=66:同　歩",
    "sd25p=67:２五歩打",
    "g-0024=68:同　歩",
    "s-7576=69:７五歩",
    "g+7765=70:７七桂成",
    "s-0089=71:同　桂",
    "g-7574=72:７五歩",
    "s-1518=73:１五香",
    "g-0011=74:同　香",
    "sd24p=75:２四歩打",
    "gd34s=76:３四銀打*Sente S-3e otherwise",
    "s-6466=77:６四飛",
    "g-0063=78:同　歩",
    "sd41b=79:４一角打",
    "g-3122=80:３一玉",
    "sd52s=81:５二銀打",
    "g-3343=82:３三金",
    "sd23s=83:２三銀打",
    "g-0034=84:同　銀",
    "s+0024=85:同　歩成",
    "g-0033=86:同　金",
    "sd35n=87:３五桂打",
    "gd34s=88:３四銀打",
    "s+2335=89:２三桂成",
    "g-0034=90:同　銀",
    "sd24s=91:２四銀打",
    "g-0023=92:同　銀",
    "sd23g=93:２三金打",
    "g-0032=94:同　金",
    "s+0041=95:同　角成*Gote's King in Hisshi position. Gote can not prevent g* 4, g* 22 or g*32 with one move.",
    "g-x=96:中断",
    "C:58手",
    "g-7381=58:７三桂",
    "s-1518=59:１五香",
    "g-0011J60:同　香",
    "s+1325=61:１三桂成",
    "C:60手",
    "gd34p=60:３四歩打",
    "sd12p=61:１二歩打",
    "g-3534=62:３五歩",
    "s+1112=63:１一歩成",
    "C:56手",
    "g-0063=56:同　歩",
    "s-3568=57:３五角",
    "gd34p=58:３四歩打",
    "s-6835=59:６八角",
    "g-6564=60:６五歩",
    "sd13p=61:１三歩打",
    "C:48手",
    "g-4544=48:４五歩",
    "s-0046=49:同　銀",
    "g+1973=50:１九角成",
    "s-4668=51:４六角",
    "g-0019=52:同　馬",
    "s-0047=53:同　歩",
    "gd59b=54:５九角打",
    "sd37b=55:３七角打",
    "g+0059=56:同　角成",
    "s-0038=57:同　飛",
    "gd59b=58:５九角打",
    "sd66b=59:６六角打",
    "g-1222=60:１二玉",
    "s-2737=61:２七飛*Bishop at 5i will be dead with s-6h",
    "C:46手",
    "g-6463J46:６四歩",
    "s-0065=47:同　歩",
    "g-0073J48:同　角",
    "s-6677=49:６六銀",
    "g-8584=50:８五歩",
    "s-6566=51:６五銀",
    "C:48手",
    "g-0053=48:同　銀",
    "s-1516=49:１五歩",
    "g-0014=50:同　歩",
    "s-3536=51:３五歩",
    "g-0034=52:同　歩",
    "s-2537=53:２五桂",
    "C:46手",
    "g-4253=46:４二銀",
    "s-2537=47:２五桂",
    "g-4544=48:４五歩",
    "s-0046=49:同　銀",
    "g+1973=50:１九角成",
    "s-4668=51:４六角",
    "g-0019=52:同　馬",
    "s-0047=53:同　歩",
    "gd59b=54:５九角打",
    "s-4445=55:４四銀",
    "g+2659=56:２六角成",
    "sd71b=57:７一角打",
    "g-7282=58:７二飛",
    "s+3344=59:３三銀成",
    "g-0042=60:同　銀",
    "s+2671=61:２六角成",
    "C:34手",
    "g-4544=34:４五歩",
    "s-3746=35:３七銀",
    "g-5362=36:５三銀",
    "s-4647=37:４六歩",
    "g-0045=38:同　歩",
    "s-0068=39:同　角",
    "g-0064=40:同　角",
    "s-0037=41:同　銀",
    "gd47b=42:４七角打",
    "s-3746=43:３七銀",
    "g+6947=44:６九角成",
    "s-6867=45:６八金",
    "g-5969J46:５九馬",
    "sd67b=47:６七角打",
    "gd47p=48:４七歩打",
    "s-7978=49:７九金*Notice that Gote's horse is dead.",
    "C:46手",
    "g-4769=46:４七馬",
    "s-6778=47:６七金",
    "g-5554=48:５五歩",
    "s-5767=49:５七金",
    "x"

];
SSHACK.board.data.smooth = true;
SSHACK.board.data.tesuu = 12;
SSHACK.board.data.initialComment = "this and the board below has slower movement of pieces";
SSHACK.board.addKif(SSHACK.board.data);


SSHACK.board.data = {};
SSHACK.board.data.caption = "aigakari";
SSHACK.board.data.initialComment = "this one also has a branch move.";
SSHACK.board.data.mysteryMoves = true;
SSHACK.board.data.moves = [
    "s-2627=1:２六歩",
    "g-8483=2:８四歩",
    "s-2526=3:２五歩",
    "g-8584=4:８五歩",
    "s-7869=5:７八金",
    "g-3241=6:３二金",
    "s-2425=7:２四歩",
    "g-0023=8:同　歩",
    "s-0028=9:同　飛",
    "gd23p=10:２三歩打",
    "s-2624=11:２六飛",
    "g-7271=12:７二銀",
    "s-3839=13:３八銀",
    "g-6463=14:６四歩",
    "s-7677=15:７六歩",
    "g-8685=16:８六歩",
    "s-0087=17:同　歩",
    "g-0082=18:同　飛",
    "sd87p=19:８七歩打",
    "g-8286=20:８二飛",
    "s-3637=21:３六歩",
    "g-3433=22:３四歩",
    "s-5859=23:５八玉",
    "g-6372=24:６三銀",
    "s-3536=25:３五歩",
    "g-0034=26:同　歩",
    "s-3738=27:３七銀",
    "g-5463=28:５四銀",
    "s-4637=29:４六銀",
    "g-6564=30:６五歩",
    "s-5657=31:５六歩",
    "g+8822=32:８八角成",
    "s-0079=33:同　銀",
    "g-4443=34:４四歩",
    "s-5556=35:５五歩",
    "g-4354=36:４三銀",
    "sd63b=37:６三角打",
    "g-3321=38:３三桂",
    "s+9663=39:９六角成",
    "g-3443=40:３四銀",
    "s-8687=41:８六歩",
    "g-4332=42:４三金",
    "s-7576=43:７五歩",
    "g-4251=44:４二玉",
    "s-7475=45:７四歩",
    "g-0073=46:同　歩",
    "s-0096=47:同　馬",
    "g-7282=48:７二飛",
    "sd73p=49:７三歩打",
    "g-6272=50:６二飛",
    "s-7788=51:７七銀",
    "g-3242=52:３二玉",
    "s-8586=53:８五歩",
    "gd72p=54:７二歩打",
    "s+0073=55:同　歩成",
    "g-0061=56:同　金",
    "s-7574=57:７五馬",
    "g-4544=58:４五歩",
    "s-3746=59:３七銀",
    "gd44b=60:４四角打",
    "s-7626=61:７六飛",
    "gd73p=62:７三歩打",
    "s-8485=63:８四歩",
    "g-5544=64:５五角",
    "s-3849=65:３八金",
    "g-1413=66:１四歩",
    "s-5775=67:５七馬",
    "g-5453=68:５四歩",
    "s-1617J69:１六歩",
    "g-4231=70:４二銀",
    "s-1819=71:１八香",
    "g-2423=72:２四歩",
    "s-1516=73:１五歩",
    "g-0014=74:同　歩",
    "sd14p=75:１四歩打",
    "g-2533=76:２五桂",
    "s-2837=77:２八銀",
    "g-1411=78:１四香",
    "sd26p=79:２六歩打",
    "g+1725=80:１七桂成",
    "s-0029=81:同　桂",
    "g-1615=82:１六歩",
    "s-2526=83:２五歩",
    "g+1716=84:１七歩成",
    "s-0018=85:同　香",
    "gd64n=86:６四桂打",
    "s-8676=87:８六飛",
    "gd85p=88:８五歩打",
    "s-9686=89:９六飛",
    "g+1714=90:１七香成",
    "s-0028=91:同　銀",
    "gd56l=92:５六香打",
    "s-0057=93:同　馬",
    "g-0064=94:同　桂",
    "s-0096=95:同　飛",
    "g-4645=96:４六歩",
    "s-0047=97:同　歩",
    "g-6665=98:６六歩",
    "s-0067=99:同　歩",
    "g-8685=100:８六歩",
    "sd67n=101:６七桂打",
    "g-3355=102:３三角",
    "s-2425=103:２四歩",
    "gd74b=104:７四角打",
    "sd57p=105:５七歩打",
    "g-2433J106:２四角",
    "sd28l=107:２八香打",
    "gd25p=108:２五歩打",
    "s-1617=109:１六銀",
    "g-4132=110:４一玉",
    "s-6566=111:６五歩",
    "g+8786=112:８七歩成",
    "s-0078=113:同　金",
    "g-3324=114:３三角",
    "s-7687=115:７六金",
    "g-5554=116:５五歩",
    "s-6656=117:６六飛",
    "gd88p=118:８八歩打",
    "s-2516=119:２五銀",
    "g-0034=120:同　銀",
    "s-0028=121:同　香",
    "g+8988=122:８九歩成",
    "s+2325=123:２三香成",
    "g-1533=124:１五角",
    "sd16p=125:１六歩打",
    "gd54n=126:５四桂打",
    "s-1516=127:１五歩",
    "g-6654=128:６六桂",
    "s-0076=129:同　金",
    "gd79r=130:７九飛打",
    "s-6877=131:６八銀",
    "gd49s=132:４九銀打",
    "s-4858=133:４八玉",
    "g+3849=134:３八銀成",
    "s-0048=135:同　玉",
    "g-6562=136:６五飛",
    "sd32s=137:３二銀打",
    "g-5141=138:５一玉",
    "s-7968=139:７九銀",
    "g-6665=140:６六飛",
    "sd65l=141:６五香打",
    "g-0074=142:同　角",
    "sd56n=143:５六桂打",
    "g-0055=144:同　歩",
    "sd41r=145:４一飛打*Note that this Bishop drop is possible because of the B7d ",
    "g-6251=146:６二玉",
    "sd63p=147:６三歩打",
    "g-0072=148:同　金",
    "sd71s=149:７一銀打",
    "g-7262=150:７二玉",
    "sd61b=151:６一角打",
    "g-7172=152:７一玉",
    "s+4361=153:４三角成",
    "gd51g=154:５一金打",
    "sd61g=155:６一金打",
    "g-7271=156:７二玉",
    "s-6543=157:６五馬",
    "g-6172=158:６一玉",
    "sd25b=159:２五角打",
    "gd52n=160:５二桂打",
    "s-6665=161:６六馬",
    "g-4151=162:４一金",
    "s-0032=163:同　銀",
    "gd36l=164:３六香打",
    "s-0025=165:同　角",
    "gd37s=166:３七銀打",
    "s-0038=167:同　玉",
    "g-3635=168:３六歩",
    "s-2637=169:２六玉",
    "gd25p=170:２五歩打",
    "s-3526=171:３五玉",
    "gd17b=172:１七角打",
    "s-2435=173:２四玉",
    "gd64r=174:６四飛打",
    "sd34n=175:３四桂打",
    "g-6664=176:６六飛",
    "s+5241=177:５二銀成",
    "g-0061=178:同　玉",
    "s+4234=179:４二桂成",
    "g-x=180:投了",
    "C:106手",
    "g-5674=106:５六角",
    "s-0057=107:同　歩",
    "gd19r=108:１九飛打",
    "sd14b=109:１四角打",
    "gd23p=110:２三歩打",
    "sd28l=111:２八香打",
    "C:69手",
    "s+8384=69:８三歩成",
    "g-0072=70:同　金",
    "sd84p=71:８四歩打",
    "g-8283J72:８二金",
    "s-8676=73:８六飛",
    "C:72手",
    "g-7483=72:７四金",
    "s+8384=73:８三歩成",
    "g-6665=74:６六歩",
    "x"
];
SSHACK.board.data.smooth = 1;
SSHACK.board.data.tesuu = 45;
SSHACK.board.addKif(SSHACK.board.data);
