pragma solidity ^0.4.25;

contract listAuthentication {
    
    struct token_item {
        uint token;
        address addr;
        // uint32 hspt_num;
        uint creation_time ;
    }
    
    token_item [] public token_list;
    address [] public authorized_addr;
    
    address who_can_authorizing_address;
    
    uint randNonce = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
    
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
    
    
    
    //////internal functions//////
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
    
    function token_generation () public constant returns (uint){
        // bytes memory alfbt = "abcdefghigklmnopqrstuvwxyz" ;
        // bytes memory ret_token ="hspt";
        uint random = uint(keccak256(now, msg.sender, randNonce++)) % 999999;
        return random;
    }
    
    //////exposed interface//////
    function add_authorized_address( address _addr ) public {
        
        //This address has not been authorized?
        require(
            !address_verification(_addr),
            "This address has already been authorized."
            );
        
        //Only a specified one can authorizing address.
        // require(
        //     msg.sender == who_can_authorizing_address,
        //     "You have no permission to authorizing address."
        //     );
        
        authorized_addr.push( _addr );
    }
    
    //hspt login entrance 
    //not finished yet
    function login () public returns ( uint ){
        uint ret_token;
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
    
    //1. there is a token (==_token)
    //2. this token is not time out
    function token_verification ( uint _token ) public constant returns (bool) {
        uint list_length = token_list.length ;
        for ( uint i = 0 ; i < list_length ; i ++ ){
            if ( token_list[i].token == _token ){
                if( token_list[i].creation_time  + 2 hours >= now ){
                    return true;
                }
                break;
            }
        }
        return false;
    }
    
    
}