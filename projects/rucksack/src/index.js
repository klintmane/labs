const fs = require("fs");
const path = require("path");

const babel = require("@babel/core");
const babelParser = require("@babel/parser");
const babelTraverse = require("@babel/traverse").default;

function getDir(_path) {
  return path.dirname(_path);
}

function getSrc(path) {
  return fs.readFileSync(path, "utf-8");
}

function getAst(src) {
  return babelParser.parse(src, { sourceType: "module" });
}

function traverseAst(ast) {
  const result = { deps: [] };

  const visitor = {
    ImportDeclaration: ({ node }) => {
      result.deps.push(node.source.value);
    }
  };

  babelTraverse(ast, visitor);
  return result;
}

function transpileAst(ast, ...args) {
  return babel.transformFromAst(ast, null, ...args);
}

let assets = 0;

// Creates an asset from a file path
function createAsset(path) {
  const src = getSrc(path); // Get the source of the file at path
  const ast = getAst(src); // Get the AST from the source
  const { deps } = traverseAst(ast); // Get the dependencies from the AST
  const { code } = transpileAst(ast, { presets: ["@babel/env"] }); // Transpile the AST and get the resulting code

  assets++; // Increment the asset counter
  return { id: assets, path, deps, code };
}

// Creates a dependency graph from the entry path
function createGraph(entry) {
  const entryAsset = createAsset(entry); // Let's create the first asset (the entry node)
  let assets = [entryAsset]; // Let's store this as the first element of the queue

  // Iterate through the assets
  assets.forEach(asset => {
    const dir = getDir(asset.path); // Get the directory of the asset
    asset.depMap = {}; // Create a dependency map, where each dependency path will be mapped to the asset (id)

    // Iterate through the asset dependencies
    asset.deps.forEach(dep => {
      const depPath = path.join(dir, dep); // Resolve the dependency path
      const depAsset = createAsset(depPath); // Create a new Asset from the dependency
      asset.depMap[depPath] = depAsset.id; // Add the asset to the dependency map

      assets = [...assets, depAsset];
    });
  });

  return assets; // Returns the asset graph/array
}

function bundleAssets(assets) {
  const result = assets.reduce(
    (result, asset) =>
      (result += `
  ${asset.id}: [
    function (require, module, exports) { ${asset.code} },
    ${JSON.stringify(asset.mapping)},
  ],`),
    ""
  );

  return `
  (function(modules) {
    function require(id) {
      const [fn, mapping] = modules[id];
      function localRequire(name) {
        return require(mapping[name]);
      }
      const module = { exports : {} };
      fn(localRequire, module, module.exports);
      return module.exports;
    }
    require(0);
  })({${result}})
`;
}

const graph = createGraph("../demo/index.js");
const result = bundleAssets(graph);
const comment = `// bundled with rucksack @${new Date().toJSON()}`;

fs.writeFile("../build/bundle.js", comment + "\n\n" + result, err => {
  if (err) throw err;
  console.log("Saved!");
});
