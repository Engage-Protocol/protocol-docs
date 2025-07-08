# SessionManager
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/SessionManager.sol)

**Inherits:**
[QuestionManager](/src/QuestionManager.sol/abstract.QuestionManager.md)

Core contract managing the lifecycle of sessions

*Handles session creation, state management, and participant interactions*

*Uses the QuestionManager for question handling and DepositManager for financial operations*

*Implements verification and liveness checks for participants*

*Manages session rescheduling and refund mechanisms*


## State Variables
### minimumRescheduleTime
Minimum time required between original start time and rescheduled start time


```solidity
uint256 public constant minimumRescheduleTime = 15 minutes;
```


### nextGameId
Next available game ID, incremented after each game creation, starting from 1


```solidity
uint256 public nextGameId = 1;
```


### minimumStartDelay
Minimum delay required between game creation and start time


```solidity
uint256 public minimumStartDelay = 1 days;
```


### maxGameDuration
Maximum allowed duration for a game in seconds


```solidity
uint256 public maxGameDuration = 10 minutes;
```


### minimumContestants
Minimum number of contestants required to start a game


```solidity
uint256 public minimumContestants = 3;
```


### maximumContestants
Maximum number of contestants allowed in a game


```solidity
uint256 public maximumContestants = 1_000_000;
```


### revealGracePeriod
Grace period to start the game after the scheduled start time and reveal the first question


```solidity
uint256 public revealGracePeriod = 10 minutes;
```


### livenessDuration
Duration for which a participant's liveness is considered valid


```solidity
uint256 public livenessDuration = 1 hours;
```


### livenessRequired
Whether liveness check is required for participants to join games. This is only planned to be used if we see heavy botting


```solidity
bool public livenessRequired = false;
```


### creationSunsetted
Whether session creation is disabled


```solidity
bool public creationSunsetted = false;
```


### games
Mapping of game ID to game details


```solidity
mapping(uint256 => Game) public games;
```


### contestants
Mapping of game ID and participant address to their participation status


```solidity
mapping(uint256 gameId => mapping(address player => bool joined)) public contestants;
```


### isVerificationApproved
Mapping of participant addresses to their verification status


```solidity
mapping(address => bool) public isVerificationApproved;
```


### liveness
Mapping of participant addresses to their last liveness check


```solidity
mapping(address => uint256 timestamp) liveness;
```


## Functions
### constructor


```solidity
constructor(address _registry) QuestionManager(_registry);
```

### onlyCreator

Ensures that only the creator of a game can call the function


```solidity
modifier onlyCreator(uint256 _gameId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the game to check creator permissions for|


### onlyState

Ensures that the session is in the expected state


```solidity
modifier onlyState(uint256 _gameId, SessionState _state);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session to check state for|
|`_state`|`SessionState`|The expected state of the session|


### createGame

Creates a new session with the specified parameters


```solidity
function createGame(
    uint256 _startTime,
    uint256 _endTime,
    uint256 _ticketPrice,
    uint256 _creatorFee,
    address _token,
    bytes32[] memory _promptHashes,
    address[] memory _promptStrategies,
    address _sessionStrategy,
    address _rewardStrategy,
    bool _verificationRequired
) external returns (uint256 gameId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_startTime`|`uint256`|Timestamp when the session should start|
|`_endTime`|`uint256`|Timestamp when the session should end|
|`_ticketPrice`|`uint256`|Price for each contestant to join the session|
|`_creatorFee`|`uint256`|Percentage of fees that go to the creator|
|`_token`|`address`|Address of the token used for payments|
|`_promptHashes`|`bytes32[]`|Array of hashed prompts for the session|
|`_promptStrategies`|`address[]`|Array of prompt strategy contracts for each prompt|
|`_sessionStrategy`|`address`|Address of the session strategy to use|
|`_rewardStrategy`|`address`|Address of the reward strategy to use|
|`_verificationRequired`|`bool`|Whether participants need to be verified before joining|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the newly created session|


### joinGame

Allows a participant to join a session

*Requires payment of the session's ticket price*

*Requires verification if the session has verification enabled*

*Requires liveness check if liveness is required*


```solidity
function joinGame(uint256 _gameId) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session to join|


### leaveRescheduledGame

Allows a participant to leave a rescheduled session and get a refund

*Only works for sessions in Created state*

*Only works for rescheduled sessions*

*Must be called before the minimum reschedule time has passed*


```solidity
function leaveRescheduledGame(uint256 _gameId) external onlyState(_gameId, SessionState.Created);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the rescheduled session to leave|


### commitReaction

Commits a participant's reaction to a question in an ongoing session

*Only works for sessions in Ongoing state*

*Participant must be a contestant in the session*


```solidity
function commitReaction(uint256 _gameId, uint256 _questionId, bytes32 _commit)
    external
    onlyState(_gameId, SessionState.Ongoing);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session|
|`_questionId`|`uint256`|The ID of the question to react to|
|`_commit`|`bytes32`|The hashed commitment of the participant's reaction|


### revealReactions

Reveals a participant's reactions to multiple questions in a session


```solidity
function revealReactions(uint256 _gameId, uint256[] calldata questionIds, bytes[] calldata answers, uint256 salt)
    external
    onlyState(_gameId, SessionState.Ongoing);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session|
|`questionIds`|`uint256[]`|Array of question IDs to reveal answers for|
|`answers`|`bytes[]`|Array of answers corresponding to each question|
|`salt`|`uint256`|The salt used in the commitment|


### refundCancelledGame

Refunds the entry fee to a participant for a cancelled session


```solidity
function refundCancelledGame(uint256 _gameId) external onlyState(_gameId, SessionState.Cancelled);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the cancelled session|


### refundSponsorFunds

Refunds sponsor funds for a cancelled session


```solidity
function refundSponsorFunds(uint256 _gameId) external onlyState(_gameId, SessionState.Cancelled);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the cancelled session|


### startAndRevealGameQuestion

Starts a session and reveals the first question


```solidity
function startAndRevealGameQuestion(uint256 _gameId, uint256 _questionId, bytes memory _question, uint256 _salt)
    external
    onlyState(_gameId, SessionState.Created);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session|
|`_questionId`|`uint256`|The ID of the question to reveal|
|`_question`|`bytes`|The question data|
|`_salt`|`uint256`|The salt used for the question commitment|


### revealGameQuestion

Reveals a question in an ongoing session


```solidity
function revealGameQuestion(uint256 _gameId, uint256 _questionId, bytes memory _question, uint256 _salt)
    external
    onlyState(_gameId, SessionState.Ongoing);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session|
|`_questionId`|`uint256`|The ID of the question to reveal|
|`_question`|`bytes`|The question data|
|`_salt`|`uint256`|The salt used for the question commitment|


### endGame

Ends an ongoing session


```solidity
function endGame(uint256 _gameId) external onlyState(_gameId, SessionState.Ongoing);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session to end|


### cancelGame

Cancels a session


```solidity
function cancelGame(uint256 _gameId) external onlyCreator(_gameId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session to cancel|


### cancelGameIfCreatorMissing


```solidity
function cancelGameIfCreatorMissing(uint256 _gameId) external;
```

### rescheduleGame

Reschedules a session to a new start time


```solidity
function rescheduleGame(uint256 _gameId, uint256 _newStartTime)
    external
    onlyCreator(_gameId)
    onlyState(_gameId, SessionState.Created);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session to reschedule|
|`_newStartTime`|`uint256`|The new start time for the session|


### concludeGame

Concludes a session and makes sure winners are determined, so rewards can be distributed


```solidity
function concludeGame(uint256 _gameId) external onlyCreator(_gameId) onlyState(_gameId, SessionState.Ended);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session to conclude|


### claimRewards

Distributes rewards to winners of a concluded session


```solidity
function claimRewards(uint256 _gameId, uint256 position) external onlyState(_gameId, SessionState.Concluded);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session|
|`position`|`uint256`||


### distributeFees

Distributes protocol and creator fees for a concluded session


```solidity
function distributeFees(uint256 _gameId) external onlyState(_gameId, SessionState.Concluded);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session|


### claimReferralRewards

Claims referral rewards for the caller for multiple sessions


```solidity
function claimReferralRewards(uint256[] memory _gameIds) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameIds`|`uint256[]`|Array of session IDs to claim referral rewards for|


### getGameStartTime

Returns the scheduled start time of a session


```solidity
function getGameStartTime(uint256 gameId) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the session|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The start time as a Unix timestamp|


### getGameEndTime

Returns the scheduled end time of a session


```solidity
function getGameEndTime(uint256 gameId) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the session|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The end time as a Unix timestamp|


### getContestantsCount

Returns the number of contestants in a session


```solidity
function getContestantsCount(uint256 _gameId) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of contestants|


### approveVerification

Sets the verification status of a participant for verification required sessions


```solidity
function approveVerification(address _player, bool verified) external onlyRole(ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_player`|`address`|The address of the participant to approve|
|`verified`|`bool`|Whether the participant is verified|


### setMinimumStartDelay

Sets the minimum start delay for sessions


```solidity
function setMinimumStartDelay(uint256 _minimumStartDelay) external onlyRole(PROTOCOL_ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_minimumStartDelay`|`uint256`|The new minimum start delay in seconds|


### setMaxGameDuration

Sets the maximum allowed session duration


```solidity
function setMaxGameDuration(uint256 _maxGameDuration) external onlyRole(PROTOCOL_ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_maxGameDuration`|`uint256`|The new maximum session duration in seconds|


### setMinimumContestants

Sets the minimum number of contestants required to start a session


```solidity
function setMinimumContestants(uint256 _minimumContestants) external onlyRole(PROTOCOL_ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_minimumContestants`|`uint256`|The new minimum number of contestants|


### setMaximumContestants

Sets the maximum number of contestants allowed in a session


```solidity
function setMaximumContestants(uint256 _maximumContestants) external onlyRole(PROTOCOL_ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_maximumContestants`|`uint256`|The new maximum number of contestants|


### setRevealGracePeriod

Sets the grace period for revealing the first question after session start


```solidity
function setRevealGracePeriod(uint256 _revealGracePeriod) external onlyRole(PROTOCOL_ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_revealGracePeriod`|`uint256`|The new reveal grace period in seconds|


### setLivenessRequired

Sets whether liveness is required for joining sessions


```solidity
function setLivenessRequired(bool _livenessRequired) external onlyRole(PROTOCOL_ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_livenessRequired`|`bool`|Boolean indicating if liveness is required|


### setLivenessDuration

Sets the duration of the liveness period


```solidity
function setLivenessDuration(uint256 _livenessDuration) external onlyRole(PROTOCOL_ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_livenessDuration`|`uint256`|The new liveness duration in seconds|


### setLiveness

Updates the liveness timestamp for a participant


```solidity
function setLiveness(address participant) external onlyRole(PROTOCOL_ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`participant`|`address`|The address of the participant|


### setCreationSunsetted

Disables session creation, essentially sunsetting protocol version


```solidity
function setCreationSunsetted() external onlyRole(UPGRADER_ROLE);
```

### getStartTime

Returns the start time of a session


```solidity
function getStartTime(uint256 _gameId) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The start time as a Unix timestamp|


### getEndTime

Returns the end time of a session


```solidity
function getEndTime(uint256 _gameId) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The end time as a Unix timestamp|


### getNumContestants

Returns the number of contestants in a session


```solidity
function getNumContestants(uint256 _gameId) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of contestants|


### getSessionStrategy

Returns the session strategy address for a session


```solidity
function getSessionStrategy(uint256 _gameId) external view returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the session strategy contract|


### getOriginalStartTime

Returns the original start time of a session (before rescheduling)


```solidity
function getOriginalStartTime(uint256 _gameId) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The original start time as a Unix timestamp|


### getSessionState

Returns the current state of a session


```solidity
function getSessionState(uint256 _gameId) external view returns (SessionState);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`SessionState`|The current SessionState|


### getCreator

Returns the creator address of a session


```solidity
function getCreator(uint256 _gameId) external view returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_gameId`|`uint256`|The ID of the session|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the session creator|


## Events
### GameCreated

```solidity
event GameCreated(
    uint256 indexed gameId,
    uint256 startTime,
    uint256 endTime,
    address entryToken,
    uint256 entryFee,
    address creator,
    uint256 creatorFee,
    uint256 totalPrompts,
    address sessionStrategy,
    address rewardStrategy,
    bool verificationRequired
);
```

### GameConcluded

```solidity
event GameConcluded(uint256 indexed gameId, bool resultsPublished, bool resultsFinalized);
```

### RefundRequested

```solidity
event RefundRequested(uint256 indexed gameId, address indexed contestant);
```

### ContestantJoined

```solidity
event ContestantJoined(uint256 indexed gameId, address indexed contestant);
```

### GameStarted

```solidity
event GameStarted(uint256 indexed gameId);
```

### GameEnded

```solidity
event GameEnded(uint256 indexed gameId);
```

### GameCancelled

```solidity
event GameCancelled(uint256 indexed gameId);
```

### GameRescheduled

```solidity
event GameRescheduled(uint256 indexed gameId, uint256 newStartTime);
```

### RewardWithdrawn

```solidity
event RewardWithdrawn(uint256 indexed gameId, address indexed claimer, uint256 amount);
```

### RevealGracePeriodSet

```solidity
event RevealGracePeriodSet(uint256 gracePeriod);
```

### MinimumStartDelaySet

```solidity
event MinimumStartDelaySet(uint256 delay);
```

### MaxGameDurationSet

```solidity
event MaxGameDurationSet(uint256 duration);
```

### MinimumContestantsSet

```solidity
event MinimumContestantsSet(uint256 contestants);
```

### MaximumContestantsSet

```solidity
event MaximumContestantsSet(uint256 contestants);
```

### VerificationApproved

```solidity
event VerificationApproved(address indexed player);
```

### LivenessRequiredSet

```solidity
event LivenessRequiredSet(bool livenessRequired);
```

### LivenessDurationSet

```solidity
event LivenessDurationSet(uint256 livenessDuration);
```

### CreationSunsettedSet

```solidity
event CreationSunsettedSet(bool creationSunsetted);
```

## Errors
### GameShouldStartInFuture

```solidity
error GameShouldStartInFuture(uint256 minStartTime, uint256 startTime);
```

### GameDurationTooLong

```solidity
error GameDurationTooLong(uint256 duration, uint256 maxDuration);
```

### NotEnoughContestants

```solidity
error NotEnoughContestants(uint256 numContestants, uint256 minContestants);
```

### InvalidGameState

```solidity
error InvalidGameState(SessionState expected, SessionState actual);
```

### TooManyContestants

```solidity
error TooManyContestants(uint256 maxContestants, uint256 numContestants);
```

### GameHasNotStartedYet

```solidity
error GameHasNotStartedYet(uint256 startTime, uint256 currentTime);
```

### GameIsNotEnded

```solidity
error GameIsNotEnded(uint256 endTime, uint256 currentTime);
```

### NoContestantsInGame

```solidity
error NoContestantsInGame(uint256 gameId);
```

### GameLogicNotRegistered

```solidity
error GameLogicNotRegistered(address gameLogic);
```

### InvalidContestantSettings

```solidity
error InvalidContestantSettings(uint256 minimumContestants, uint256 maximumContestants);
```

### GameLateToReveal

```solidity
error GameLateToReveal(uint256 startTime, uint256 gracePeriod, uint256 currentTime);
```

### GameIsNotRescheduled

```solidity
error GameIsNotRescheduled(uint256 gameId);
```

### GameIsAlreadyRescheduled

```solidity
error GameIsAlreadyRescheduled(uint256 gameId);
```

### NotJoined

```solidity
error NotJoined(address player, uint256 gameId);
```

### TooLateToLeave

```solidity
error TooLateToLeave(uint256 gameId);
```

### RescheduleTooSoon

```solidity
error RescheduleTooSoon(uint256 originalStartTime, uint256 minimumRescheduleTime, uint256 newStartTime);
```

### OnlyCreator

```solidity
error OnlyCreator(uint256 gameId, address creator, address caller);
```

### NotVerified

```solidity
error NotVerified(address player);
```

### ArrayLengthMismatch

```solidity
error ArrayLengthMismatch();
```

### PromptStrategyNotRegistered

```solidity
error PromptStrategyNotRegistered(address promptStrategy);
```

### NoWinnersYet

```solidity
error NoWinnersYet(uint256 gameId);
```

### NotLively

```solidity
error NotLively(address player);
```

### CreationDisabled

```solidity
error CreationDisabled();
```

### QuestionNotRevealed

```solidity
error QuestionNotRevealed(uint256 gameId, uint256 questionId);
```

### GameWaitingForConclusion

```solidity
error GameWaitingForConclusion(uint256 gameId);
```

### PaymentTokenNotRegistered

```solidity
error PaymentTokenNotRegistered(address paymentToken);
```

### NotWinner

```solidity
error NotWinner(address winner, address player);
```

### SessionManagerMismatch

```solidity
error SessionManagerMismatch(address sessionManager);
```

## Structs
### Game
Represents a game session with its configuration and state


```solidity
struct Game {
    uint256 gameId;
    uint256 startTime;
    uint256 endTime;
    uint256 numContestants;
    address sessionStrategy;
    address rewardStrategy;
    uint256 originalStartTime;
    SessionState state;
    address creator;
    bool verificationRequired;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|Unique identifier for the game|
|`startTime`|`uint256`|Timestamp when the game is scheduled to start|
|`endTime`|`uint256`|Timestamp when the game is scheduled to end|
|`numContestants`|`uint256`|Current number of participants in the game|
|`sessionStrategy`|`address`|Address of the contract implementing the session evaluation logic|
|`rewardStrategy`|`address`|Address of the contract implementing the reward distribution logic|
|`originalStartTime`|`uint256`|Original start time before rescheduling (0 if not rescheduled)|
|`state`|`SessionState`|Current state of the game|
|`creator`|`address`|Address of the game creator|
|`verificationRequired`|`bool`|Whether participants need to be verified before joining|

