import { globSync } from "glob";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import cleaner from "rollup-plugin-cleaner";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";

const hookEntries = globSync("src/use*/index.ts").reduce((entries, file) => {
  const name = file.split("/")[1];
  entries[`${name}/index`] = file;
  return entries;
}, {});

export default [
  {
    input: {
      index: "src/index.ts", // 统一入口
      ...hookEntries, // 分入口，按需引入，treeShaking使用
    },
    output: [
      {
        dir: "lib",
        format: "cjs",
        exports: "named",
        preserveModules: true, // 保持目录结构
        preserveModulesRoot: "src", // 保持目录结构
        entryFileNames: "[name].js",
      },
      {
        dir: "es",
        format: "esm",
        preserveModules: true, // 保持目录结构
        preserveModulesRoot: "src", // 保持目录结构
        entryFileNames: "[name].js",
      },
    ],
    plugins: [
      cleaner({
        targets: ["lib", "es"],
      }),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      terser(),
    ],
    external: ["react"],
  },
  {
    input: {
      index: "src/index.ts",
      ...hookEntries,
    },
    output: [
      {
        dir: "lib",
        entryFileNames: "[name].d.ts",
        format: "lib",
        preserveModules: true,
      },
    ],
    plugins: [dts()],
  },
  // dist cdn使用的资源，不能将文件分割，umd，iife打包为单文件
  {
    input: {
      index: "src/index.ts",
    },
    output: {
      dir: "dist",
      format: "umd",
      name: "QingSongHooks",
      globals: {
        react: "React",
      },
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
      }),
      terser(),
    ],
    external: ["react"],
  },
];
