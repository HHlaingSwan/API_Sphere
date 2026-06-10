import { NextRequest } from "next/server";

interface Simulation {
  status: number;
  name: string;
  headers: Record<string, string>;
  body: Record<string, unknown>;
}

const SIMULATIONS: Record<string, Simulation> = {
  "200": {
    status: 200,
    name: "OK",
    headers: {},
    body: {
      code: 200,
      name: "OK",
      message: "The request succeeded.",
      data: {
        users: [
          { id: 1, name: "Alice", email: "alice@example.com" },
          { id: 2, name: "Bob", email: "bob@example.com" },
          { id: 3, name: "Charlie", email: "charlie@example.com" },
        ],
      },
      explanation:
        "200 OK is the standard success response. It means the request was received, understood, and processed successfully. The response body contains the requested data.",
    },
  },
  "201": {
    status: 201,
    name: "Created",
    headers: {},
    body: {
      code: 201,
      name: "Created",
      message: "Resource created successfully.",
      data: {
        id: 42,
        name: "Jane Doe",
        email: "jane@example.com",
        createdAt: "2026-06-10T12:00:00Z",
      },
      explanation:
        "201 Created is returned after a successful POST request that creates a new resource. The response typically includes the new resource's ID and a Location header pointing to its URL.",
    },
  },
  "304": {
    status: 200,
    name: "Not Modified",
    headers: {},
    body: {
      code: 304,
      name: "Not Modified",
      message: "The cached response is still valid.",
      data: null,
      note: "HTTP 304 responses never include a body. This endpoint returns 200 so you can read the explanation.",
      explanation:
        "304 Not Modified is used for caching. The client sends conditional headers (If-None-Match or If-Modified-Since), the server sees the resource hasn't changed, and tells the client to use its cached version. The actual HTTP response has NO body and status 304 — check your DevTools Network tab to see the difference from a normal 200.",
      howToSeeReal304:
        'Try: curl -H "If-None-Match: \\"abc\\"" http://localhost:3000/api/status-codes/304',
    },
  },
  "400": {
    status: 400,
    name: "Bad Request",
    headers: {},
    body: {
      code: 400,
      name: "Bad Request",
      message: "Validation failed.",
      error: {
        field: "email",
        issue: "The email field is required.",
        example: 'POST /api/login with body: { "email": "" }',
      },
      explanation:
        "400 Bad Request means the server cannot process the request because of client error — malformed syntax, missing fields, or invalid data. Always check your request payload when you see this.",
    },
  },
  "401": {
    status: 401,
    name: "Unauthorized",
    headers: {},
    body: {
      code: 401,
      name: "Unauthorized",
      message: "Authentication required.",
      error: {
        detail: "No valid API key or authentication token provided.",
        example: 'Include a header like: Authorization: Bearer <your-token>',
      },
      explanation:
        "401 Unauthorized means you need to authenticate first. The server doesn't know who you are. Common causes: missing token, expired token, or invalid credentials.",
    },
  },
  "403": {
    status: 403,
    name: "Forbidden",
    headers: {},
    body: {
      code: 403,
      name: "Forbidden",
      message: "Insufficient permissions.",
      error: {
        detail: "Your account (role: viewer) does not have access to this resource.",
        requiredRole: "admin",
      },
      explanation:
        "403 Forbidden means the server knows who you are (you're authenticated) but you don't have permission to access this resource. Unlike 401, here your identity is confirmed — you just lack the right role or permissions.",
    },
  },
  "404": {
    status: 404,
    name: "Not Found",
    headers: {},
    body: {
      code: 404,
      name: "Not Found",
      message: "Resource not found.",
      error: {
        detail: "No product exists with ID 999.",
        path: "/api/v1/products/999",
      },
      explanation:
        "404 Not Found means the server can't find the requested resource. The URL might be wrong, the resource may have been deleted, or the ID may not exist. This is one of the most common HTTP errors.",
    },
  },
  "405": {
    status: 405,
    name: "Method Not Allowed",
    headers: { Allow: "GET, HEAD" },
    body: {
      code: 405,
      name: "Method Not Allowed",
      message: "HTTP method not supported for this endpoint.",
      error: {
        detail: "DELETE method is not allowed on /api/status-codes/405.",
        allowedMethods: ["GET", "HEAD"],
        attemptedMethod: "DELETE",
      },
      explanation:
        "405 Method Not Allowed means the HTTP method you used (e.g., DELETE, PUT, PATCH) isn't supported by this endpoint. The Allow header in the response tells you which methods are permitted. Next.js automatically returns 405 for any HTTP verb you don't export in your route handler.",
    },
  },
  "429": {
    status: 429,
    name: "Too Many Requests",
    headers: { "Retry-After": "60" },
    body: {
      code: 429,
      name: "Too Many Requests",
      message: "Rate limit exceeded.",
      error: {
        detail: "You have sent 100 requests in the last 60 seconds. Maximum: 10 req/min.",
        retryAfterSeconds: 60,
      },
      explanation:
        "429 Too Many Requests is a rate-limiting response. The server protects itself from abuse by limiting how many requests a client can send in a time window. The Retry-After header tells you when to try again.",
    },
  },
  "500": {
    status: 500,
    name: "Internal Server Error",
    headers: {},
    body: {
      code: 500,
      name: "Internal Server Error",
      message: "An unexpected server error occurred.",
      error: {
        detail: "Database connection pool exhausted. Connection refused.",
        suggestedAction: "Retry after a few seconds. If the problem persists, contact support.",
      },
      explanation:
        "500 Internal Server Error means something went wrong on the server side. It's a generic catch-all for unexpected failures — database issues, unhandled exceptions, or misconfigurations. Unlike 4xx errors, this is not the client's fault.",
    },
  },
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const sim = SIMULATIONS[code];

  if (!sim) {
    return Response.json(
      {
        code: 400,
        name: "Bad Request",
        message: `Unknown status code "${code}". Available codes: ${Object.keys(SIMULATIONS).join(", ")}`,
      },
      { status: 400 },
    );
  }

  return Response.json(sim.body, {
    status: sim.status,
    headers: sim.headers,
  });
}
