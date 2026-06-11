import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

export function loadContent() {
  const filename = path.resolve("lib/content.ts");
  const source = fs.readFileSync(filename, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filename,
  }).outputText;
  const module = { exports: {} };
  const evaluate = new Function("exports", "module", compiled);
  evaluate(module.exports, module);
  return module.exports;
}
