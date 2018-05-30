import React from 'react';
import Plasma from '..';
import Collection from './Collection';
import Document from './Document';
import Create from './Create';

const Firestore = {
  Collection: props => <Plasma.Consumer component={Collection} {...props} />,
  Document: props => <Plasma.Consumer component={Document} {...props} />,
  Create: props => <Plasma.Consumer component={Create} {...props} />,
};

export default Firestore;
