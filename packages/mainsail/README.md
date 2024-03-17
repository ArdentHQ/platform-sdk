# Platform SDK - Mainsail

<p align="center">
    <img src="https://raw.githubusercontent.com/ArdentHQ/platform-sdk/master/packages/sdk-mainsail/banner.png" />
</p>

## Installation

```bash
npm install @ardenthq/sdk-mainsail
```

# Local Releases & Testing in Arkvault

#### Building PSDK changes locally

In the root directory, run:

```bash
pnmp build:release
```
This will build all necessary sdk packages and coins as defined in https://github.com/ArdentHQ/platform-sdk/blob/feat/mainsail/scripts/build-release.sh#L38 (Prerequisites & Coins). To speed up the build process, you may choose to comment out all other coins except the one you are currently working on, such as mainsail.

It is not necessary to build `Prerequisites` after first time and if there are no changes, so those could be skipped and simply build only the changes made in mainsail. To do so:

```
cd packages/mainsail
pnpm build:release
``` 

### Testing local PSDK release in arkvault
* Point your local SDK packages in Arkvault. You can do this by checking out the sandbox branch here https://github.com/ArdentHQ/arkvault/pull/410/, which already replaces ark packages with mainsail.

* Modify the SDK package references to point to your local SDK paths. See example https://github.com/ArdentHQ/arkvault/pull/410/files#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519R47

* Remove the node_modules directory and run:

```
pnpm install
pnpm dev
```
Which will open arkvault with your local sdk changes applied.

## Usage

Documentation can be found [here](https://ark.dev/docs/platform-sdk/coins/mainsail).

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@ardenthq.com. All security vulnerabilities will be promptly addressed.

## Credits

This project exists thanks to all the people who [contribute](../../contributors).

## License

[MIT](LICENSE) © [Ardent](https://ardenthq.com)
