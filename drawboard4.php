<?php
/**
 * Created by JetBrains PhpStorm.
 * User: 10032268
 * Date: 8/1/12
 * Time: 7:52 PM
 * To change this template use File | Settings | File Templates.
 * start from drawboard3 and then add the part to insert boardmover javascript and boarddata javascript source
 * at the end
 */

require_once "assets/components/shBoard.php";


/*
 * if $moves exist, add javascript adding snippets in turn they will add buttons to the board
 * below code will register Javascript files and section. regClientScript will register the file only once.
 */

if (isset($moves)) {
    $modx->regClientScript("http://code.jquery.com/jquery-1.7.2.min.js");
    $modx->regClientScript("assets/components/boardmover.js");
    $src=<<<EOT
    <script type="text/javascript">
board.push({
moves:[$moves],index:0,history:[]});
</script>
EOT;
    $modx->regClientScript($src);

}

if(isset($moves)){
    $buttonBarBlock='<div class="buttonBar"></div>';
} else $buttonBarBlock="";
/*
 * Put the relevant information for class library into array $a
 */
$a=array(
    "filePathKoma"=>$filePathKoma,
    "filePathGrid"=>$filePathGrid,
    "filePathBoard"=>$filePathBoard,
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
    "buttonBarBlock"=>$buttonBarBlock
);


$output=$modx->getChunk('shogiBoardTpl',$b);


return $output;