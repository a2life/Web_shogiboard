This is a readme file for shogiboard system.
This setup works with modx CMS

call by
[[!drawboard? &parameter....]]
parameters:
sOnHand :
gOnHand :
sOnBoard:
gOnBoard:
markerAt:
type :  if set to 1, board is for tsume shogi

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