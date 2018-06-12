import React from 'react';
import Firestore from './firestore';
import Raven from 'raven-js';
import 'firebase/auth';
import 'firebase/firestore';

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
    if (this.state.hasError) {
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

const PlasmaProvider = ({ firebase, children, ...rest }) => {
  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  return <Provider value={{ firebase: firebase, firestore: firestore, ...rest }}>{children}</Provider>;
};

const PlasmaConsumer = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {({ firebase, firestore, user }) => {
        return (
          <ErrorBoundary>
            <Component {...rest} firebase={firebase} firestore={firestore} user={user} />
          </ErrorBoundary>
        );
      }}
    </Consumer>
  );
};

const Plasma = {
  Provider: PlasmaProvider,
  Consumer: PlasmaConsumer,
  RawConsumer: Consumer,
};

export { Firestore };
export default Plasma;
