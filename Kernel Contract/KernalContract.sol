pragma solidity ^0.4.25;

//test

contract KernalContract {
    
    //////基本类//////
    //疾病类
    struct Dss {
        uint32 Num; //uint32 Num ∈[0,999999999]
        string Name;
        string HsptList;
    }
    
    //医院类
    struct Hspt {
        uint32 Num;
        string Name;
        string Ip;
    }
    
    //权限类
    struct Auth {
        address addr; //医院的地址
        uint auth_type; //医院的权限种类：
                        //"0"illegal非法权限
                        //"1"admin管理员权限
                        //"2"normal普通医院权限
                        //"3"research医疗数据研究者
    }
    
    //认证请求类
    struct Request {
        string hspt_name;
        address addr;
    }
    
    //token类
    struct Token {
        address addr;
        string token;
        uint creation_time;
    }
    
    //////信息列表////// 
    //依次为：疾病列表、医院列表、权限列表、认证请求列表、token列表
    Dss [] public AllDssList;
    Hspt [] public AllHsptList;
    Auth [] public AuthList;
    Request [] public RequestList;
    Token [] public TokenList;
    
    //////KernalContract合约构造//////
    //合约构建者
    address  minter;//who creates KernalContract
    //合约构造函数
    constructor() public {
        minter = msg.sender ;
        AuthList.push(Auth({ addr:msg.sender , auth_type:1 }));
    }
    
    
    //////内部调用函数-字符串处理//////
    //string比较
    //compare 2 string
    function strCompare(string memory a, string memory b) internal returns (bool) {
        bytes memory ba = bytes(a);
        bytes memory bb = bytes(b);
        if (ba.length != bb.length) {
            return false;
        }
        for (uint i = 0; i < ba.length; i ++) {
            if(ba[i] != bb[i]) {
                return false;
            }
        }
        return true;
    }
    
    //string拼接
    //concatenate 2 string 
    function strConcat(string memory _a, string memory _b) internal returns ( string memory ){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory bret = new bytes(_ba.length + _bb.length);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) bret[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) bret[k++] = _bb[i];
        return string(bret);
    }
    
    //string切割
    //get a piece of string slice
    function getSlice(uint begin, uint end, string memory text) internal pure returns ( string memory ) {
        bytes memory a = new bytes(end-begin+1);
        for( uint i = 0; i<=end-begin ; i++ ){
            a[i] = bytes(text)[i+begin-1];
        }
        return string(a);
    }
    
    //string按“,”计数
    //count how many "x" in a "x1,x2,x3,x4" string, also
    function strCount2c(string memory s) internal view returns ( uint ){
        bytes memory b = bytes(s);
        uint counter = 1;
        for ( uint i = 0 ; i < b.length ; i++ ){
            if( b[i]==bytes1(",")){
                if( i!=0&& i!=b.length-1 ) counter++;
            }
        }
        return counter;
    }

    //string按“,”切割
    //e.g. strSeprate("dalian,shanghai,beijing");
    //=>retTmp will be "dalian";strTmp will be "shanghai,beijing".
    //e.g. specially:
    //strSeprate("dalian" or "dalian,");
    //=>retTmp will be "dalian";strTmp will be "".
    string strTmp ;
    string retTmp ; 
    function strSeprate(string storage s) internal {
        bytes tmp = bytes(s);
        uint slength = tmp.length;
        if(slength == 0 ){return;}
        retTmp = s;//prepare for input:"dalian"
        strTmp = s;
        uint begin = 1;
        uint end = 2;
        for( uint i = 0 ; i < slength ; i++ ){
            if( tmp[i] == bytes1(",") ){
                end = i;
                retTmp = getSlice(begin,end,s);
                if(end+1 == slength) {//input:"dalian,"
                    strTmp = "";
                    break;
                }
                strTmp = getSlice(end+2,slength,s);
                break;
            }
            if( i == slength -1 ){//input:"dalian"
                strTmp = "";
                break;
            }

        }
    }
    
    //e.g. strSeprate("dalian,shanghai,beijing");
    //=>retTmp will be "dalian";strTmp will be "shanghai,beijing".
    //e.g. specially:
    //strSeprate("dalian" or "dalian,");
    //=>retTmp will be "dalian";strTmp will be "".
    string hspt_strTmp ;
    string hspt_retTmp ; 
    function hsptStrSeperate(string storage s) internal {
        bytes tmp = bytes(s);
        uint slength = tmp.length;
        if(slength == 0 ){return;}
        hspt_retTmp = s;//prepare for input:"dalian"
        hspt_strTmp = s;
        uint begin = 1;
        uint end = 2;
        for( uint i = 0 ; i < slength ; i++ ){
            if( tmp[i] == bytes1(",") ){
                end = i;
                hspt_retTmp = getSlice(begin,end,s);
                if(end+1 == slength) {//input:"dalian,"
                    hspt_strTmp = "";
                    break;
                }
                hspt_strTmp = getSlice(end+2,slength,s);
                break;
            }
            if( i == slength -1 ){//input:"dalian"
                hspt_strTmp = "";
                break;
            }
        }
    }
    
    //////内部调用函数-列表请求与权限认证//////
    ////part 1: list request////
    //add Hspt
    function addHspt( string memory _Name , string memory _Ip ) internal{
        for( uint i = 0 ; i < AllHsptList.length ; i++ ){
            if(strCompare(_Name,AllHsptList[i].Name)){ //change previous IP;
                AllHsptList[i].Ip = _Ip;
                return;
            }
        }
        uint32 n = uint32(AllHsptList.length);
        AllHsptList.push( Hspt({ Num:n , Name:_Name , Ip:_Ip }) );
    }
    
    //add Hspt without Ip
    function addHspt( string memory _Name ) internal {
        for( uint i = 0 ; i < AllHsptList.length ; i++ ){
            if(strCompare(_Name,AllHsptList[i].Name)){ 
                return;
            }
        }
        uint32 n = uint32(AllHsptList.length);
        AllHsptList.push( Hspt({ Num:n , Name:_Name , Ip:"0" }) );
    } 
    
    //Hspt Name => Hspt Num
    function getHpstNum( string memory _Name ) internal view returns ( uint ){
        for( uint i = 0 ; i < AllHsptList.length ; i++ ){
            if(strCompare(_Name,AllHsptList[i].Name)){ 
                return i;
            }
        }
        return;
    }
    
    //is a Hspt called "_Name" here in the list?
    function isHpstHere( string memory _Name ) internal view returns (bool){
        for( uint i = 0 ; i < AllHsptList.length ; i++ ){
            if(strCompare(_Name,AllHsptList[i].Name)){ 
                return true;
            }
        }
        return false;
    }
    
    //add disease
    //if already has the Dss, do nothing;
    //if there's no Dss named "_Name", then add it into AllDssList(HsptList is an emply string);
    function addDss( string memory _Name )internal{
        for( uint i = 0 ; i < AllDssList.length ; i++ ){
            if(strCompare(_Name,AllDssList[i].Name)){ //already has the Dss
                return;
            }
        }
        uint32 n = uint32(AllDssList.length);
        string memory str ;
        AllDssList.push( Dss({ Num:n , Name:_Name , HsptList:str }) );
    }
    
    //add disease with their hspt name
    //if already has the Dss, renew the HsptName of the Dss;
    //if there's no Dss named "_Name", then add it into AllDssList;
    function addDss( string memory _Name ,string memory _HsptName )internal{
        for( uint i = 0 ; i < AllDssList.length ; i++ ){
            if(strCompare(_Name,AllDssList[i].Name)){ //already has the Dss, now add the HsptList.
                string memory str1 = strConcat(_HsptName,",") ;
                AllDssList[i].HsptList = strConcat(AllDssList[i].HsptList,str1);
                return;
            }
        }
        uint32 n = uint32(AllDssList.length);
        string memory str2 = strConcat(_HsptName,",") ;
        AllDssList.push( Dss({ Num:n , Name:_Name , HsptList:str2 }) );
    }
    
    //is a disease called "_Name" here in the list?
    function isDssHere( string memory _Name ) internal view returns (bool){
        for( uint i = 0 ; i < AllDssList.length ; i++ ){
            if(strCompare(_Name,AllDssList[i].Name)){ //already has the Dss
                return true;
            }
        }
        return false;
    }
    
    //Dss Name => Dss Num 
    function getDssNum( string memory _Name ) internal view returns ( uint ){
        for( uint i = 0 ; i < AllDssList.length ; i++ ){
            if(strCompare(_Name,AllDssList[i].Name)){ //already has the Dss
                return i;
            }
        }
        return;        
    }
    
    //随机产生一个5未的字符串
    //generate a token
    function tokenGeneration () view returns (string memory ){
        bytes memory alfbt = "abcdefghijklmnopqrstuvwxyz0123456789";
        byte [5] rettmp;
        string memory a = "qwert";
        bytes memory ret = bytes(a);
        uint randNonce = 0 ;
        for( uint i = 0 ; i < 5 ; i ++ ){
            rettmp[i] = alfbt[uint(keccak256( now, msg.sender , randNonce++)) % 36];
        }
        for(  i = 0 ; i < 5 ; i ++ ){
            ret[i] = rettmp[i];
        }
        return string(ret);
    }
    
    function tokenGeneration ( address _msgsender) view returns ( string memory ){
        bytes memory alfbt = "abcdefghijklmnopqrstuvwxyz0123456789";
        byte [5] rettmp;
        string memory a = "qwert";
        bytes memory ret = bytes(a);
        uint randNonce = 0 ;
        for( uint i = 0 ; i < 5 ; i ++ ){
            rettmp[i] = alfbt[uint(keccak256( now, _msgsender , randNonce++)) % 36];
        }
        for(  i = 0 ; i < 5 ; i ++ ){
            ret[i] = rettmp[i];
        }
        return string(ret);
    }
    
    
    ////part 2: authentication////
    //verify the authorization of an address 
    //search in the authoraized_addr list 
    function addressVerfication ( address _addr ) view returns (bool) {
        uint list_length = AuthList.length ;
        for ( uint i = 0 ; i < list_length ; i ++ ){
            if ( AuthList[i].addr == _addr ){
                return true;
            }
        }
        return false;
    }

    //add address into AuthList
    function addAuthorizedAddress( address _addr , uint _AuthType )  {
 
        //This address has not been authorized?
        require(
            !addressVerfication(_addr),
            "This address has already been authorized."
            );
        
        AuthList.push( Auth({ addr: _addr , auth_type: _AuthType }) );
    }
    
    //verify the auth type of an address 
    //search in the authoraized_addr list 
    function addressAuthType ( address _addr ) view returns ( uint ) {
        uint list_length = AuthList.length ;
        for ( uint i = 0 ; i < list_length ; i ++ ){
            if ( AuthList[i].addr == _addr ){
                return AuthList[i].auth_type;
            }
        }
        require( i != list_length , "this address has not been authorized.");
    }
    
        
    //////外部接口//////
    //////request function//////
    //input Hspt information into contract
    //_Name:Hspt name
    //_Ip:Hspt Ip
    //_DssList:the disease names string that the Hspt has
    //e.g. _DssList better looks like "dss1,dss2,dss3" or "dss1,dss2,dss3,"; DO NOT be like ",dss1,dss2" 
    function loadHsptInfo( string memory _Name , string memory _Ip , string memory _DssList ) public returns ( string memory ) {
        
        require(addressVerfication( msg.sender ),"you have not been authorized.");
        
        addHspt( _Name , _Ip );
        if(bytes(_DssList).length==0)return;
        uint DssAmount = strCount2c(_DssList);
        strTmp = _DssList;
        for( uint i = 0 ; i < DssAmount ; i++ ){
            strSeprate(strTmp);
            addDss(retTmp,_Name);
        }
        if ( i == DssAmount ) return "succeed";
    }
    
    //获取列表里所有的医院名称
    //=>all Hspt name in a string
    function getAllHpstName() public view returns ( string memory ) {
        
        require(addressVerfication( msg.sender ),"you have not been authorized.");
        
        if( AllHsptList.length == 0 ) return "no hosptial yet";//AllHsptList empty
        string memory ret ;
        for( uint i = 0 ; i < AllHsptList.length ; i++ ){
            ret = strConcat(ret, AllHsptList[i].Name );
            ret = strConcat(ret, ",");
        }
        return ret;
    }
    
    function getAllHpstIp() public view returns ( string memory ){
        
        require(addressVerfication( msg.sender ),"you have not been authorized.");
        
        if( AllHsptList.length == 0 ) return "no hosptial yet";//AllHsptList empty
        string memory ret ;
        for( uint i = 0 ; i < AllHsptList.length ; i++ ){
            ret = strConcat(ret, AllHsptList[i].Ip );
            ret = strConcat(ret, ",");
        }
        return ret;
    }
    
    //获取列表里所有的疾病名称
    //=>all Disease name in a string
    function getAllDssName() public view returns ( string memory ) {
        
        require(addressVerfication( msg.sender ),"you have not been authorized.");
        
        if( AllDssList.length == 0 ) return "no disease yet";//AllDssList empty
        string memory ret ;
        for( uint i = 0 ; i < AllDssList.length ; i++ ){
            ret = strConcat(ret, AllDssList[i].Name );
            ret = strConcat(ret, ",");
        }
        return ret;
    }
    
    //获取一种医院的IP地址
    //Hspt Name => Hspt Ip
    function getHpstIp( string memory _Name ) public view returns ( string memory ){
        
        require(addressVerfication( msg.sender ),"you have not been authorized.");
        
        if( AllHsptList.length == 0 ) return "no hosptial yet";
        for( uint i = 0 ; i < AllHsptList.length ; i ++ ){
            if(strCompare(_Name,AllHsptList[i].Name)) return AllHsptList[i].Ip;
        }
        return "no such a Hspt";
    }
    
    //获取出现一种疾病的所有医院
    //Dss Name => all the Hspts Ip in a string that the Dss appears
    function getHpstFromDss( string memory _DssName ) public view returns ( string memory ){
        
        require(addressVerfication( msg.sender ),"you have not been authorized.");
        
        if( bytes(_DssName).length == 0 ) return "input something";
        if( AllDssList.length == 0 ) return "no disease yet";
        if( AllHsptList.length == 0 ) return "no hosptial yet";
        string memory ret_ip ;
        hspt_strTmp = AllDssList[getDssNum(_DssName)].HsptList;
        uint HsptAmount = strCount2c(hspt_strTmp);
        for( uint i = 0 ; i < HsptAmount ; i++ ){
            hsptStrSeperate(hspt_strTmp);
            ret_ip = strConcat(ret_ip,getHpstIp(hspt_retTmp));
            ret_ip = strConcat(ret_ip,",");
        }
        return(ret_ip);
    }
    
    //医院的登陆接口
    //hspt login entrance
    function login () public view returns ( uint ){
        address addr_tmp = msg.sender;
        uint list_length = AuthList.length;
        for ( uint i = 0 ; i < list_length ; i ++ ){
            if ( AuthList[i].addr == addr_tmp ){
                return AuthList[i].auth_type;
                break;
            }
        }
        require(i==list_length-1,"you have not authorized yet.");
    }
    
    //医院发送权限验证请求
    //hspt send authorizing request.
    function sendRequest ( string memory _HsptName ) public{
        RequestList.push(Request({ hspt_name: _HsptName , addr: msg.sender }));
    }
    
    //管理员处理医院提交的申请并授权
    //只有管理员才能授权
    function solveRequest ( string memory _HsptName , uint _auth_type ) public{
        require(
            msg.sender == minter,
            "You have no permission in authorizing address."
            );
        uint list_length = RequestList.length;
        for( uint i = 0 ; i < list_length ; i ++ ){
            if(strCompare(_HsptName,RequestList[i].hspt_name)){
                addAuthorizedAddress(RequestList[i].addr, _auth_type);
                for( uint j = i ; j < list_length-1 ; j ++ ){
                    RequestList[j] = RequestList[j+1];
                }
                RequestList.length--;
                return;
            }
        }
        require( i != list_length, "this hspt has not send a request.");
    }
    
    //获取一个token
    function getToken () public {
        
        require(addressVerfication( msg.sender ),"you have not been authorized.");
        
        for( uint i = 0 ; i < TokenList.length ; i ++ ){
            if( TokenList[i].addr == msg.sender ){
                TokenList[i].token = tokenGeneration();
                TokenList[i].creation_time = now;
                return;
            }
        }
        TokenList.push(Token({ addr:msg.sender , token: tokenGeneration(), creation_time: now}));
        
    }
    
    //查看自己的token
    //msg.sender => its token
    function whatIsMyToken() public view returns( string memory ){
        
        require(addressVerfication( msg.sender ),"you have not been authorized.");
        
        address tmp = msg.sender;
        uint list_length = TokenList.length ;
        for ( uint i = 0 ; i < list_length ; i ++ ){
            if ( TokenList[i].addr == tmp ){
                return TokenList[i].token;
            }
        }
        require( i != list_length, "you haven't got a token yet.");
        
        
    }
    
    //验证token的真伪
    //1. there is a token (==_token)
    //2. this token is not time out
    function tokenVerification ( string memory _token ) public view returns (bool) {
        
        require(addressVerfication( msg.sender ),"you have not been authorized.");
        
        uint list_length = TokenList.length ;
        for ( uint i = 0 ; i < list_length ; i ++ ){
            if ( strCompare(TokenList[i].token, _token )){
                if( TokenList[i].creation_time  + 2 hours >= now ){
                    return true;
                }
                break;
            }
        }
        return false;
    }
    
    //根据医院的token，获取医院的权限种类
    //token => the hspt's auth_type
    function getItsAuthType( string memory _token ) public view returns ( uint ){
        
        require(addressVerfication( msg.sender ),"you have not been authorized.");

        address tmp;
        uint list_length = TokenList.length ;
        for ( uint i = 0 ; i < list_length ; i ++ ){
            if ( strCompare(TokenList[i].token , _token) ){
                tmp =  TokenList[i].addr;
                return addressAuthType(tmp);
            }
        }
        return 0;
    }

} 