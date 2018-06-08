import React from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

const FullScreenLoader = props => (
  <Segment style={{ height: '100vh' }}>
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  </Segment>
);

export default FullScreenLoader;
