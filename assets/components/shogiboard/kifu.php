<?php
/**
 * Created by JetBrains PhpStorm.
 * User: 10032268
 * Date: 1/28/13
 * Time: 2:17 PM
 * To change this template use File | Settings | File Templates.
 * Class kifu
 * __constructor() =  get kifu
 * will define...
 * getMoves()
 * getsOnHand()
 * getgOnHand
 * getsOnboard()
 * getgOnboard()
 * todo add flipboard detection
 */
/* @var $modx modX */

class kifu
{
    private $moves, $sOnHand, $gOnHand,$senteName,$goteName,$teai,$startDate,$endDate,
        $sOnBoard ="19l,29n,39s,49g,59k,69g,79s,89n,99l,28r,88b,17p,27p,37p,47p,57p,67p,77p,87p,97p",
        $gOnBoard ="11l,21n,31s,41g,51k,61g,71s,81n,91l,22b,82r,13p,23p,33p,43p,53p,63p,73p,83p,93p",
        $mightyPattern = array("10"=>"＋\s","1"=>"[１一]",  "2"=>"[二２]","3"=>"[三３]","4"=>"[四４]",
        "5"=>"[五５]","6"=>"[六６]","7"=>"[七７]","8"=>"[八８]","9"=>"[九９]","p"=>"歩","P"=>"と",
        'L'=>"成香","l"=>"香",'N'=>'成桂','n'=>'桂','S'=>'成銀','s'=>'銀','r'=>'飛',"R"=>'[竜龍]',
        "b"=>'角',"B"=>'馬',"k"=>'玉',"g"=>"金","00"=>"同　","d"=>"打","J"=>"\+","+"=>"成","x"=>"(投了|中断)");

    private function
    findline($mbstring,$array){
        $c=count($array);
        $f=false;
        for ($i=0;!$f && $i<$c;$i++){
            mb_ereg_search_init($array[$i],$mbstring);
            $f=mb_ereg_search();
        }
        if ($i<$c)  return --$i;
        else return $f;
    }
    private function
    parsedata($init_data){
        function parseRepeat($onHand){
            $regs=array();
            $hands="";
            $pattern="([plnsgrb])(\d*)";
            mb_ereg_search_init($onHand,$pattern);
            while (mb_ereg_search()){
                $regs=mb_ereg_search_getregs();
                $hands.=($regs[2]?str_repeat($regs[1],$regs[2]):$regs[1]);//if more than one, pieces are multiplied here.
            }
            $regs=str_split($hands);
            $onHand=implode(",",$regs);
            return $onHand;
        }
        $patterns=$this->mightyPattern;
        $boardMarker="９ ８ ７ ６ ５ ４ ３ ２ １";
        $senteOnHandPattern="\n先手の持駒：([\w\/\s\:]*)\r";
        $goteOnHandPattern= "\n後手の持駒：([\w\/\s\:]*)\r";
        $startDatePattern="\n開始日時：([\w\/\s\:]*)\r";
        $endDatePattern="\n終了日時：([\w\/\s\:]*)\r";
        $teaiPattern="\n手合割：([\w\s]*)\r";
        $senteNamePattern="先手：([\w\s]*)\r";
        $goteNamePattern="後手：([\w\s]*)\r";
        $senteOnHand="";
        $goteOnHand="";
        $onHands=array();
        if(mb_ereg($senteOnHandPattern,$init_data,$onHands)!=false)$senteOnHand=$onHands[1];

        if(mb_ereg($goteOnHandPattern,$init_data,$onHands)!=false)$goteOnHand=$onHands[1];
        if(mb_ereg($startDatePattern,$init_data,$onHands)!=false) $startDate=$onHands[1];
        if(mb_ereg($endDatePattern,$init_data,$onHands)!=false) $endDate=$onHands[1];
        if(mb_ereg($teaiPattern,$init_data,$onHands)!=false)$teai=$onHands[1];
        if(mb_ereg($senteNamePattern,$init_data,$onHands)!=false)$senteName=$onHands[1];
        if(mb_ereg($goteNamePattern,$init_data,$onHands)!=false)$goteName=$onHands[1];
        $init_array=explode("\r\n",$init_data);
        $i= $this->findline($boardMarker,$init_array);
        if ($i==true){ //the string contains board chart

            $i=$i+2;  //starting row of 局面　info
            $j=$i+9;  //ending row of 局面　info
            /* the following code printed out the board layout for debugging purpose
            for ($n=$i;$n<$j;$n++){
                $m= mb_strlen($init_array[$n]);
                for($k=0;$k<$m;$k++){
                    echo "($k):".mb_substr($init_array[$n],$k,1)."|";
                }
                echo "\n";
            }
            */
            $senteOnBoard=""; $goteOnBoard="";
            for ($row=$i;$row<$j;$row++){
                //$columnLength=mb_strlen($init_array[$row]);
                for ($k=2;$k<19;$k=$k+2){
                    $masu=mb_substr($init_array[$row],$k,1);
                    if ($masu!="・"){
                        $colRow=(10-$k/2).($row-$i+1);
                        $side=mb_substr($init_array[$row],$k-1,1);

                        switch($side){
                            case " "://This is Sente's piece
                                $senteOnBoard.=$colRow;
                                $senteOnBoard.=$masu;
                                $senteOnBoard.=" ";
                                break;
                            case "v"://this is Gote's piece
                                $goteOnBoard.=$colRow;
                                $goteOnBoard.=$masu;
                                $goteOnBoard.=" "
                                ;break;
                        }
                    }
                }
            }

            $senteOnBoard=trim($senteOnBoard);
            $goteOnBoard=trim($goteOnBoard);

            foreach ($patterns as $replacement=>$pattern){
                $senteOnBoard=mb_ereg_replace($pattern,$replacement,$senteOnBoard);
                $goteOnBoard=mb_ereg_replace($pattern,$replacement,$goteOnBoard);
                $senteOnHand=mb_ereg_replace($pattern,$replacement,$senteOnHand);
                $goteOnHand =mb_ereg_replace($pattern,$replacement,$goteOnHand);
            }

//spell out pieces and not numbers. ie., s3 -> s,s,s
            $senteOnHand = parseRepeat($senteOnHand);
            $goteOnHand = parseRepeat($goteOnHand);
            //format onboard string
            $senteOnBoard=mb_ereg_replace(" ",",",$senteOnBoard);
            $goteOnBoard=mb_ereg_replace(" ",",",$goteOnBoard);

        }
        if (isset($senteOnBoard)) $this->sOnBoard = $senteOnBoard;
        if (isset($goteOnBoard)) $this->gOnBoard = $goteOnBoard;
        if (isset($senteName)) $this->senteName = $senteName;
        if (isset($goteName)) $this->goteName = $goteName;
        if (isset($startDate)) $this->startDate = $startDate;
        if (isset($endDate)) $this->endDate = $endDate;
        if (isset($teai)) $this->teai = $teai;


        $this->sOnHand = $senteOnHand;
        $this->gOnHand = $goteOnHand;

    }
    public function
    __construct($src){
        mb_regex_encoding ("UTF-8"); //prep to handle mb strings
        mb_internal_encoding("UTF-8");//ditto
        $xlationArray=$this->mightyPattern;

        $match=array();
//$pattern="(?:(\d+)\s+([\w\s]+)(?:\((\d+)\))?[ /():0-9]*(\+?))";
        $header="手数----指手";
        $pattern='(?:(\d+)\s+([\w\s]+)(?:\((\d+)\))?[ /():0-9]*(\+?))|(?:\r\n(?:\*)(.*?)\r\n)|(?:変化：([\w]+))';
        $parsed="";//todo handling of comment line when multiple lines are entered is a little goofy.
        $movesLines="";
        mb_ereg_search_init($src,$header); // does move exists?
        if (mb_ereg_search()) { //forward to the start of move list
            mb_ereg_search_regs($pattern); //load regs with move parsing $pattern for the first time
            do{
                $match=mb_ereg_search_getregs();
                if ($match[2]){ //
                    $parsed="\n";
                    $parsed.=(($match[1] & 1)?"s-":"g-");
                    $parsed.=(trim($match[2]).$match[3].$match[4]."=".$match[1]);

                    foreach($xlationArray as $key=>$pat){
                        $parsed=mb_ereg_replace($pat,$key,$parsed);
                    }
                    $parsed.=(":".trim($match[2]));
                } else if ($match[5]) $parsed="*".$match[5];//regex is matching *comment line, the second alternate
                else if ($match[6]) $parsed="\nC:".$match[6];
                else $parsed="\n".$match[0];//regex is matching the last catch all alternate so spit out as is

                $movesLines.=$parsed;
            }
            while(mb_ereg_search_regs());// until next result returns false. note that mb_ereg is caching $string and $pattern


            $movesLines=mb_ereg_replace("J=","J",$movesLines); // replace = with J for jump point
            $movesLines=mb_ereg_replace('(?<=\d\d)[pPlLnNsSgkrRbB](?=.?\d\d)',"",$movesLines); //remove piece info as they are not needed for drawboard
            $movesLines=mb_ereg_replace('-(..)\+','+\1',$movesLines); // s-nn+ => s+nn
            $movesLines=mb_ereg_replace('-(...)d','d\1',$movesLines); // s-68sd => sd68s
            $movesLines=trim($movesLines);
//            $movesLines=htmlentities($movesLines,ENT_QUOTES);
            $movesLines.="\nx"; // terminate the end with x to indicate the EOF.
            $moves = explode("\n",$movesLines); // this sequence will
            $movesLines="\"".implode("\",\n\"",$moves)."\""; // surround each line with quotes and ,
            $this->moves = $movesLines;
        }
        $this->parsedata($src);

    }

    public function getMoves()      { return (isset($this->moves)?$this->moves:false); }
    public function getsOnHand()    { return (isset($this->sOnHand)?$this->sOnHand:false);}
    public function getgOnHand()    { return (isset($this->gOnHand)?$this->gOnHand:false);}
    public function getsOnBoard()   { return (isset($this->sOnBoard)?$this->sOnBoard:false);}
    public function getgOnBoard()   { return (isset($this->gOnBoard)?$this->gOnBoard:false);}
    public function getStartDate()  { return (isset($this->startDate)?$this->startDate:false);}
    public function getEndDate()    { return (isset($this->endDate)?$this->endDate:false);}
    public function getSenteName()  { return (isset($this->senteName)?$this->senteName:false);}
    public function getGoteName()   { return (isset($this->goteName)?$this->goteName:false);}
    public function getTeai()       { return (isset($this->teai)?$this->teai:false);}



}


