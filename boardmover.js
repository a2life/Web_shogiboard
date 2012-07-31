/**
 * Created with JetBrains PhpStorm.
 * User: 10032268
 * Date: 6/25/12
 * Time: 3:01 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * issues identified
 * Board.pathname not defined in boarddata.js
 * data-koma not set up in PHP generated board.
 * Created with JetBrains WebStorm.
 * User: shared
 * Date: 6/3/12
 * Time: 10:51 PM
 * To change this template use File | Settings | File Templates.
 */
/*dynamically add buttons to sections with "buttunBar" class
 */
function setupButtons() {

    $('<input type="button">')
        .attr("class","aButton")
        .appendTo('.buttonBar')
        .attr("value","Forward for solution")
        .each(function(i){$(this)
            .click(function () {animateBoard(board[i],this)}
        )
        }
    );

    $('<input type="button">')
        .attr("class","cButton")
        .appendTo('.buttonBar')
        .attr("value","Step Back")
        .each(function(i){$(this)
            .click(function () {stepback(board[i],this);}
        )
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



function postComment(comment,target) {target.find('.comment').empty().append(comment);}
function emptyComment(i) {$('.comment').eq(i).empty();}
function cordToClass(cord){ return 'koma c'+cord.charAt(0)+' r'+cord.charAt(1);}
function cordToSelector(cord){return ('.koma.c'+cord.charAt(0)+'.r'+cord.charAt(1));}
function setMarker(cord){
    var markerClass;
    markerClass="marker c"+cord.charAt(0)+' r'+cord.charAt(1);
    $('#marker').attr("class",markerClass);
}
function makeAdrop(side,koma,position,target) {
    var png=side.toUpperCase()+komatopng(koma);
    if (side.toUpperCase()=='S') side='.senteMochigoma';
    else side='.goteMochigoma';
    setMarker(position);
    position=cordToClass(position);
    emptyComment(target);
    var selector=side+' [src$="'+png+'"]';
    $(selector).first().addClass(position).appendTo('.boardbase');
}
function captureKoma(side,cord,target){
    var komaban,koma;
    komaban=(side=='S')?'.senteMochigoma':'.goteMochigoma';
    koma=target.find(cordToSelector(cord)).data("koma");
    target.find(cordToSelector(cord)).first()
        .attr("class","").attr("src",board.pathname+side+koma)
        .appendTo(target.find(komaban));
}
function promoteKoma(side,cord,target) {
    var koma;

    koma = target.find(cordToSelector(cord)).data("koma");
    if (koma == "hi.png") {
        koma = "ryu.png";
    } else {
        if (koma == "kaku.png") {
            koma = "uma.png";
        } else {
            koma = 'n' + koma;
        }
    }
    target.find(cordToSelector(cord)).first().attr("src", board.pathname + side + koma);
}
function makeAmove(side,promote, from, to,target) {
    emptyComment(target);
    //if to position is already occupied, then capture that image element to 'side's mochigoma
    //for this we check the lenth of selector. ie, if $(".c6 .r7").length>0 then there is an element.
    if (target.find(cordToSelector(to)).length>0) captureKoma(side,to);
    // then set a marker to "to" position
    setMarker(to);
    // then move the piece, it just involves the changing of class
    target.find(cordToSelector(from)).attr('class', cordToClass(to));
    // then check if the piece is promoted by checking the variable promote
    if (promote=='+') {promoteKoma(side,to,target);}
}
function takeSnapshot(aBoard,target){
    aBoard.history[aBoard.index]=target.html();
    aBoard.index++;
}
function setBoardToHistory(aBoard,i,target){
    target.find('.aButton').removeAttr("disabled");
    target.empty().html(aBoard.history[i]);
}
function stepback(aBoard,target){
    if(aBoard.index>0)
        setBoardToHistory(aBoard,--aBoard.index,target);
}
function animateBoard(aBoard,self){
    /* aBoard point to an array element of Board[]
     *  self point to button entity
     *  target is ".forSnapshot" block that is ancestor of button that fires
     *
     */
    var target = $(self).closest('.forSnapshot');
    var zAction=aBoard.moves[aBoard.index];
    takeSnapshot(aBoard,target);
    parseAction(zAction,target);
    if (aBoard.moves[aBoard.index].charAt(0)=='x')  self.attr("disabled","disabled")
    ; //once reaches the end...

//after the move, if next line is a comment, then process it anyway.
}
function parseAction(aAction,target) {

    if (aAction.charAt(0) == '*') postComment(aAction.slice(1),target);
    else {
        if (aAction.charAt(1) == 'd') makeAdrop(aAction.charAt(0), aAction.charAt(4), aAction.substr(2, 2),target);
        else {
            makeAmove(aAction.charAt(0).toUpperCase(), aAction.charAt(1), aAction.substr(4, 2), aAction.substr(2, 2),target);

        }
        if(aAction.indexOf('*')>0){postComment(aAction.slice(aAction.indexOf('*')+1),target)}
    }

}

$(function () {
    setupButtons();
});
