# Engage Protocol

## Overview
Engage Protocol implements a way for creators to host onchain engagement sessions, in a form of a series of prompts, where the participants react to them. After the session ended, the results are evaluated and potential rewards are distributed. The protocol implements a modular architecture with 4 key parts:
- SessionManager: the core protocol
- SessionStrategies: manages the evaluation of the sessions
- RewardStrategies: manages how many points are given for answering a prompt
- PromptStrategies: a prompt strategy implements a certain prompt type which can be used in a session

## Development
Development and deployment is done using (foundry)[https://getfoundry.sh/introduction/overview].

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```
