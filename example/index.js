import React from 'react'
import ReactDOM from 'react-dom'
import level from 'level'
import { List } from '..'

const db = window.db = level('/tmp/preact-level-value')

class Example extends React.Component {
  addItem () {
    db.put(`prefix${Math.random()}`, Math.random())
  }
  render () {
    return (
      <div id="example">
        Push this button:<br />
        <button onClick={ this.addItem }>Add item</button><br /><br />
        Or execute this snippet in the console:<br />
        <pre>db.put(`prefix${'{Math.random()}'}`, Math.random())</pre><br />
        Live list:
        <ul>
          <List
            db={db}
            prefix='prefix'
            renderRow={ ({ key, value }) => <li key={key}>{value}</li> }
          />
        </ul>
      </div>
    )
  }
}

const container = document.createElement('div')
document.body.appendChild(container)
ReactDOM.render(<Example />, container)
