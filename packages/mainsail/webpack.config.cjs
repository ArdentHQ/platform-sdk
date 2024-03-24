const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ResolveTypeScriptPlugin = require("resolve-typescript-plugin").default;
const { IgnorePlugin, NormalModuleReplacementPlugin } = require("webpack");

module.exports = {
	devtool: "source-map",
	entry: path.resolve(process.cwd(), "source/index.ts"),
	experiments: {
		asyncWebAssembly: false,
		outputModule: true,
		topLevelAwait: true,
	},
	mode: "production",
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.tsx?$/,
				use: {
					loader: "babel-loader",
					options: {
						babelrc: false,
						plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties"],
						presets: ["@babel/preset-env", "@babel/preset-typescript"],
					},
				},
			},
			{
				test: /\.m?js$/,
				resolve: {
					fullySpecified: false,
				},
			},
		],

		// Silence
		// WARNING in mainsail/packages/kernel/distribution/bootstrap/load-service-providers.js 63:49-65
		// Critical dependency: the request of a dependency is an expression
		exprContextCritical: false,
	},
	optimization: {
		minimize: process.env.NODE_ENV === "production",
		sideEffects: false,
	},
	output: {
		clean: true,
		filename: "index.js",
		library: {
			type: "module",
		},
		path: path.resolve(process.cwd(), "distribution/browser"),
	},
	performance: {
		hints: "warning",
		maxAssetSize: 10_485_760,
		maxEntrypointSize: 10_485_760,
	},
	plugins: [
		new NodePolyfillPlugin(),
		new IgnorePlugin({
			checkResource(resource, context) {
				// 'glob' causes issues like
				// `export 'fileURLToPath' (imported as 'fileURLToPath') was not found in 'url'`
				if (/\/glob@/.test(context)) {
					return true;
				}

				return false;
			},
		}),
		// Fixes 'Module build failed: UnhandledSchemeError: Reading from "node:util" is not handled by plugins'
		// https://github.com/vercel/next.js/issues/28774#issuecomment-1264555395
		new NormalModuleReplacementPlugin(/^node:/, (resource) => {
			resource.request = resource.request.replace(/^node:/, "");
		}),
	],
	resolve: {
		extensions: [".ts", ".js"],
		fallback: {
			child_process: false,
			fs: false,
			perf_hooks: false,
			module: false,
		},
		plugins: [new ResolveTypeScriptPlugin()],
	},
	stats: {
		errorDetails: true,
	},
	target: "web",
};
