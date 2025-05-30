# Support

This is a Collection of Helpers for the Platform SDK. The implementation adheres to the contracts laid out in the [specification](/docs/specification.md).

## Installation

```bash
pnpm install @ardenthq/helpers
```

## Usage

### Arr

#### Importing the `Arr` class

```typescript
import { Arr } from "@ardenthq/helpers";
```

#### Get a random element from the given array

```typescript
Arr.randomElement(items: any[]);
```

### Censor

#### Importing the `Censor` class

```typescript
import { Censor } from "@ardenthq/helpers";

const censor = new Censor();
```

#### Determine if the value contains bad terms

```typescript
censor.isBad(value: string): boolean;
```

#### Remove all bad terms from the value

```typescript
censor.process(value: string): string;
```

### Markdown

#### Importing the `Markdown` class

```typescript
import { Markdown } from "@ardenthq/helpers";
```

#### Parse the given content into HTML

```typescript
Markdown.parse(content: string): { meta: MarkdownMeta; content: String };
```

### QRCode

#### Importing the `QRCode` class

```typescript
import { QRCode } from "@ardenthq/helpers";
```

#### Create a new QRCode from a string

```typescript
QRCode.fromString(value: string): QRCode;
```

#### Create a new QRCode from an object of keys and values

```typescript
QRCode.fromObject(value: object): QRCode;
```

#### Get the Base64 Data URL representation of the QRCode

```typescript
await qrcode.toDataURL(options: QRCodeToDataURLOptions = {}): Promise<string>;
```

#### Get the string representation of the QRCode

```typescript
await qrcode.toString(type: StringType = "utf8"): Promise<string>;
```

### Validator

#### Importing the `Validator` class

```typescript
import { Validator } from "@ardenthq/helpers";

const validator = new Validator();
```

#### Validate the given data against the schema

```typescript
validator.validate(data: object, schema: { validateSync: Function }): void;
```

#### Check if the validation passed

```typescript
validator.passes(): boolean;
```

#### Check if the validation failed

```typescript
validator.fails(): boolean;
```

#### Get a list of all error messages

```typescript
validator.errors(): string[] | undefined;
```

#### Get the error object from `yup`

```typescript
validator.error(): ValidationError | undefined;
```

## Security

If you discover a security vulnerability within this package, please send an e-mail to [security@ardenthq.com](mailto:security@ardenthq.com). All security vulnerabilities will be promptly addressed.
