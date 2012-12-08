/**
 * Created with JetBrains WebStorm.
 * User: shared
 * Date: 5/31/12
 * Time: 6:58 PM
 * To change this template use File | Settings | File Templates.
 */
var protoboard;
protoboard = {
    /* p=pawn, l=lance, L=promoted lance, s=silver, S=promoted Silver, g=gold, r=rook, R=promoted Rook, b=bishop, B=promoted Bishop
     k=king 11=1a, 12=1b etc.,
     */
    filePathKoma: '../images/shogiboard/koma/pieces_kinki/',
    filePathGrid: '../images/shogiboard/masu/',
    filePathBoard: '../images/shogiboard/ban/',
    filePathFocus: '../images/shogiboard/focus/',
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
    history: [],
    caption: "JSShogiBoard&#0169;",
    initialComment: ""

};
var boards = [];

var board = Object.create(protoboard);
board.onHand = { S: ['g', 'g', 'l', 'p'], G: ['b', 'l', 'l', 'p'] };
board.moves = [
    "*this is a comment that should go to comment line",
    "s-2627 *here, the sente moves a piece from 27 to 26",
    "g-8483",
    "s-2526",
    "g-7261",
    "s-2425",
    "g-2423 *capturing the piece is implied",
    "s-2428",
    "gd23p",
    "s+2324",
    "g-3241",
    "s-2223",
    "g-2231",
    "x"
];
board.initialComment = "Don't worry about extra shogi piece.  I am just tyring to ensure the program works.<br>" +
    "駒の数が多いのはご愛嬌です。";

boards.push(board);

//now create another shogiboard data object
board = Object.create(protoboard);
board.caption = "The latest Yagura 3g silver -矢倉３七銀2012年最新型";
board.initialComment = "The program can not show branch moves yet so it only follows the actual game played by Hirose and Watanabe" +
    "on October 2012.";
board.moves = [
    "*One of the reasons for Yagura's steady popularity is this thanks to Miyata's discovery of  p-65(６五歩).  Let's take a look.",
    "s-7677=1:７六歩",
    "g-8483=2:８四歩",
    "s-6879=3:６八銀",
    "g-3433=4:３四歩",
    "s-6667=5:６六歩*silver 7g was more popular move here years ago. some people still play s-7g to avoid gote's right wing fourth range rook attack.",
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
    "g-5362J=34:５三銀",
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
    "g-8584J=46:８五歩",
    "s-2537=47:２五桂",
    "g-4253J=48:４二銀",
    "s-5556J=49:５五歩",
    "g-4544J=50:４五歩",
    "s-4546=51:同銀",
    "g-5573J=52:５五角",
    "s-4647J=53:４六歩",
    "g-8685=54:８六歩",
    "s-8687=55:同歩",
    "g-8682=56:同飛",
    "sd87p=57:８七歩打",
    "g-8286=58:８二飛",
    "s-5768=59:５七角",
    "g-3321=60:３三桂",
    "s-5645=61:５六銀",
    "g-4455=62:４四角",
    "s-4857J=63:４八角",
    "g-7381=64:７三桂",
    "s-4546=65:４五歩",
    "g-5344=66:５三角",
    "s+3325=67:３三桂成",
    "g-3342=68:同銀",
    "s-1516=69:１五歩",
    "g-1514=70:同歩",
    "s-3748=71:３七角",
    "gd55n=72:５五桂打",
    "s-5556=73:同銀",
    "g-5554=74:同歩",
    "s-5537=75:同角",
    "g-8382=76:８三飛",
    "sd44nJ=77:４四桂打",
    "g-4232J=78:４二金",
    "sd25n=79:２五桂打",
    "g-2524=80:同銀",
    "s-2526=81:同歩",
    "gd86p=82:８六歩打",
    "s-8677=83:同銀",
    "gd94n=84:９四桂打",
    "s-3536=85:３五歩",
    "g-3534=86:同歩",
    "sd34p=87:３四歩打",
    "g-3443=88:同金",
    "sd54p=89:５四歩打",
    "g-8653=90:８六角",
    "s-8687=91:同歩",
    "g-8694=92:同桂",
    "sd87p=93:８七歩打",
    "g+7886=94:７八桂成",
    "s-7888=95:同玉",
    "gd47s=96:４七銀打",
    "sd32s=97:３二銀打",
    "g-3242=98:同金",
    "s+3244=99:同桂成",
    "g-3222=100:同玉",
    "s+5354=101:５三歩成",
    "g+3847=102:３八銀成",
    "sd43b=103:４三角打",
    "g-2232=104:２二玉",
    "s+3355=105:３三角成",
    "g-3334=106:同金",
    "sd34n=107:３四桂打",
    "g-3433=108:同金",
    "sd32g=109:３二金打",
    "g-1322=110:１三玉",
    "s-1518=111:１五香",
    "gd14p=112:１四歩打",
    "sd22s=113:２二銀打",
    "g-1213=114:１二玉",
    "s-1415=115:１四香",
    "x"
];

boards.push(board);
