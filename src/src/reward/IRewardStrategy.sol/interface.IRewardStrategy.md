# IRewardStrategy
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/reward/IRewardStrategy.sol)

**Inherits:**
IERC165

Interface for reward strategy contracts that determine how prize pools are distributed among winners

*This interface defines the core functionality for calculating and distributing rewards
to players based on their performance in games. It extends IERC165 for interface detection support.*


## Functions
### getRewards

Calculates rewards for all winners in a game


```solidity
function getRewards(uint256 gameId, address[] calldata winners, uint256 prizePool)
    external
    view
    returns (uint256[] memory rewards);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the game|
|`winners`|`address[]`|Array of winner addresses in order of placement (1st place first)|
|`prizePool`|`uint256`|The total prize pool to be distributed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`rewards`|`uint256[]`|Array of reward amounts for each winner|


### getReward

Calculates the reward for a specific position in a game


```solidity
function getReward(uint256 gameId, address[] calldata winners, uint256 position, uint256 prizePool)
    external
    view
    returns (uint256 reward);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the game|
|`winners`|`address[]`|Array of winner addresses in order of placement (1st place first)|
|`position`|`uint256`|The position to calculate reward for (0-indexed)|
|`prizePool`|`uint256`|The total prize pool to be distributed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reward`|`uint256`|The reward amount for the specified position|


## Errors
### NotCreator

```solidity
error NotCreator(uint256 sessionId, address sender);
```

### AlreadySet

```solidity
error AlreadySet(uint256 sessionId);
```

### NotCreated

```solidity
error NotCreated(uint256 sessionId);
```

