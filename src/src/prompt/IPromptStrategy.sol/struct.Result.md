# Result
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/prompt/IPromptStrategy.sol)

Structure containing the result of a player's participation in a question


```solidity
struct Result {
    uint256 xp;
    uint256 time;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`xp`|`uint256`|Experience points earned by the player|
|`time`|`uint256`|Time taken by the player to respond (in seconds)|

