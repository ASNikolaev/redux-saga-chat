import React, {PureComponent} from 'react';
import './container.css'

class Container extends PureComponent {
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    )
  }
}

export default Container
