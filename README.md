# @uocdev/npmmeta

[![npm version](https://img.shields.io/npm/v/@uocdev/npmmeta?color=blue&label=version)](https://www.npmjs.com/package/@uocdev/npmmeta)
[![npm downloads](https://img.shields.io/npm/dw/@uocdev/npmmeta?color=brightgreen)](https://www.npmjs.com/package/@uocdev/npmmeta)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/UocDev/npmmeta/test.yml?label=tests)](https://github.com/UocDev/npmmeta/actions)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](./LICENSE)
[![Node.js Version](https://img.shields.io/node/v/@uocdev/npmmeta)](https://nodejs.org/)

---

> Fetch and display NPM package metadata in seconds — via CLI or TypeScript API. 
> Designed for developers who want quick insights about dependencies, maintainers, versions, and download stats.

---

## Features

- **CLI Tool** — simple command line interface: `npx @uocdev/npmmeta <package>`
- **TypeScript Library** — use programmatically to fetch metadata
- **Registry + Download API Integration** — pulls data directly from NPM registry and NPM downloads API
- **Full Metadata**:
  - Latest version
  - Description
  - Dependency count
  - Maintainers
  - Last updated date
  - Weekly downloads
- Lightweight, zero dependencies
- Tested using **Vitest** across Node 18–22

---

## Installation

### Using NPM (Global CLI)
```bash
npm install -g @uocdev/npmmeta
```
### Using NPX
```bash
npx @uocdev/npmmeta <package_name>
```
---

## Library Usage
```ts
import { getMeta } from "@uocdev/npmmeta";

const info = await getMeta("express");

console.log(info);
/*
{
  name: 'express',
  version: '4.19.2',
  description: 'Fast, unopinionated, minimalist web framework',
  dependenciesCount: 33,
  maintainers: [ 'dougwilson' ],
  lastModified: '2025-08-17T09:23:44.121Z',
  downloads: 29421831
}
*/
```

---

this package still WIP and unstable, if you interesting to add new features, fix bugs, and more. Please open Pull Request!
