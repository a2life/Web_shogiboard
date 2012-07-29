if(!function_exists(komatopng)){
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

}}
if(!function_exists(makeImageTag)){
function makeImageTag($class,$pngimg){
return "<img src=$pngimg class=\"$class\" alt=''>";
}}

if(!function_exists(cordToClass)){
function cordToClass($cord){
    $output='koma c';
    $output.=substr($cord,0,1);
    $output.=' r';
    $output.=substr($cord,1,1);
    return $output;
}}

if(!function_exists(getImageTag)){
function getImageTag($str,$side,$fpk){
    $class=cordToClass($str);
    $pngimg=$fpk;
    $pngimg.=$side;
    $komatopng=komatopng(substr($str,2,1));
    $pngimg.=$komatopng;
    return makeImageTag($class,$pngimg);
}}

$sBoard="$filePathBoard/ban_kaya_a.png";
$sGrid="$filePathGrid/masu_dot_xy.png";

//handle board images here
$onBoardImgs="";
if(!empty($sOnBoard)){
$komas=explode(",",$sOnBoard);
foreach($komas as $koma){$onBoardImgs.=getImageTag($koma,"S",$filePathKoma);}
}
if(!empty($gOnBoard)){
$komas=explode(",",$gOnBoard);
foreach($komas as $koma){$onBoardImgs.=getImageTag($koma,"G",$filePathKoma);}
}


// handle gote komadai here
$gOnHandImgs="";
if (!empty($gOnHand)){
    $komas=explode(",",$gOnHand);
    $class=""; var_dump($komas);

    foreach($komas as $koma){
        $pngimg=$filePathKoma;
        $pngimg.="G";
        $komatopng=komatopng($koma);
        $pngimg.=$komatopng;
        $imageTag= makeImageTag($class,$pngimg);
        $gOnHandImgs.=$imageTag;
    }}
// handle gote komadai here
$sOnHandImgs="";
if(!empty($sOnHand)){
    $komas=explode(",",$sOnHand);
    $class="";
    foreach($komas as $koma){
        $pngimg=$filePathKoma;
        $pngimg.="S";
        $komatopng=komatopng($koma);
        $pngimg.=$komatopng;
        $imageTag= makeImageTag($class,$pngimg);
        $sOnHandImgs.=$imageTag;
 }}
//handle sente mochigoma here

$output=$modx->getChunk('shogiBoardTpl',
			array(
			  'sBoard'=>$sBoard,
			  'sGrid'=>$sGrid,
                          'onBoardImgs'=>$onBoardImgs,
                          'gOnHandImgs'=>$gOnHandImgs,
                          'sOnHandImgs'=>$sOnHandImgs
			));
return $output;