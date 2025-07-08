# Constants
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/Roles.sol)

### PROTOCOL_ADMIN_ROLE
*Role for setting global variables, mostly related to session rules.*


```solidity
bytes32 constant PROTOCOL_ADMIN_ROLE = keccak256("PROTOCOL_ADMIN_ROLE");
```

### ADMIN_ROLE
*Role for account-related actions: verification, referrers*


```solidity
bytes32 constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
```

### UPGRADER_ROLE
*Role for turning on/off protocol version by disabling session creation. Same address as the owner of the Registry, so it can disable/enable modules*


```solidity
bytes32 constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
```

