# SessionResultAsserter
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/offchain/uma/SessionResultAsserter.sol)


## State Variables
### usdc

```solidity
IERC20 public immutable usdc;
```


### optimisticOracle

```solidity
OptimisticOracleV3Interface public immutable optimisticOracle;
```


### assertionLiveness

```solidity
uint64 public constant assertionLiveness = 7200;
```


### defaultIdentifier

```solidity
bytes32 public immutable defaultIdentifier;
```


### assertions

```solidity
mapping(bytes32 => Assertion) public assertions;
```


## Functions
### constructor


```solidity
constructor(address _usdc, address _optimisticOracle);
```

### getData


```solidity
function getData(bytes32 assertionId) public view returns (bool, string memory, string memory);
```

### assertDataFor


```solidity
function assertDataFor(
    uint256 sessionId,
    string calldata resultCid,
    string memory resolutionGitRepoAtCommitHash,
    address[] calldata winners,
    uint256[] calldata totalXPs,
    uint256[] calldata totalTimes,
    address asserter
) internal returns (bytes32 assertionId);
```

### assertionResolvedCallback


```solidity
function assertionResolvedCallback(bytes32 assertionId, bool assertedTruthfully) public;
```

### assertionDisputedCallback


```solidity
function assertionDisputedCallback(bytes32 assertionId) public;
```

### concat


```solidity
function concat(address[] calldata addresses) internal pure returns (string memory);
```

### concat


```solidity
function concat(uint256[] calldata data) internal pure returns (string memory);
```

## Events
### DataAsserted

```solidity
event DataAsserted(
    uint256 indexed sessionId,
    string resultCid,
    string calculationCid,
    address indexed asserter,
    bytes32 indexed assertionId
);
```

### DataAssertionResolved

```solidity
event DataAssertionResolved(
    uint256 indexed sessionId,
    string resultCid,
    string calculationCid,
    address indexed asserter,
    bytes32 indexed assertionId
);
```

## Errors
### InvalidAddress

```solidity
error InvalidAddress();
```

## Structs
### Assertion

```solidity
struct Assertion {
    uint256 sessionId;
    string resultCid;
    string calculationCid;
    address asserter;
    bool resolved;
    address[] winners;
    uint256[] totalXPs;
    uint256[] totalTimes;
}
```

