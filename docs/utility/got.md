# got

This is an HTTP Client for the Platform SDK. The implementation makes use of [got](https://github.com/sindresorhus/got) and adheres to the contracts laid out in the [specification](/docs/specification.md).

## Installation

```bash
pnpm install @ardenthq/http-got
```

## Usage

```typescript
import { Environment } from "@ardenthq/profiles";
import { Request } from "@ardenthq/http-got";

new Environment({ httpClient: new Request() });
```

## Security

If you discover a security vulnerability within this package, please send an e-mail to [security@ardenthq.com](mailto:security@ardenthq.com). All security vulnerabilities will be promptly addressed.
