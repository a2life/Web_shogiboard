/**
 * Created with JetBrains PhpStorm.
 * User: a2life
 * Date: 6/25/12
 * Time: 3:01 PM
 * To change this template use File | Settings | File Templates.
 */
/*
4/12/2013 - added tesuu handler
 2/12/2013
 Adding..
 - function branchForward()
 - function branchBarckward()

 */
/*jslint browser: true*/
/*global  $,  sBoard */
var SSHACK = SSHACK || {};
SSHACK.mover = function () { //this is one big object declaration with local variables and functions defined by executing a function call
    // and returning a object literals
    var notInAnimation = true, //private variable to indicate piece is not in animation. if false, button click wont start another move
        nextIsBranch = false,
        endOfMoves = false,
        rePattern = new RegExp('^[\\-\\+0-9a-z]+[J=](\\d+):(.*)'),
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
        emptyComment = function (target) {
            target.find('.comment').empty();
            target.find('.bbBox').empty();
        },
        cordToClass = function (cord) {
            return cord.replace(/(\d)(\d)/, 'koma c$1 r$2');
        }, //turn cordination info into .class info
        stepBack = function (aBoard, target) {
            var f, sniff, tesuu, tesuuPattern, rePattern = new RegExp("C:(\\d+).*"), branchSelect,
                backOneMove = function () {
                    target.closest(".shogiBoard").find('.forward').removeAttr("disabled");
                    target.empty().html(aBoard.history.pop());
                    if (aBoard.history.length === 0) {
                        target.closest('.shogiBoard').find('.backward').attr("disabled", "disabled");
                        nextIsBranch = true;
                    }
                };
            nextIsBranch = false;
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
                backOneMove();
                branchSelect = target.find('select');
                if (branchSelect.length === 1) {
                    branchSelect//attach event handlers to selectors if its a part of snapshot retrieved.
                        .mousedown(function(event){ event.stopPropagation();})
                        .change(function () {
                            aBoard.index = this.options[this.selectedIndex].value;
                        });
                    nextIsBranch = true;
                }

            }
        },
        setupBranches = function (aBoard, self) {//aBoard is board object, self is html element location. this routine is called if J is encounterd.
            var i = aBoard.index, options = [], htesuu = "", f = false,
                tesuu = Number(aBoard.moves[i].replace(rePattern, "$1")),
                mystery = aBoard.mysteryMoves,
                dlist = $('<select></select>'),
                str;
            options.push(i); //options is an array that hold index for branch moves.
            loop1:
                do {
                    i++;// now find C??string in the array.
                    do {
                        f = /C:/.test(aBoard.moves[i++]);
                        if (i >= aBoard.moves.length) {
                            break loop1;
                        }
                    } while (!f);
                    //from i, find henkatesuu using regex.
                    htesuu = +(aBoard.moves[i].replace(rePattern, "$1"));
                    // then if tesu == henkatesuu then push i to options array.
                    if (tesuu === htesuu) {
                        options.push(i);
                    }
                    // do this until end of array or henkatesu is less than tesuu
                } while ((htesuu >= tesuu));
            if (mystery) {
                str = "Select";
                $('<option></option>')
                    .attr("value", options[0])//if user does not select, it defaults to the first move
                    .text(str)
                    .appendTo(dlist);
            }
            for (i = 0; i < options.length; i++) { //stuff a dropdown list with alternative moves
                str = aBoard.moves[options[i]].replace(rePattern, "$2");
                str = str.split('*')[0]; // dont need comment part for the list.
                $('<option></option>')
                    .attr("value", options[i])
                    .text(str)
                    .appendTo(dlist);
            }

            $(self).closest('.shogiBoard').find('.bbBox').append(dlist);
            nextIsBranch = true;
            dlist
            .mousedown(function(event){ event.stopPropagation();})
            .change(function() {
                aBoard.index = this.options[this.selectedIndex].value;
            });

        },
        forwardOne = function (aBoard, self) {
            /* aBoard point to an array element of Board[]
             *  self point to button entity
             *  target is ".forSnapshot" block that is ancestor of button that fires
             *
             */

            if (notInAnimation) { // if the board is in animation mode, then skip this block = ignore button press.
                var parseAction = function (aAction, target) {
                        var to,
                            setMarker = function (cord, target) {
                                target.find('.marker').attr("class", cord.replace(/(\d)(\d)/, 'marker c$1 r$2'));
                            }, //marker class info
                            getMarkerCord = function (target) {
                                return target.find('.marker').attr("class").replace(/marker c(\d) r(\d)/, '$1$2');
                            },
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
                                // var e = elem[0], top = e.offsetTop, left = e.offsetLeft,
                                var e = elem.position(), top = e.top, left = e.left,
                                    width = elem.width(), height = elem.height(),
                                    positioner = $("#positioner"),
                                    smooth = (aBoard.smooth === 0 ? 0 : 400),
                                    positionString = '.positioner { position: absolute; left: ' + left + 'px; top: ' + top + 'px; height:' + height + 'px; width: ' + width + 'px;}';

                                notInAnimation = false;//set the namespace flag so the button click is ignored during animated move.

                                if ($.support.leadingWhitespace) {//IE 6~8 fails this test.
                                    positioner.empty().html(positionString);
                                } else {
                                    positioner.prop('styleSheet').cssText = positionString;
                                }


                                // inline style tag called "positioner" is already set up in the html header //
                                // use jQuery UI's .switchClass() to animate the move
                                // "onMove" class ensures the target elemenet have high value z-index
                                elem.attr('class', 'positioner onMove').switchClass("positioner", to, smooth, "",
                                    function () {
                                        if (promote === '+') {
                                            promote2Koma(elem, side);
                                        }//after moving the piece, check for promotion and take action if that is the case.
                                        elem.removeClass("onMove");
                                        notInAnimation = true; //after moving the piece, call back and set the flag to accept another button click
                                    });
                            },
                            makeAmove = function (side, promote, from, to, target) {
                                var cordToSelector = function (cord) {
                                        return cord.replace(/(\d)(\d)/, '.koma.c$1.r$2');
                                    }, //turn .class info into css selector
                                    captureKoma = function () {
                                        var komaban, koma, komapath;
                                        komapath = target.data("komapath");
                                        //komapath = '../images/shogiboard/koma/pieces_kinki/';
                                        komaban = (side === 'S') ? '.senteMochigoma' : '.goteMochigoma';
                                        koma = target.find(cordToSelector(to)).data("koma");
                                        target.find(cordToSelector(to)).first()
                                            .attr("class", "").attr("src", komapath + side + koma)
                                            .appendTo(target.find(komaban));
                                    };
                                emptyComment(target);
                                //if to position is already occupied, then capture that image element to 'side's mochigoma
                                //for this we check the lenth of the targeted selector. ie, if $(".c6 .r7").length>0 then there is an element.
                                if (from !== to) {  //if from and to is the same, this is not capturing move
                                    if (target.find(cordToSelector(to)).length > 0) { //otherwise check if capture is required
                                        captureKoma();
                                    }
                                }
                                // then set a marker to "to" position
                                setMarker(to, target);
                                // then move the piece, it just involves the changing of class
                                animateMove(target.find(cordToSelector(from)), cordToClass(to), promote, side);
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
                            postComment = function (comment, target) {
                                target.find('.comment').empty().append(comment);
                            },
                            updateStatusDisplay = function () {
                                if (rePattern.test(aAction)) {
                                    target.find(".statusLine")
                                        .html(aAction.replace(rePattern, "$1") + ". "
                                            + (aAction.charAt(0) === "s" ? "▲" : "△")
                                            + aAction.replace(rePattern, "$2").split('*')[0]);
                                }
                            };
                        if (aAction.charAt(0) === '*') {
                            postComment(aAction.slice(1), target);
                        } else {
                            to = aAction.substr(2, 2);
                            if (to === "00") {
                                to = getMarkerCord(target);
                            }//if 00 cordinate, then take to cordinate is marker position
                            if (aAction.charAt(1) === 'd') {
                                dropKoma(aAction.charAt(0), aAction.charAt(4), to, target);
                            } else {
                                makeAmove(aAction.charAt(0).toUpperCase(), aAction.charAt(1), aAction.substr(4, 2), to, target);
                            }
                            if (aAction.indexOf('*') > 0) {
                                postComment(aAction.slice(aAction.indexOf('*') + 1), target);
                            }
                        }
                        updateStatusDisplay();
                    },
                    target = $(self).closest('.shogiBoard')//scan up from button element to class shogiboard
                        .find('.forSnapshot'),
                    zAction = aBoard.moves[aBoard.index],
                    takeSnapshot = function (aBoard, target) {
                        aBoard.history = aBoard.history || []; //if the array does not exisist, then create one
                        aBoard.history.push(target.html());
                        target.closest(".shogiBoard").find('.backward').removeAttr("disabled");
                    };
                takeSnapshot(aBoard, target);
                ++aBoard.index;
                parseAction(zAction, target);
                //   if (aBoard.moves[aBoard.index].charAt(0)=='x') // more sophsticated code below to do the same and more.
                if (/(^[\-a-zA-Z0-9]*[xXC])/.test(aBoard.moves[aBoard.index])) {
                    $(self).closest('.shogiBoard').find('.forward').attr("disabled", "disabled"); //forward move can be initiated either from button or board click
                    nextIsBranch = true;
                    endOfMoves = true;
                } else if (/[\-\+0-9pPlLnNsSgrRbBk]{5,}J/.test(aBoard.moves[aBoard.index])) {
                    setupBranches(aBoard, self);
                    nextIsBranch = true;
                    endOfMoves = false;
                } else {
                    nextIsBranch = false;
                    endOfMoves = false;
                }
            }
        },
        branchForward = function (aBoard, self) {
            var tempSmooth;
            tempSmooth = aBoard.smooth;
            aBoard.smooth = 0;
            do {
                forwardOne(aBoard, self);
            } while (nextIsBranch === false);
            aBoard.smooth = tempSmooth;
        },
        branchBackward = function (aBoard, self) {
            var tempSmooth = aBoard.smooth, target = $(self).closest('.shogiBoard').find('.forSnapshot');
            aBoard.smooth = 0;

            do {

                stepBack(aBoard, target);
            } while (nextIsBranch === false);
            aBoard.smooth = tempSmooth;
        },
        fastForward = function (aBoard, self) {
            var tempSmooth;
            tempSmooth = aBoard.smooth;
            aBoard.smooth = 0;
            do {
                forwardOne(aBoard, self);
            } while (endOfMoves === false);
            aBoard.smooth = tempSmooth;
        },
        resetBoard = function (aBoard, self) {
            var bTarget = $(self).closest(".buttonBar"),
                target = $(self).closest(".shogiBoard"),
                branchSelect;
            bTarget.find('.forward').removeAttr("disabled");
            target.find(".forSnapshot").empty().html(aBoard.history[0]);
            aBoard.history = [];
            aBoard.index = 0;
            bTarget.find('.backward').attr("disabled", "disabled");
            branchSelect = target.find('select');
            if (branchSelect.length === 1) {
                branchSelect//attach event handler to selectors if its a part of snapshot retrieved.
                    .change(function () {
                        aBoard.index = this.options[this.selectedIndex].value;
                    });
                nextIsBranch = true;
            } else {
                nextIsBranch = false;
            }
            endOfMoves = false;
        },
        setBoardtoTesuu = function (aBoard, self) {
            var tesuu = aBoard.tesuu, tempSmooth, moveString;
            if (tesuu > 0) {
                moveString = aBoard.moves[aBoard.index];
                tempSmooth=aBoard.smooth;
                aBoard.smooth=0;
                while (/^\*/.test(moveString) || tesuu >= moveString.replace(rePattern, "$1")) {
                    forwardOne(aBoard, self);
                    moveString = aBoard.moves[aBoard.index];
                }
                aBoard.smooth=tempSmooth;
            }
},
        initializeBoard = function (j) { //i is a index to board data in boards array, as well as index to selected elem.
//called from initializeBoards, iterate through the number of array element in boards[];
            //in PHP/modx implementation, this function is not used.
            var i, cord, png, kpng, board = SSHACK.board.kifuList[j], target = $(".shogiBoard")[j],
                boardbase = $(target).find('.boardbase'), senteMochigoma = $(target).find('.senteMochigoma'),
                goteMochigoma = $(target).find('goteMochigoma');

            //attach board marker to the boardbase. initially it is out of site

            $('<img class="marker" id="marker" alt=""/>')
                .addClass(board.markerAt)
                .attr('src', board.filePathFocus + board.markerImage)
                .appendTo(boardbase);

            /*  for (var index in board.Positions) {$('<img class="koma" alt=""/>')
             .addClass(index).attr('src', pathname + board.Positions[index] + '.png').appendTo('#boardbase')};
             */
//create image elements with appropriate image and class information attached. also attach koma property with jquery.data()
            for (i = 0; i < board.onBoard.S.length; i++) {

                png = komaToPng(board.onBoard.S[i].charAt(2));
                kpng = komaToPng((board.onBoard.S[i].charAt(2)).toLowerCase());
                cord = board.onBoard.S[i].substr(0, 2);

                $('<img alt="" src = "' + board.filePathKoma + 'S' + png + '" />')
                    .addClass(cordToClass(cord))
                    .attr('src', board.filePathKoma + 'S' + png)
                    .attr('data-koma', kpng).appendTo(boardbase);
            }
            for (i = 0; i < board.onBoard.G.length; i++) {
                png = komaToPng(board.onBoard.G[i].charAt(2));
                kpng = komaToPng(board.onBoard.G[i].charAt(2).toLowerCase());
                cord = board.onBoard.G[i].substr(0, 2);

                $('<img  src = "' + board.filePathKoma + 'G' + png + '" alt=""/>')
                    .addClass(cordToClass(cord))
                    .attr('data-koma', kpng).appendTo(boardbase);
            }
            for (i = 0; i < board.onHand.S.length; i++) {
                png = komaToPng(board.onHand.S[i]);
                $('<img class="" src = "' + board.filePathKoma + 'S' + png + '" alt=""/>')
                    .attr('src', board.filePathKoma + 'S' + png)
                    .attr('data-koma', png)
                    .appendTo(senteMochigoma);
            }
            for (i = 0; i < board.onHand.G.length; i++) {
                png = komaToPng(board.onHand.G[i]);
                $('<img class="" src ="' + board.filePathKoma + 'G' + png + '" alt=""/>')
                    .attr('data-koma', png)
                    .appendTo(goteMochigoma);
            }

        };
    return {
        prepAnimation: function () {
            var target = SSHACK.board.kifuList, i, bigString, bList = [],
                targetButtons,
                testPattern = new RegExp("[\\-\\+0-9pPlLnNsSgrRbBk]{5,}J");
            $('<input type="button" class="aButton forward" />')
                .appendTo('.buttonBar')
                .attr("value", "▶ ")
                .attr("title", "Forward for solution")
                .each(function (i) {
                    $(this)
                        .click(function () {
                            forwardOne(target[i], this);
                        }
                    );
                }
            );

            $('<input type="button" class="cButton backward"/>')
                .prependTo('.buttonBar')
                .attr("value", "◀")
                .attr("title", "Step Back")
                .attr("disabled", "disabled")
                .each(function (i) {
                    $(this)
                        .click(function () {
                            stepBack(target[i], $(this)
                                .closest('.shogiBoard')
                                .find('.forSnapshot'));
                        }
                    );
                }
            );
//   I also need to read the first line for possible branch. if (/[\-\+0-9pPlLnNsSgrRbB]+J/.test(board.moves[0])) {setupBranches(boardlist.move[0],this); }
            for (i = 0; i < target.length; i++) { //adding branch forward and back buttons
                if (testPattern.test(target[i].moves[target[i].index])) {
                    setupBranches(target[i], $('.aButton')[i]);
                }
                bigString = target[i].moves.join(",");
                if (testPattern.test(bigString)) {
                    bList.push(i);

                    $('<input type="button" class= "sfButton forward"/>')
                        .appendTo('.buttonBar:eq(' + i + ')')
                        .attr("value", "▷")
                        .attr("title", "Next Branch Point");

                    $('<input type="button" class ="sbButton backward"/>')
                        .prependTo('.buttonBar:eq(' + i + ')')
                        .attr("value", "◁")
                        .attr("title", "Previous Branch Point")
                        .attr("disabled", "disabled");
                }
            }
            targetButtons = $('.sfButton');
            if (targetButtons.length !== 0) {
                targetButtons.each(function (i) {
                    $(this)
                        .click(function () {
                            branchForward(target[bList[i]], this);
                        });
                });
            }
            targetButtons = $('.sbButton');
            if (targetButtons.length !== 0) {
                targetButtons.each(function (i) {
                    $(this)
                        .click(function () {
                            branchBackward(target[bList[i]], this);
                        });
                });
            }
            $('<input type="button" class="ffButton forward" />')
                .appendTo('.buttonBar')
                .attr("value", "▶▶")
                .attr("title", "Fastforward to the End")
                .each(function (i) {
                    $(this)
                        .click(function () {
                            fastForward(target[i], this);
                        }
                    );
                }
            );
            $('<input type="button" class="rrButton backward" />')
                .prependTo('.buttonBar')
                .attr("value", "◀◀")
                .attr("title", "Reset to the Start")
                .attr("disabled", "disabled")
                .each(function (i) {
                    $(this)
                        .click(function () {
                            resetBoard(target[i], this);
                        }
                    );
                }
            );
            //attache the event handler for board click. left click is to push forward button and right push is to go back
            //but first, disable context menu from right click
     $('.clickable').bind("contextmenu", function() {return false; });
            // only interested in the board with .buttonbar section = buttons exists.
            //html div ".clickable" is right before ".buttonBar"
         $('.buttonBar').prev('.clickable')
                .each(function(i) {
                    $(this).mousedown(function(event){
                        event.stopPropagation();
                        switch (event.which){
                            case 1:if ($(this).closest('.shogiBoard').find('.aButton').attr("disabled")!='disabled') forwardOne(target[i],this); break;
                            case 3: stepBack(target[i], $(this).find('.forSnapshot')); break;
                            default:
                        }
                        return false;
                    })
                });


         /* if tesuu is specified, the next call will take care of that */
            for (i = 0; i < target.length; i++) {
                setBoardtoTesuu(target[i], $('.forSnapshot').eq(i));
            }

        },
        initializeBoards: function () { //this only used for javascript only solution.
            var i, l = SSHACK.board.kifuList.length;
            for (i = 0; i < l; i++) {
                initializeBoard(i);
            }
        }
    };
}(); // end of Sshack.mover object declaration. SSHACK has two methods {prepAnimation, initializeBoard} that is accessible from outside.
