const path = require("path");
const MergeIntoSingleFilePlugin = require("webpack-merge-and-include-globally");

module.exports = {
	mode: "production",
	entry: "./source/crypto/validation/validators/source/transfer.js",
	output: {
		filename: "transfer.js",
		path: path.resolve(__dirname, "./source/crypto/validation/validators/source/"),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
	// plugins: [
	// 	new MergeIntoSingleFilePlugin({
	// 		files: {
	// 			"transfer.js": ["./source/crypto/validation/validators/source/transfer.js"],
	// 		},
	// 	}),
	// ],
};
