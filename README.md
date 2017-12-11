# react-level-list

Live updating [leveldb](https://leveldb.org) list component for [react](https://reactjs.org/)!

## Example

```js
import React from 'react'
import level from 'level'
import { List } from 'react-level-list'

const db = level('/tmp/react-level-list')

class Example extends React.Component {
  render () {
    return (
      <ul id="example">
        <List
          db={db}
          prefix='prefix'
          renderRow={ ({ value }) => <li>{value}</li> }
          filter=({ value } => Number(value) > 0.5)
        />
      </div>
    )
  }
}
```

Now the `<List />` component will always reflect the values you have stored in your database with `prefix`.

Find a full example in [/example](example):

```bash
$ npm install
$ npm run rebuild
$ npm start
```

![screenshot](screenshot.png)

## Installation

```bash
$ npm install react-level-list
```

## API

### `<List db [prefix renderRow filter] />`

## License

MIT
