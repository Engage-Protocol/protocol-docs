# TriviaChoicePrompt
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/prompt/TriviaChoicePrompt.sol)

**Inherits:**
[IPromptStrategy](/src/prompt/IPromptStrategy.sol/interface.IPromptStrategy.md), ERC165

Contract for managing trivia questions with predefined correct answers

*This contract implements the IPromptStrategy interface for handling multiple choice
trivia questions where there is a single correct answer. Players are rewarded based
on whether they select the correct answer or not.*


## State Variables
### revealedQuestions
Mapping from question ID to the revealed question data


```solidity
mapping(uint256 questionId => Prompt) public revealedQuestions;
```


### revealedAt
Mapping from question ID to the timestamp when it was revealed


```solidity
mapping(uint256 questionId => uint256 timestamp) public revealedAt;
```


### solutionRevealedAt
Mapping from question ID to the timestamp when the solution was revealed


```solidity
mapping(uint256 questionId => uint256 timestamp) public solutionRevealedAt;
```


### reactions
Mapping from question ID and player address to their reaction


```solidity
mapping(uint256 questionId => mapping(address player => Reaction reaction)) public reactions;
```


### registry

```solidity
Registry public immutable registry;
```


## Functions
### constructor


```solidity
constructor(address _registry);
```

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


### revealSolutions

Reveals the correct answers for multiple questions

*This function allows the session manager to reveal the correct answers for
multiple questions at once. Each solution must match its commitment hash.*


```solidity
function revealSolutions(
    uint256 gameId,
    uint256[] memory questionIds,
    bytes[] calldata solutions,
    uint256[] calldata salts
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the game|
|`questionIds`|`uint256[]`|Array of question IDs to reveal solutions for|
|`solutions`|`bytes[]`|Array of encoded solution data|
|`salts`|`uint256[]`|Array of salts used in the commitments|


### _revealSolutions

Internal function to reveal the solution for a single question

*This function verifies that the revealed solution matches the commitment hash
and stores the solution in the revealedQuestions mapping.*


```solidity
function _revealSolutions(uint256 _gameId, uint256 _questionId, bytes calldata _solution, uint256 salt) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the game|
|`_questionId`|`uint256`|The ID of the question|
|`_solution`|`bytes`|The encoded solution selection|
|`salt`|`uint256`|The salt used in the commitment|


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

*The result is calculated based on whether the player's answer matches the correct solution.
Players who answer correctly get XP from the first tier, while incorrect answers get XP from the second tier.*


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


### getReactionTime

Gets the reaction time for a player on a specific question


```solidity
function getReactionTime(uint256 questionId, address player) public view returns (uint256);
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


### _getReactionTime


```solidity
function _getReactionTime(uint256 questionId, address player) internal view returns (uint256);
```

### noop


```solidity
function noop(Prompt calldata p) external pure;
```

### supportsInterface


```solidity
function supportsInterface(bytes4 interfaceId) public view virtual override(IERC165, ERC165) returns (bool);
```

## Events
### AnswerRevealed

```solidity
event AnswerRevealed(uint256 indexed gameId, uint256 indexed questionId, address indexed player, uint16 selection);
```

## Errors
### RevealMismatch

```solidity
error RevealMismatch(uint256 gameId, uint256 questionId, uint16 selection, uint256 salt, bytes32 commitment);
```

### SolutionAlreadyRevealed

```solidity
error SolutionAlreadyRevealed(uint256 questionId);
```

## Structs
### Prompt
Structure containing all the data for a revealed question

*This struct holds all the information needed to display and process a trivia question*


```solidity
struct Prompt {
    address sessionManager;
    uint256 gameId;
    string questionText;
    uint256 reactionDeadline;
    bytes32 solutionCommitment;
    uint16 solution;
    string[] media;
    string[] choices;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`sessionManager`|`address`|Address of the session manager where the question belongs to|
|`gameId`|`uint256`|ID of the game this question belongs to|
|`questionText`|`string`|Text of the question|
|`reactionDeadline`|`uint256`|Deadline for players to commit their answers|
|`solutionCommitment`|`bytes32`|Commitment hash of the correct answer|
|`solution`|`uint16`|The correct answer choice (0-indexed)|
|`media`|`string[]`||
|`choices`|`string[]`||

### Reaction
Structure for storing a player's reaction to a question

*Extends BaseReaction with the specific answer choice selected*


```solidity
struct Reaction {
    BaseReaction baseReaction;
    uint16 answer;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`baseReaction`|`BaseReaction`|Base reaction data (commit, timestamp, etc.)|
|`answer`|`uint16`|The answer choice selected by the player (0-indexed)|

