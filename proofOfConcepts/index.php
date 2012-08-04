<?php
/**
 * Created by JetBrains PhpStorm.
 * User: 10032268
 * Date: 6/21/12
 * Time: 10:27 AM
 * To change this template use File | Settings | File Templates.
 */
require_once "shBoard.php";
$filePathKoma="images/";
$filePathGrid="images/";
$filePathBoard="images";
$sOnBoard='32l,22p';
$gOnBoard='11l';
$sOnHand='g';
$gOnHand='';
$a=array(
    "filePathKoma"=>$filePathKoma,
    "filePathGrid"=>$filePathGrid,
    "filePathBoard"=>$filePathGrid,
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
    "sOnHandImgs"=>$aBoard->setSOnHandImgs()
);

var_dump($b);
/*
$output=$modx->getChunk('shogiBoardTpl',
    array(
        'sBoard'=>$sBoard,
        'sGrid'=>$sGrid,
        'onBoardImgs'=>$onBoardImgs,
        'gOnHandImgs'=>$gOnHandImgs,
        'sOnHandImgs'=>$sOnHandImgs
    ));
return $output;
*/