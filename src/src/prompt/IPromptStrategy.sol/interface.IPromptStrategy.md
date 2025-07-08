# IPromptStrategy
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/prompt/IPromptStrategy.sol)

**Inherits:**
IERC165

Interface for prompt strategy contracts that manage question presentation and answer collection

*This interface defines the core functionality for handling different types of questions
and managing the commit-reveal scheme for player answers. It extends IERC165 for
interface detection support.*


## Functions
### revealQuestion

Reveals a question to players

*This function is called by the session manager to make a question available to players*


```solidity
function revealQuestion(bytes memory question, uint256 questionId) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`question`|`bytes`|The encoded question data|
|`questionId`|`uint256`|The unique identifier for the question|


### commitReaction

Allows a player to commit an answer to a question

*Uses a commit-reveal scheme to prevent front-running. The actual answer is hidden
until the reveal phase begins.*


```solidity
function commitReaction(uint256 _gameId, uint256 _questionId, bytes32 _commit, address _user) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the game|
|`_questionId`|`uint256`|The ID of the question|
|`_commit`|`bytes32`|The commitment hash of the player's answer|
|`_user`|`address`|The address of the player|


### revealReaction

Allows a player to reveal their previously committed answer

*The revealed answer must match the commitment hash provided during commit phase*


```solidity
function revealReaction(uint256 _gameId, uint256 _questionId, bytes calldata _selection, uint256 salt, address _user)
    external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the game|
|`_questionId`|`uint256`|The ID of the question|
|`_selection`|`bytes`|The encoded answer selection|
|`salt`|`uint256`|The salt used in the commitment|
|`_user`|`address`|The address of the player|


### getReactionTime

Gets the reaction time for a player on a specific question


```solidity
function getReactionTime(uint256 questionId, address player) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`questionId`|`uint256`|The ID of the question|
|`player`|`address`|The address of the player|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The time in seconds between question reveal and player's reaction|


### isRevealed

Checks if a question has been revealed


```solidity
function isRevealed(uint256 questionId) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`questionId`|`uint256`|The ID of the question|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the question has been revealed, false otherwise|


### getResult

Gets the result for a specific player on a specific question


```solidity
function getResult(uint256 gameId, uint256 questionId, address user) external view returns (Result memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the game|
|`questionId`|`uint256`|The ID of the question|
|`user`|`address`|The address of the player|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Result`|The result containing XP earned and response time|


## Events
### AnswerCommitted

```solidity
event AnswerCommitted(uint256 indexed gameId, uint256 indexed questionId, address indexed player, bytes32 commit);
```

## Errors
### OnlySessionManager

```solidity
error OnlySessionManager(address sessionManager, address caller);
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

### ReactionDeadlinePassed

```solidity
error ReactionDeadlinePassed(address player, uint256 questionId);
```

### QuestionNotRevealed

```solidity
error QuestionNotRevealed(uint256 questionId);
```

### InvalidQuestionId

```solidity
error InvalidQuestionId(uint256 questionId);
```

### InvalidSessionManager

```solidity
error InvalidSessionManager(address sessionManager);
```

### InvalidPromptCall

```solidity
error InvalidPromptCall(uint256 questionId, address promptStrategy);
```

