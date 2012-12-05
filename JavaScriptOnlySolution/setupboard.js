/**
 * Created with JetBrains PhpStorm.
 * User: 10032268
 * Date: 12/4/12
 * Time: 10:59 AM
 * setup shogiboard container html. uses jquery
 */
/*jslint browser: true*/
/*global  $, boards, setupboard*/
function setupboard() {
    "use strict";
    function buttonSection(i) {
        var str;
        if (boards[i].moves !== undefined) {
            str = '<div class="buttonBar"></div>';
        } else {
            str = null;
        }
        return str;
    }
    var i,
        contents = '<p>hello world</p>' +
            '<div class="forSnapshot">' +
            '<div class="table" > <!-- outer table -->' +
            '<div class="row">' +
            '<div class="boardbase cell">' +
            '<img class="board" src="../images/shogiboard/ban/ban_kaya_a.png"  alt=""/>' +
            '<img class="board" src="../images/shogiboard/masu/masu_dot_xy.png" alt=""/>' +
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
            'Here is a comment about this shogi board.  if this spans below the shogi board and koma dai then it is a success!!!' +
            '</article>';

    for (i = 0; i < boards.length; i++) {
        contents += '</div>';
        contents += buttonSection(i);
        $($('.shogiBoard')[i]).append(contents);
    }
}
