# BaseReaction
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/prompt/IPromptStrategy.sol)


```solidity
struct BaseReaction {
    bytes32 commit;
    uint256 timestamp;
    bool doubledDown;
    bool revealed;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`commit`|`bytes32`|Commitment hash of the player's answer|
|`timestamp`|`uint256`|When the reaction was committed|
|`doubledDown`|`bool`|Whether the player doubled down on their answer|
|`revealed`|`bool`|Whether the reaction has been revealed|

