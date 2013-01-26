This is a readme file for shogiboard system.
The program reads data input(s) and render shogiboard(s) and mimic piece moves.
This was primarily conceived to be used on my shogi learning site to show various moves and explain shogi plays.

The program works on MODX Revolution CMS.  the coding is in PHP and javascript.  PHP utilizes several MODX APIs and
utilities available through its manager screen. 

(JavaScriptOnlySolutin contains demo.html  and other helper js files to render this board without a need of modx nor PHP. Current solution is fairly comparable with modx/PHP solution but it is not guaranteed if the same hold true in the future. )

In modx environment, the program can be invoked by a tag syntax on content page like so.

[[]!drawboard4 ? parameters]

 parameters grammer follows modx rule. ie.,  &parameter1=`foo1` &parameter2=`foo2` etc.,

If no parameters are specified, then initial board setup (no handycap or Hirate) will be rendered.
If "moves" parameter is specified, then it will also add two buttons (for now) on the page to move pieces one move forward and one move backwards  according to "moves" data.
Initial board setup is totally configurable via following parameters
  sOnHand, gOnHand, sOnBoard,gOnBoard

Multiple rendering of the board on the same page is possible by calling the program repeatedly.

call by
[[!drawboard4? &parameter....]]
type :  if set to 1, board is for tsume shogi and default onHand data will not load
smooth : if set to 1, piece move is a sliding move.parameters:
sOnHand : string indicating on hand pieces for sente. default is none. ex. "l,l,p" (see below)
gOnHand : string indicating on hand pieces for gote. default is none ex. "l,l,p" (see below)
sOnBoard: string indicating on board pieces for sente. default is initial setup for sente for no handicap game. ex. "11l,21n,31s,41g,51k,13p,22b"
gOnBoard: string indicating on board pieces for sente. default is initial setup for gote for no handicap game. ex. "99l,28r"
markerAt: string Indicating the grid that is highlighted. default is "out of the way", ex., "24" for position ２四


Shogiboard layout is all in html and css.
the general structural idea is

.shogiBoard - .forSnapshot -- .boardBase (all piece images on board will go here)
             |              |
             |              |-.senteMochigoma (all pieces that sente player has go here)
             |              |
             |              |-.goteMochigoma (all pieces that gote player has go there)
             |-.buttonBar

therefore, to change the shogiboard layout, modify the html (sboardTpl.html) and CSSs.
my apologies for using inconsistent camel strings.

Plaecement of shogi piece on the board is managed by class atributes of html <img> tag.
for instance  to place Sente's king on the 55 location, the following image tag is created and inserted to .boardBase div
by the program.
<img src="[PathToKoma]/sou.png"  class="koma c5 r5" alt="" />
 .c5 and r5 place a piece to relevant location (column 5, row 5) according to css definition.
to move the piece from 55 to 44, the program will manupulate the class so that the tag will be now
<img src="[PathToKoma]/sou.png"  class="koma c4 r4" alt="" />
the browser will reposition the piece and it gives the illusion that the piece has "moved"


buttonBar block is dynamically created if "moves" exists. It is outside of "forSnapshot" Div document flow and positioned
independently.
This is because the "forSnapShot" content copy is created every time the move is made.
and this array of snapshot images will be used when user click "stepback" butoon.
If buttons are also copied over, then it will lose function binding and lose its functionality after the first stepback.


move does not need to alternate between hands. Usually the notation goes like below.
s-xxxx,g-xxxx,s-xxxx,g-xxxx
but
s-xxxx,s-xxxx,s-xxxx,g-xxxx
is allowed. it will be handy for teaching purpose.

Branching is supported. Branch moves will be shown in front of button bar if the selections are available.

Piece represntation 
l : lance
L : lance promoted
n : Knight
N : Knight promoted
s : silver
S : silver promoted
r : Rook
R : Rook promoted
b : Bishop
B : Bishop promoted
k : King

Move notation

Anything after '*' is considered as a comment and will be displayed in comment window.
kifstr is 5 or 6 character string.
first character  ; Either s or g to notate the Side   s = sente(black) and g = gote (white) Note in shogi, the black moves first
second character :  '-' to indicate normal move, '+' to indicate promotion, 'd'  to indicate drop
third and fourth chars:  'move to" coordinate.  34 means 3d, 22 means 2b etc.,
fith and six column : 'move from' coordinate for '-' and '+'. in case of 'd' then only fifthcolumn will be used as piece indicator

example of move
"s-7677",  : white move a piece from 77 to 76
"g-3433",  : black moves a piece from 33 to 34
"sd55g",   : black drops a gold to 5e.
"g-3534*do you think this is cool?", : white moves a piece from 34 to 35. Comment windows displays"do you think this is cool?"
s+2228  : piece at the 28 position is moved to 22 and then get promoted.
"x"   : end of moves indicator

"x" by itself is a special character and denote end of moves.

Branch is supported in the following way

"kifst=1",  //fisrt move 1
"kifstr=2",// move 2
"kifstrJ3",// move 3 etc.,
"kifstrJ4:labelA1", // move 4. move 4 has branch. label should be assigned to the line to indicate its play.(ie., ３七銀etc.,
"kifstr=5:labelB1", // move 5
"x",
"C:4", // indicates branch move at 4th move.
"kifstr=4:labelB2", // and labelB2 is stuffed int the selectin list.
"kifstr=5",
"x",
"C:3",
"kifstr=3:LabelA2",
"kifstr=4",
"kifstr=5",
"kifstr=6",
"kifstr=7",
"x"

In the above example, when move reaches the third move (J3), list box will be created and the user is presented with a choice with
labelA1 and Label A2. If he choses label A1, then make a move, the user will then presented with the list box with choise of
LabelB1 and Label B2. 
This is difficult to manually write all this. most likely scenario is to use Kifu file parser to convert the kif file to the
above format.


[wish list]
add &size parameter : `small`, `smaller` etc., currently it is fixed to "small" size.
Add Kifu parser so that the snippet can directly read the Kifu file resources.

Create "modx" transport package to make modx installation as one button click, rather than copying over many files manually.

mixed size in the same page => need to change class name in the template chunk.


