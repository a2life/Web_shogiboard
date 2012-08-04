<?php
/**
 * Created by JetBrains PhpStorm.
 * User: 10032268
 * Date: 6/18/12
 * Time: 8:37 PM
 * To change this template use File | Settings | File Templates.
 */


function komatopng($koma) {


    switch ($koma){ //convert piece information to image filename information.
        case 'p':$png='fu.png';break;
        case 'P':$png='to.png';break;
        case 'l':$png='kyo.png';break;
        case 'L':$png='nkyo.png';break;
        case 'n': $png='kei.png';break;
        case 'N': $png='nkei.png';break;
        case 's': $png='gin.png';break;
        case 'S': $png='ngin.png';break;
        case 'g': $png='kin.png';break;
        case 'b': $png='kaku.png';break;
        case 'B': $png='uma.png';break;
        case 'r': $png='hi.png';break;
        case 'R': $png='ryu.png';break;
        case 'k': $png='ou.png';break;
        default: $png='error.png';
    }
    return $png;

}
function makeImageTag($class,$pngimg){
    return "<img src=$pngimg class=\"$class\" alt=''>";
}

function cordToClass($cord){
    $output='koma c';
    $output.=substr($cord,0,1);
    $output.=' r';
    $output.=substr($cord,1,1);
    return $output;
}

function getImageTag($str,$side,$fpk){
    $class=cordToClass($str);
    $pngimg=$fpk;
    $pngimg.=$side;
    $komatopng=komatopng(substr($str,2,1));
    $pngimg.=$komatopng;
    return makeImageTag($class,$pngimg);
}

$output= <<<BOARD
<div class="forSnapshot">
  
 <div class="table" > <!-- outer table -->
  <div class="row">
   <div id="boardbase" class="cell">
  <img class="board" src="$filePathBoard/ban_kaya_a.png"  alt=""/>
    <img class="board" src="$filePathGrid/masu_dot_xy.png" alt=""/>
BOARD;

//handle board images here
$komas=explode(",",$sOnBoard);
foreach($komas as $koma){$output.=getImageTag($koma,"S",$filePathKoma);}
$komas=explode(",",$gOnBoard);
foreach($komas as $koma){$output.=getImageTag($koma,"G",$filePathKoma);}


$output.= <<< BOARD
   </div>
   <div class="cell">
    <div class="table"><!-- inner table -->
     <div class="row">
      <div id="goteMochigoma" class="komadai cell">
BOARD;

// handle gote komadai here
if (!empty($gOnHand)){
    $komas=explode(",",$gOnHand);
    $class=""; var_dump($komas);

    foreach($komas as $koma){
        $pngimg=$filePathKoma;
        $pngimg.="G";
        $komatopng=komatopng($koma);
        $pngimg.=$komatopng;
        $imageTag= makeImageTag($class,$pngimg);
        $output.=$imageTag;
    }}
// handle gote komadai here

$output.= <<<BOARD
  <!-- Gote mochigoma --></div>
     </div>
     <div class="row">
      <div class="cell empty" ></div> <!-- gap between two komaban -->
     </div>
     <div class="row">
      <div id="senteMochigoma" class="komadai cell">
BOARD;

if(!empty($sOnHand)){
    $komas=explode(",",$sOnHand);
    $class="";
    foreach($komas as $koma){
        $pngimg=$filePathKoma;
        $pngimg.="S";
        $komatopng=komatopng($koma);
        $pngimg.=$komatopng;
        $imageTag= makeImageTag($class,$pngimg);
        $output.=$imageTag;
    }}
//handle sente mochigoma here

$output.=<<<BOARD
  <!-- Sente komaban -->     </div>
     </div><!-- row -->
    </div><!-- innter table -->
   </div><!-- cell-->
  </div><!-- shogirow for the outer css-table-->
 </div><!--outer table-->
<article id="scomment" class="comment" ></article>
</div> <!--snapshot -->
BOARD;
$output .=$sOnBoard;
return $output;