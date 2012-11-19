<?php
/**
 * Created by JetBrains PhpStorm.
 * User: 10032268
 * Date: 6/20/12
 * Time: 7:41 PM
 *
 * 11/9/2012 added markerAt parameter. If empty, then it will be "lostworld" otherwise, needs 2 digits character string like
 * 13, 34 etc.,
 */


class shBoard
{
    public $filePathKoma;
    public $filePathGrid;
    public $filePathFocus;
    public $filePathBoard;
    public $sOnBoard='';
    public $gOnBoard='';
    public $sOnHand='';
    public $gOnHand='';
    public $markerAt;
    public $banImage='ban_kaya_a.png';
    public $gridImage='masu_dot_xy.png';
    public $markerImage='focus_trpt_g.png';
    public function __construct($params){
        if (array_key_exists('filePathKoma', $params))$this->filePathKoma=$params["filePathKoma"];
        if (array_key_exists('filePathGrid', $params))$this->filePathGrid=$params["filePathGrid"];
        if (array_key_exists('filePathFocus', $params))$this->filePathFocus=$params["filePathFocus"];
        if (array_key_exists('filePathBoard', $params))$this->filePathBoard=$params["filePathBoard"];
        if (array_key_exists('sOnBoard', $params))$this->sOnBoard=$params["sOnBoard"];
        if (array_key_exists('gOnBoard', $params))$this->gOnBoard=$params["gOnBoard"];
        if (array_key_exists('sOnHand', $params))$this->sOnHand=$params["sOnHand"];
        if (array_key_exists('gOnHand', $params))$this->gOnHand=$params["gOnHand"];
        if (array_key_exists('markerAt', $params))$this->markerAt=$params["markerAt"];
        if (array_key_exists('banImage',$params))$this->banImage=$params["banImage"];
        if (array_key_exists('gridImage',$params))$this->gridImage=$params["gridImage"];
        if (array_key_exists('markerImage',$params))$this->markerImage=$params["markerImage"];


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
    private function getMarkerTag($fpk,$img,$pos){
        if ($pos==""){$focus="lostworld";}
        else $focus=$this->cordToClass($pos);
        $output='<img class="marker '.$focus.'" src="'.$fpk.$img.'" alt=""/>';
        return $output;
    }
    public function setsBoardPath() {
        return $this->filePathBoard.$this->banImage;
    }
    Public function setsGridPath(){
        return $this->filePathGrid.$this->gridImage;
    }
    public function setKomaPath(){
        return $this->filePathKoma;
    }
//handle board images here
    public function setOnBoardImgs(){
        $onBoardImgs="";
        $onBoardImgs.=$this->getMarkerTag($this->filePathFocus,$this->markerImage,$this->markerAt);
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
