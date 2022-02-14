import { resolve, join } from "path";
import fs from "fs";
import { defineConfig } from "vite";
import { Watch } from "./plugins/watch";
import { Layout } from "./plugins/layout";
import { Controller } from "./plugins/controller";

let input = {};

function fromDir(startPath, filter) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      input[filename] = resolve(__dirname, filename);
    }
  }
}

fromDir("src", ".html");

module.exports = defineConfig({
  root: "src",
  publicDir: '_public',
  build: {
    outDir: "../dist",
    lib: {
      name: 'style',
      entry: resolve(__dirname, 'src/_scss/style.js'),
      formats: ['es'],
    },
    rollupOptions: {
      input: input,
      output: {
        preserveModules: true,
        entryFileNames: ({ name: fileName }) => {
          return `${fileName}.js`
        }
      },
    },
    minify: false,
  },

  plugins: [
    Watch([
      '**/*.ejs',
      '_public/**',
      '_data/**'
    ]),
    Layout({
      dataFile: 'src/_data/data.json',
      ejs: {
        views: ["src"],
      },
    }),
    Controller(),
  ],
});