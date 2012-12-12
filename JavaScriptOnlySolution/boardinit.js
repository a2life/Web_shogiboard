/**
 * Created with JetBrains PhpStorm.
 * User: shared
 * Date: 12/11/12
 * Time: 10:07 PM
 * shogishack.net(c)
 * To change this template use File | Settings | File Templates.
 * attempt to modulize javascript code into boardmover.js (same as PHP/JS version) and boardinit.js (setup board, unique
 * to JS version)
*/

/*global  $,  boards, setupboard, komatopng, cordToClass ,setupButtons */

function initializeBoard(j) { //i is a index to board data in boards array, as well as index to selected elem.
//called from initializeBoards, iterate through the number of array element in boards[];
    var i, cord, png, kpng, board = boards[j], target = $(".shogiBoard")[j],
        boardbase = $(target).find('.boardbase'), sentemochigoma = $(target).find('.senteMochigoma'),
        gotemochigoma = $(target).find('goteMochigoma');

    //attach board marker to the boardbase. initially it is out of site

    $('<img class="marker lostworld" id="marker" alt=""/>')
        .addClass(board.marker).attr('src', board.filePathFocus  + board.markerImage).appendTo(boardbase);

    /*  for (var index in board.Positions) {$('<img class="koma" alt=""/>')
     .addClass(index).attr('src', pathname + board.Positions[index] + '.png').appendTo('#boardbase')};
     */
//create image elements with appropriate image and class information attached. also attach koma property with jquery.data()
    for (i = 0; i < board.onBoard.S.length; i++) {

        png = komatopng(board.onBoard.S[i].charAt(2));
        kpng = komatopng((board.onBoard.S[i].charAt(2)).toLowerCase());
        cord = board.onBoard.S[i].substr(0, 2);

        $('<img alt=""/>')
            .addClass(cordToClass(cord)).attr('src', board.filePathKoma + 'S' + png).attr('data-koma', kpng).appendTo(boardbase);
    }
    for (i = 0; i < board.onBoard.G.length; i++) {

        png = komatopng(board.onBoard.G[i].charAt(2));
        kpng = komatopng(board.onBoard.G[i].charAt(2).toLowerCase());
        cord = board.onBoard.G[i].substr(0, 2);

        $('<img alt=""/>')
            .addClass(cordToClass(cord)).attr('src', board.filePathKoma + 'G' + png).attr('data-koma', kpng).appendTo(boardbase);
    }

    for (i = 0; i < board.onHand.S.length; i++) {
        png = komatopng(board.onHand.S[i]);
        $('<img class="" alt=""/>')
            .attr('src', board.filePathKoma + 'S' + png).attr('data-koma', png).appendTo(sentemochigoma);
    }

    for (i = 0; i < board.onHand.G.length; i++) {
        png = komatopng(board.onHand.G[i]);
        $('<img class="" alt=""/>')
            .attr('src', board.filePathKoma + 'G' + png).attr('data-koma', png).appendTo(gotemochigoma);
    }
}

function initializeBoards() {
    var i;
    for (i = 0; i < boards.length; i++) {
        initializeBoard(i);
    }
}

$(function () {
   setupboard();
   initializeBoards();
   setupButtons();
});
