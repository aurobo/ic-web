import React from 'react';
import Firestore from './firestore';
import Raven from 'raven-js';

const { Provider, Consumer } = React.createContext();

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    Raven.captureException(error, { extra: info });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="snap" onClick={() => Raven.lastEventId() && Raven.showReportDialog()}>
          <span role="img" aria-label="crying">
            😭
          </span>
          <p>We're sorry — something's gone wrong.</p>
          <p>Our team has been notified, but click here fill out a report.</p>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

const PlasmaProvider = ({ instance, children }) => {
  return <Provider value={instance}>{children}</Provider>;
};

const PlasmaConsumer = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {firebase => (
        <ErrorBoundary>
          <Component {...rest} firebase={firebase} />
        </ErrorBoundary>
      )}
    </Consumer>
  );
};

const Plasma = {
  Provider: PlasmaProvider,
  Consumer: PlasmaConsumer,
};

export { Firestore };
export default Plasma;
