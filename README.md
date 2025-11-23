# Platform SDK

<p align="center">
    <img src="./banner.png" />
</p>

## Usage

Documentation can be found [here](/docs/README.md).

## Development

[pnpm](https://pnpm.js.org/en/) is required to be installed before starting. It is used to manage this monorepo.

### Apply `eslint` rules to source

```bash
pnpm run lint
```

### Apply `eslint` rules to tests

```bash
pnpm run lint:test
```

### Apply `prettier` formatting

```bash
pnpm run prettier
```

### Run tests with `uvu`

```bash
pnpm run test
```

### Bump the version of all packages and publish them

```bash
bash scripts/publish.sh VERSION YOUR_AUTH_TOKEN
```

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@ardenthq.com. All security vulnerabilities will be promptly addressed.

## Credits

This project exists thanks to all the people who [contribute](../../contributors).

## License

[MIT](https://opensource.org/license/MIT) © [Ardent](https://ardenthq.com)
