/**
 * Created with JetBrains PhpStorm.
 * User: a2life
 * Date: 6/25/12
 * Time: 3:01 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: shared
 * Date: 6/3/12
 * Time: 10:51 PM
 * To change this template use File | Settings | File Templates.
 */

/*jslint browser: true*/
/*global  $,  boards, setupboard, */

function komatopng(koma) {"use strict";
    //convert koma information and return image file name
    if (komatopng.partlist === undefined) {
        komatopng.partlist = {
            "p": "fu",
            "P": "to",
            "l": "kyo",
            "L": "nkyo",
            "n": "kei",
            "N": "nkei",
            "s": "gin",
            "S": "ngin",
            "g": "kin",
            "b": "kaku",
            "B": "uma",
            "r": "hi",
            "R": "ryu",
            "k": "ou"
        };
    }
    var png = komatopng.partlist[koma] + '.png';
    return png;

    }

function postComment(comment, target) {target.find('.comment').empty().append(comment); }
function emptyComment(target) {target.find('.comment').empty(); }
function cordToClass(cord) { return cord.replace(/(\d)(\d)/, 'koma c$1 r$2'); }//turn cordination info into .class info
function cordToSelector(cord) {return cord.replace(/(\d)(\d)/, '.koma.c$1.r$2'); }//turn .class info into css selector
function setMarker(cord, target) { target.find('.marker').attr("class", cord.replace(/(\d)(\d)/, 'marker c$1 r$2')); }//marker class info
function makeAdrop(side, koma, position, target) {
    var selector, png = side.toUpperCase() + komatopng(koma);
    if (side.toUpperCase() === 'S') {
        side = '.senteMochigoma';
    } else {
        side = '.goteMochigoma';
    }
    setMarker(position, target);
    position = cordToClass(position);
    emptyComment(target);
    selector = side + ' [src$="' + png + '"]';

    target.find(selector).first().addClass(position).appendTo(target.find('.boardbase'));
}
function captureKoma(side, cord, target) {
    var komaban, koma, komapath;
    //komapath=target.data("komapath");
    komapath = '../images/shogiboard/koma/pieces_kinki/';
    komaban = (side === 'S') ? '.senteMochigoma' : '.goteMochigoma';
    koma = target.find(cordToSelector(cord)).data("koma");
    target.find(cordToSelector(cord)).first()
        .attr("class", "").attr("src", komapath + side + koma)
        .appendTo(target.find(komaban));
}
function promoteKoma(side, cord, target) {
    var koma, komaPath;
    komaPath = '../images/shogiboard/koma/pieces_kinki/';
   //komapath=board[0].filePathKoma;
   // komapath=filePathKoma;
    koma = target.find(cordToSelector(cord)).data("koma");
    if (koma === "hi.png") {
        koma = "ryu.png";
    } else if (koma === "kaku.png") {
        koma = "uma.png";
    } else if (koma === "fu.png") {
        koma = "to.png";
    } else {
        koma = 'n' + koma;
    }

    target.find(cordToSelector(cord)).first().attr("src", komaPath + side + koma);
}

function makeAmove(side, promote, from, to, target) {
    emptyComment(target);
    //if to position is already occupied, then capture that image element to 'side's mochigoma
    //for this we check the lenth of the targeted selector. ie, if $(".c6 .r7").length>0 then there is an element.
    if (target.find(cordToSelector(to)).length > 0) {
        captureKoma(side, to, target);
    }
    // then set a marker to "to" position
    setMarker(to, target);
    // then move the piece, it just involves the changing of class
    target.find(cordToSelector(from)).attr('class', cordToClass(to));
    // then check if the piece is promoted by checking the variable promote
    if (promote === '+') {promoteKoma(side, to, target); }
}
function takeSnapshot(aBoard, target) {
    if (aBoard.history === undefined) {aBoard.history = []; }
    aBoard.history.push(target.html());
    target.closest(".shogiBoard").find('.cButton').removeAttr("disabled");
}
function backOneMove(aBoard, target, self) {
    target.closest(".shogiBoard").find('.aButton').removeAttr("disabled");
    var history = aBoard.history.pop();
    target.empty().html(history);
    if (aBoard.history.length === 0) {$(self).attr("disabled", "disabled"); }
}
function stepback(aBoard, target, self) {
    var f, sniff, tesuu, tesuuPattern, rePattern = new RegExp("C:(\\d+).*");
    if (aBoard.index > 0) {
        //add instruction to correctly handles branch step back
        --aBoard.index;
        sniff = aBoard.index - 1;
        if (/C:/.test(aBoard.moves[sniff])) {
            //if this test is true then the line contains number that should be matched by "going up" the list
            //get the number
            tesuu = aBoard.moves[sniff].replace(rePattern, "$1");
            tesuuPattern = new RegExp("J" + tesuu);
            do {
                --aBoard.index;
                f = tesuuPattern.test(aBoard.moves[aBoard.index]);
            } while (!f);
//            --aBoard.index; // now the index point to original branch point (jnnn - 1)
        }
        backOneMove(aBoard, target, self);
        $('select')//attach event handler to selectors if its a part of snapshot retrived.
            .change(function () {
                aBoard.index = this.options[this.selectedIndex].value;
            });

    }
}
function parseAction(aAction, target) {

    if (aAction.charAt(0) === '*') {
        postComment(aAction.slice(1), target);
    } else {
        var to = aAction.substr(2, 2);
        if (parseAction.prevMove === undefined) {parseAction.prevMove = to; } //this is..
        if (to === "00") { to = parseAction.prevMove; }//a mechanism to..
        parseAction.prevMove = to; //remember previous move to accomodate 00 notation
        if (aAction.charAt(1) === 'd') {
            makeAdrop(aAction.charAt(0), aAction.charAt(4), to, target);
        } else {
            makeAmove(aAction.charAt(0).toUpperCase(), aAction.charAt(1), aAction.substr(4, 2), to, target);
        }
        if (aAction.indexOf('*') > 0) {postComment(aAction.slice(aAction.indexOf('*') + 1), target); }
    }

}
function setupBranches(aBoard, self) {
    var i = aBoard.index, options = [], htesuu = "", f = false,
        rePattern = new RegExp('^[\\-\\+0-9a-z]+[J=](\\d+)(.*)'),
        tesuu = Number(aBoard.moves[i].replace(rePattern, "$1")),
        dlist = $('<select></select>'),
        str;
    options.push(i);
loop1:
    do {
        i++;// now find C：　string in the array.
        do {
            f = /C:/.test(aBoard.moves[i++]);
            if (i >= aBoard.moves.length) {
                break loop1;
            }
        } while (!f);
    //from i, find henkatesuu using regex.
        htesuu = Number(aBoard.moves[i].replace(rePattern, "$1"));
   // then if tesu == henkatesuu then push i to options array.
        if (tesuu === htesuu) {options.push(i); }
    // do this until end of array or henkatesu is less than tesuu
    } while ((htesuu >= tesuu));
    for (i = 0; i < options.length; i++) { //stuff a dropdown list with alternative moves
        str = aBoard.moves[options[i]].replace(rePattern, "$2");
        $('<option></option>')
            .attr("value", options[i])
            .text(str)
            .appendTo(dlist);
    }

    $(self).closest('.shogiBoard').find('.scomment').append(dlist);
  /*  dlist[0].onchange = function () {
        var newvalue = this.options[this.selectedIndex].value;
        alert(newvalue + ' selected');

    }; */
    dlist.change(function () { aBoard.index = this.options[this.selectedIndex].value; });
}
function forwardOne(aBoard, self) {
    /* aBoard point to an array element of Board[]
     *  self point to button entity
     *  target is ".forSnapshot" block that is ancestor of button that fires
     *
     */
    var target = $(self).closest('.shogiBoard')//scan up from button element to class shogiboard
        .find('.forSnapshot'),
        zAction = aBoard.moves[aBoard.index];

    takeSnapshot(aBoard, target);
    ++aBoard.index;
    parseAction(zAction, target);
    //   if (aBoard.moves[aBoard.index].charAt(0)=='x')
    if (/(^[\-a-zA-Z0-9]*[xXC])/.test(aBoard.moves[aBoard.index])) {
        $(self).attr("disabled", "disabled");
    } //once reaches the end...
    if (/[\-\+0-9pPlLnNsSgrRbB]+J/.test(aBoard.moves[aBoard.index])) {setupBranches(aBoard, self); }
//after the move, if next line is a comment, then process it anyway.
}

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
function setupButtons() {
    $('<input type="button">')
        .attr("class", "aButton")
        .appendTo('.buttonBar')
        .attr("value", "Forward for solution")
        .each(function (i) {$(this)
            .click(function () {
                forwardOne(boards[i], this);
            }
                );
            }
            );

    $('<input type="button">')
        .attr("class", "cButton")
        .appendTo('.buttonBar')
        .attr("value", "Step Back")
        .attr("disabled", "disabled")
        .each(function (i) {$(this)
            .click(function () {stepback(boards[i], $(this).closest('.shogiBoard').find('.forSnapshot'), this); }
                );
            }
            );

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
