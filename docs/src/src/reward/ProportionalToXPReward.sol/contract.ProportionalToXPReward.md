# ProportionalToXPReward
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/reward/ProportionalToXPReward.sol)

**Inherits:**
[IRewardStrategy](/src/reward/IRewardStrategy.sol/interface.IRewardStrategy.md), ERC165

Contract for distributing rewards proportionally based on players' XP earned

*This contract implements the IRewardStrategy interface for distributing rewards
proportionally based on the total XP earned by each player. Players with higher XP
receive a larger share of the prize pool.*


## State Variables
### sessionManager
Reference to the session manager contract


```solidity
SessionManager public immutable sessionManager;
```


### numberOfWinners

```solidity
mapping(uint256 sessionId => uint256 numberOfWinners) public numberOfWinners;
```


## Functions
### constructor


```solidity
constructor(address _sessionManager);
```

### getRewards

Calculates rewards for all winners in a game


```solidity
function getRewards(uint256 sessionId, address[] calldata winners, uint256 prizePool)
    external
    view
    returns (uint256[] memory rewards);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sessionId`|`uint256`||
|`winners`|`address[]`|Array of winner addresses in order of placement (1st place first)|
|`prizePool`|`uint256`|The total prize pool to be distributed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`rewards`|`uint256[]`|Array of reward amounts for each winner|


### getReward

Calculates the reward for a specific position in a game


```solidity
function getReward(uint256 sessionId, address[] calldata winners, uint256 position, uint256 prizePool)
    external
    view
    returns (uint256 reward);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sessionId`|`uint256`||
|`winners`|`address[]`|Array of winner addresses in order of placement (1st place first)|
|`position`|`uint256`|The position to calculate reward for (0-indexed)|
|`prizePool`|`uint256`|The total prize pool to be distributed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reward`|`uint256`|The reward amount for the specified position|


### setNumberOfWinners


```solidity
function setNumberOfWinners(uint256 sessionId, uint256 _numberOfWinners) external;
```

### supportsInterface


```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override(IERC165, ERC165) returns (bool);
```

## Errors
### NumberOfWinnersMismatch

```solidity
error NumberOfWinnersMismatch(uint256 sessionId, uint256 numberOfWinners);
```

