<?php

/**
 * Created by JetBrains PhpStorm.
 * User: 10032268
 * Date: 6/21/12
 * Time: 10:27 AM
 * To change this template use File | Settings | File Templates.
 */
require_once "assets/components/shBoard.php";

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

$b=array(
    "sBoard"=>$aBoard->setsBoardPath(),
    "sGrid"=>$aBoard->setsGridPath(),
    "onBoardImgs"=>$aBoard->setOnBoardImgs(),
    "gOnHandImgs"=>$aBoard->setGOnHandImgs(),
    "sOnHandImgs"=>$aBoard->setSOnHandImgs(),
    "komaPath"=>$aBoard->setKomaPath()
);


$output=$modx->getChunk('shogiBoardTpl',$b);
return $output;