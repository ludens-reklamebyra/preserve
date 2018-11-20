# Preserve

A state lib for keeping track of and change localStorage data

[![Build Status](https://travis-ci.org/ludens-reklamebyra/preserve.svg?branch=master)](https://travis-ci.org/ludens-reklamebyra/preserve) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Install

```sh
 npm install @ludens-reklame/preserve
```

or with Yarn

```sh
yarn add @ludens-reklame/preserve
```

## Basic usage

```ts
import preserve from '@ludens-reklame/preserve';

// Make an item you want to keep track of.
const myItem = preserve('myData', 1);

// Get the current data from localStorage
myItem.get();

// Update the localStorage data.
myItem.set(2);

// Listen to changes that happens within your localStorage item
myItem.subscribe((prevData, nextData) => {
  console.log(prevData); // 1
  console.log(nextData); // 2
});
```
