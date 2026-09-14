import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  external: ["undici"],
  dts: {
    resolve: false,
  },
});
