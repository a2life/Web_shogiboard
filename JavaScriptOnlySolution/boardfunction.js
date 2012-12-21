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

var Sshack  = {
    //helper functions to mitigate double click async issue of the button:
    // the button has to be disabled until the animatio is finished. I do not have "click buffer" to handle this.
    linkEnabled : true,

    isReadyForClick :  function () {
        setTimeout(this.blockClick, 100);
        return Sshack.linkEnabled;
    },
    blockClick : function () {
    Sshack.linkEnabled = false;
    setTimeout(function(){Sshack.linkEnabled=true;}, 400);
},
        komatopng : function (koma) {
    //convert koma information and return image file name
            if (this.komatopng.partlist === undefined) {
                this.komatopng.partlist = {
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
            var png = this.komatopng.partlist[koma] + '.png';
            return png;

        },
        postComment : function (comment, target) {target.find('.comment').empty().append(comment); },
        emptyComment : function (target) {target.find('.comment').empty(); },
        cordToClass : function (cord) { return cord.replace(/(\d)(\d)/, 'koma c$1 r$2'); },//turn cordination info into .class info
        cordToSelector : function (cord) {return cord.replace(/(\d)(\d)/, '.koma.c$1.r$2'); },//turn .class info into css selector
        setMarker : function (cord, target) { target.find('.marker').attr("class", cord.replace(/(\d)(\d)/, 'marker c$1 r$2')); },//marker class info
        getMarkerCord : function (target) {return target.find('.marker').attr("class").replace(/marker c(\d) r(\d)/, '$1$2'); },

/*
        makeAdrop : function (side, koma, position, target) {
            var selector, png = side.toUpperCase() + this.komatopng(koma);
            if (side.toUpperCase() === 'S') {
                side = '.senteMochigoma';
            } else {
                side = '.goteMochigoma';
            }
            this.setMarker(position, target);
            position = this.cordToClass(position);
            this.emptyComment(target);
            selector = side + ' [src$="' + png + '"]';

            target.find(selector).first().addClass(position).appendTo(target.find('.boardbase'));
        },
*/
        dropKoma : function (side, koma, position, target) {
            var selector, elem, png = side.toUpperCase() + this.komatopng(koma);
            if (side.toUpperCase() === 'S') {
                side = '.senteMochigoma';
            } else {
                side = '.goteMochigoma';
            }
            this.setMarker(position, target);
            position = this.cordToClass(position);
            this.emptyComment(target);
            selector = side + ' [src$="' + png + '"]';
            elem = target.find(selector).first();
            this.animateMove(elem, position, "d", side);
            elem.addClass(position).appendTo(target.find('.boardbase'));
        },
        captureKoma : function (side, cord, target) {
            var komaban, koma, komapath;
    //komapath=target.data("komapath");
            komapath = '../images/shogiboard/koma/pieces_kinki/';
            komaban = (side === 'S') ? '.senteMochigoma' : '.goteMochigoma';
            koma = target.find(this.cordToSelector(cord)).data("koma");
            target.find(this.cordToSelector(cord)).first()
                .attr("class", "").attr("src", komapath + side + koma)
                .appendTo(target.find(komaban));
        },
        promote2Koma : function (elem, side) {
            var koma, komaPath;
            komaPath = '../images/shogiboard/koma/pieces_kinki/';
   //komapath=board[0].filePathKoma;
   // komapath=filePathKoma;
            koma = elem.first().data("koma");
            if (koma === "hi.png") {
                koma = "ryu.png";
            } else if (koma === "kaku.png") {
                koma = "uma.png";
            } else if (koma === "fu.png") {
                koma = "to.png";
            } else {
                koma = 'n' + koma;
            }
            elem.first().attr("src", komaPath + side + koma);
        },
        animateMove : function (elem, to, promote, side) { // this is animation code for moving operation
            // it needs from Class consists of .from and .to cordinate in form of class.
            // we are going to use jquery UI's switchClass.  this  API will eat out .from cordinate Class if .from
            // is the same as .to.   Therefore,
            // use from to modify ".positioner" class to mimic ".from" class
            var e = elem[0], top = e.offsetTop, left = e.offsetLeft,
                width = e.offsetWidth, height = e.offsetHeight;
            $("#positioner").html(".positioner { position: absolute; left: " + left + "px; top: " + top + "px; height:" + height + "px; width: " + width + "px;}");
            // use switchClass to animate the move
            elem.attr('class', 'positioner').switchClass("positioner", to, "", "",
                function () { if (promote === '+') {Sshack.promote2Koma(elem, side);
                     } });
        },

        makeAmove : function (side, promote, from, to, target) {
            this.emptyComment(target);
    //if to position is already occupied, then capture that image element to 'side's mochigoma
    //for this we check the lenth of the targeted selector. ie, if $(".c6 .r7").length>0 then there is an element.
            if (from !== to) {  //if from and to is the same, this is not capturing move
                if (target.find(this.cordToSelector(to)).length > 0) { //otherwise check if capture is required
                    this.captureKoma(side, to, target);
                }
            }
    // then set a marker to "to" position
            this.setMarker(to, target);
    // then move the piece, it just involves the changing of class
            this.animateMove(target.find(this.cordToSelector(from)), this.cordToClass(to), promote, side);
        },
        takeSnapshot : function (aBoard, target) {
            if (aBoard.history === undefined) {aBoard.history = []; }
            aBoard.history.push(target.html());
            target.closest(".shogiBoard").find('.cButton').removeAttr("disabled");
        },
        backOneMove : function (aBoard, target, self) {
            target.closest(".shogiBoard").find('.aButton').removeAttr("disabled");
            target.empty().html(aBoard.history.pop());
            if (aBoard.history.length === 0) {$(self).attr("disabled", "disabled"); }
        },
        stepback : function (aBoard, target, self) {
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
                this.backOneMove(aBoard, target, self);
                $('select')//attach event handler to selectors if its a part of snapshot retrived.
                    .change(function () {
                        aBoard.index = this.options[this.selectedIndex].value;
                    });

            }
        },
 /*       sleepButtons : function () {
                $('input').attr("disabled", "disabled");
                setTimeout(function () {$('input').removeAttr("disabled");},2000);
                },
                */
        parseAction : function (aAction, target) {
            if (aAction.charAt(0) === '*') {
                this.postComment(aAction.slice(1), target);
            } else {
                var to = aAction.substr(2, 2);
                if (to === "00") { to = this.getMarkerCord(target); }//if 00 cordinate, then take to cordinate is marker position
                if (aAction.charAt(1) === 'd') {
                    this.dropKoma(aAction.charAt(0), aAction.charAt(4), to, target);
                } else {
                    this.makeAmove(aAction.charAt(0).toUpperCase(), aAction.charAt(1), aAction.substr(4, 2), to, target);
                }
                if (aAction.indexOf('*') > 0) {this.postComment(aAction.slice(aAction.indexOf('*') + 1), target); }
            }
        },
        setupBranches : function (aBoard, self) {
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

            $(self).closest('.shogiBoard').find('.comment').append(dlist);
  /*  dlist[0].onchange = function () {
        var newvalue = this.options[this.selectedIndex].value;
        alert(newvalue + ' selected');

    }; */
            dlist.change(function () { aBoard.index = this.options[this.selectedIndex].value; });
        },
        forwardOne : function (aBoard, self) {
    /* aBoard point to an array element of Board[]
     *  self point to button entity
     *  target is ".forSnapshot" block that is ancestor of button that fires
     *
     */
            var target = $(self).closest('.shogiBoard')//scan up from button element to class shogiboard
                .find('.forSnapshot'),
                zAction = aBoard.moves[aBoard.index];
 //           this.sleepButtons();
            if (this.isReadyForClick()){
            this.takeSnapshot(aBoard, target);
            ++aBoard.index;
            this.parseAction(zAction, target);
    //   if (aBoard.moves[aBoard.index].charAt(0)=='x')
            if (/(^[\-a-zA-Z0-9]*[xXC])/.test(aBoard.moves[aBoard.index])) {
                $(self).attr("disabled", "disabled");
            } //once reaches the end...
            if (/[\-\+0-9pPlLnNsSgrRbB]+J/.test(aBoard.moves[aBoard.index])) {this.setupBranches(aBoard, self); }
//after the move, if next line is a comment, then process it anyway.
            } },

        initializeBoard : function (j) { //i is a index to board data in boards array, as well as index to selected elem.
//called from initializeBoards, iterate through the number of array element in boards[];
            var i, cord, png, kpng, board = boards[j], target = $(".shogiBoard")[j],
                boardbase = $(target).find('.boardbase'), senteMochigoma = $(target).find('.senteMochigoma'),
                goteMochigoma = $(target).find('goteMochigoma');

    //attach board marker to the boardbase. initially it is out of site

            $('<img class="marker lostworld" id="marker" alt=""/>')
                .addClass(board.marker)
                .attr('src', board.filePathFocus  + board.markerImage)
                .appendTo(boardbase);

    /*  for (var index in board.Positions) {$('<img class="koma" alt=""/>')
     .addClass(index).attr('src', pathname + board.Positions[index] + '.png').appendTo('#boardbase')};
     */
//create image elements with appropriate image and class information attached. also attach koma property with jquery.data()
            for (i = 0; i < board.onBoard.S.length; i++) {

                png = this.komatopng(board.onBoard.S[i].charAt(2));
                kpng = this.komatopng((board.onBoard.S[i].charAt(2)).toLowerCase());
                cord = board.onBoard.S[i].substr(0, 2);

                $('<img alt=""/>')
                    .addClass(this.cordToClass(cord))
                    .attr('src', board.filePathKoma + 'S' + png)
                    .attr('data-koma', kpng).appendTo(boardbase);
            }
            for (i = 0; i < board.onBoard.G.length; i++) {
                png = this.komatopng(board.onBoard.G[i].charAt(2));
                kpng = this.komatopng(board.onBoard.G[i].charAt(2).toLowerCase());
                cord = board.onBoard.G[i].substr(0, 2);

                $('<img alt=""/>')
                    .addClass(this.cordToClass(cord))
                    .attr('src', board.filePathKoma + 'G' + png)
                    .attr('data-koma', kpng).appendTo(boardbase);
            }

            for (i = 0; i < board.onHand.S.length; i++) {
                png = this.komatopng(board.onHand.S[i]);
                $('<img class="" alt=""/>')
                    .attr('src', board.filePathKoma + 'S' + png)
                    .attr('data-koma', png)
                    .appendTo(senteMochigoma);
            }
            for (i = 0; i < board.onHand.G.length; i++) {
                png = this.komatopng(board.onHand.G[i]);
                $('<img class="" alt=""/>')
                    .attr('src', board.filePathKoma + 'G' + png)
                    .attr('data-koma', png)
                    .appendTo(goteMochigoma);
            }
        },
        setupButtons : function () {
            $('<input type="button">')
                .attr("class", "aButton")
                .appendTo('.buttonBar')
                .attr("value", "Forward for solution")
                .each(function (i) {$(this)
                    .click(function () {
                        Sshack.forwardOne(boards[i], this);
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
                    .click(function () {Sshack.stepback(boards[i], $(this)
                        .closest('.shogiBoard')
                        .find('.forSnapshot'), this); }
                        );
                    }
                    );

        },
        initializeBoards : function () {
            var i;
            for (i = 0; i < boards.length; i++) {
                this.initializeBoard(i);
            }
        }
    }; // end of Sshack variable declaration.
$(function () {
    setupboard();
    Sshack.initializeBoards();
    Sshack.setupButtons();
});
