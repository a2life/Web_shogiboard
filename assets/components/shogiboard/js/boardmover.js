

/**
 * Created with JetBrains PhpStorm.
 * User: a2life
 * Date: 10/29/12
 *this Js is to be used with PHP file that creates the shogiboard initial setup.
 * this javascript will then animate the board.
 */

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
            "g": "gin",
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


function postComment(comment, target) {"use strict"; target.find('.comment').empty().append(comment); }
function emptyComment(target) {"use strict"; target.find('.comment').empty(); }
function cordToClass(cord) {"use strict"; return 'koma c' + cord.charAt(0) + ' r' + cord.charAt(1); }
function cordToSelector(cord) {"use strict"; return ('.koma.c' + cord.charAt(0) + '.r' + cord.charAt(1)); }
function setMarker(cord, target) {"use strict";
    var markerClass;
    markerClass = "marker c" + cord.charAt(0) + ' r' + cord.charAt(1);
    target.find('.marker').attr("class", markerClass);
}
function makeAdrop(side, koma, position, target) {"use strict";
    var selector, png = side.toUpperCase() + komatopng(koma);
    if (side.toUpperCase() === 'S') {
        side = '.senteMochigoma';
    } else {side = '.goteMochigoma'; }
    setMarker(position, target);
    position = cordToClass(position);
    emptyComment(target);
    selector = side + ' [src$="' + png + '"]';

    target.find(selector).first().addClass(position).appendTo(target.find('.boardbase'));
}
function captureKoma(side, cord, target) { "use strict";
    var komaban, koma, komapath;
    komapath = target.data("komapath");
    komaban = (side === 'S') ? '.senteMochigoma' : '.goteMochigoma';
    koma = target.find(cordToSelector(cord)).data("koma");
    target.find(cordToSelector(cord)).first()
        .attr("class", "").attr("src", komapath + side + koma)
        .appendTo(target.find(komaban));
}
function promoteKoma(side, cord, target) {"use strict";
    var koma, komapath;
    komapath = target.data("komapath");
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

    target.find(cordToSelector(cord)).first().attr("src", komapath + side + koma);
}
function makeAmove(side, promote, from, to, target) {"use strict";
    if (makeAmove.prevMove === undefined) {makeAmove.prevMove = to;}
    if (to === "00") { to = makeAmove.prevMove; }
    makeAmove.prevMove = to; //remember previous move to accomodate 00 notation
    emptyComment(target);
    //if to position is already occupied, then capture that image element to 'side's mochigoma
    //for this we check the lenth of selector. ie, if $(".c6 .r7").length>0 then there is an element.
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
function takeSnapshot(aBoard, target) {"use strict";
    aBoard.history[aBoard.index] = target.html();
    ++aBoard.index;
}
function setBoardToHistory(aBoard, i, target) {"use strict";
    target.closest(".shogiBoard").find('.aButton').removeAttr("disabled");
    target.empty().html(aBoard.history[i]);
}
function stepback(aBoard, self) {"use strict";
    var target = $(self).closest('.shogiBoard')
        .find('.forSnapshot');
    if (aBoard.index > 0) {
        setBoardToHistory(aBoard, --(aBoard.index), target);
    }
}

function parseAction(aAction, target) {

    if (aAction.charAt(0) === '*') {
        postComment(aAction.slice(1), target);
    } else {
        if (aAction.charAt(1) === 'd') {
            makeAdrop(aAction.charAt(0), aAction.charAt(4), aAction.substr(2, 2), target);
        } else {
            makeAmove(aAction.charAt(0).toUpperCase(), aAction.charAt(1), aAction.substr(4, 2), aAction.substr(2, 2), target);
        }
        if (aAction.indexOf('*') > 0) {postComment(aAction.slice(aAction.indexOf('*') + 1), target); }
    }

}
function animateBoard(aBoard, self) {"use strict";
    /* aBoard point to an array element of Board[]
     *  self point to button entity
     *  target is ".forSnapshot" block that is ancestor of button that fires
     *
     */
    var target = $(self).closest('.shogiBoard')
            .find('.forSnapshot'),
        zAction = aBoard.moves[aBoard.index];
    takeSnapshot(aBoard, target);
    parseAction(zAction, target);
    if (/[a-zA-Z0-9]*x/.test(aBoard.moves[aBoard.index])) {
        $(self).attr("disabled", "disabled");
    }

    //once reaches the end...

//after the move, if next line is a comment, then process it anyway.
}

var board = [];

function setupButtons() {"use strict";

    $('<input type="button">')
        .attr("class", "aButton")
        .appendTo('.buttonBar')
        .attr("value", "Forward for solution")
        .each(function (i) {$(this)
            .click(function () { animateBoard(board[i], this); }
        );
        }
    );

    $('<input type="button">')
        .attr("class", "cButton")
        .appendTo('.buttonBar')
        .attr("value", "Step Back")
        .each(function (i) {$(this)
            .click(function () {stepback(board[i], $(this)); }
        );
        }
    );

}
/* theory of placing koma piece on the board
 function testmove() {

 $('#marker').attr('class', 'koma c2 r6'); // class of "koma c2 r6" will place the marker at 26
 $('#senteMochigoma [src$="Skyo.png"]').first().detach().addClass('koma c2 r6').appendTo('#boardbase');
 // this line select <img > tag with kyo.png src from #senteMochigoma div,  detach from parent element,
 // add class for the context of c2 r6 position and append to #boardbase element
 // as a result, it will be positioned to 26 on shogiboard image
 }
 */
/*
 function komatopng(koma) {
 var png;
 switch (koma){ //convert piece information to image filename information.
 case 'p':png='fu.png';break;
 case 'P':png= 'to.png';break;
 case 'l': png= 'kyo.png';break;
 case 'L': png= 'nkyo.png';break;
 case 'n': png= 'kei.png';break;
 case 'N': png= 'nkei.png';break;
 case 's': png= 'gin.png';break;
 case 'S': png= 'ngin.png';break;
 case 'g': png= 'kin.png';break;
 case 'b': png= 'kaku.png';break;
 case 'B': png= 'uma.png';break;
 case 'r': png= 'hi.png';break;
 case 'R': png= 'ryu.png';break;
 case 'k': png= 'ou.png';break;
 }
 return png;
 }
 */


$(function () {
    setupButtons();
});
