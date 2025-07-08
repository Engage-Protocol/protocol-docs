# SPBinaryPrompt
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/prompt/SPBinaryPrompt.sol)

**Inherits:**
Ownable, [IPromptStrategy](/src/prompt/IPromptStrategy.sol/interface.IPromptStrategy.md), ERC165

Contract for managing binary choice questions with probability predictions

*This contract implements the IPromptStrategy interface for handling binary choice
questions where players must predict both their answer choice and the probability
of that answer being correct. The scoring system rewards players based on how
close their probability prediction is to the actual outcome.*


## State Variables
### PRECISION
Precision factor for probability calculations (10000 = 100%)


```solidity
uint256 public constant PRECISION = 10_000;
```


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


### resultAggregates
Mapping from question ID to the aggregated results


```solidity
mapping(uint256 questionId => ResultAggregate result) public resultAggregates;
```


### results
Mapping from question ID and user address to their result


```solidity
mapping(uint256 questionId => mapping(address user => Result)) public results;
```


### registry

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


### getWinningAnswer

Determines the winning answer based on the aggregated results


```solidity
function getWinningAnswer(uint256 questionId) public view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`questionId`|`uint256`|The ID of the question|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if answer A is the winner, false if answer B is the winner|


### getScore

Calculates the score for a player based on their probability prediction accuracy


```solidity
function getScore(uint256 questionId, address player) public view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`questionId`|`uint256`|The ID of the question|
|`player`|`address`|The address of the player|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The player's score (0-10000 scale)|


### _getAverageDiffs

Internal function to calculate the differences between answer and probability averages


```solidity
function _getAverageDiffs(uint256 questionId) internal view returns (int256, int256, bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`questionId`|`uint256`|The ID of the question|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`int256`|answerAAverageDiff The difference for answer A|
|`<none>`|`int256`|answerBAverageDiff The difference for answer B|
|`<none>`|`bool`|answerAIsWinner Whether answer A is the winner|


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

*XP is calculated as: for a correct answer 1/2 of xpTiers[0] + 1/2 of xpTiers[0] * score (score is between 0 and 10000) / 10000, which means 100xp max.
incorrect answer xpTiers[1] XP is rewarded.*


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
        string[2] memory choices
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
|`choices`|`string[2]`|Array of exactly 2 possible answer choices|


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
event AnswerRevealed(
    uint256 indexed gameId, uint256 indexed questionId, address indexed player, bool answer, int16 probability
);
```

## Errors
### RevealMismatch

```solidity
error RevealMismatch(uint256 gameId, uint256 questionId, bool answer, int16 probability, uint256 salt, bytes32 commit);
```

### NoChoices

```solidity
error NoChoices(uint256 questionId);
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

### InvalidTiedChoicesLength

```solidity
error InvalidTiedChoicesLength(uint256 fasterPicksInTiedChoicesLength, uint256 tiedChoicesLength);
```

### IncorrectTiedChoicePlacement

```solidity
error IncorrectTiedChoicePlacement(address player, address lastFastestPlayerInTiedChoice);
```

## Structs
### Prompt
Structure containing all the data for a revealed question

*This struct holds all the information needed to display and process a binary question*


```solidity
struct Prompt {
    address sessionManager;
    uint256 gameId;
    string questionText;
    uint256 reactionDeadline;
    string finalizedAnswer;
    uint16 personalAverage;
    uint16 probabilityAverage;
    string[2] choices;
    string[] media;
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
|`personalAverage`|`uint16`|Personal average score for the player|
|`probabilityAverage`|`uint16`|Average probability prediction across all players|
|`choices`|`string[2]`|Array of exactly 2 possible answer choices|
|`media`|`string[]`|Array of media URLs associated with the question|

### Reaction
Structure for storing a player's reaction to a question

*Extends BaseReaction with the specific answer choice and probability prediction*


```solidity
struct Reaction {
    BaseReaction baseReaction;
    bool answer;
    int16 probability;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`baseReaction`|`BaseReaction`|Base reaction data (commit, timestamp, etc.)|
|`answer`|`bool`|The binary answer choice selected by the player|
|`probability`|`int16`|The player's probability prediction (0-10000 scale)|

### VerificationInfo
Structure for verifying player placement in the results

*Used during result calculation to verify the player's position in the ranking*


```solidity
struct VerificationInfo {
    uint256 questionId;
    address player;
    uint256 pickPosition;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`questionId`|`uint256`|ID of the question|
|`player`|`address`|Address of the player|
|`pickPosition`|`uint256`|Position of the player's choice in the final ranking|

### ResultAggregate
Structure for aggregating results across all players

*Contains running totals and averages for answer choices and probability predictions*


```solidity
struct ResultAggregate {
    int256 answerTotal;
    int256 probabilityTotal;
    int256 respondents;
    int256 answerAverage;
    int256 probabilityAverage;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`answerTotal`|`int256`|Total of all answer choices (weighted by PRECISION)|
|`probabilityTotal`|`int256`|Total of all probability predictions|
|`respondents`|`int256`|Number of players who have revealed their answers|
|`answerAverage`|`int256`|Average answer choice across all players|
|`probabilityAverage`|`int256`|Average probability prediction across all players|

