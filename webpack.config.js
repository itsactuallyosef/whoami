import { fileURLToPath } from "url";
import { dirname, resolve as _resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// webpack.config.js
export default {
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js",
    path: _resolve(__dirname, "./docs/dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  mode: "development",
};
