This is a readme file for shogiboard for javascript.  the files in this folder will work with html page
with Javascript and css style sheets only.  No server side scripting is required.
load file://sample.html from local storage for demo.

File Locations of CSS files and images for shogi pieces, board, marker are coded in "boarddata.js" and will work if the
whole repository is copied as it.  if those file locations need to be moved, modify boarddata.js accordingly.

It can now handle branch moves.

このフォルダーにはＰＨＰ抜きのソリューション（javascript, html css ファイルだけで動く、つまり、サーバーサイドの準備が不要）が入れてあります。
ＣＳＳとイメージファイルは別フォルダーにありますが、相対パスを通してあるので、repository を丸ごとダウンロードしていれば、
shogiboard.htmlをブラウザ表示するだけで動作するはずです。

ＣＳＳファイルと将棋のイメージファイルのパスはboarddata.jsにコーディングしてあるので、これらのファイルの位置を動かす場合は修正して使用してください。


本流ではないので、アップデートが遅れます。また、JavaScriptのＫＩＦＵパーサーもつくるかどうかはわかりません。
boarddata.js に入れてある棋譜はＰＨＰソリューションのパーサーで生成したものです。　これを手で入力するのは大変なので、実際の使い方
としては簡単な詰将棋とか、盤面の表示くらいに限定されると思います。



一応分岐にも対応してますが、表示内容の充実、盤面配置の調整などはこれからです。 ＣＳＳでの装飾などご自由にどうぞ。

