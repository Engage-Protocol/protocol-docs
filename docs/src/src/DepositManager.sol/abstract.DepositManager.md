# DepositManager
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/DepositManager.sol)

**Inherits:**
[SessionManagerBase](/src/SessionManagerBase.sol/abstract.SessionManagerBase.md)

Manages deposits, fees, and rewards for sessions

*Supports both entry fees and sponsor contributions*

*Implements a referral system with rewards*


## State Variables
### gamePools
Mapping of session ID to its prize pool and fee configuration


```solidity
mapping(uint256 gameId => GamePool pool) public gamePools;
```


### hasClaimed
Mapping of game ID and player address to whether they have claimed their reward


```solidity
mapping(uint256 => mapping(address => bool)) public hasClaimed;
```


### hasRefunded
Mapping of game ID and player address to whether they have received a refund


```solidity
mapping(uint256 => mapping(address => bool)) public hasRefunded;
```


### sponsorAmounts
Mapping of sponsor address and game ID to the amount they sponsored


```solidity
mapping(address sponsor => mapping(uint256 gameId => uint256 amount)) public sponsorAmounts;
```


### referralRewards
Mapping of game ID and referrer address to their referral reward amount


```solidity
mapping(uint256 gameId => mapping(address referrer => uint256 referralReward)) public referralRewards;
```


### protocolFee
Protocol fee percentage in basis points


```solidity
uint256 public protocolFee = 500;
```


### maxCreatorFee
Maximum allowed creator fee percentage in basis points


```solidity
uint256 public maxCreatorFee = 1000;
```


### REFERRER_FEE
Referrer fee percentage in basis points


```solidity
uint256 public constant REFERRER_FEE = 200;
```


### MAX_GAME_FEES
Maximum total fees allowed in basis points


```solidity
uint256 public constant MAX_GAME_FEES = 3000;
```


### BASIS_POINTS
Basis points denominator (10000 = 100%)


```solidity
uint256 public constant BASIS_POINTS = 10000;
```


## Functions
### constructor


```solidity
constructor(address _registry) SessionManagerBase(_registry);
```

### getRewards

Calculates the total rewards available for distribution to winners


```solidity
function getRewards(uint256 gameId) public view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the session|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of tokens available for rewards after deducting fees|


### sponsorGame

Allows a sponsor to add funds to a session's prize pool


```solidity
function sponsorGame(uint256 gameId, uint256 amount) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|The ID of the session to sponsor|
|`amount`|`uint256`|The amount of tokens to sponsor|


### _claimReferralReward


```solidity
function _claimReferralReward(uint256 gameId) internal;
```

### _distributeFees


```solidity
function _distributeFees(uint256 gameId, address creator, address protocolTreasury) internal;
```

### _refundSponsorFunds


```solidity
function _refundSponsorFunds(uint256 gameId, address sponsor) internal;
```

### _distributeRewards


```solidity
function _distributeRewards(uint256 gameId, address winner, uint256 reward) internal;
```

### _refundEntryFee


```solidity
function _refundEntryFee(uint256 gameId, address player) internal;
```

### _payEntryFee


```solidity
function _payEntryFee(uint256 gameId, address player) internal;
```

### _createGamePool


```solidity
function _createGamePool(uint256 gameId, uint256 _ticketPrice, uint256 _creatorFee, address _token) internal;
```

### setMaxFees

Sets the maximum allowed creator fee and protocol fee percentages

*Only callable by the contract owner*

*The sum of fees cannot exceed MAX_GAME_FEES*


```solidity
function setMaxFees(uint256 _maxCreatorFee, uint256 _protocolFee) external onlyRole(PROTOCOL_ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_maxCreatorFee`|`uint256`|The new maximum creator fee percentage in basis points|
|`_protocolFee`|`uint256`|The new protocol fee percentage in basis points|


## Events
### Deposit

```solidity
event Deposit(address indexed player, uint256 amount);
```

### GameSponsored

```solidity
event GameSponsored(uint256 indexed gameId, address indexed sponsor, address token, uint256 amount);
```

### RefundSponsorFunds

```solidity
event RefundSponsorFunds(uint256 indexed gameId, address indexed sponsor, address token, uint256 amount);
```

### MaxFeesSet

```solidity
event MaxFeesSet(uint256 maxCreatorFee, uint256 protocolFee);
```

### ReferralRewardClaimed

```solidity
event ReferralRewardClaimed(uint256 indexed gameId, address indexed referrer, address indexed token, uint256 amount);
```

## Errors
### InsufficientBalance

```solidity
error InsufficientBalance(address player, address token, uint256 balance, uint256 required);
```

### AlreadyClaimed

```solidity
error AlreadyClaimed(address player, uint256 gameId);
```

### FeesAlreadyPaid

```solidity
error FeesAlreadyPaid(uint256 gameId);
```

### NoRewardAvailable

```solidity
error NoRewardAvailable(uint256 gameId);
```

### NotEnoughFunds

```solidity
error NotEnoughFunds(address token, uint256 balance);
```

### AlreadyRefunded

```solidity
error AlreadyRefunded(address player, uint256 gameId);
```

### InvalidCreatorFee

```solidity
error InvalidCreatorFee(uint256 creatorFee, uint256 maxCreatorFee);
```

### InvalidMaxFees

```solidity
error InvalidMaxFees(uint256 maxCreatorFee, uint256 protocolFee);
```

## Structs
### GamePool
Represents a session's prize pool and fee configuration


```solidity
struct GamePool {
    uint256 gameId;
    uint256 ticketPrice;
    uint256 creatorFee;
    uint256 protocolFee;
    uint256 totalCollectedAmount;
    address token;
    bool feesPaid;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`gameId`|`uint256`|Unique identifier for the session|
|`ticketPrice`|`uint256`|Price for each participant to join the session|
|`creatorFee`|`uint256`|Percentage of fees that go to the session creator (in basis points)|
|`protocolFee`|`uint256`|Percentage of fees that go to the protocol (in basis points)|
|`totalCollectedAmount`|`uint256`|Total amount of tokens collected in the pool|
|`token`|`address`|Address of the token used for payments|
|`feesPaid`|`bool`|Whether the creator and protocol fees have been distributed|

