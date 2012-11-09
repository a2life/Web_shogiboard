<?php
/**
 * Created by JetBrains PhpStorm.
 * User: 10032268
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
 */

require_once "assets/components/shBoard.php";


/*
 * Add CSS for shogiboard. these calls will register CSS files only once.
 */

$modx->regClientCSS("index.php?id=37");
$modx->regClientCSS("index.php?id=47");

/*
 * If there is initial comment, then set it to placeholder
 */
if (isset($comment)){
    $initialComment=$comment;
} else $initialComment="";
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
    if ($type="1"){$hide="hide";}
}
/*
 * if $moves exist,
 * add buttonBar section to the template.
 * then register necessary javascript files and string.
 * at the browser side, the Javascript will create buttons and attach to each board
 * regClientScript will register the file only once.
 */


if (isset($moves)) {
    $buttonBarBlock='<div class="buttonBar"></div>';
    $modx->regClientScript("http://code.jquery.com/jquery-1.7.2.min.js");
    $modx->regClientScript("assets/components/boardmover.js");
    $src=<<<EOT
    <script type="text/javascript">
board.push({
moves:[$moves],index:0,history:[]});
</script>
EOT;
    $modx->regClientScript($src);

} else $buttonBarBlock="";
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
    "gOnHand"=>$gOnHand

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
    "hide"=>$hide
);


$output=$modx->getChunk('shogiBoardTpl',$b);


return $output;