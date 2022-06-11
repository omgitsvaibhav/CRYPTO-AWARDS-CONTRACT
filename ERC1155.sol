// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC1155, Ownable {

    uint256 MintCount;
    uint256 id = 1;

    constructor() ERC1155("https://api.mysite.com/tokena/{id}") {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint()
        public
    {    
        //require(account.balance > )
        _mint(msg.sender, id, 1, "");
        id++;
        MintCount++;
    }

    function showMintCount() public view returns(uint256){
        return MintCount;
    }
}