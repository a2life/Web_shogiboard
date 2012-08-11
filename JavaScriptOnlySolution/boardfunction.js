/**
 * Created with JetBrains PhpStorm.
 * User: 10032268
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
function setupButton() {
    $('<input type="button">')
        .attr("id","aButton")
        .click(function () {animateBoard()})
        .attr("value","Forward for solution")
        .appendTo('#buttonBar');
    $("#bButton").click(function() {reloadpage()}).attr("value","Reset board");
    $("#cButton").click(function() {stepback()}).attr('value','Step back');

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
function reloadpage(){window.location.reload();}


function postComment(comment) {$('#scomment').empty().append(comment);}
function emptyComment() {$('#scomment').empty();}
function cordToClass(cord){ return 'koma c'+cord.charAt(0)+' r'+cord.charAt(1);}
function cordToSelector(cord){return ('.koma.c'+cord.charAt(0)+'.r'+cord.charAt(1));}
function setMarker(cord){
    var markerClass;
    markerClass="marker c"+cord.charAt(0)+' r'+cord.charAt(1);
    $('#marker').attr("class",markerClass);
}
function makeAdrop(side,koma,position) {
    var png=side.toUpperCase()+komatopng(koma);
    if (side.toUpperCase()=='S') side='#senteMochigoma';
    else side='#goteMochigoma';
    setMarker(position);
    position=cordToClass(position);
    emptyComment();
    var selector=side+' [src$="'+png+'"]';
    $(selector).first().addClass(position).appendTo('#boardbase');
}
function captureKoma(side,cord){
    var komaban,koma;
    komaban=(side=='S')?'#senteMochigoma':'#goteMochigoma';
    koma=$(cordToSelector(cord)).data("koma");
    $(cordToSelector(cord)).first().attr("class","").attr("src",board.pathname+side+koma).appendTo(komaban);
}
function promoteKoma(side,cord) {
  var koma;

    koma = $(cordToSelector(cord)).data("koma");
    koma = (koma == "hi.png") ? "ryu.png" : koma = (koma == "kaku.png") ? "uma.png" : 'n' + koma;
    $(cordToSelector(cord)).first().attr("src", board.pathname + side + koma);

}
function makeAmove(side,promote, from, to) {
    emptyComment();
    //if to position is already occupied, then capture that image element to 'side's mochigoma
    //for this we check the lenth of selector. ie, if $(".c6 .r7").length>0 then there is an element.
    if ($(cordToSelector(to)).length>0) captureKoma(side,to);
    // then set a marker to "to" position
    setMarker(to);
    // then move the piece, it just involves the changing of class
    $(cordToSelector(from)).attr('class', cordToClass(to));
    // then check if the piece is promoted by checking the variable promote
    if (promote=='+') {promoteKoma(side,to);}
}
function takeSnapshot(i){
    board.history[i]=$('.forSnapshot').html();
}
function setBoardToHistory(i){
    $('#aButton').removeAttr("disabled");
    $('.forSnapshot').empty().html(board.history[i]);
}
function stepback(){
    if(board.index>0)
        setBoardToHistory(--board.index);
}
function animateBoard(){
    var zAction=board.moves[board.index];
    takeSnapshot(board.index);
    parseAction(zAction);
    board.index+=1;
    if (board.moves[board.index].charAt(0)=='x')  $('#aButton').attr("disabled","disabled")
    ; //once reaches the end...

//after the move, if next line is a comment, then process it anyway.
}
function parseAction(aAction) {

    if (aAction.charAt(0) == '*') postComment(aAction.slice(1));
    else {
        if (aAction.charAt(1) == 'd') makeAdrop(aAction.charAt(0), aAction.charAt(4), aAction.substr(2, 2));
        else {
            makeAmove(aAction.charAt(0).toUpperCase(), aAction.charAt(1), aAction.substr(4, 2), aAction.substr(2, 2));

        }
        if(aAction.indexOf('*')>0){postComment(aAction.slice(aAction.indexOf('*')+1))}
    }

}
function initializeBoard() {
    var i,cord,png,kpng;


    //attach board marker to the boardbase. initially it is out of site
    $('<img class="marker" id="marker" alt=""/>')
        .addClass(board.marker).attr('src', board.pathname  + board.markerColor + '.png').appendTo('#boardbase');

    /*  for (var index in board.Positions) {$('<img class="koma" alt=""/>')
     .addClass(index).attr('src', pathname + board.Positions[index] + '.png').appendTo('#boardbase')};
     */
//create image elements with appropriate image and class information attached. also attach koma property with jquery.data()
    for (i=0; i<board.onBoard.S.length; i++){

        png=komatopng(board.onBoard.S[i].charAt(2));
        kpng=komatopng(board.tolowerCase(onBoard.S[i].charAt(2)));
        cord=board.onBoard.S[i].substr(0,2);

        $('<img alt=""/>')
            .addClass(cordToClass(cord)).attr('src',board.pathname+'S'+png).attr('data-koma',kpng).appendTo('#boardbase');
    }
    for (i=0; i<board.onBoard.G.length; i++){

        png=komatopng(board.onBoard.G[i].charAt(2));
        kpng=komatopng(board.tolowerCase(onBoard.S[i].charAt(2)));
        cord=board.onBoard.G[i].substr(0,2);

        $('<img alt=""/>')
            .addClass(cordToClass(cord)).attr('src',board.pathname+'G'+png).attr('data-koma',kpng).appendTo('#boardbase');
    }

    for (i = 0; i < board.onHand.S.length; i++) {
        png=komatopng(board.onHand.S[i]);
        $('<img class="" alt=""/>')
            .attr('src', board.pathname+'S' + png ).attr('data-koma',png).appendTo('#senteMochigoma');
    }

    for (i = 0; i < board.onHand.G.length; i++) {
        png=komatopng(board.onHand.G[i]);
        $('<img class="" alt=""/>')
            .attr('src', board.pathname + 'G' + png).attr('data-koma',png).appendTo('#goteMochigoma');
    }

}
$(function () {
    initializeBoard();
    setupButton();

});
