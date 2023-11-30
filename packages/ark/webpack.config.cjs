const path = require("path");
const MergeIntoSingleFilePlugin = require("webpack-merge-and-include-globally");

module.exports = {
	mode: "production",
	// entry: {
	// 	"transfer.js": ["./source/crypto/validation/validators/source/transfer.js"],
	// },
	output: {
		filename: "[name]",
		path: path.resolve(__dirname, "./source/crypto/validation/validators/source/"),
	},
	target: "node",
	plugins: [
		new MergeIntoSingleFilePlugin({
			files: {
				"transfer.js": ["./source/crypto/validation/validators/source/transfer.js"],
			},
		}),
	],
};
