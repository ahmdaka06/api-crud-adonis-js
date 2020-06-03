<div align="center">
  <img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1557762307/poppinss_iftxlt.jpg" width="600px">
</div>

# Indicative Parser
> Converts indicative rules and messages schema to a tree

[![circleci-image]][circleci-url] [![npm-image]][npm-url] ![][typescript-image] [![license-image]][license-url]

Indicative parser pre-compiles the Indicative schema to a recursive tree of nodes. Each node is given one of the following types.

- `object`: Node with one or more nested children.
- `array`: Node with one or more index or wildcard based nested children.
- `literal`: The leaf nodes.

Do note, that the `literal` **type is not equal to literal values in Javascript**. For parser, the literal nodes are nodes with no leaf.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Why Indicative needs a parser?](#why-indicative-needs-a-parser)
- [Usage](#usage)
- [Typed schema](#typed-schema)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Why Indicative needs a parser?
If you look at the Indicative schema, it is very concise and developer friendly. However, the same schema needs to be parsed to execute the validation rules.

```js
{
  username: 'required',
  'account.type': 'required|in:email,social'
}
```

One way is to loop over the schema object keys, split them by `.` and then inline execute the validations for each field. This process is very straight forward, but will have performance issues.

Instead, we parse the schema into a tree. The tree is later converted to an array of top level functions that are highly optimized for performance.

## Usage
Install the package from npm registry as follows:

```sh
npm i indicative-parser

# yarn
yarn add indicative-parser
```

and then use it as follows:

```js
import { rulesParser } from 'indicative-parser'

rulesParser({
  username: 'required',
  'account.type': 'required|in:email,social'
})
```

Above code outputs the following tree.

```json
{
  "username": {
    "type": "literal",
    "rules": [
      {
        "name": "required",
        "args": []
      }
    ]
  },
  "account": {
    "rules": [],
    "type": "object",
    "children": {
      "type": {
        "type": "literal",
        "rules": [
          {
            "name": "required",
            "args": []
          },
          {
            "name": "in",
            "args": [
              "email",
              "social"
            ]
          }
        ]
      }
    }
  }
}
```

## Typed schema

The parser also allows creating declarative schema that has static type information along with the parsed tree. The type information is really helpful for Typescript projects.

```ts
import { rulesParser, t } from 'indicative-parser'

rulesParser(t.schema({
  username: t.string(),
  account: t.object().members({
    type: t.string(validations.in(['email', 'social']))
  })
}))
```

[circleci-image]: https://img.shields.io/circleci/project/github/poppinss/indicative-parser/master.svg?style=for-the-badge&logo=circleci
[circleci-url]: https://circleci.com/gh/poppinss/indicative-parser "circleci"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/indicative-parser.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/indicative-parser "npm"

[license-image]: https://img.shields.io/npm/l/indicative-parser?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"
