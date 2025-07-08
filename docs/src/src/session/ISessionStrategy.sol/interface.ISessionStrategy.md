# ISessionStrategy
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/session/ISessionStrategy.sol)

**Inherits:**
IERC165

Interface for session strategy contracts that manage game sessions and player results

*This interface defines the core functionality for managing game sessions, calculating
player results, and determining winners. It extends IERC165 for interface detection support.*


## Functions
### sessionManager

Gets the address of the session manager

*This is used to check if the session strategy is compatible with the session manager*


```solidity
function sessionManager() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the session manager|


### getWinners

Gets the list of winners for a specific game


```solidity
function getWinners(uint256 gameId) external view returns (address[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the game|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|Array of winner addresses in order of placement (1st place first)|


### calculateXP

Calculates the XP reward for a specific pick position


```solidity
function calculateXP(uint256 gameId, uint256 pickPosition) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the game|
|`pickPosition`|`uint256`|The position of the player's pick (0-indexed)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The XP amount to be awarded|


### getXPTiers

Gets the XP tiers for different performance levels


```solidity
function getXPTiers(uint256 gameId) external view returns (uint256[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the game|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256[]`|Array of XP amounts for each tier|


### assertResults

Assert the results for a session


```solidity
function assertResults(
    uint256 sessionId,
    string calldata resultCid,
    address[] calldata proposedWinners,
    uint256[] calldata totalXPs,
    uint256[] calldata totalTimes
) external returns (bytes32 assertionId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sessionId`|`uint256`|The session ID|
|`resultCid`|`string`|The result CID containing results for **all** participants in the session|
|`proposedWinners`|`address[]`|The proposed winners|
|`totalXPs`|`uint256[]`|The total XP for each winner|
|`totalTimes`|`uint256[]`|The total time for each winner|


### recordResults

Record the results for a session


```solidity
function recordResults(uint256 sessionId, bytes32 assertionId) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sessionId`|`uint256`|The session ID|
|`assertionId`|`bytes32`|The assertion ID|


### userResult

Gets the complete result for a player in a game


```solidity
function userResult(uint256 gameId, address userAddress)
    external
    view
    returns (uint256 placement, uint256 xp, uint256 time);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the game|
|`userAddress`|`address`|The address of the player|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`placement`|`uint256`|The player's final placement in the game|
|`xp`|`uint256`|The total XP earned by the player|
|`time`|`uint256`|The total time taken by the player across all questions|


## Events
### AnswerCommitted

```solidity
event AnswerCommitted(uint256 indexed gameId, uint256 indexed questionId, address indexed player, bytes32 commit);
```

### PlayerPlaced

```solidity
event PlayerPlaced(uint256 indexed gameId, address indexed player, uint256 indexed placement);
```

## Errors
### OnlySessionManager

```solidity
error OnlySessionManager(address caller);
```

### InvalidGameState

```solidity
error InvalidGameState(SessionState expected, SessionState actual);
```

### PlayerNotContestant

```solidity
error PlayerNotContestant(address player);
```

### AnswerAlreadyCommitted

```solidity
error AnswerAlreadyCommitted(address player, uint256 gameId, uint256 questionId);
```

### AnswerNotCommitted

```solidity
error AnswerNotCommitted(address player, uint256 gameId, uint256 questionId);
```

### AnswerAlreadyRevealed

```solidity
error AnswerAlreadyRevealed(address player, uint256 gameId, uint256 questionId);
```

### InvalidQuestionId

```solidity
error InvalidQuestionId(uint256 questionId);
```

