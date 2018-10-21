pragma solidity ^0.4.18;
contract helloword {
    string greeting;
    
    function helloword(string _greeting) public {
        greeting = _greeting;
    }

    function say() constant public returns (string) {
        return greeting;
    }
}
