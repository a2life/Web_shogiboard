This is a readme file for shogiboard system.
The program reads data input(s) and render shogiboard(s) and mimic piece moves.
This was primarily conceived to be used on my shogi learning site to show various moves and explain shogi plays.

The program works on MODX Revolution CMS.  the coding is in PHP and javascript.  PHP utilizes several MODX APIs and
utilities available through its manager screen. (see JavaScriptOnlySolutin folder for non MODX and non PHP implementation)

The program can be invoked from MODX environment by tag syntax [[]!drawboard4 ? &parameter ...] on content pages.

 If no parameters are specified, then initial board setup (no handycap or Hirate) will be rendered.
 If "moves" parameter is specified, then it will also add two buttons (for now) on the page to move pieces one move forward and
  one move backward  according to "moves" data.
 Initial board setup is totally configurable via following parameters
  sOnHand, gOnHand, sOnBoard,gOnBoard

Multiple rendering of the board on the same page is possible by calling the program repeatedly.

call by
[[!drawboard? &parameter....]]
parameters:
sOnHand :
gOnHand :
sOnBoard:
gOnBoard:
markerAt:
type :  if set to 1, board is for tsume shogi and default onHand data will not load


Shogiboard layout is all in html and css.
the general structural idea is

.shogiBoard - .forSnapshot -- .boardBase (all piece images on board will go here)
             |              |
             |              |-.senteMochigoma (all pieces that sente player has go here)
             |              |
             |              |-.goteMochigoma (all pieces that gote player has go there)
             |-.buttonBar

therefore, to change the shogiboard layout, modify the html (sboardTpl.html) and CSSs.
my apologies for using inconsistent camel string.

Plaecement of shogi piece on the board is managed by class atributes of html <img> tag.
for instance  to place Sente's king on the 55 location, the following image tag is created and inserted to .boardBase div
by the program.
<img src="[PathToKoma]/sou.png"  class="koma c5 r5" alt="" />
 .c5 and r5 place a piece to relevant location (column 5, row 5) according to css definition.
to move the piece from 55 to 44, the program will manupulate the class so that the tag will be now
<img src="[PathToKoma]/sou.png"  class="koma c4 r4" alt="" />
the browser will reposition the piece and it gives the illusion that the piece has "moved"


buttonBar block is dynamically created if "moves" exists. It need to be outside of "forSnapshot" Div,
This is because the "forSnapShot" content copy is created every t time the move is made.
and this array of snapshot images will be used when user click "stepback" butoon.
If buttons are also copied over, then it will lose function binding and lose its functionality after the first stepback.
Therefore, if the buttons need to be visually inside of "snapshot" area, then CSS will need to be customized to position
buttonBar block out of html document flow.

move does not need to alternate between hands. Usually the notation goes like

s-xxxx,g-xxxx,s-xxxx,g-xxxx
but
s-xxxx,s-xxxx,s-xxxx,g-xxxx
is allowed. it will be handy for teaching purpose.


add &size parameter : `small`, `smaller` etc.,
innn:  i000= go back to the first 局面 and forget the move onward.
innn*comment : go back to step nnn and replace comment with "comment" if blank, then blank out the

I : capital I to re-initialize 局面 with new sOnHand, gOnHand etc.,=> This requires initialization
with JavaScript, or maybe AJAX.-- for now, I will simply load a new page.
See below
jQuery.getScript( url [, success(script, textStatus, jqXHR)] )
url A string containing the URL to which the request is sent.
success(script, textStatus, jqXHR) A callback function that is executed if the request succeeds.

this is a shorthand for
$.ajax({
  url: url,
  dataType: "script",
  success: success
});

add type to handle handycap board, (or this can be set up thru MODX @property)

mixed size in the same page => need to change class name in the template chunk.


