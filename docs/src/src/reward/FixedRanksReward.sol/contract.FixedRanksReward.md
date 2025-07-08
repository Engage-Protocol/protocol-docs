# FixedRanksReward
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/reward/FixedRanksReward.sol)

**Inherits:**
[IRewardStrategy](/src/reward/IRewardStrategy.sol/interface.IRewardStrategy.md), ERC165

Contract for distributing rewards based on predefined rank percentages

*This contract implements the IRewardStrategy interface for distributing rewards
using fixed percentages for each rank. The total of all rank percentages must
equal 100% (10,000 basis points). Only the game creator can set the reward
distribution percentages.*


## State Variables
### rankedRewards
Mapping from game ID to the reward percentages for each rank

*Each percentage is in basis points (10000 = 100%)*


```solidity
mapping(uint256 sessionId => uint256[]) public rankedRewards;
```


### sessionManager
Reference to the session manager contract


```solidity
SessionManager public immutable sessionManager;
```


### BASIS_POINTS
Basis points constant for percentage calculations (10000 = 100%)


```solidity
uint256 public constant BASIS_POINTS = 10_000;
```


## Functions
### constructor


```solidity
constructor(address _sessionManager);
```

### setRankedRewards

Sets the reward distribution percentages for a specific game

*Only the game creator can call this function. The total of all percentages
must equal 100% (10,000 basis points). Can only be set once per game.*


```solidity
function setRankedRewards(uint256 sessionId, uint256[] calldata _rankedRewards) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sessionId`|`uint256`|The ID of the game|
|`_rankedRewards`|`uint256[]`|Array of reward percentages in basis points for each rank|


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
function getReward(uint256 sessionId, address[] calldata, uint256 position, uint256 prizePool)
    external
    view
    returns (uint256 reward);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sessionId`|`uint256`||
|`<none>`|`address[]`||
|`position`|`uint256`|The position to calculate reward for (0-indexed)|
|`prizePool`|`uint256`|The total prize pool to be distributed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reward`|`uint256`|The reward amount for the specified position|


### supportsInterface


```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override(IERC165, ERC165) returns (bool);
```

## Events
### RankedRewardsUpdated

```solidity
event RankedRewardsUpdated(uint256 indexed sessionId, uint256[] rankedRewards);
```

## Errors
### RankedRewardsNotSet

```solidity
error RankedRewardsNotSet(uint256 sessionId);
```

### InvalidRanks

```solidity
error InvalidRanks(uint256 sessionId, uint256 numRanks);
```

### InvalidTotalPoints

```solidity
error InvalidTotalPoints(uint256 sessionId, uint256 numPoints);
```

