import { defineConfig } from "eslint/config";
import "eslint-plugin-react";

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
]);
