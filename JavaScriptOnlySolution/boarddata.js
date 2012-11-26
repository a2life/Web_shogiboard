/**
 * Created with JetBrains WebStorm.
 * User: shared
 * Date: 5/31/12
 * Time: 6:58 PM
 * To change this template use File | Settings | File Templates.
 */
var board;
board = {
    /* p=pawn, l=lance, L=promoted lance, s=silver, S=promoted Silver, g=gold, r=rook, R=promoted Rook, b=bishop, B=promoted Bishop
     k=king 11=1a, 12=1b etc.,
     */
    marker:"lostworld", markerColor:"focus_trpt_g",
    //refer to marker location and pattern "lost world" coordination is off the page
    onBoard:{G:['11l','21n','31s','41g','51k','61g','71s','81n','91l','22b','82r','13p','23p','33p','43p','53p','63p','73p','83p','93p'],
        S:['19l','29n','39s','49g','59k','69g','79s','89n','99l','28r','88b','17p','27p','37p','47p','57p','67p','77p','87p','97p']},
    // onBoard denotes pieces already on board. G array lists Gote side pieces. S array lists Sente side pieces.
    onHand:{ S:['g', 'g', 'l', 'p'],
        G:['b', 'l', 'l', 'p'] },
    // onhand denotes pieces on hand

    // moves is an array of moves. for first char, * is comment, s or g shows side.
    // second char is either - (move) or d for drop. cordinateion in /to/from order.
    moves:[
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
    ],
    index:0,
    history:[],
    pathname:'images/shogiboards/'
};
