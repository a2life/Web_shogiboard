<?php
/**
 * Created by JetBrains PhpStorm.
 * User: 10032268
 * Date: 6/20/12
 * Time: 7:41 PM
 * To change this template use File | Settings | File Templates.
 */


class shBoard
{
public $filePathKoma;
public $filePathGrid;
public $filePathBoard;
public $sOnBoard='';
public $gOnBoard='';
public $sOnHand='';
public $gOnHand='';
public function __construct($params){
        if (array_key_exists('filePathKoma', $params))$this->filePathKoma=$params["filePathKoma"];
        if (array_key_exists('filePathGrid', $params))$this->filePathGrid=$params["filePathGrid"];
        if (array_key_exists('filePathBoard', $params))$this->filePathBoard=$params["filePathBoard"];
        if (array_key_exists('sOnBoard', $params))$this->sOnBoard=$params["sOnBoard"];
        if (array_key_exists('gOnBoard', $params))$this->gOnBoard=$params["gOnBoard"];
        if (array_key_exists('sOnHand', $params))$this->sOnHand=$params["sOnHand"];
        if (array_key_exists('gOnHand', $params))$this->gOnHand=$params["gOnHand"];
    }
private function komatopng($koma) {
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
private   function makeImageTag($class,$pngimg,$komadata){
        return '<img src="'.$pngimg.'" class="'.$class.'"data-koma="'.$komadata.'" alt="">';
    }
private function cordToClass($cord){
        $output='koma c';
        $output.=substr($cord,0,1);
        $output.=' r';
        $output.=substr($cord,1,1);
        return $output;
    }
private function getImageTag($str,$side,$fpk){
       $class=$this->cordToClass($str);
       $pngimg=$fpk;
       $pngimg.=$side;
       $komatopng=$this->komatopng(substr($str,2,1));
    $komadata=$this->komatopng(strtolower(substr($str,2,1)));
        $pngimg.=$komatopng;
        $output=$this->makeImageTag($class,$pngimg,$komadata);
        return $output;
    }
    private function getMarkerTag($fpk){ //nee to work on this
        $output=$fpk."png";
        return '<img class="marker lostworld" src="'.$fpk.'/focus_trpt_g.png" alt=""/>';
    }
public function setsBoardPath() {
    return $this->filePathBoard.'/ban_kaya_a.png';
}
Public function setsGridPath(){
 return $this->filePathBoard.'/masu_dot_xy.png';
}
 public function setKomaPath(){
     return $this->filePathKoma;
    }
//handle board images here
public function setOnBoardImgs(){
$onBoardImgs="";
    $onBoardImgs.=$this->getMarkerTag($this->filePathKoma);
if(!empty($this->sOnBoard)){
    $komas=explode(",",$this->sOnBoard);
    foreach($komas as $koma){$onBoardImgs.=$this->getImageTag($koma,"S",$this->filePathKoma);}
}

if(!empty($this->gOnBoard)){
    $komas=explode(",",$this->gOnBoard);
    foreach($komas as $koma){$onBoardImgs.=$this->getImageTag($koma,"G",$this->filePathKoma);}
}
return $onBoardImgs;
}
// handle gote komadai here
public function setGOnHandImgs(){
$gOnHandImgs="";
if (!empty($this->gOnHand)){
    $komas=explode(",",$this->gOnHand);
    $class="";

    foreach($komas as $koma){
        $pngimg=$this->filePathKoma;
        $pngimg.="G";
        $komatopng=$this->komatopng($koma);
        $komadata=$this->komatopng(strtolower($koma));
        $pngimg.=$komatopng;
        $imageTag= $this->makeImageTag($class,$pngimg,$komadata);
        $gOnHandImgs.=$imageTag;
    }
}
    return $gOnHandImgs;
}
// handle gote komadai here
public function setSOnHandImgs(){
$sOnHandImgs="";
if(!empty($this->sOnHand)){
    $komas=explode(",",$this->sOnHand);
    $class="";
    foreach($komas as $koma){
        $pngimg=$this->filePathKoma;
        $pngimg.="S";
        $komatopng=$this->komatopng($koma);
        $komadata=$this->komatopng(strtolower($koma));
        $pngimg.=$komatopng;
        $imageTag= $this->makeImageTag($class,$pngimg,$komadata);
        $sOnHandImgs.=$imageTag;
    }}
    return $sOnHandImgs;
}




}
