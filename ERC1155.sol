// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC1155, Ownable {

    uint256 MintCount;
    uint256 id = 1;
    mapping(address => Counter) minter; 

    struct Counter{
        uint count;
    }

    constructor() ERC1155("https://api.mysite.com/tokena/{id}") {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint()
        public
    {    
        require(minter[msg.sender].count == 0, "CAN MINT ONLY ONCE FOR SAME CONTRACT");
        _mint(msg.sender, id, 1, "");
        minter[msg.sender].count ++;
        id++;
        MintCount++;
        }

    function showMintCount() public view returns(uint256){
        return MintCount;
    }
}