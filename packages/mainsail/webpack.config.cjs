const { IgnorePlugin, NormalModuleReplacementPlugin } = require("webpack");
const baseConfig = require("../../webpack.config.cjs");

module.exports = {
	...baseConfig,
	module: {
		...baseConfig.module,
		// Silence
		// WARNING in mainsail/packages/kernel/distribution/bootstrap/load-service-providers.js 63:49-65
		// Critical dependency: the request of a dependency is an expression
		exprContextCritical: false,
	},
	output: {
		...baseConfig.output,
		chunkFormat: false,
	},
	plugins: [
		...baseConfig.plugins,
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
		...baseConfig.resolve,
		fallback: {
			child_process: false,
			fs: false,
			module: false,
			perf_hooks: false,
			worker_threads: false,
		},
	},
};
