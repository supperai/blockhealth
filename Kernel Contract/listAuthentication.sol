pragma solidity ^0.4.25;

contract listAuthentication {
    
    struct token_item {
        string token;
        address addr;
        // uint32 hspt_num;
        uint creation_time ;
    }
    
    struct attempt_item {
        address addr;
        string hspt_name;
    }
    
    
    token_item [] token_list;
    address [] authorized_addr;
    attempt_item [] authorizing_attempt_buffer;
    
    
    
    
    //////internal basic function//////
    //compare 2 string
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
    
    function bytesConcat(bytes _a, bytes _b) internal returns (bytes){
        bytes memory _ba = _a;
        bytes memory _bb = _b;
        bytes memory ret = new bytes(_ba.length + _bb.length);
        bytes memory bret = bytes(ret);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++)bret[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) bret[k++] = _bb[i];
        return ret;
    }
    
    function bytes32_to_string(bytes32 x) internal constant returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }

    
    //1. there is a token (==_token)
    //2. this token is not time out
    function token_verification ( string _token ) constant returns (bool) {
        uint list_length = token_list.length ;
        for ( uint i = 0 ; i < list_length ; i ++ ){
            if ( strCompare( token_list[i].token , _token ) ){
                if( token_list[i].creation_time + 2 hours <= now ){
                    return true;
                }
                break;
            }
        }
        return false;
    }
    
    //verify the authorization of an address 
    //search in the authoraized_addr list 
    function address_verification ( address _addr ) constant returns (bool) {
        uint list_length = authorized_addr.length ;
        for ( uint i = 0 ; i < list_length ; i ++ ){
            if ( authorized_addr[i] == _addr ){
                return true;
            }
        }
        return false;
    }
    
    //generate a token
    function token_generation () public  constant returns (string){
        bytes memory alfbt = "abcdefghigklmnopqrstuvwxyz" ;
        bytes memory ret_token ="hspt";
        /// get random string here;
        uint randNonce = 0;
        // for( uint i = 0 ; i < 5 ; i ++ ){
        //     uint random = uint(keccak256(now, msg.sender, randNonce)) % 25;
        //     ret_token = bytesConcat( ret_token, alfbt[random]);
        //     randNonce++;
        // }
        return string(ret_token);
    }
    
    // function get_token_info( string _token ){
        
    // }
    

    //hspt login entrance 
    //not finished yet
    function login () public returns ( string ){
        string memory ret_token;
        address addr_tmp = msg.sender;
        uint list_length = authorized_addr.length ;
        ret_token = token_generation();
        for ( uint i = 0 ; i < list_length ; i ++ ){
            if ( authorized_addr[i] == addr_tmp ){
                token_list.push( token_item({ token: ret_token , addr: addr_tmp , creation_time: now}));
                break;
            }
        }
        require(i==list_length-1,"you have not authorized yet.");
        
        return ret_token;
    }
    
    //the only entrance to add addr which is authorized
    //find hspt_name in authorizing_attempt_buffer list, 
    // and get its address ,
    // finally add the address in the authorized_addr list.
    function add_authorized_addr(string _hspt_name)public{
        uint list_length = authorizing_attempt_buffer.length ;
        for ( uint i = 0 ; i < list_length ; i ++ ){
            if ( strCompare( authorizing_attempt_buffer[i].hspt_name , _hspt_name ) ){
                authorized_addr.push( authorizing_attempt_buffer[i].addr );
                break;
            }
        }
        require(i==list_length-1,"there is no such a hspt send a authorizing_attempt.");
    }
    
    //for those who want to be added in the authorized_addr list 
    //add them into the attempt_item list(authorizing_attempt_buffer)
    function authorizing_attempt(string _hspt_name)public{
        authorizing_attempt_buffer.push( attempt_item ({addr:msg.sender,hspt_name:_hspt_name}));
    }
    
}