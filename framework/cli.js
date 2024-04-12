const { build } = require("esbuild");
const { resolve, dirname } = require("path");
const {} = require("fs");

const entryPoint = process.argv.pop();
const app = resolve(process.cwd(), entryPoint);
const dest = resolve(dirname(app), "..", "dist");

build({
  entryPoints: {
    app: app,
  },
  alias: {
    ß: resolve(__dirname, "schaaf.js"),
  },
  jsxFactory: "ß.x",
  jsxFragment: "ß.fragment",
  loader: { ".js": "jsx" },
  outdir: dest,
  minify: true,
  platform: "browser",
  bundle: true,
  format: "esm",
});
