/**
 * Created with JetBrains PhpStorm.
 * User: 10032268
 * Date: 12/4/12
 * Time: 10:59 AM
 * setup shogiboard container html. uses jquery
 */
/*
* SSHACK.Board.setupBoard module for JS solutioin
 */
/*jslint browser: true*/
/*global  $, SSHACK */
SSHACK.namespace('SSHACK.board');
SSHACK.board.setupBoard = function () {
    var i, contents, board, boards = SSHACK.board.kifuList, l = boards.length, embedDatakomapath = 'data-komapath="';
    function addstyletag(i) {
        if (SSHACK.board.kifuList[i].moves !== undefined) {
            if ($('#positioner').length === 0) { //if not defined, then add a style tag with #positioner id
                $('<style type="text/css" id="positioner"></style>')
                    .appendTo('head');// this tag needed to manupulate sliding piece move, used on switchClass() call
            }
        }
    }
    function buttonSection(i) {
        var str = '';
        if (SSHACK.board.kifuList[i].moves !== undefined) {
            str = '<div class="buttonBar"></div>';
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
        addstyletag(i);
        $($('.shogiBoard')[i]).append(contents);
    }
};
