# aws-lamba-reply

>💬 A tiny utility for creating AWS Lambda response objects.

This package provides an easy way for you set default headers for your lambda functions. Helps reduce clutter and make
your output more consistent in large scale applications.

## Install

```bash
$ npm install aws-lambda-reply
```

## Why

When developing large applications you often work across multiple repositories. I found myself following the same
pattern of creating a factory in each repository every time I wanted set standards for a lambda's output. When you also
have to add tests for this boilerplate for each copy iteration it can quickly get annoying - this package intends to
solve this problem by creating a first class, best version of this generic method, that is easily accessible as a
module.

## Usage

Set up aws-lambda-reply with your defaults:

```javascript
import { LambdaReply } from 'aws-lambda-reply';

const reply = new LambdaReply({
  headers: {
    'x-powered-by': 'nodejs',
  }
});
```

And then use inside your function:

```javascript
function handler(event, context, callback) {
  const response = reply.make(200, '{"message": "Hello world!"}');
  callback(null, response);
}
```

## API

```js
// ES6
import { LambdaReply } from 'aws-lambda-reply';

// commonJS
const LambdaReply = require('aws-lambda-reply').LambdaReply;
```

---

```javascript
const reply = new LambdaReply(defaults);
```

>This API assumes that you call the object `reply`, but you can call it anything you want.

### Constructor

#### defaults

Type: `object`

Defaults for all replies made using this object.

```typescript
{
  headers?: { [key: string]: string | boolean | number },
  multiValueHeaders?: { [key: string]: string[] }
}
```

---

```js
reply.make(statusCode, body, options);
```

### Params

#### statusCode

Type: `number`

HTTP status code

#### body

Type: `string`

The response body to return.

#### options

Type: `object`

Add additional headers or set the response as base64 encoded.

```typescript
{
  headers?: { [key: string]: string | boolean | number },
  multiValueHeaders?: { [key: string]: string[] },
  isBase64Encoded?: boolean,
}
```

#### Returns

Type: `object`

```typescript
{
  statusCode: number,
  body: string,
  headers?: { [key: string]: string | boolean | number },
  multiValueHeaders?: { [key: string]: string[] },
  isBase64Encoded?: boolean
}
```
