This is a readme file for shogiboard for javascript.  the files in this folder will work with html page
with Javascript and css style sheets only.  No server side scripting is required.
load file://sample.html from local storage for demo.

File Locations of CSS files and images for shogi pieces, board, marker are coded in "boarddata.js" and will work if the
whole repository is copied as it.  if those file locations need to be moved, modify boarddata.js accordingly.

It can now handle branch moves.

のフォルダーにはＰＨＰ抜きのソリューション（javascript, html css ファイルだけで動く、つまり、サーバーサイドの準備が不要）
が入れてあります。
CSSとイメージファイルは別フォルダーにありますが、相対パスを通してあるので、repository を丸ごとダウンロードしていれば、
sample.htmlをブラウザ表示するだけで動作するはずです。

CSSファイルと将棋のイメージファイルのパスはboarddata.js内にハードコーディングしてあるので、
これらのファイルの位置を動かす場合は修正して使用してください。


サーバーなしで、ブラウザに表示させるのみでのデモ用です。本流ではないので、とりあえず動くもの、と考えてください。
PHP/MODX solution と同じJavaScript コード　で動いてはおりますが、細かい表示パラメーターを生のJSデータで入れ込むのは
プログラムがわかっていないと無理です。(PHP/MODXでは、棋譜ファイルを指定できる）
また、kakinoki 準拠の棋譜パーサーはPHP・MODXのソリューションではサーバー側で行っております。　
JavaScriptのkifパーサは作る計画はありません。　このフォルダーのboarddata.js に入れてある棋譜はPHP/MODXソリューションの
パーサーで生成したものです。boarddata.jsを見てもらえばわかりますが、長い棋譜情報をを手で入力するのは大変なので、
実際の使い方としては簡単な詰将棋とか、盤面の表示くらいに限定されると思います。


一応分岐にも対応してます、盤面配置の調整などはCSS とboardsetup.js と CSSのチューニングだけでできますのでご自由にどうぞ。

