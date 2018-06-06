import Raven from 'raven-js';

export default function initializeApp() {
  if (process.env.NODE_ENV === 'development') {
    if (process.env.REACT_APP_SENTRY) {
      Raven.config(process.env.REACT_APP_SENTRY).install();
    } else {
      // Extract errors as constants in another file
      console.log(
        '%cHey you awesome contributor, did you know you can set REACT_APP_SENTRY environment variable to receive reports while in development environment?',
        'color: #fff; background: blue'
      );
      console.log(
        '%cCheckout aurobo contributor FAQs/Guide on how to setup local environment variables.',
        'color: #fff; background: blue'
      );
      console.log('%cYou should checkout https://sentry.io', 'color: #fff; background: blue');
    }
  }
}
