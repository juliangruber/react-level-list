import React from 'react'

export class List extends React.Component {
  constructor () {
    super()
    this.state = { items: {} }
    this.onput = this.onput.bind(this)
    this.ondel = this.ondel.bind(this)
  }

  add (key, value) {
    this.setState({
      items: Object.assign(this.state.items, { [key]: value })
    })
  }

  remove (key) {
    delete this.state.items[key]
    this.setState(this.state)
  }

  onput (key, value) {
    if (key.startsWith(this.props.prefix)) this.add(key, value)
  }

  ondel (key) {
    if (key.startsWith(this.props.prefix)) this.remove(key)
  }

  componentDidMount () {
    this.props.db.createReadStream({
      gt: this.props.prefix,
      lt: `${this.props.prefix}~`
    }).on('data', ({ key, value }) => {
      this.add(key, value)
    })
    this.props.db.on('put', this.onput)
    this.props.db.on('del', this.ondel)
  }

  componentWillUnmount () {
    this.props.db.removeListener('put', this.onput)
    this.props.db.removeListener('del', this.ondel)
  }

  render () {
    return (
      <div>
        {Object.keys(this.state.items).map(key => {
          const value = this.state.items[key]
          return this.props.renderRow({ key, value })
        })}
      </div>
    )
  }
}

List.defaultProps = {
  prefix: ''
}
