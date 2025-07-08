# QuestionManager
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/QuestionManager.sol)

**Inherits:**
[DepositManager](/src/DepositManager.sol/abstract.DepositManager.md)

Manages commit and reveal of questions for a session

*Handles the secure storage and verification of questions through a commit-reveal scheme*

*Questions are committed before the session starts and revealed during the session*

*Each question is associated with a prompt strategy that implements specific question logic*


## State Variables
### nextQuestionId

```solidity
uint256 public nextQuestionId;
```


### gameQuestions

```solidity
mapping(uint256 => uint256[]) public gameQuestions;
```


### questionCommitment

```solidity
mapping(uint256 => PromptInitData) public questionCommitment;
```


## Functions
### constructor


```solidity
constructor(address _registry) DepositManager(_registry);
```

### _commitQuestions

Commit questions before the game starts to ensure integrity


```solidity
function _commitQuestions(uint256 _gameId, bytes32[] memory _questionHashes, address[] memory _promptStrategies)
    internal;
```

### _revealPrompt


```solidity
function _revealPrompt(uint256 _gameId, uint256 _questionId, bytes memory _prompt, uint256 _salt) internal;
```

### _isRevealed


```solidity
function _isRevealed(uint256 _questionId) internal view returns (bool);
```

### isRevealed


```solidity
function isRevealed(uint256 _questionId) external view returns (bool);
```

### getQuestionsForGame

Retrieve all question IDs for a given game


```solidity
function getQuestionsForGame(uint256 _gameId) external view returns (uint256[] memory);
```

## Events
### QuestionCommitted

```solidity
event QuestionCommitted(uint256 indexed gameId, uint256 indexed questionId, bytes32 promptHash, address promptStrategy);
```

### QuestionRevealed

```solidity
event QuestionRevealed(uint256 indexed gameId, uint256 indexed questionId, bytes prompt);
```

## Errors
### GameQuestionsAlreadyCommitted

```solidity
error GameQuestionsAlreadyCommitted(uint256 gameId);
```

### InvalidQuestionReveal

```solidity
error InvalidQuestionReveal(uint256 gameId, uint256 questionId);
```

### InvalidQuestionHash

```solidity
error InvalidQuestionHash(uint256 gameId, uint256 questionId);
```

### QuestionAlreadyRevealed

```solidity
error QuestionAlreadyRevealed(uint256 gameId, uint256 questionId);
```

### QuestionAlreadyCommitted

```solidity
error QuestionAlreadyCommitted(uint256 gameId, uint256 questionId);
```

### EmptyArray

```solidity
error EmptyArray();
```

## Structs
### PromptInitData
Represents the initialization data for a question prompt


```solidity
struct PromptInitData {
    bytes32 promptHash;
    address promptStrategy;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`promptHash`|`bytes32`|Hash of the question prompt and its salt|
|`promptStrategy`|`address`|Address of the contract implementing the prompt strategy logic|

