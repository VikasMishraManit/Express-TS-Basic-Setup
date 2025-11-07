# Enterprise-Grade Express + TypeScript API

A production-ready REST API built with Express.js and TypeScript, featuring comprehensive middleware architecture, robust error handling, request validation, and advanced logging capabilities.

## 🚀 Key Features

### Architecture & Design
- **TypeScript-First Development**: Full type safety across the entire application
- **Layered Architecture**: Clear separation of concerns (Routes → Validators → Controllers → Services)
- **API Versioning**: Support for multiple API versions (`/api/v1`, `/api/v2`)
- **Modular Router Design**: Scalable routing system with Express Router

### Request Handling & Validation
- **Schema Validation with Zod**: Type-safe request validation at runtime
- **Multiple Input Sources**: Support for query params, URL params, and request body
- **Content Type Parsing**: JSON, URL-encoded, and text body parsing
- **Async Request Processing**: Non-blocking request validation and handling

### Error Management
- **Custom Error Classes**: Structured error handling with `AppError` interface
- **Generic Error Middleware**: Centralized error handling across all routes
- **Status Code Management**: Proper HTTP status codes for different error types
- **Error Logging**: All errors automatically logged with correlation IDs

### Production-Grade Logging (Winston)
- **Structured JSON Logs**: Machine-readable log format for easy parsing
- **Correlation ID Tracking**: Unique request IDs using UUID for end-to-end tracing
- **AsyncLocalStorage Integration**: Correlation IDs accessible across async boundaries
- **Daily Log Rotation**: Automatic log file rotation with configurable retention
- **Multiple Transports**: Console output and file-based logging
- **Timestamp & Metadata**: Every log includes timestamp, level, and contextual data

### Configuration Management
- **Environment Variables**: Secure configuration using `.env` files
- **Type-Safe Config**: Strongly typed configuration objects
- **Centralized Config Layer**: Single source of truth for all configurations

## 📁 Project Structure

```
src/
├── config/
│   ├── index.ts              # Environment configuration
│   └── logger.config.ts      # Winston logger setup
├── controllers/
│   └── ping.controller.ts    # Request handlers
├── middlewares/
│   ├── error.middleware.ts   # Generic error handler
│   └── correlation.middleware.ts  # Correlation ID attachment
├── routes/
│   ├── v1/
│   │   └── ping.route.ts     # API v1 routes
│   └── index.ts              # Route aggregation
├── validators/
│   └── index.ts              # Zod schema validators
├── utils/
│   ├── errors/
│   │   └── app.error.ts      # Custom error classes
│   └── helpers/
│       └── request.helper.ts # AsyncLocalStorage utilities
└── server.ts                 # Application entry point
```

## 🛠️ Technical Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Validation**: Zod
- **Logging**: Winston + Winston Daily Rotate File
- **Development Tools**: 
  - ts-node (TypeScript execution)
  - nodemon (Auto-restart)
  - dotenv (Environment management)

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd <project-name>

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure your environment variables
# PORT=3005
```

## 🚦 Getting Started

### Development Mode
```bash
# Run with auto-restart
npm run dev

# Run without auto-restart
npm start
```

### Production Build
```bash
# Compile TypeScript to JavaScript
npx tsc

# Run compiled JavaScript
node dist/server.js
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
PORT=3005
NODE_ENV=development
```

### TypeScript Configuration
The project uses a custom `tsconfig.json` with:
- Source directory: `src/`
- Output directory: `dist/`
- ES6 module support
- Strict type checking
- Source maps enabled

## 📝 API Examples

### Health Check Endpoint
```http
GET /api/v1/ping
```

**Response:**
```json
{
  "message": "pong"
}
```

### With Query Parameters
```http
GET /api/v1/ping?age=23&gender=male
```

### With URL Parameters
```http
GET /api/v1/ping/:id/comments
```

### With Request Body
```http
POST /api/v1/ping
Content-Type: application/json

{
  "name": "John Doe",
  "age": 25
}
```

## 🔐 Request Validation

Example Zod schema validation:

```typescript
const userSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().positive()
});

router.post('/user', 
  validateRequestBody(userSchema),
  createUserHandler
);
```

## 📊 Logging System

### Features
- **Correlation ID**: Every request gets a unique ID for tracking
- **Structured Logs**: JSON format with timestamp, level, and metadata
- **Daily Rotation**: Logs automatically rotate daily with 14-day retention
- **Max File Size**: Individual log files capped at 20MB

### Log Format
```json
{
  "level": "info",
  "message": "Request processed successfully",
  "timestamp": "11-07-2025 14:30:45",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000",
  "data": {
    "userId": "123",
    "endpoint": "/api/v1/users"
  }
}
```

### Using Logger
```typescript
import logger from './config/logger.config';

logger.info('User created', { userId: '123' });
logger.error('Database connection failed', { error: err.message });
logger.warn('Rate limit approaching', { remaining: 10 });
```

## 🚨 Error Handling

### Custom Error Classes
```typescript
// Internal Server Error (500)
throw new InternalServerError('Database connection failed');

// Other error types can be easily added
export class BadRequestError implements AppError { /* ... */ }
export class NotFoundError implements AppError { /* ... */ }
export class UnauthorizedError implements AppError { /* ... */ }
```

### Error Response Format
```json
{
  "success": false,
  "message": "Something went wrong while reading the file"
}
```

## 🎯 Key Implementation Highlights

### 1. Middleware Chain
```
Request → Correlation ID → Body Parser → Validator → Controller → Error Handler
```

### 2. AsyncLocalStorage for Context
Correlation IDs are accessible anywhere in the async context without prop drilling:
```typescript
// Available in any function during request lifecycle
const correlationId = getCorrelationId();
```

### 3. Type-Safe Configuration
No raw `process.env` access in code - all configs are typed:
```typescript
export const envConfig: EnvConfig = {
  PORT: Number(process.env.PORT) || 3005
}
```

## 📈 Scalability Features

- **API Versioning**: Easy to maintain multiple API versions
- **Modular Routes**: Add new routes without touching existing code
- **Extensible Validation**: Add schemas as needed
- **Custom Error Types**: Define domain-specific errors
- **Log Aggregation Ready**: JSON logs compatible with ELK, Splunk, etc.

## 🔄 Development Workflow

1. **Write Route**: Define endpoint in routes folder
2. **Add Validator**: Create Zod schema for request validation
3. **Implement Controller**: Business logic in controller
4. **Error Handling**: Throw custom errors when needed
5. **Logging**: Logger automatically tracks with correlation ID

## 🧪 Testing Recommendations

- Unit tests for validators (Zod schemas)
- Integration tests for API endpoints
- Error handling test cases
- Logger output validation
- Middleware chain testing

## 📚 Learning Outcomes

This project demonstrates proficiency in:
- TypeScript advanced types and interfaces
- Express.js middleware architecture
- Production logging strategies
- Error handling patterns
- Request validation techniques
- Async context management
- Configuration management
- API design best practices

## 🤝 Contributing

This is a showcase project demonstrating enterprise-grade Node.js development patterns. Feel free to use it as a template for your own projects.

## 📄 License

MIT

---

**Built with ❤️ by Vikas  using TypeScript, Express, and modern Node.js practices**