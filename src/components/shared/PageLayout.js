import React from 'react';
import TopNav from './TopNav';
import ControlPanel from './ControlPanel';

class PageLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TopNav />
        <ControlPanel />
      </React.Fragment>
    );
  }
}

export default PageLayout;
