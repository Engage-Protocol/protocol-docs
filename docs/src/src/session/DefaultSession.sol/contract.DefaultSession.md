# DefaultSession
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/session/DefaultSession.sol)

**Inherits:**
[ISessionStrategy](/src/session/ISessionStrategy.sol/interface.ISessionStrategy.md), ERC165, Ownable, [SessionResultAsserter](/src/offchain/uma/SessionResultAsserter.sol/abstract.SessionResultAsserter.md)

Contract for managing default game sessions with XP-based scoring and winner determination

*This contract implements the ISessionStrategy interface for managing game sessions.
It calculates player results based on XP earned across all questions and determines
winners based on total performance. Only the owner can record final results.*


## State Variables
### resolutionGitRepoAtCommitHash
Github link to the resolution code at a certain commit hash


```solidity
string public resolutionGitRepoAtCommitHash;
```


### sessionManager

```solidity
address public immutable sessionManager;
```


### xpTiers
Array of XP tiers for different performance levels

*Index 0: XP for correct answers, Index 1: XP for incorrect answers*


```solidity
mapping(uint256 gameId => uint256[]) public xpTiers;
```


### userResult
Mapping from game ID and user address to their session result


```solidity
mapping(uint256 gameId => mapping(address user => SessionResult result)) public userResult;
```


### winners
Mapping from game ID to the list of winners


```solidity
mapping(uint256 gameId => address[] winners) public winners;
```


## Functions
### constructor

Constructor for the DefaultSession contract


```solidity
constructor(
    address _sessionManager,
    string memory _resolutionGitRepoAtCommitHash,
    address _usdc,
    address _optimisticOracle
) Ownable(msg.sender) SessionResultAsserter(_usdc, _optimisticOracle);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sessionManager`|`address`|The address of the session manager contract|
|`_resolutionGitRepoAtCommitHash`|`string`|The Github link to the resolution code at a certain commit hash|
|`_usdc`|`address`|The address of the USDC token|
|`_optimisticOracle`|`address`|The address of the Optimistic Oracle contract|


### getWinners

Gets the list of winners for a specific game


```solidity
function getWinners(uint256 gameId) public view returns (address[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the game|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|Array of winner addresses in order of placement (1st place first)|


### getXPTiers

Gets the XP tiers for different performance levels


```solidity
function getXPTiers(uint256 gameId) public view returns (uint256[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the game|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256[]`|Array of XP amounts for each tier|


### setXPTiers


```solidity
function setXPTiers(uint256 gameId, uint256[] memory _xpTiers) external;
```

### calculatePlayerSessionResult

Calculate a player's total XP and time across all prompts in a session


```solidity
function calculatePlayerSessionResult(uint256 gameId, address player)
    public
    view
    returns (uint256 totalXP, uint256 totalTime);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The game ID|
|`player`|`address`|The player's address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`totalXP`|`uint256`|The total XP earned by the player across all questions|
|`totalTime`|`uint256`|The total time taken by the player across all questions|


### assertResults

Assert the results for a session


```solidity
function assertResults(
    uint256 sessionId,
    string calldata resultCid,
    address[] calldata proposedWinners,
    uint256[] calldata totalXPs,
    uint256[] calldata totalTimes
) external onlyOwner returns (bytes32 assertionId);
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
function recordResults(uint256 sessionId, bytes32 assertionId) public;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sessionId`|`uint256`|The session ID|
|`assertionId`|`bytes32`|The assertion ID|


### calculateXP

Calculates the XP reward for a specific pick position


```solidity
function calculateXP(uint256 gameId, uint256 pickPosition) public view returns (uint256);
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


### supportsInterface


```solidity
function supportsInterface(bytes4 interfaceId) public view override(IERC165, ERC165) returns (bool);
```

## Events
### XpTiersUpdated

```solidity
event XpTiersUpdated(uint256 indexed gameId, uint256[] xpTiers);
```

## Errors
### ArrayLengthMismatch

```solidity
error ArrayLengthMismatch();
```

### MaxRewardedPlayersExceeded

```solidity
error MaxRewardedPlayersExceeded(uint256 rewardedPlayers);
```

### GameNotEnded

```solidity
error GameNotEnded();
```

### PlayerNotBetterThanClaimed

```solidity
error PlayerNotBetterThanClaimed();
```

### IncorrectPlayerData

```solidity
error IncorrectPlayerData();
```

### GameNotCreated

```solidity
error GameNotCreated(uint256 gameId);
```

### NotGameCreator

```solidity
error NotGameCreator(address creator, address caller);
```

### AssertionNotInitialized

```solidity
error AssertionNotInitialized(bytes32 assertionId);
```

### SessionIdMismatch

```solidity
error SessionIdMismatch(uint256 sessionId, uint256 assertionSessionId);
```

### XpMismatch

```solidity
error XpMismatch(uint256 xp, uint256 assertionXp);
```

### TimeMismatch

```solidity
error TimeMismatch(uint256 time, uint256 assertionTime);
```

## Structs
### SessionResult
Structure containing a player's complete session result


```solidity
struct SessionResult {
    uint256 placement;
    uint256 xp;
    uint256 time;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`placement`|`uint256`|The player's final placement in the game|
|`xp`|`uint256`|The total XP earned by the player across all questions|
|`time`|`uint256`|The total time taken by the player across all questions|

