<?php
/**
 * Created by JetBrains PhpStorm.
 * User: 10032268
 * Date: 6/20/12
 * Time: 12:45 PM
 * To change this template use File | Settings | File Templates.
 */

$output1="this is the first output";
$output2="This is the second output";
$a=array('ph1'=>$output1,'ph2'=>$output2);
$output=$modx->getChunk('testTemplate',$a);
return $output;