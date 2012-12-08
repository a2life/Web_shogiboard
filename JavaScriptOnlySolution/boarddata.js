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
//    history: [] this does not work. better to have it created on the fly.
    caption: "JSShogiBoard&#0169;"

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

board = Object.create(protoboard);
board.caption = "aigakari";
board.initialComment = "this one has a branch.  Need to develop the logic to sniff out the branch!";
board.moves = [
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
    "変化：106手",
    "g-5674=106:５六角",
    "s-0057=107:同　歩",
    "gd19r=108:１九飛打",
    "sd14b=109:１四角打",
    "gd23p=110:２三歩打",
    "sd28l=111:２八香打",
    "変化：69手",
    "s+8384=69:８三歩成",
    "g-0072=70:同　金",
    "sd84p=71:８四歩打",
    "g-8283J72:８二金",
    "s-8676=73:８六飛",
    "変化：72手",
    "g-7483=72:７四金",
    "s+8384=73:８三歩成",
    "g-6665=74:６六歩"
];

boards.push(board);