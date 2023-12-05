import fs from "fs";
import { build, context } from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

const watch = !!process.env.WATCH;
if (fs.existsSync("./dist/")) {
  fs.rmdirSync("./dist", { recursive: true });
}
const config = {
  entryPoints: [`src/index.ts`],
  bundle: true,
  outdir: `./dist`,
  mainFields: ["svelte", "browser", "module", "main"],
  conditions: ["svelte", "browser"],
  // logLevel: `info`,
  minify: false, //so the resulting code is easier to understand
  sourcemap: "inline",
  splitting: true,
  write: true,
  format: `esm`,
  plugins: [
    esbuildSvelte({
      preprocess: sveltePreprocess(),
    }),
  ],
};

if (watch) {
  const ctx = await context(config);
  await ctx.watch();
} else {
  await build(config);
}
