This is a readme file for shogiboard system.
This setup works with modx content management framework (the code is PHP and Javascript mix.
However, PHP code uses MODX tags and APIs.

MOdx snippet tag call example
[[!drawboard? &parameter....]]
parameters:
sOnHand :'s,s'
gOnHand :``
sOnBoard: `53s,15b`
gOnBoard: `41s,51k,61s`
markerAt:if blank, no initial focus
type=`1` :  if set to 1, board is for tsume shogi
noComment: if set to 1, then there will be no comment shown.
moves=`s+5215,g-5241,sd42s*3 move tsume`

format
Each pieces are represented in the following format
"p"=>"歩","P"=>"と",'L'=>"成香","l"=>"香",
'N'=>'成桂','n'=>'桂','S'=>'成銀','s'=>'銀',
'r'=>'飛',"R"=>"[竜龍]","b"=>"角","B"=>"馬",
"k"=>"玉","g"=>"金", ,"d"=>"打","+"=>"成"
*comment
Coordinate is in arabic, 11,99 etc.,



to do:

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

add type to handle handycap board, (or this can be set up as @property)

mixed size in the same page => need to change class name in the template chunk.