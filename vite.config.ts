import { defineConfig, loadEnv } from "vite";
import preact from "@preact/preset-vite";
import path from "path";

export default defineConfig(({ command, mode }) => {
  // `mode` に基づいて現在の作業ディレクトリにある env ファイルをロードする
  // `VITE_` プレフィックスに関係なく全ての環境変数をロードするには、第 3 引数に '' を設定します
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [preact()],
    build: {
      outDir: mode == "development" ? "dist" : "docs",
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});
