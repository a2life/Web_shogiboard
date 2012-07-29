<?php
/**
 * Created by JetBrains PhpStorm.
 * User: 10032268
 * Date: 6/18/12
 * Time: 7:27 PM
 * To change this template use File | Settings | File Templates.
 */
$positions=explode(',',$position);
$output="";
$filepath="images/";
function cordToClass($str){
    $class='koma c'.substr($str,0,1) .' r'.substr($str,1,1);
 return $class;
}
function strToTag($str){
    $tag='<image class="';
    $tag .= cordToClass($str);
    $tag .= '"';
return $tag;

}

