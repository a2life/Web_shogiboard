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
/*global  $,  sBoard */

var SSHACK  = (function () { //this is one big object declaration with local variables and functions defined by executing a function call
    // and returning a object literals
        var notInAnimation = true,//needed a private variable to keep track of this.
            partlist = {
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
            },
            komaToPng = function (koma) {
        //convert koma information and return image file name
                var png = partlist[koma] + '.png';
                return png;

            },
            postComment = function (comment, target) {target.find('.comment').empty().append(comment); },
            emptyComment = function (target) {target.find('.comment').empty(); },
            cordToClass = function (cord) { return cord.replace(/(\d)(\d)/, 'koma c$1 r$2'); },//turn cordination info into .class info
            cordToSelector = function (cord) {return cord.replace(/(\d)(\d)/, '.koma.c$1.r$2'); },//turn .class info into css selector
            setMarker = function (cord, target) { target.find('.marker').attr("class", cord.replace(/(\d)(\d)/, 'marker c$1 r$2')); },//marker class info
            getMarkerCord = function (target) {return target.find('.marker').attr("class").replace(/marker c(\d) r(\d)/, '$1$2'); },
            promote2Koma = function (elem, side) {
                var koma, komaPath;
                komaPath = elem.closest(".forSnapshot").data("komapath");//forSnapshot element has komapath data stored
                koma = elem.data("koma");
                if (koma === "hi.png") {
                    koma = "ryu.png";
                } else if (koma === "kaku.png") {
                    koma = "uma.png";
                } else if (koma === "fu.png") {
                    koma = "to.png";
                } else {
                    koma = 'n' + koma;
                }
                elem.attr("src", komaPath + side + koma);
            },
            animateMove = function (elem, to, promote, side) { // this is animation code for moving operation
                // it needs from Class consists of .from and .to cordinate in form of class.
                // we are going to use jquery UI's switchClass.  this  API will eat out .from cordinate Class if .from
                // is the same as .to.   Therefore,
                // use from to modify ".positioner" class to mimic ".from" class
                var e = elem[0], top = e.offsetTop, left = e.offsetLeft,
                    width = e.offsetWidth, height = e.offsetHeight;
                notInAnimation = false; //set a flag so the button click is ignored during animated move.
                $("#positioner").html(".positioner { position: absolute; left: " + left + "px; top: " + top + "px; height:" + height + "px; width: " + width + "px;}");
                // inline style tag called "positioner" is already set up in the html header //
                // use jQuery UI's .switchClass() to animate the move
                // "onMove" class ensures the target elemenet have high value z-index
                elem.attr('class', 'positioner onMove').switchClass("positioner", to, "", "",
                    function () { if (promote === '+') {promote2Koma(elem, side);
                        }//after moving the piece, check for promotion and take action if that is the case.
                        elem.removeClass("onMove");
                        notInAnimation = true; //after moving the piece, call back and set the flag to accept another button click
                        });
            },
            dropKoma = function (side, koma, position, target) {
                var selector, elem, png = side.toUpperCase() + komaToPng(koma);
                if (side.toUpperCase() === 'S') {
                    side = '.senteMochigoma';
                } else {
                    side = '.goteMochigoma';
                }
                setMarker(position, target);
                position = cordToClass(position);
                emptyComment(target);
                selector = side + ' [src$="' + png + '"]';
                elem = target.find(selector).first();
                animateMove(elem, position, "d", side);
                elem.addClass(position).appendTo(target.find('.boardbase'));
            },
            captureKoma = function (side, cord, target) {
                var komaban, koma, komapath;
        //komapath=target.data("komapath");
                komapath = '../images/shogiboard/koma/pieces_kinki/';
                komaban = (side === 'S') ? '.senteMochigoma' : '.goteMochigoma';
                koma = target.find(cordToSelector(cord)).data("koma");
                target.find(cordToSelector(cord)).first()
                    .attr("class", "").attr("src", komapath + side + koma)
                    .appendTo(target.find(komaban));
            },
            makeAmove = function (side, promote, from, to, target) {
                emptyComment(target);
        //if to position is already occupied, then capture that image element to 'side's mochigoma
        //for this we check the lenth of the targeted selector. ie, if $(".c6 .r7").length>0 then there is an element.
                if (from !== to) {  //if from and to is the same, this is not capturing move
                    if (target.find(cordToSelector(to)).length > 0) { //otherwise check if capture is required
                        captureKoma(side, to, target);
                    }
                }
        // then set a marker to "to" position
                setMarker(to, target);
        // then move the piece, it just involves the changing of class
                animateMove(target.find(cordToSelector(from)), cordToClass(to), promote, side);
            },
            takeSnapshot = function (aBoard, target) {
                if (aBoard.history === undefined) {aBoard.history = []; }
                aBoard.history.push(target.html());
                target.closest(".shogiBoard").find('.cButton').removeAttr("disabled");
            },
            backOneMove = function (aBoard, target, self) {
                target.closest(".shogiBoard").find('.aButton').removeAttr("disabled");
                target.empty().html(aBoard.history.pop());
                if (aBoard.history.length === 0) {$(self).attr("disabled", "disabled"); }
            },
            stepBack = function (aBoard, target, self) {
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
                    $('select')//attach event handler to selectors if its a part of snapshot retrieved.
                        .change(function () {
                            aBoard.index = this.options[this.selectedIndex].value;
                        });

                }
            },
            parseAction = function (aAction, target) {
                if (aAction.charAt(0) === '*') {
                    postComment(aAction.slice(1), target);
                } else {
                    var to = aAction.substr(2, 2);
                    if (to === "00") { to = getMarkerCord(target); }//if 00 cordinate, then take to cordinate is marker position
                    if (aAction.charAt(1) === 'd') {
                        dropKoma(aAction.charAt(0), aAction.charAt(4), to, target);
                    } else {
                        makeAmove(aAction.charAt(0).toUpperCase(), aAction.charAt(1), aAction.substr(4, 2), to, target);
                    }
                    if (aAction.indexOf('*') > 0) {postComment(aAction.slice(aAction.indexOf('*') + 1), target); }
                }
            },
            setupBranches = function (aBoard, self) {
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
                    htesuu = +(aBoard.moves[i].replace(rePattern, "$1"));
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

                dlist.change(function () { aBoard.index = this.options[this.selectedIndex].value; });
            },
            forwardOne = function (aBoard, self) {
        /* aBoard point to an array element of Board[]
         *  self point to button entity
         *  target is ".forSnapshot" block that is ancestor of button that fires
         *
         */
                if (notInAnimation) { // if the board is in animation mode, then skip this block = ignore button press.
                    var target = $(self).closest('.shogiBoard')//scan up from button element to class shogiboard
                        .find('.forSnapshot'),
                        zAction = aBoard.moves[aBoard.index];
                    takeSnapshot(aBoard, target);
                    ++aBoard.index;
                    parseAction(zAction, target);
            //   if (aBoard.moves[aBoard.index].charAt(0)=='x') // more sophsticated code below to do the same and more.
                    if (/(^[\-a-zA-Z0-9]*[xXC])/.test(aBoard.moves[aBoard.index])) {
                        $(self).attr("disabled", "disabled");
                    } //once reaches the end...
                    if (/[\-\+0-9pPlLnNsSgrRbB]+J/.test(aBoard.moves[aBoard.index])) {setupBranches(aBoard, self); }
//after the move, if next line is a comment, then process it anyway.
                }
            },
            initializeBoard = function (j) { //i is a index to board data in boards array, as well as index to selected elem.
//called from initializeBoards, iterate through the number of array element in boards[];
                var i, cord, png, kpng, board = sBoard.kifuList[j], target = $(".shogiBoard")[j],
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

                    png = komaToPng(board.onBoard.S[i].charAt(2));
                    kpng = komaToPng((board.onBoard.S[i].charAt(2)).toLowerCase());
                    cord = board.onBoard.S[i].substr(0, 2);

                    $('<img alt=""/>')
                        .addClass(cordToClass(cord))
                        .attr('src', board.filePathKoma + 'S' + png)
                        .attr('data-koma', kpng).appendTo(boardbase);
                }
                for (i = 0; i < board.onBoard.G.length; i++) {
                    png = komaToPng(board.onBoard.G[i].charAt(2));
                    kpng = komaToPng(board.onBoard.G[i].charAt(2).toLowerCase());
                    cord = board.onBoard.G[i].substr(0, 2);

                    $('<img alt=""/>')
                        .addClass(cordToClass(cord))
                        .attr('src', board.filePathKoma + 'G' + png)
                        .attr('data-koma', kpng).appendTo(boardbase);
                }

                for (i = 0; i < board.onHand.S.length; i++) {
                    png = komaToPng(board.onHand.S[i]);
                    $('<img class="" alt=""/>')
                        .attr('src', board.filePathKoma + 'S' + png)
                        .attr('data-koma', png)
                        .appendTo(senteMochigoma);
                }
                for (i = 0; i < board.onHand.G.length; i++) {
                    png = komaToPng(board.onHand.G[i]);
                    $('<img class="" alt=""/>')
                        .attr('src', board.filePathKoma + 'G' + png)
                        .attr('data-koma', png)
                        .appendTo(goteMochigoma);
                }
            };
        return {
            setupButtons : function () {
                $('<input type="button">')
                    .attr("class", "aButton")
                    .appendTo('.buttonBar')
                    .attr("value", "Forward for solution")
                    .each(function (i) {$(this)
                        .click(function () {
                            forwardOne(sBoard.kifuList[i], this);
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
                            .click(function () {stepBack(sBoard.kifuList[i], $(this)
                                .closest('.shogiBoard')
                                .find('.forSnapshot'), this); }
                                );
                            }
                            );

            },
            initializeBoards : function () {
                var i, l = sBoard.kifuList.length;
                for (i = 0; i < l; i++) {
                    initializeBoard(i);
                }
            }
        };
    }()); // end of Sshack object declaration. Sshack has two methods that is accessible from outside.
$(function () {
    sBoard.setupboard();
    SSHACK.initializeBoards();
    SSHACK.setupButtons();
});
