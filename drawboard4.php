<?php
/**
 * Created by JetBrains PhpStorm.
 * User: 10032268
 * Update : 1/31/13 - added kifu class to directly read kifu file.
 * Date: 8/1/12
 * Time: 7:52 PM
 * start from drawboard3 and then add the part to insert boardmover javascript and boarddata javascript source
 * at the end
 * usage of this snippet
 * parameters
 * comment: comment for intial display
 * caption: caption for the shogiboard
 * sOnBoard: array of on board pieces for sente: default is initial set position
 * gOnBoard: array of on board pieces for gote: default is initial set position
 * sOnHand : array of on hand pieces for Sente: default is none;
 * gOnHand : array of on hand pieces for Gote: default is none;
 * filePathKoma: file path for koma images.: defaults is for kinki images
 * filePathBoard: file path for board image : default is for kaya
 * filePathGrid: file path for grid image: default is with x,y and dots.
 * moves : array of moves. If not specified then the board is static (no buttons)
 * type : only support "1" at this time. in this case, the board arrangement is for tsume shogi.
 * markerAt: usually blank.
 * noComment: hide comment section
 */
/* @var $modx modX */
require_once "assets/components/shogiboard/shBoard.php";
require_once "assets/components/shogiboard/kifu.php";


/*
 * Add CSS for shogiboard. these calls will register CSS files only once.
 */


$modx->regClientCSS("assets/components/shogiboard/css/shogiboard.css");
$modx->regClientCSS("assets/components/shogiboard/css/shogiboard-small.css");

if (isset($file)){ // todo does this work with modx resource content? if not parameter 'kifuID' or something is needed.
    $string = file_get_contents("assets/Resources/kifu/".$file);
    if (!mb_check_encoding($string, "UTF-8")) {

        $string = mb_convert_encoding($string, "UTF-8",
            "Shift-JIS, EUC-JP, JIS, SJIS, JIS-ms, eucJP-win, SJIS-win, ISO-2022-JP,
       ISO-2022-JP-MS, SJIS-mac, SJIS-Mobile#DOCOMO, SJIS-Mobile#KDDI,
       SJIS-Mobile#SOFTBANK, UTF-8-Mobile#DOCOMO, UTF-8-Mobile#KDDI-A,
       UTF-8-Mobile#KDDI-B, UTF-8-Mobile#SOFTBANK, ISO-2022-JP-MOBILE#KDDI");
    }

    $string= htmlspecialchars($string,ENT_QUOTES);

    $akifu = new kifu($string);
    if ($akifu->getMoves()) {$moves = $akifu->getMoves();}
    if ($akifu->getEndDate()){$endDate =$akifu->getEndDate();}
    if ($akifu->getStartDate()){$startDate =$akifu->getStartDate();}
    if ($akifu->getsOnBoard()){$sOnBoard =$akifu->getsOnBoard();}
    if ($akifu->getgOnBoard()){$gOnBoard =$akifu->getgOnBoard();}
    if ($akifu->getsOnHand()){$sOnHand =$akifu->getsOnhand();}
    if ($akifu->getgOnHand()){$gOnHand =$akifu->getsOnhand();}
    if ($akifu->getSenteName()){$sName =$akifu->getSenteName();}
    if ($akifu->getGoteName()){$gOnHand =$akifu->getGoteName();}
    if ($akifu->getTeai()){$teai =$akifu->getTeai();}

}
/*
 * If there is initial comment, then set it to placeholder
 */

if (isset($comment)){
    $initialComment=$comment;
} else $initialComment="";

if (isset($noComment)){
    if ($noComment=='1'){$displayComment="hide";}
}
/*
 * if caption is specified, then set it to placeholder
 */
if (isset($caption)){
    $captionBlock='<div class="caption">'.$caption.'</div>';
}else $captionBlock="";

/*
 * if $type is defined and is set to 1, then the board is used for Tsume shogi.
 * hide the goteMochigoma by use of placeholder for template .
*/
$hide="";
if (isset($type)){
    if ($type=="1"){$hide="hide";}
}
/*
 * if $moves exist,
 * add buttonBar section to the template.
 * then register necessary javascript files and string.
 * at the browser side, the Javascript will create buttons and attach to each board
 * regClientScript will register the file only once.
 */


if (isset($moves)) {
    if (!isset($smooth)){ $smooth = 0;}//default is no slide animation
//helper style which will be directly manipulated by animation script -left,top will be dynamic
    $src = <<<EOT
    <style type="text/css" id="positioner">
        .positioner {left: 290px; top: 212px; }
    </style>
EOT;

    $modx->regClientCSS($src);
    $buttonBarBlock='<div class="buttonBar"></div>';
    $modx->regClientScript("http://code.jquery.com/jquery-1.7.2.min.js");
    $modx->regClientScript("assets/components/shogiboard/js/jquery-ui-1.9.2.custom.min.js");
    $modx->regClientScript("assets/components/shogiboard/js/namespace.js");
    $modx->regClientScript("assets/components/shogiboard/js/boardfunction.js");
    $modx->regClientScript("assets/components/shogiboard/js/starter.js");
    $src=<<<EOT
    <script type="text/javascript">
SSHACK.board.kifuList.push({
moves:[$moves],index:0,history:[],smooth:$smooth});
</script>
EOT;
    $modx->regClientScript($src);
    $bbBox="";

} else {
    $buttonBarBlock="";
    $bbBox="hide";
}
/*
 * Put the relevant information for class library into array $a
 */
$a=array(
    "filePathKoma"=>$filePathKoma,
    "filePathGrid"=>$filePathGrid,
    "filePathBoard"=>$filePathBoard,
    "filePathFocus"=>$filePathFocus,
    "sOnBoard"=>$sOnBoard,
    "gOnBoard"=>$gOnBoard,
    "sOnHand"=>$sOnHand,
    "gOnHand"=>$gOnHand,
    "markerAt"=>$markerAt,
    "banImage"=>$banImage,
    "gridImage"=>$gridImage,
    "markerImage"=>$markerImage

);

$aBoard=new shBoard($a);
/*
 * create new object shBoard
 * and fill $b with needed info for template chunk,using shBoard object
 */
$b=array(
    "sBoard"=>$aBoard->setsBoardPath(),
    "sGrid"=>$aBoard->setsGridPath(),
    "onBoardImgs"=>$aBoard->setOnBoardImgs(),
    "gOnHandImgs"=>$aBoard->setGOnHandImgs(),
    "sOnHandImgs"=>$aBoard->setSOnHandImgs(),
    "komaPath"=>$aBoard->setKomaPath(),
    "buttonBarBlock"=>$buttonBarBlock,
    "captionBlock"=>$captionBlock,
    "initialComment"=>$initialComment,
    "hide"=>$hide,
    "displayComment"=>$displayComment,
    "bbBox"=>$bbBox
);


$output=$modx->getChunk('shogiBoardTpl',$b);


return $output;
