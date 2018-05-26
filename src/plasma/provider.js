import React from 'react';

const { Provider } = React.createContext();

export default class extends React.Component {
  render() {
    const { firebase } = this.props;
    return <Provider value={firebase}>{this.props.children}</Provider>;
  }
}
