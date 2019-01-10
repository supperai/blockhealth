pragma solidity ^0.4.24;

contract KClite {
    
    struct Hspt {
        string name;
        string ip;
        address addr;
    }
    
    Hspt [] public HsptList;
    Hspt [] public RqstList;
    
    address  minter;
    
    function KClite()  {
        minter = msg.sender ;
    }
    
    function strCompare(string a, string b) internal returns (bool) {
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
    
    function strConcat(string memory _a, string memory _b) internal returns ( string memory ){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory bret = new bytes(_ba.length + _bb.length);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) bret[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) bret[k++] = _bb[i];
        return string(bret);
    }    
    
    function getHpstIp() public view returns ( string memory ){
        
        // require(addressVerfication( msg.sender ),"you have not been authorized.");
        
        if( HsptList.length == 0 ) return "no hosptial yet";
        string memory ret ;
        for( uint i = 0 ; i < HsptList.length ; i++ ){
            ret = strConcat(ret, HsptList[i].ip );
            ret = strConcat(ret, ",");
        }
        return ret;
    }
    
    function sendRqst ( string _HsptName , string _Ip ) public{
        
        RqstList.push(Hspt({ name: _HsptName , ip: _Ip , addr: msg.sender }));
        
    }
    
    function solveRqst ( string _HsptName ) public{
        
        // require( msg.sender == minter , " get out !");
        
        for( uint i = 0 ; i < RqstList.length ; i ++ ){
            if( strCompare(_HsptName,RqstList[i].name) ){
                HsptList.push( RqstList[i] );
                for( uint j = i ; j < RqstList.length-1 ; j ++ ){
                    RqstList[j] = RqstList[j+1];
                }
                RqstList.length--;
                return;
            }
        }
        // require( i != RqstList.length, "this hspt has not send a request.");
    }
    
}