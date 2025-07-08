# MajorityChoicePrompt
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/prompt/MajorityChoicePrompt.sol)

**Inherits:**
Ownable, [IPromptStrategy](/src/prompt/IPromptStrategy.sol/interface.IPromptStrategy.md), ERC165

Contract for managing majority choice questions where the most popular answer wins

*This contract implements the IPromptStrategy interface for handling multiple choice
questions where players vote on options and the majority choice determines the winning answer.
It uses a commit-reveal scheme to prevent front-running and ensures fair voting.*


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


### reactions
Mapping from question ID and player address to their reaction


```solidity
mapping(uint256 questionId => mapping(address player => Reaction reaction)) public reactions;
```


### choiceCounters
Mapping from question ID to arrays of players for each choice


```solidity
mapping(uint256 questionId => address[][] choices) public choiceCounters;
```


### results
Mapping from question ID and user address to their result


```solidity
mapping(uint256 questionId => mapping(address user => Result)) public results;
```


### registry
Registry contract address of the protocol


```solidity
Registry public immutable registry;
```


## Functions
### constructor


```solidity
constructor(address _owner, address _registry) Ownable(_owner);
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


### verifyPlacement

Verifies that a player's placement in the results is correct

*This function validates that the provided order array is properly sorted
and that the player is in the correct position for their choice.*


```solidity
function verifyPlacement(VerificationInfo calldata info) public view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`info`|`VerificationInfo`|The verification information containing player and placement data|


### recordResult

Records the result for a player after verification

*This function calculates and stores the XP and time result for a player
after their placement has been verified.*


```solidity
function recordResult(VerificationInfo calldata info) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`info`|`VerificationInfo`|The verification information containing player and placement data|


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
function getResult(uint256, uint256 questionId, address user) external view returns (Result memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`||
|`questionId`|`uint256`|The ID of the question|
|`user`|`address`|The address of the player|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Result`|The result containing XP earned and response time|


### getQuestion

Retrieves details of a single question


```solidity
function getQuestion(uint256 _questionId)
    external
    view
    returns (
        uint256 gameId,
        string memory questionText,
        uint256 reactionDeadline,
        string memory finalizedAnswer,
        string[] memory choices
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_questionId`|`uint256`|The ID of the question|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the game this question belongs to|
|`questionText`|`string`|The text of the question|
|`reactionDeadline`|`uint256`|The deadline for players to commit their answers|
|`finalizedAnswer`|`string`|The final answer after all votes are revealed|
|`choices`|`string[]`|Array of possible answer choices|


### noop


```solidity
function noop(Prompt calldata p) external pure;
```

### supportsInterface


```solidity
function supportsInterface(bytes4 interfaceId) public view override(IERC165, ERC165) returns (bool);
```

## Events
### AnswerRevealed

```solidity
event AnswerRevealed(uint256 indexed gameId, uint256 indexed questionId, address indexed player, uint16 selection);
```

## Errors
### RevealMismatch

```solidity
error RevealMismatch(uint256 gameId, uint256 questionId, uint16 majorityChoice, uint256 salt, bytes32 commit);
```

### InvalidOrderLength

```solidity
error InvalidOrderLength(uint256 length);
```

### InvalidOrder

```solidity
error InvalidOrder();
```

### InvalidPosition

```solidity
error InvalidPosition(address player, address actualPlayer);
```

## Structs
### Prompt
Structure containing all the data for a revealed question

*This struct holds all the information needed to display and process a question*


```solidity
struct Prompt {
    address sessionManager;
    uint256 gameId;
    string questionText;
    uint256 reactionDeadline;
    string finalizedAnswer;
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
|`finalizedAnswer`|`string`|Final answer after all votes are revealed|
|`media`|`string[]`|Array of media URLs associated with the question|
|`choices`|`string[]`|Array of possible answer choices|

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

### VerificationInfo
Structure for verifying player placement in the results

*Used during result calculation until verifiable offchain computation is implemented*


```solidity
struct VerificationInfo {
    uint256 questionId;
    uint256 position;
    address player;
    uint16 pick;
    uint16 pickPosition;
    uint256[] order;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`questionId`|`uint256`|ID of the question|
|`position`|`uint256`|Position of the player in the choice ranking|
|`player`|`address`|Address of the player|
|`pick`|`uint16`|The choice the player selected|
|`pickPosition`|`uint16`|Position of the player's choice in the final ranking|
|`order`|`uint256[]`|Array representing the final ranking of choices|

