pragma solidity ^0.4.25;

contract Authentication {
    
  //公匙：0x60320b8a71bc314404ef7d194ad8cac0bee1e331
  //sha3(msg): 0x4e03657aea45a94fc7d47ba826c8d667c0d1e6e33a64a036ec44f58fa12d6c45 (web3.sha3("abc");)
  //签名后的数据：0xf4128988cbe7df8315440adde412a8955f7f5ff9a5468a791433727f82717a6753bd71882079522207060b681fbd3f5623ee7ed66e33fc8e581f442acbcf6ab800

  //验签数据入口函数
  function decode() returns (address){
    bytes memory signedString =hex"f4128988cbe7df8315440adde412a8955f7f5ff9a5468a791433727f82717a6753bd71882079522207060b681fbd3f5623ee7ed66e33fc8e581f442acbcf6ab800";

    bytes32  r = bytesToBytes32(slice(signedString, 0, 32));
    bytes32  s = bytesToBytes32(slice(signedString, 32, 32));
    byte  v = slice(signedString, 64, 1)[0];
    return ecrecoverDecode(r, s, v);
  }

  //将原始数据按段切割出来指定长度
  function slice(bytes memory data, uint start, uint len) returns (bytes){
    bytes memory b = new bytes(len);

    for(uint i = 0; i < len; i++){
      b[i] = data[i + start];
    }

    return b;
  }

  //使用ecrecover恢复公匙
  function ecrecoverDecode(bytes32 r, bytes32 s, byte v1) returns (address addr){
     uint8 v = uint8(v1) + 27;
     addr = ecrecover(hex"4e03657aea45a94fc7d47ba826c8d667c0d1e6e33a64a036ec44f58fa12d6c45", v, r, s);
  }

  //bytes转换为bytes32
  function bytesToBytes32(bytes memory source) returns (bytes32 result) {
    assembly {
        result := mload(add(source, 32))
    }
  }
  
    event AddressMapped(address primary, address secondary);
    event Error(uint code, address sender);
    mapping (address => address) public primaryToSecondary;
    mapping (address => bool) public secondaryInUse;
    modifier secondaryAddressMustBeUnique(address secondary) {
        if(secondaryInUse[secondary]) {
            Error(1, msg.sender);
            throw;
        }
        _;
    }
    
    
    function mapAddress(address secondary) 
        secondaryAddressMustBeUnique(secondary) {
        // If there is no mapping, this does nothing
        secondaryInUse[primaryToSecondary[msg.sender]] = false;
        primaryToSecondary[msg.sender] = secondary;
        secondaryInUse[secondary] = true;
        AddressMapped(msg.sender, secondary);
    }
    
}