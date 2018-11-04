pragma solidity ^0.4.25;



contract listRequest {
    
    
    struct Dss {
        uint Num;
        string Name;
        string HsptList;
    }
    
    struct Hspt {
        uint Num;
        string Name;
        string Ip;
    }
   
   
   //////relations////// 
    Dss [] public AllDssList;
    Hspt [] public AllHsptList;
    
    
    
    //////internal basic function//////
    //compare 2 string
    function strCompare(string a, string b) internal returns (bool) {
        if (bytes(a).length != bytes(b).length) {
            return false;
        }
        for (uint i = 0; i < bytes(a).length; i ++) {
            if(bytes(a)[i] != bytes(b)[i]) {
                return false;
            }
        }
        return true;
    }
    
    //concatenate 2 string 
    function strConcat(string _a, string _b) internal returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        string memory ret = new string(_ba.length + _bb.length);
        bytes memory bret = bytes(ret);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++)bret[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) bret[k++] = _bb[i];
        return string(ret);
    }
    
    //get a piece of string slice
    function getSlice(uint begin, uint end, string text) internal pure returns (string) {
        bytes memory a = new bytes(end-begin+1);
        for(uint i=0;i<=end-begin;i++){
            a[i] = bytes(text)[i+begin-1];
        }
        return string(a);    
    }
    
    //count how many "x" in a "x1,x2,x3,x4" string 
    function strCount2c(string s) internal constant returns ( uint ){
        bytes memory b = bytes(s);
        uint counter = 1;
        for ( uint i = 0 ; i < b.length ; i++ ){
            if( b[i]==bytes1(",")){
                if( i!=0&& i!=b.length-1 ) counter++;
            }
        }
        return counter;
    }
    
    //e.g. strSeprate("dalian,shanghai,beijing");
    //=>retTmp will be "dalian";strTmp will be "shanghai,beijing".
    //e.g. specially:
    //strSeprate("dalian" or "dalian,");
    //=>retTmp will be "dalian";strTmp will be "".
    string strTmp ;
    string retTmp ; 
    function strSeprate(string s) internal {
        if(bytes(s).length == 0 ){return;}
        retTmp = s;//prepare for input:"dalian"
        strTmp = s;
        string memory innerStrTmp = s;
        uint begin = 1;
        uint end = 2;
        bytes tmp = bytes(strTmp);
        for( uint i = 0 ; i < tmp.length ; i++ ){
            if( i == tmp.length-1 ){//input:"dalian"
                strTmp = "";
                break;
            }
            if( tmp[i] == bytes1(",") ){
                end = i;
                retTmp = getSlice(begin,end,innerStrTmp);
                if(end+1 == tmp.length) {//input:"dalian,"
                    strTmp = "";
                    break;
                }
                strTmp = getSlice(end+2,bytes(innerStrTmp).length,innerStrTmp);
                break;
            }
        }
    }
    
    //////internal function//////
    //add Hspt
    function addHspt( string _Name , string _Ip ) internal{
        for( uint i = 0 ; i < AllHsptList.length ; i++ ){
            if(strCompare(_Name,AllHsptList[i].Name)){ //change previous IP;
                AllHsptList[i].Ip = _Ip;
                return;
            }
        }
        uint n = AllHsptList.length;
        AllHsptList.push( Hspt({ Num:n , Name:_Name , Ip:_Ip }) );
    }
    
    //add Hspt without Ip
    function addHspt( string _Name ) internal {
        for( uint i = 0 ; i < AllHsptList.length ; i++ ){
            if(strCompare(_Name,AllHsptList[i].Name)){ 
                return;
            }
        }
        uint n = AllHsptList.length;
        AllHsptList.push( Hspt({ Num:n , Name:_Name , Ip:"0" }) );
    } 
    
    //Hspt Name => Hspt Num
    function getHpstNum( string _Name ) internal constant returns ( uint ){
        for( uint i = 0 ; i < AllHsptList.length ; i++ ){
            if(strCompare(_Name,AllHsptList[i].Name)){ 
                return i;
            }
        }
        return;
    }
    
    //is a Hspt called "_Name" here in the list?
    function isHpstHere( string _Name ) internal constant returns (bool){
        for( uint i = 0 ; i < AllHsptList.length ; i++ ){
            if(strCompare(_Name,AllHsptList[i].Name)){ 
                return true;
            }
        }
        return false;
    }
    
    //add disease
    function addDss( string _Name )internal{
        for( uint i = 0 ; i < AllDssList.length ; i++ ){
            if(strCompare(_Name,AllDssList[i].Name)){ //already has the Dss
                return;
            }
        }
        uint n = AllDssList.length;
        string str ;
        AllDssList.push( Dss({ Num:n , Name:_Name , HsptList:str }) );
    }
    
    //is a disease called "_Name" here in the list?
    function isDssHere( string _Name ) internal constant returns (bool){
        for( uint i = 0 ; i < AllDssList.length ; i++ ){
            if(strCompare(_Name,AllDssList[i].Name)){ //already has the Dss
                return true;
            }
        }
        return false;
    }
    
    //Dss Name => Dss Num 
    function getDssNum( string _Name ) internal constant returns ( uint ){
        for( uint i = 0 ; i < AllDssList.length ; i++ ){
            if(strCompare(_Name,AllDssList[i].Name)){ //already has the Dss
                return i;
            }
        }
        return;        
    }
    
    //////request function//////
    //input Hspt information into contract
    //_Name:Hspt name
    //_Ip:Hspt Ip
    //_DssList:the disease names string that the Hspt has
    //e.g. _DssList better looks like "dss1,dss2,dss3" or "dss1,dss2,dss3,"; DO NOT be like ",dss1,dss2" 
    function loadHsptInfo( string _Name , string _Ip , string _DssList ) public{
        addHspt( _Name , _Ip );
        if(bytes(_DssList).length==0)return;
        uint DssAmount = strCount2c(_DssList);
        strTmp = _DssList;
        /*
        for( uint i = 0 ; i < DssAmount ; i ++){
            strSeprate(strTmp);
            addDss(retTmp);
            AllDssList[getDssNum(retTmp)].HsptList=strConcat(AllDssList[getDssNum(retTmp)].HsptList,_Name);
            AllDssList[getDssNum(retTmp)].HsptList=strConcat(AllDssList[getDssNum(retTmp)].HsptList,",");
        }
        */
        //string strBuffer;
        //string retBuffer;
        
        for( uint i = 0 ; i < DssAmount ; i ++){
            strSeprate(strTmp);
            addDss(retTmp);
            AllDssList[getDssNum(retTmp)].HsptList=strConcat(AllDssList[getDssNum(retTmp)].HsptList,_Name);
            AllDssList[getDssNum(retTmp)].HsptList=strConcat(AllDssList[getDssNum(retTmp)].HsptList,",");
        }
    
    }
    
    //=>all Hspt name in a string
    //test passed
    function getAllHpstName() public constant returns ( string ) {
        if( AllHsptList.length == 0 ) return "no hosptial yet";//AllHsptList empty
        string memory ret ;
        for( uint i = 0 ; i < AllHsptList.length ; i++ ){
            ret = strConcat(ret, AllHsptList[i].Name );
            ret = strConcat(ret, ",");
        }
        return ret;
    }
    
    //Hspt Name => Hspt Ip
    //test passed
    function getHpstIp( string _Name ) public constant returns ( string ){
        if( AllHsptList.length == 0 ) return "no hosptial yet";
        for( uint i = 0 ; i < AllHsptList.length ; i ++ ){
            if(strCompare(_Name,AllHsptList[i].Name)) return AllHsptList[i].Ip;
        }
        return "no such a Hspt";
    }
    
    //Dss Name => all the Hspts Name in a string that the Dss appears
    //test passed
    function getHpstFromDss( string _DssName ) public constant returns ( string ){
        if( bytes(_DssName).length == 0 ) return "input something";
        if( AllDssList.length == 0 ) return "no disease yet";
        if( AllHsptList.length == 0 ) return "no hosptial yet";
        return(AllDssList[getDssNum(_DssName)].HsptList);
    }
    
} 