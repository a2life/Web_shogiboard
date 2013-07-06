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
    var i, moveExists, contents, board, boards = SSHACK.board.kifuList, l = boards.length, embedDatakomapath = 'data-komapath="';
    function addstyletag() {
        if ($('#positioner').length === 0) { //if not defined, then add a style tag with #positioner id
            $('<style type="text/css" id="positioner"></style>')
                .appendTo('head');// this tag needed to manupulate sliding piece move, used on switchClass() call
        }

    }

    for (i = 0; i < l; i++) {
        board = boards[i];
        moveExists = (SSHACK.board.kifuList[i].moves !== undefined);

        contents = '<p class="caption">' + board.caption + '</p>' +
            (moveExists ? '<div class="buttonAnchor"><div class="clickable">' : '') +
            '<div class="forSnapshot type0width"' + embedDatakomapath + board.filePathKoma + '">' +
            '<span class="player1">▲Sente</span>' +
            '<span class="player2">△Gote</span>' +
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
            '<div class="cell statusLine"></div>' +
            '</div><!-- gap between two komaban -->' +
            '<div class="row">' +
            '<div class="senteMochigoma komadai cell"><!-- Sente komaban --></div>' +
            '</div><!-- row -->' +
            '</div><!-- innter table -->' +
            '</div><!-- cell-->' +
            '</div><!-- shogirow for the outer css-table-->' +
            '</div><!--shogitable-->' +
            (moveExists ? '<div class="bbBox"></div>' : '') +
            '<article class="scomment comment" >' +
            board.initialComment +
            '</article>' +
            '</div>' +
            (moveExists ? '</div><div class="buttonBar"></div></div>' : '');
        if (moveExists) { addstyletag(); }
        $($('.shogiBoard')[i]).append(contents);
    }
};
