# Registry
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/Registry.sol)

**Inherits:**
AccessControl

Registry contract for managing the protocol's components which are allowed to be used in a new session


## State Variables
### promptStrategies

```solidity
mapping(address => bool) public promptStrategies;
```


### sessionStrategies

```solidity
mapping(address => bool) public sessionStrategies;
```


### rewardStrategies

```solidity
mapping(address => bool) public rewardStrategies;
```


### paymentTokens

```solidity
mapping(address => bool) public paymentTokens;
```


### engageProtocols

```solidity
mapping(address => bool) public engageProtocols;
```


### referrers
Mapping of player address to their referrer


```solidity
mapping(address player => address referrer) public referrers;
```


### protocolTreasury

```solidity
address public protocolTreasury;
```


## Functions
### constructor

Initializes the Registry contract


```solidity
constructor(address _protocolTreasury);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_protocolTreasury`|`address`|The address of the protocol treasury|


### registerSessionStrategy

Registers or updates a session strategy contract which can be used in a new session

*Verifies that the contract implements ISessionStrategy interface*


```solidity
function registerSessionStrategy(address _sessionStrategy, bool enabled) external onlyRole(PROTOCOL_ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sessionStrategy`|`address`|The address of the session strategy contract|
|`enabled`|`bool`|Whether the session strategy should be enabled or disabled|


### registerPromptStrategy

Registers or updates a prompt strategy contract which can be used in a new session

*Verifies that the contract implements IPromptStrategy interface*


```solidity
function registerPromptStrategy(address _promptStrategy, bool enabled) external onlyRole(PROTOCOL_ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_promptStrategy`|`address`|The address of the prompt strategy contract|
|`enabled`|`bool`|Whether the prompt strategy should be enabled or disabled|


### registerRewardStrategy

Registers or updates a reward strategy contract which can be used in a new session

*Verifies that the contract implements IRewardStrategy interface*


```solidity
function registerRewardStrategy(address _rewardStrategy, bool enabled) external onlyRole(PROTOCOL_ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_rewardStrategy`|`address`|The address of the reward strategy contract|
|`enabled`|`bool`|Whether the reward strategy should be enabled or disabled|


### registerPaymentToken

Registers or updates a payment token


```solidity
function registerPaymentToken(address _paymentToken, bool enabled) external onlyRole(PROTOCOL_ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_paymentToken`|`address`|The address of the payment token contract|
|`enabled`|`bool`|Whether the payment token should be enabled or disabled|


### registerEngageProtocol

Registers a new version of the engage protocol contract


```solidity
function registerEngageProtocol(address _engageProtocol) external onlyRole(PROTOCOL_ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_engageProtocol`|`address`|The address of the engage protocol contract|


### setProtocolTreasury

Sets the protocol treasury address


```solidity
function setProtocolTreasury(address _protocolTreasury) public onlyRole(PROTOCOL_ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_protocolTreasury`|`address`|The address of the protocol treasury|


### setReferrer

Sets a referrer for a player

*A player cannot refer themselves*


```solidity
function setReferrer(address player, address referrer) external onlyRole(ADMIN_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`player`|`address`|The address of the player|
|`referrer`|`address`|The address of the referrer|


## Events
### SessionStrategyRegistered

```solidity
event SessionStrategyRegistered(address indexed sessionStrategy, bool enabled);
```

### PromptStrategyRegistered

```solidity
event PromptStrategyRegistered(address indexed promptStrategy, bool enabled);
```

### RewardStrategyRegistered

```solidity
event RewardStrategyRegistered(address indexed rewardStrategy, bool enabled);
```

### PaymentTokenRegistered

```solidity
event PaymentTokenRegistered(address indexed paymentToken, bool enabled);
```

### EngageProtocolRegistered

```solidity
event EngageProtocolRegistered(address indexed engageProtocol, bool enabled);
```

### ProtocolTreasurySet

```solidity
event ProtocolTreasurySet(address treasury);
```

### ReferrerUpdated

```solidity
event ReferrerUpdated(address indexed player, address indexed referrer);
```

## Errors
### UnsupportedContract

```solidity
error UnsupportedContract(address contractAddress);
```

### InvalidAddress

```solidity
error InvalidAddress();
```

### CantReferSelf

```solidity
error CantReferSelf(address player);
```

