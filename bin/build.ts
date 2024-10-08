#!/usr/bin/env npx ts-node

import { build } from 'esbuild';
import { Export } from '../src/global/export';

const globalFunctions: Array<string> = [];
Object.entries(Export).forEach(([namespace, functionNameList]: [string, Array<string>]) => {
  functionNameList.forEach((functionName: string) => {
    globalFunctions.push(`function ${functionName}() {}`);
  });
});

build({
  entryPoints: ['src/project.ts'],
  outfile: 'dst/project.js',
  bundle: true,
  banner: {
    js: [
      '// This file was generated by clasp. DO NOT EDIT by hand.',
      '// Top-level `var` declaration: https://esbuild.github.io/faq/#top-level-var',
      '',
    ].join('\n'),
  },
  footer: {
    js: [
      '',
      ...globalFunctions,
      '',
      '// Copyright @debiru_R from https://github.com/debiru/clasp',
    ].join('\n'),
  },
}).catch(() => process.exit(1));
