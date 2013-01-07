/**
 * Created with JetBrains PhpStorm.
 * User: 10032268
 * Date: 12/4/12
 * Time: 10:59 AM
 * setup shogiboard container html. uses jquery
 */
/*jslint browser: true*/
/*global  $, sBoard */
sBoard.setupboard = function () {
    var i, contents, board, boards = sBoard.kifuList, l = boards.length, embedDatakomapath = 'data-komapath="';

    function buttonSection(i) {
        var str;
        if (sBoard.kifuList[i].moves !== undefined) {
            str = '<div class="buttonBar"></div>';
        } else {
            str = "";
        }
        return str;
    }

    for (i = 0; i < l; i++) {
        board = boards[i];
        contents = '<p class="sCaption">' + board.caption + '</p>' +
            '<div class="forSnapshot"' + embedDatakomapath + board.filePathKoma + '">' +
            '<div class="table" > <!-- outer table -->' +
            '<div class="row">' +
            '<div class="boardbase cell">' +
            '<img class="board" src="' + board.filePathBoard + board.banImage + '"  alt=""/>' +
            '<img class="board" src="' + board.filePathGrid + board.gridImage + '"  alt=""/>' +
            '</div>' +
            '<div class="cell">' +
            '<div class="table"><!-- inner table -->' +
            '<div class="row">' +
            '<div class="goteMochigoma komadai cell"> <!-- Gote mochigoma --></div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="cell empty"></div>' +
            '</div><!-- gap between two komaban -->' +
            '<div class="row">' +
            '<div class="senteMochigoma komadai cell"><!-- Sente komaban --></div>' +
            '</div><!-- row -->' +
            '</div><!-- innter table -->' +
            '</div><!-- cell-->' +
            '</div><!-- shogirow for the outer css-table-->' +
            '</div><!--shogitable-->' +
            '<article class="scomment comment" >' +
            board.initialComment +
            '</article>';


        contents += '</div>';
        contents += buttonSection(i);
        $($('.shogiBoard')[i]).append(contents);
    }
};
