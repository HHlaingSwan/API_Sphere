import { Code, Layers, GitFork, Radio, Terminal, Cpu, FileText, Video } from "lucide-react";

export interface CodeSnippet {
  curl: string;
  javascript: string;
  python: string;
  go: string;
  csharp: string;
  java: string;
}

export interface MockResponseDetail {
  status: string;
  statusText: string;
  headers: Record<string, string>;
  body: any;
}

export interface DocSection {
  type: string;
  title: string;
  data: any;
}

export interface ProtocolDoc {
  id: string;
  name: string;
  category: string;
  icon: any;
  tagline: string;
  description: string;
  overview: string;
  pros: string[];
  cons: string[];
  methods: string[];
  paths: string[];
  defaultPayload: string;
  codeSnippets: CodeSnippet;
  mockResponses: Record<string, MockResponseDetail>;
  sections?: DocSection[];
}

export const protocolDocs: Record<string, ProtocolDoc> = {
  rest: {
    id: "rest",
    name: "REST",
    category: "Traditional & Enterprise",
    icon: Code,
    tagline: "Representational State Transfer",
    description: "The classic architectural style of the modern web. REST models server data as resources identified by unique URLs, manipulated using standard HTTP verbs.",
    overview: "REST (Representational State Transfer) is an architectural style first introduced by Roy Fielding in 2000. It relies on a stateless, client-server routing system. REST uses standard HTTP methods: GET (read), POST (create), PUT (update), and DELETE (remove). Resource representations are typically formatted as JSON payloads.",
    pros: [
      "Highly scalable due to stateless operation.",
      "Native browser caching support for GET requests.",
      "Decoupled client/server development cycles.",
      "Easy learning curve and universal client support."
    ],
    cons: [
      "Over-fetching: Client receives more data than required.",
      "Under-fetching: Requires multiple round-trips to get nested resources.",
      "Lack of strict type contracts out-of-the-box."
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    paths: ["/api/v1/users", "/api/v1/users/1", "/api/v1/products"],
    defaultPayload: JSON.stringify({ name: "Alex Mercer", email: "alex@sphere.dev", role: "Developer" }, null, 2),
    codeSnippets: {
      curl: `curl -X GET https://api.sphere.dev/v1/users \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer token_xyz"`,
      javascript: `fetch("https://api.sphere.dev/v1/users", {\n  method: "GET",\n  headers: {\n    "Content-Type": "application/json",\n    "Authorization": "Bearer token_xyz"\n  }\n})\n.then(res => res.json())\n.then(data => console.log(data));`,
      python: `import requests\n\nheaders = {\n    "Content-Type": "application/json",\n    "Authorization": "Bearer token_xyz"\n}\nresponse = requests.get("https://api.sphere.dev/v1/users", headers=headers)\nprint(response.json())`,
      go: `package main\n\nimport (\n\t"fmt"\n\t"net/http"\n\t"io"\n)\n\nfunc main() {\n\treq, _ := http.NewRequest("GET", "https://api.sphere.dev/v1/users", nil)\n\treq.Header.Set("Content-Type", "application/json")\n\treq.Header.Set("Authorization", "Bearer token_xyz")\n\n\tclient := &http.Client{}\n\tresp, _ := client.Do(req)\n\tdefer resp.Body.Close()\n\tbody, _ := io.ReadAll(resp.Body)\n\tfmt.Println(string(body))\n}`,
      csharp: `var client = new HttpClient();\nclient.DefaultRequestHeaders.Add("Authorization", "Bearer token_xyz");\n\nvar response = await client.GetAsync("https://api.sphere.dev/v1/users");\nvar json = await response.Content.ReadAsStringAsync();\nConsole.WriteLine(json);`,
      java: `var client = HttpClient.newHttpClient();\nvar request = HttpRequest.newBuilder()\n    .uri(URI.create("https://api.sphere.dev/v1/users"))\n    .header("Authorization", "Bearer token_xyz")\n    .GET()\n    .build();\n\nvar response = client.send(request, HttpResponse.BodyHandlers.ofString());\nSystem.out.println(response.body());`
    },
    mockResponses: {
      "GET:/api/v1/users": {
        status: "200",
        statusText: "OK",
        headers: { "Content-Type": "application/json", "Cache-Control": "max-age=3600", "X-Powered-By": "Next.js" },
        body: {
          success: true,
          users: [
            { id: 1, name: "Alice Smith", email: "alice@example.com" },
            { id: 2, name: "Bob Jones", email: "bob@example.com" }
          ]
        }
      },
      "GET:/api/v1/users/1": {
        status: "200",
        statusText: "OK",
        headers: { "Content-Type": "application/json", "Cache-Control": "max-age=600" },
        body: { id: 1, name: "Alice Smith", email: "alice@example.com", joined: "2026-01-15" }
      },
      "GET:/api/v1/products": {
        status: "200",
        statusText: "OK",
        headers: { "Content-Type": "application/json" },
        body: {
          products: [
            { id: 101, title: "Quantum API Gateway", price: 49.99 },
            { id: 102, title: "Webhook Receiver Node", price: 19.99 }
          ]
        }
      },
      "POST:/api/v1/users": {
        status: "201",
        statusText: "Created",
        headers: { "Content-Type": "application/json", "Location": "/api/v1/users/3" },
        body: { success: true, message: "User registered successfully", userId: 3, timestamp: "2026-06-07T13:40:00Z" }
      },
      "PUT:/api/v1/users/1": {
        status: "200",
        statusText: "OK",
        headers: { "Content-Type": "application/json" },
        body: { success: true, message: "User profile updated successfully", modifiedFields: ["name", "role"] }
      },
      "DELETE:/api/v1/users/1": {
        status: "200",
        statusText: "OK",
        headers: { "Content-Type": "application/json" },
        body: { success: true, message: "User resource 1 deleted permanently." }
      }
    },
    sections: [
      {
        type: "rest-status-codes",
        title: "HTTP Status Codes",
        data: [
          { code: 200, name: "OK", description: "Standard response for successful HTTP requests." },
          { code: 201, name: "Created", description: "Request fulfilled and a new resource created." },
          { code: 204, name: "No Content", description: "Server processed the request, no content returned." },
          { code: 400, name: "Bad Request", description: "Server cannot process the request due to client error." },
          { code: 401, name: "Unauthorized", description: "Authentication is required and has failed or not been provided." },
          { code: 403, name: "Forbidden", description: "Server understood the request but refuses to authorize it." },
          { code: 404, name: "Not Found", description: "The requested resource could not be found." },
          { code: 500, name: "Internal Server Error", description: "Generic error response for server failures." },
        ]
      }
    ]
  },
  graphql: {
    id: "graphql",
    name: "GraphQL",
    category: "Modern & Query-driven",
    icon: Layers,
    tagline: "API Query Language",
    description: "An open-source data query and manipulation language for APIs. GraphQL queries specify exactly the shapes of data requested from backend graphs.",
    overview: "GraphQL was created by Facebook in 2012 and open-sourced in 2015. Instead of exposing multiple URL endpoints like REST, GraphQL exposes a single HTTP endpoint (usually /graphql) that accepts queries specifying required fields, avoiding over-fetching and under-fetching.",
    pros: [
      "Clients specify exactly what they need — zero over-fetching.",
      "Single request gathers nested graph data fields.",
      "Strongly typed schema using SDL (Schema Definition Language)."
    ],
    cons: [
      "Harder to cache than REST because all requests run via POST.",
      "Complex queries can overload database performance.",
      "N+1 database query issues require data loader patterns."
    ],
    methods: ["POST"],
    paths: ["/graphql"],
    defaultPayload: `query GetUserDetails {\n  user(id: "1") {\n    name\n    email\n    posts {\n      title\n      views\n    }\n  }\n}`,
    codeSnippets: {
      curl: `curl -X POST https://api.sphere.dev/graphql \\\n  -H "Content-Type: application/json" \\\n  -d '{"query": "query { user(id: \\"1\\") { name } }"}'`,
      javascript: `fetch("https://api.sphere.dev/graphql", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({\n    query: \`query {\n      user(id: "1") {\n        name\n      }\n    }\`\n  })\n})\n.then(res => res.json())\n.then(data => console.log(data));`,
      python: `import requests\n\nquery = """\nquery {\n  user(id: "1") {\n    name\n  }\n}\n"""\nresponse = requests.post("https://api.sphere.dev/graphql", json={"query": query})\nprint(response.json())`,
      go: `package main\n\nimport (\n\t"bytes"\n\t"encoding/json"\n\t"fmt"\n\t"net/http"\n\t"io"\n)\n\nfunc main() {\n\tqueryMap := map[string]string{\n\t\t"query": "{ user(id: \\"1\\") { name } }",\n\t}\n\tjsonValue, _ := json.Marshal(queryMap)\n\tresp, _ := http.Post("https://api.sphere.dev/graphql", "application/json", bytes.NewBuffer(jsonValue))\n\tdefer resp.Body.Close()\n\tbody, _ := io.ReadAll(resp.Body)\n\tfmt.Println(string(body))\n}`,
      csharp: `var client = new HttpClient();\nvar query = new { query = "{ user(id: \"1\") { name } }" };\nvar content = new StringContent(\n    JsonSerializer.Serialize(query),\n    Encoding.UTF8, "application/json");\n\nvar response = await client.PostAsync("https://api.sphere.dev/graphql", content);\nvar json = await response.Content.ReadAsStringAsync();\nConsole.WriteLine(json);`,
      java: `var client = HttpClient.newHttpClient();\nvar json = "{ \"query\": \"{ user(id: \\\"1\\\") { name } }\" }";\nvar request = HttpRequest.newBuilder()\n    .uri(URI.create("https://api.sphere.dev/graphql"))\n    .header("Content-Type", "application/json")\n    .POST(HttpRequest.BodyPublishers.ofString(json))\n    .build();\n\nvar response = client.send(request, HttpResponse.BodyHandlers.ofString());\nSystem.out.println(response.body());`
    },
    mockResponses: {
      "POST:/graphql": {
        status: "200",
        statusText: "OK",
        headers: { "Content-Type": "application/json" },
        body: {
          data: {
            user: {
              name: "Alice Smith",
              email: "alice@example.com",
              posts: [
                { title: "Demystifying GraphQL Schemas", views: 245 },
                { title: "V4 Tailwind Architecture Guide", views: 1205 }
              ]
            }
          }
        }
      }
    },
    sections: [
      {
        type: "graphql-schema",
        title: "Schema Types",
        data: {
          queries: [
            { name: "user(id: ID!): User", description: "Fetch a single user by ID." },
            { name: "users(limit: Int): [User]", description: "Fetch a paginated list of users." },
            { name: "posts(authorId: ID!): [Post]", description: "Fetch all posts by a specific author." },
          ],
          mutations: [
            { name: "createUser(input: CreateUserInput!): User", description: "Create a new user." },
            { name: "updateUser(id: ID!, input: UpdateUserInput!): User", description: "Update an existing user." },
            { name: "deleteUser(id: ID!): Boolean", description: "Delete a user by ID." },
          ]
        }
      }
    ]
  },
  webhooks: {
    id: "webhooks",
    name: "Webhooks",
    category: "Event-Driven & Push",
    icon: GitFork,
    tagline: "Event-Driven HTTP Callbacks",
    description: "Reverse APIs that push updates to external servers. Rather than client polling, the server sends a POST message payload as soon as an event occurs.",
    overview: "Webhooks are user-defined HTTP callbacks. They are triggered by events (e.g. Stripe transaction, GitHub commit). The origin server sends an HTTP POST request containing event payloads to the client's public URL in real-time.",
    pros: [
      "Highly efficient: Removes the need for polling endpoints.",
      "Real-time event delivery.",
      "Simple HTTP protocol integration."
    ],
    cons: [
      "Hard to debug locally: Needs tunnels like ngrok.",
      "Reliability issues: Requires retry systems if receiver is offline.",
      "Security risks: Payload spoofing requires cryptographic sign verification."
    ],
    methods: ["POST (Incoming)"],
    paths: ["/webhooks/stripe-checkout"],
    defaultPayload: JSON.stringify({
      id: "evt_3N8xJ2K",
      type: "checkout.session.completed",
      created: 1780820400,
      data: {
        object: {
          customer_email: "user@domain.com",
          amount_total: 9900,
          currency: "usd",
          payment_status: "paid"
        }
      }
    }, null, 2),
    codeSnippets: {
      curl: `curl -X POST https://my-server.com/webhooks/stripe-checkout \\\n  -H "Content-Type: application/json" \\\n  -H "Stripe-Signature: t=1780820400,v1=signature_hash" \\\n  -d '{"id": "evt_3N8xJ2K", "type": "checkout.session.completed"}'`,
      javascript: `// Express.js Route Receiver Handler\nconst express = require('express');\nconst app = express();\n\napp.post('/webhooks/stripe-checkout', express.json(), (req, res) => {\n  const event = req.body;\n  console.log("Received event type:", event.type);\n  res.status(200).send({ received: true });\n});`,
      python: `# Flask Hook Handler\nfrom flask import Flask, request, jsonify\napp = Flask(__name__)\n\n@app.route('/webhooks/stripe-checkout', methods=['POST'])\ndef webhook():\n    payload = request.json\n    print("Processing event:", payload['type'])\n    return jsonify({"success": True}), 200`,
      go: `package main\n\nimport (\n\t"encoding/json"\n\t"net/http"\n)\n\ntype WebhookEvent struct {\n\tType string \`json:"type"\`\n}\n\nfunc handleWebhook(w http.ResponseWriter, r *http.Request) {\n\tvar event WebhookEvent\n\t_ = json.NewDecoder(r.Body).Decode(&event)\n\tw.WriteHeader(http.StatusOK)\n\tw.Write([]byte(\`{"received":true}\`))\n}`,
      csharp: `// ASP.NET Core Controller\n[ApiController]\n[Route("webhooks/[controller]")] \npublic class StripeWebhookController : ControllerBase\n{\n    [HttpPost]\n    public IActionResult Handle([FromBody] JsonElement payload)\n    {\n        var eventType = payload.GetProperty("type").GetString();\n        Console.WriteLine($"Received event: {eventType}");\n        return Ok(new { received = true });\n    }\n}`,
      java: `// Spring Boot Controller\n@RestController\n@RequestMapping("/webhooks/stripe-checkout")\npublic class WebhookController {\n\n    @PostMapping\n    public ResponseEntity<Map<String, Boolean>> handle(\n            @RequestBody Map<String, Object> payload) {\n        String eventType = (String) payload.get("type");\n        System.out.println("Received event: " + eventType);\n        return ResponseEntity.ok(Map.of("received", true));\n    }\n}`
    },
    mockResponses: {
      "POST (Incoming):/webhooks/stripe-checkout": {
        status: "200",
        statusText: "OK",
        headers: { "Content-Type": "application/json", "X-Webhook-Verified": "true" },
        body: {
          success: true,
          action: "Provisioned database product key",
          email_sent: true,
          status: "processed"
        }
      }
    },
    sections: [
      {
        type: "webhook-events",
        title: "Common Event Types",
        data: [
          { event: "checkout.session.completed", description: "A customer successfully completed a checkout.", category: "Payment" },
          { event: "invoice.payment_succeeded", description: "An invoice payment succeeded.", category: "Billing" },
          { event: "customer.subscription.updated", description: "A subscription was updated (plan change, renewal).", category: "Subscription" },
          { event: "push.commit", description: "A commit was pushed to a repository.", category: "Source Control" },
          { event: "pull_request.opened", description: "A new pull request was opened.", category: "Source Control" },
          { event: "deployment.completed", description: "A deployment finished successfully.", category: "CI/CD" },
        ]
      }
    ]
  },
  websockets: {
    id: "websockets",
    name: "WebSockets",
    category: "Real-time & Bidirectional",
    icon: Radio,
    tagline: "Persistent Full-Duplex TCP Connections",
    description: "A continuous, low-overhead communication channel operating over a single TCP connection. Both client and server can send data payloads independently at any time.",
    overview: "WebSockets establish a persistent link over TCP, starting with an HTTP handshake. Once connected, WebSocket frames have very low overhead (just a few bytes), making them far more efficient than HTTP polling for active real-time systems.",
    pros: [
      "Real-time bidirectional data flow.",
      "Low overhead: No HTTP headers needed for data packets.",
      "Perfect for high-frequency updates (gaming, chats)."
    ],
    cons: [
      "Difficult to scale: Requires sticky sessions and active connection pools.",
      "No native browser caching support.",
      "Vulnerable to stateful disconnection issues in unstable networks."
    ],
    methods: ["CONNECT", "SEND MESSAGE"],
    paths: ["/ws/live-feed"],
    defaultPayload: JSON.stringify({ action: "subscribe", channel: "price-ticks", symbol: "BTC-USD" }, null, 2),
    codeSnippets: {
      curl: `# WebSockets cannot be queried using standard cURL.\n# Use 'wscat' instead:\nwscat -c wss://api.sphere.dev/ws/live-feed`,
      javascript: `const socket = new WebSocket("wss://api.sphere.dev/ws/live-feed");\n\nsocket.onopen = () => {\n  socket.send(JSON.stringify({ action: "subscribe", symbol: "BTC-USD" }));\n};\n\nsocket.onmessage = (event) => {\n  console.log("Data pushed:", JSON.parse(event.data));\n};`,
      python: `import websocket\nimport json\n\ndef on_message(ws, message):\n    print("Received:", message)\n\ndef on_open(ws):\n    ws.send(json.dumps({"action": "subscribe", "symbol": "BTC-USD"}))\n\nws = websocket.WebSocketApp("wss://api.sphere.dev/ws/live-feed", on_message=on_message, on_open=on_open)\nws.run_forever()`,
      go: `package main\n\nimport (\n\t"github.com/gorilla/websocket"\n\t"log"\n)\n\nfunc main() {\n\tconn, _, _ := websocket.DefaultDialer.Dial("wss://api.sphere.dev/ws/live-feed", nil)\n\tdefer conn.Close()\n\t\n\t_ = conn.WriteJSON(map[string]string{"action": "subscribe", "symbol": "BTC-USD"})\n\tfor {\n\t\tvar msg interface{}\n\t\t_ = conn.ReadJSON(&msg)\n\t\tlog.Println("Pushed:", msg)\n\t}\n}`,
      csharp: `using var ws = new ClientWebSocket();\nawait ws.ConnectAsync(new Uri("wss://api.sphere.dev/ws/live-feed"), CancellationToken.None);\n\nvar msg = JsonSerializer.Serialize(new { action = "subscribe", symbol = "BTC-USD" });\nawait ws.SendAsync(Encoding.UTF8.GetBytes(msg), WebSocketMessageType.Text, true, CancellationToken.None);\n\nvar buffer = new byte[1024];\nvar result = await ws.ReceiveAsync(buffer, CancellationToken.None);\nConsole.WriteLine(Encoding.UTF8.GetString(buffer, 0, result.Count));`,
      java: `var ws = new WebSocket.Builder().build();\nws.connect(URI.create("wss://api.sphere.dev/ws/live-feed"));\nws.sendText("{ \"action\": \"subscribe\", \"symbol\": \"BTC-USD\" }", true);\n\nws.handler(new WebSocket.Listener() {\n    @Override\n    public void onText(WebSocket webSocket, CharSequence data, boolean last) {\n        System.out.println("Pushed: " + data);\n        webSocket.request(1);\n    }\n});`
    },
    mockResponses: {
      "CONNECT:/ws/live-feed": {
        status: "101",
        statusText: "Switching Protocols",
        headers: { "Upgrade": "websocket", "Connection": "Upgrade", "Sec-WebSocket-Accept": "fgh88df/dfgDFG=" },
        body: { connection: "established", mode: "persistent", activeClients: 142 }
      },
      "SEND MESSAGE:/ws/live-feed": {
        status: "200 (Stream Echo)",
        statusText: "OK",
        headers: { "Content-Type": "application/json" },
        body: { event: "subscribed_success", topic: "price-ticks", channel: "BTC-USD", initialTick: { price: 68412.5, volume: 14.5 } }
      }
    },
    sections: [
      {
        type: "websocket-channels",
        title: "Channel Topics",
        data: [
          { channel: "price-ticks", description: "Real-time cryptocurrency and stock price updates.", direction: "Server → Client" },
          { channel: "order-book", description: "Bid/ask depth chart updates for trading pairs.", direction: "Server → Client" },
          { channel: "chat-room", description: "Bidirectional chat messages between users.", direction: "Bidirectional" },
          { channel: "cursor-position", description: "Live cursor tracking for collaborative editing.", direction: "Bidirectional" },
          { channel: "notifications", description: "Server-pushed user notifications and alerts.", direction: "Server → Client" },
        ]
      }
    ]
  },
  grpc: {
    id: "grpc",
    name: "gRPC",
    category: "High Performance RPC",
    icon: Terminal,
    tagline: "High Performance Remote Procedure Call",
    description: "A framework developed by Google that connects client applications directly to methods on remote servers, passing binary payloads in HTTP/2.",
    overview: "gRPC uses Protocol Buffers (Protobuf) as its Interface Definition Language (IDL) to serialize structured payloads into a highly compact binary format. Running on top of HTTP/2, it supports bidirectional streaming and multiplexing out-of-the-box.",
    pros: [
      "Superb performance: Protocol Buffers are much smaller and faster to serialize than JSON.",
      "Strict api contracts built via .proto files.",
      "Full multiplexing support over HTTP/2."
    ],
    cons: [
      "Poor native browser support: Requires gRPC-Web proxies.",
      "Binary format is not human-readable directly without tools.",
      "High learning curve and code generation setup requirements."
    ],
    methods: ["Unary RPC", "Server Stream"],
    paths: ["/UserService/GetUser", "/UserService/ListUsers"],
    defaultPayload: `{\n  "userId": 12,\n  "includeMetadata": true\n}`,
    codeSnippets: {
      curl: `# gRPC uses binary buffers. Use 'grpcurl' instead:\ngrpcurl -plaintext -d '{"userId": 12}' \\\n  api.sphere.dev:50051 UserService/GetUser`,
      javascript: `// Node.js gRPC client call\nconst grpc = require('@grpc/grpc-js');\nconst protoLoader = require('@grpc/proto-loader');\nconst packageDef = protoLoader.loadSync('user.proto', {});\nconst userProto = grpc.loadPackageDefinition(packageDef).UserService;\n\nconst client = new userProto('api.sphere.dev:50051', grpc.credentials.createInsecure());\nclient.GetUser({ userId: 12 }, (err, response) => {\n  console.log("User received:", response);\n});`,
      python: `import grpc\nimport user_pb2\nimport user_pb2_grpc\n\nchannel = grpc.insecure_channel('api.sphere.dev:50051')\nstub = user_pb2_grpc.UserServiceStub(channel)\nresponse = stub.GetUser(user_pb2.UserRequest(userId=12))\nprint("User received:", response.name)`,
      go: `package main\n\nimport (\n\t"context"\n\t"google.golang.org/grpc"\n\tpb "api/user"\n)\n\nfunc main() {\n\tconn, _ := grpc.Dial("api.sphere.dev:50051", grpc.WithInsecure())\n\tdefer conn.Close()\n\tclient := pb.NewUserServiceClient(conn)\n\tres, _ := client.GetUser(context.Background(), &pb.UserRequest{UserId: 12})\n\tprintln(res.Name)\n}`,
      csharp: `using Grpc.Net.Client;\n\nvar channel = GrpcChannel.ForAddress("https://api.sphere.dev:50051");\nvar client = new UserService.UserServiceClient(channel);\n\nvar response = await client.GetUserAsync(new UserRequest { UserId = 12 });\nConsole.WriteLine($"User: {response.Name}");`,
      java: `ManagedChannel channel = ManagedChannelBuilder\n    .forAddress("api.sphere.dev", 50051)\n    .usePlaintext()\n    .build();\n\nvar stub = UserServiceGrpc.newStub(channel);\nstub.getUser(UserRequest.newBuilder().setUserId(12).build(),\n    new StreamObserver<UserResponse>() {\n        @Override\n        public void onNext(UserResponse response) {\n            System.out.println("User: " + response.getName());\n        }\n        @Override\n        public void onCompleted() { channel.shutdown(); }\n        @Override\n        public void onError(Throwable t) {}\n    });`
    },
    mockResponses: {
      "Unary RPC:/UserService/GetUser": {
        status: "GRPC 0 (OK)",
        statusText: "OK",
        headers: { "content-type": "application/grpc", "grpc-status": "0" },
        body: {
          id: 12,
          name: "Marcus Aurelius",
          email: "marcus@rome.gov",
          status: "ACTIVE",
          tags: ["admin", "philosophic"]
        }
      },
      "Server Stream:/UserService/ListUsers": {
        status: "GRPC 0 (OK - Stream)",
        statusText: "OK",
        headers: { "content-type": "application/grpc" },
        body: {
          chunkIndex: 1,
          users: [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
          ]
        }
      }
    },
    sections: [
      {
        type: "grpc-services",
        title: "Service Definitions",
        data: [
          {
            service: "UserService",
            methods: [
              { name: "GetUser", inputType: "GetUserRequest", outputType: "User", description: "Retrieve a single user by ID." },
              { name: "ListUsers", inputType: "ListUsersRequest", outputType: "ListUsersResponse", description: "Fetch a paginated list of users." },
              { name: "CreateUser", inputType: "CreateUserRequest", outputType: "User", description: "Create a new user account." },
              { name: "UpdateUser", inputType: "UpdateUserRequest", outputType: "User", description: "Update an existing user's properties." },
              { name: "DeleteUser", inputType: "DeleteUserRequest", outputType: "DeleteUserResponse", description: "Permanently remove a user." },
            ]
          }
        ]
      }
    ]
  },
  mcp: {
    id: "mcp",
    name: "Model Context Protocol (MCP)",
    category: "AI Agent & Context",
    icon: Cpu,
    tagline: "Model Context Protocol",
    description: "An open standard that connects Large Language Models (LLMs) to external context resources, data systems, and IDE tools safely and securely.",
    overview: "Model Context Protocol (MCP) is an architectural framework designed to link LLM clients (like Claude, Gemini, ChatGPT) to tool-providing servers. It utilizes JSON-RPC 2.0 transport (running via Server-Sent Events or local stdin/stdout streams) to list resources, fetch prompts, and execute server-side tools.",
    pros: [
      "Standardizes tool-calling schemas across different AI providers.",
      "Decoupled security model: LLM suggests actions, local host executes them.",
      "Simplifies integrating local databases, IDE APIs, and custom tooling."
    ],
    cons: [
      "Still emerging: Ecosystem tools are early-stage.",
      "High latency overhead due to double parsing (LLM prompt -> tool trigger -> response -> LLM evaluation).",
      "Requires stateful host client orchestration."
    ],
    methods: ["tools/list", "tools/call"],
    paths: ["/mcp/v1/tools", "/mcp/v1/tools/call"],
    defaultPayload: JSON.stringify({
      method: "tools/call",
      params: {
        name: "execute_sql_query",
        arguments: {
          query: "SELECT name, email FROM users WHERE id = 1"
        }
      }
    }, null, 2),
    codeSnippets: {
      curl: `curl -X POST https://mcp-server.local/mcp/v1/tools/call \\\n  -H "Content-Type: application/json" \\\n  -d '{"jsonrpc": "2.0", "method": "tools/call", "id": 1, "params": {"name": "execute_sql_query", "arguments": {"query": "..."}}}'`,
      javascript: `// JSON-RPC SSE Client connection\nconst client = new mcp.Client();\nawait client.connect(new mcp.SseTransport("https://mcp.sphere.dev/sse"));\n\nconst schemas = await client.callTool("execute_sql_query", {\n  query: "SELECT * FROM users"\n});\nconsole.log(schemas.content[0].text);`,
      python: `# Python MCP Client implementation\nasync with mcp.ClientSession() as session:\n    await session.connect(sse_transport)\n    result = await session.call_tool(\n        "execute_sql_query",\n        arguments={"query": "SELECT * FROM users"}\n    )\n    print("Context injected:", result.content[0].text)`,
      go: `package main\n\nimport (\n\t"context"\n\t"github.com/mcp-protocol/mcp-go/client"\n)\n\nfunc main() {\n\tctx := context.Background()\n\tmcpClient, _ := client.NewClient("https://mcp-server.local/sse")\n\tres, _ := mcpClient.CallTool(ctx, "execute_sql_query", map[string]interface{}{\n\t\t"query": "SELECT * FROM users",\n\t})\n\tprintln(res.Content[0].Text)\n}`,
      csharp: `var client = new HttpClient();\nvar request = new HttpRequestMessage(HttpMethod.Get, "https://mcp-server.local/sse");\nrequest.Headers.Add("Accept", "text/event-stream");\n\nvar response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);\nvar stream = await response.Content.ReadAsStreamAsync();\nusing var reader = new StreamReader(stream);\n\nwhile (!reader.EndOfStream) {\n    var line = await reader.ReadLineAsync();\n    if (line.StartsWith("data:"))\n        Console.WriteLine($"Event: {line[5..].Trim()}");\n}`,
      java: `var url = new URL("https://mcp-server.local/sse");\nvar conn = (HttpURLConnection) url.openConnection();\nconn.setRequestProperty("Accept", "text/event-stream");\nconn.connect();\n\nvar reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));\nString line;\nwhile ((line = reader.readLine()) != null) {\n    if (line.startsWith("data:"))\n        System.out.println("Event: " + line.substring(5).trim());\n}`
    },
    mockResponses: {
      "tools/list:/mcp/v1/tools": {
        status: "200 OK",
        statusText: "Success",
        headers: { "Content-Type": "application/json", "X-MCP-Protocol": "2024-11-05" },
        body: {
          jsonrpc: "2.0",
          result: {
            tools: [
              {
                name: "execute_sql_query",
                description: "Run SQL statement against production postgres instance",
                inputSchema: {
                  type: "object",
                  properties: { query: { type: "string" } },
                  required: ["query"]
                }
              },
              {
                name: "read_file",
                description: "Read full text files from directory",
                inputSchema: {
                  type: "object",
                  properties: { path: { type: "string" } }
                }
              }
            ]
          },
          id: 1
        }
      },
      "tools/call:/mcp/v1/tools/call": {
        status: "200 OK",
        statusText: "Success",
        headers: { "Content-Type": "application/json" },
        body: {
          jsonrpc: "2.0",
          result: {
            content: [
              {
                type: "text",
                text: "Query successfully executed. 1 row returned:\n- name: Alice Smith\n- email: alice@example.com"
              }
            ],
            isError: false
          },
          id: 2
        }
      }
    },
    sections: [
      {
        type: "mcp-tools",
        title: "Connected Tools",
        data: [
          { name: "execute_sql_query", description: "Run arbitrary SQL statements against the connected database.", inputSchema: "{ query: string }", category: "Database" },
          { name: "read_file", description: "Read the contents of a file from the allowed workspace directory.", inputSchema: "{ path: string }", category: "Filesystem" },
          { name: "list_directory", description: "List files and directories in a given path.", inputSchema: "{ path: string }", category: "Filesystem" },
          { name: "search_web", description: "Perform a web search and return top results.", inputSchema: "{ query: string }", category: "Web" },
          { name: "create_issue", description: "Create a new issue in the connected project tracker.", inputSchema: "{ title: string, description?: string }", category: "Project Management" },
        ]
      }
    ]
  },
  soap: {
    id: "soap",
    name: "SOAP",
    category: "Enterprise XML",
    icon: FileText,
    tagline: "Simple Object Access Protocol",
    description: "A strictly typed, XML-based messaging protocol for exchanging structured information in enterprise web services. Operates over HTTP(S), SMTP, and more.",
    overview: "SOAP relies on XML Schema (XSD) for strict contract definitions (WSDL). Requests are wrapped in an Envelope containing a Header and Body. SOAP supports WS-Security for enterprise-grade encryption and signing, making it a staple in banking, healthcare, and government systems.",
    pros: [
      "Built-in error handling via SOAP Faults.",
      "Platform- and language-independent (strict WSDL contract).",
      "WS-Security, WS-AtomicTransaction, and other enterprise extensions."
    ],
    cons: [
      "Heavyweight payload due to verbose XML.",
      "Slower parsing vs JSON-based protocols.",
      "Complex tooling required (WSDL generation, SOAP client libraries)."
    ],
    methods: ["POST"],
    paths: ["/soap/v1/UserService"],
    defaultPayload: JSON.stringify({
      "soap:Envelope": {
        xmlns: { soap: "http://schemas.xmlsoap.org/soap/envelope/" },
        "soap:Body": {
          "tns:GetUser": {
            xmlns: { tns: "http://sphere.dev/UserService" },
            "tns:UserId": 1
          }
        }
      }
    }, null, 2),
    codeSnippets: {
      curl: `curl -X POST https://api.soap.sphere.dev/soap/v1/UserService \\\n  -H "Content-Type: text/xml; charset=utf-8" \\\n  -H "SOAPAction: GetUser" \\\n  -d '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\\\n       <soap:Body>\\\n         <tns:GetUser xmlns:tns="http://sphere.dev/UserService">\\\n           <tns:UserId>1</tns:UserId>\\\n         </tns:GetUser>\\\n       </soap:Body>\\\n     </soap:Envelope>'`,
      javascript: `const axios = require("axios");\nconst xml = \`<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n  <soap:Body>\n    <tns:GetUser xmlns:tns="http://sphere.dev/UserService">\n      <tns:UserId>1</tns:UserId>\n    </tns:GetUser>\n  </soap:Body>\n</soap:Envelope>\`;\n\nconst { data } = await axios.post("https://api.soap.sphere.dev/soap/v1/UserService", xml, {\n  headers: { "Content-Type": "text/xml", "SOAPAction": "GetUser" }\n});\nconsole.log(data);`,
      python: `from zeep import Client\n\nclient = Client("https://api.soap.sphere.dev/soap/v1/UserService?wsdl")\nresult = client.service.GetUser(UserId=1)\nprint(result)`,
      go: `package main\n\nimport (\n\t"fmt"\n\t"github.com/tiaguinho/gosoap"\n)\n\nfunc main() {\n\tsoap, _ := gosoap.SoapClient("https://api.soap.sphere.dev/soap/v1/UserService?wsdl")\n\tparams := gosoap.Params{"UserId": "1"}\n\tres, _ := soap.Call("GetUser", params)\n\tfmt.Println(res.Body)\n}`,
      csharp: `var binding = new BasicHttpBinding();\nvar endpoint = new EndpointAddress("https://api.soap.sphere.dev/soap/v1/UserService");\nvar client = new UserServiceClient(binding, endpoint);\n\nvar response = await client.GetUserAsync(new GetUserRequest { UserId = 1 });\nConsole.WriteLine($"User: {response.Name}");`,
      java: `var soapFactory = SOAPConnectionFactory.newInstance();\nvar connection = soapFactory.createConnection();\n\nvar message = SOAPMessageFactory.newInstance().createMessage();\nvar body = message.getSOAPBody();\nvar getUser = body.addChildElement("GetUser", "tns", "http://sphere.dev/UserService");\ngetUser.addChildElement("UserId", "tns").addTextNode("1");\n\nvar response = connection.call(message, new URL("https://api.soap.sphere.dev/soap/v1/UserService"));\nSystem.out.println(response.getSOAPBody().getTextContent());`
    },
    mockResponses: {
      "POST:/soap/v1/UserService": {
        status: "200",
        statusText: "OK",
        headers: { "Content-Type": "text/xml; charset=utf-8" },
        body: {
          "soap:Envelope": {
            "soap:Body": {
              "tns:GetUserResponse": {
                User: { ID: 1, Name: "Alice Smith", Email: "alice@example.com" }
              }
            }
          }
        }
      }
    },
    sections: [
      {
        type: "soap-operation",
        title: "Available Operations (WSDL)",
        data: [
          { operation: "GetUser", input: "GetUserRequest", output: "GetUserResponse", description: "Fetch a user by ID." },
          { operation: "CreateUser", input: "CreateUserRequest", output: "CreateUserResponse", description: "Register a new user account." },
          { operation: "UpdateUser", input: "UpdateUserRequest", output: "UpdateUserResponse", description: "Modify user profile fields." },
          { operation: "DeleteUser", input: "DeleteUserRequest", output: "DeleteUserResponse", description: "Remove a user and all associated data." },
        ]
      }
    ]
  },
  webrtc: {
    id: "webrtc",
    name: "WebRTC",
    category: "Peer-to-Peer & Streaming",
    icon: Video,
    tagline: "Web Real-Time Communication",
    description: "An open framework for real-time peer-to-peer audio, video, and data transfer between browsers and mobile apps using NAT-traversal protocols.",
    overview: "WebRTC enables direct browser-to-browser communication through ICE (Interactive Connectivity Establishment), STUN/TURN servers for NAT traversal, and DTLS-SRTP for encrypted media streams. Signaling is not defined by WebRTC — it is usually handled via WebSockets or HTTP.",
    pros: [
      "Ultra-low latency (sub-500ms) ideal for video calls and gaming.",
      "Built-in encryption (DTLS + SRTP) is mandatory.",
      "Works across all modern browsers without plugins."
    ],
    cons: [
      "Requires signaling server out-of-band; adds architectural complexity.",
      "STUN/TURN relay costs for users behind symmetric NATs.",
      "No standard data-retention model — not suited for request/response APIs."
    ],
    methods: ["Offer / Answer (SDP)", "ICE Candidate Exchange"],
    paths: ["wss://api.sphere.dev/signal", "stun:stun.sphere.dev:3478"],
    defaultPayload: JSON.stringify({
      type: "offer",
      sdp: "v=0\no=- 4611732020991322352 2 IN IP4 127.0.0.1\ns=-\nt=0 0\na=group:BUNDLE 0 1\nm=audio 9 UDP/TLS/RTP/SAVPF 111\n..."
    }, null, 2),
    codeSnippets: {
      curl: `# WebRTC is not a request/response protocol. Signaling is done via WebSocket:\nwscat -c wss://api.sphere.dev/signal -w 60`,
      javascript: `const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.sphere.dev:3478" }] });\n\npc.onicecandidate = (e) => {\n  if (e.candidate) {\n    ws.send(JSON.stringify({ type: "candidate", candidate: e.candidate }));\n  }\n};\n\npc.ontrack = (e) => {\n  videoElement.srcObject = e.streams[0];\n};\n\nconst offer = await pc.createOffer();\nawait pc.setLocalDescription(offer);\nws.send(JSON.stringify({ type: "offer", sdp: offer.sdp }));`,
      python: `import asyncio\nimport json\nimport websockets\nfrom aiortc import RTCPeerConnection, RTCSessionDescription\n\npc = RTCPeerConnection()\n\n@pc.on("track")\ndef on_track(track):\n    print("Receiving track:", track.kind)\n\nasync def main():\n    async with websockets.connect("wss://api.sphere.dev/signal") as ws:\n        offer = await pc.createOffer()\n        await pc.setLocalDescription(offer)\n        await ws.send(json.dumps({"type": "offer", "sdp": pc.localDescription.sdp}))\n\nasyncio.run(main())`,
      go: `package main\n\nimport (\n\t"github.com/pion/webrtc/v3"\n\t"log"\n)\n\nfunc main() {\n\tconfig := webrtc.Configuration{\n\t\tICEServers: []webrtc.ICEServer{{\n\t\t\tURLs: []string{"stun:stun.sphere.dev:3478"},\n\t\t}},\n\t}\n\tpc, _ := webrtc.NewPeerConnection(config)\n\toffer, _ := pc.CreateOffer(nil)\n\t_ = pc.SetLocalDescription(offer)\n\tlog.Println(pc.LocalDescription().SDP)\n}`,
      csharp: `// WebRTC requires a browser or native SDK.\n// Use the JavaScript example for browser-based implementations.\n// For C#, consider using WebRtc.Native or Unity WebRTC library.`,
      java: `// WebRTC requires a browser or native SDK.\n// Use the JavaScript example for browser-based implementations.\n// For Java, consider using webrtc-java or Unity WebRTC library.`
    },
    mockResponses: {
      "signal:/offer": {
        status: "101",
        statusText: "Switching Protocols",
        headers: { "Upgrade": "websocket", "Connection": "Upgrade" },
        body: { type: "answer", sdp: "v=0\no=- 8723487234 2 IN IP4 10.0.0.1\ns=-\nt=0 0\na=group:BUNDLE 0 1\nm=audio 9 UDP/TLS/RTP/SAVPF 111\n..." }
      },
      "signal:/candidate": {
        status: "200",
        statusText: "OK",
        headers: { "Content-Type": "application/json" },
        body: { type: "candidate", candidate: { candidate: "candidate:1 1 UDP 2122252543 192.168.1.5 54072 typ host", sdpMid: "0", sdpMLineIndex: 0 } }
      }
    },
    sections: [
      {
        type: "webrtc-signaling",
        title: "Signaling Messages",
        data: [
          { type: "offer", description: "The caller sends an SDP offer to initiate a session.", direction: "Client → Server" },
          { type: "answer", description: "The callee responds with an SDP answer accepting the session.", direction: "Server → Client" },
          { type: "candidate", description: "ICE candidates exchanged for NAT traversal.", direction: "Bidirectional" },
          { type: "bye", description: "A peer signals it is leaving the session.", direction: "Client → Server" },
        ]
      }
    ]
  }
};
