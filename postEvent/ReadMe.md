## Mixpanel Event Server

This project is a lightweight server built using Deno, designed to receive events and send them to Mixpanel for analytics tracking. The server accepts POST requests with event data and processes them accordingly.

### Features
* **CORS Support:** The server allows cross-origin requests.
* **Environment Variable Configuration:** Mixpanel token is read from environment variables for secure access.
* **Input Validation:** Validates the request body to ensure required fields are present.
* **Error Handling:** Provides descriptive error responses for various failure scenarios.

### Requirements
* **Deno:** Ensure you have Deno installed on your machine. This server is built using Deno, a modern runtime for JavaScript and TypeScript.
* **Mixpanel Token:** You need an active Mixpanel project and a valid token to track events.

### Environment Configuration
Before running the server, set up the environment variable for your Mixpanel token:

```bash
export MIXPANEL_TOKEN='your_mixpanel_token_here'
```

### How to Run
To start the server, run the following command in your terminal:

```bash
deno run --allow-net --allow-env your_server_file.ts
```

Replace `your_server_file.ts` with the actual filename of your server code.

### API Usage

#### Endpoint
**POST /**
This endpoint receives and processes event data to be sent to Mixpanel.

#### Request Body
You need to send a JSON object with the following structure:

```json
{
  "event": "Event Name",
  "properties": {
    "time": 1625247600,
    "distinct_id": "user_12345",
    "$insert_id": "insert_id_12345",
    "device": "web",
    "plan": "pro",
    "button": "signup",
    "user_type": "guest"
  }
}
```

#### Response
* **Success (200):** The event was sent successfully to Mixpanel.
* **Error (4xx):** Descriptive error message regarding client-side issues (e.g., invalid JSON, missing event name).
* **Server Error (500):** Generic error message for server issues.

### CORS Support
The server is set up to handle CORS, allowing cross-origin requests. It supports the following methods:

* POST
* OPTIONS

### Example Usage
Here’s an example of how to send a request using curl:

```bash
curl -X POST http://localhost:8000/ \
-H "Content-Type: application/json" \
-d '{
  "event": "User Sign Up",
  "properties": {
    "time": 1625247600,
    "distinct_id": "user_12345",
    "$insert_id": "insert_id_12345",
    "device": "web",
    "plan": "pro",
    "button": "signup",
    "user_type": "guest"
  }
}'
```

### Troubleshooting
* If the `MIXPANEL_TOKEN` environment variable is not set, the server will throw an error and not start.
* Ensure that the request body is a valid JSON structure and includes all required fields.
