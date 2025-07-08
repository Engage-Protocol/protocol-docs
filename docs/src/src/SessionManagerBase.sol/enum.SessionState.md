# SessionState
[Git Source](https://github.com/Engage-Protocol/engage-protocol/blob/c5ee1562bd13fd9b4ca0d2484df6aceaf0760cfb/src/SessionManagerBase.sol)

Represents the possible states of a session throughout its lifecycle


```solidity
enum SessionState {
    None,
    Created,
    Ongoing,
    Ended,
    Concluded,
    Cancelled
}
```

