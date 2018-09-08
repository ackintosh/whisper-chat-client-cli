# Whisper chat client DApp for CLI

## Usage

### Run Whisper node

```bash
geth --dev --ws --wsport 8546 --wsaddr 0.0.0.0 --wsorigins "*" --wsapi "eth,web3,shh" console
```

### Install the DApp

```bash
git checkout https://github.com/ackintosh/whisper-chat-client-cli.git
npm install -g
```

### Subscribe a topic

```bash
whisper-chat-client [a topic you want to subscribe to]
```
