# OCPP-JS

A Node.js client implementation for the Open Charge Point Protocol (OCPP) 1.6 over WebSocket, designed to simulate a charging station and communicate with a central system.

## Features

- **OCPP 1.6 Protocol Support**: Implements the OCPP 1.6 JSON message format
- **WebSocket Communication**: Connects to central systems via WebSocket
- **Authentication**: Basic authentication support for secure connections
- **Heartbeat Monitoring**: Automatic heartbeat messages to maintain connection
- **Boot Notification**: Sends boot notification when connecting to central system
- **Environment Configuration**: Flexible configuration via environment variables

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Access to an OCPP central system (e.g., EMQX Cloud deployment)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/0721Betty/ocpp-js.git
cd ocpp-js
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp env.template .env.local
```

4. Edit `.env.local` with your actual configuration:

```env
OCPP_USERNAME=your_username
OCPP_PASSWORD=your_password
OCPP_CLIENT_ID=your_charge_point_id
EMQX_CLOUD_DEPLOYMENT_ADDRESS=your_emqx_cloud_deployment_address
```

## Usage

### Starting the Client

Run the OCPP client:

```bash
npm start
```

Or directly with Node.js:

```bash
node client.js
```

### Configuration

The client can be configured through environment variables or by modifying `config.js`:

- **OCPP_USERNAME**: Authentication username
- **OCPP_PASSWORD**: Authentication password  
- **OCPP_CLIENT_ID**: Unique charge point identifier
- **EMQX_CLOUD_DEPLOYMENT_ADDRESS**: WebSocket server address

### Default Behavior

When started, the client will:

1. Connect to the configured WebSocket server
2. Send a BootNotification message with charge point details
3. Send Heartbeat messages every 30 seconds
4. Respond to Heartbeat requests from the central system
5. Log all incoming and outgoing messages

## Project Structure

```
ocpp-js/
├── client.js          # Main OCPP client implementation
├── config.js          # Configuration management
├── env.template       # Environment variables template
├── package.json       # Project dependencies and scripts
└── README.md          # This file
```

## Dependencies

- **ws**: WebSocket client for Node.js
- **uuid**: UUID generation for message IDs
- **dotenv**: Environment variable management

## Development

### Adding New OCPP Messages

To add support for additional OCPP message types:

1. Create message structure following OCPP 1.6 specification
2. Add message handling logic in the `ws.on('message')` event handler
3. Implement appropriate response handling

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Links

- [OCPP 1.6 Specification](https://www.openchargealliance.org/protocols/ocpp-16/)
- [EMQX Cloud](https://www.emqx.com/en/cloud)
- [Node.js WebSocket](https://github.com/websockets/ws)
