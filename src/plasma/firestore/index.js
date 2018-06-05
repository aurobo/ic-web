import React from 'react';
import Plasma from '..';
import Collection from './Collection';
import Document from './Document';
import Set from './Set';

const Firestore = {
  Collection: props => <Plasma.Consumer component={Collection} {...props} />,
  Document: props => <Plasma.Consumer component={Document} {...props} />,
  Set: props => <Plasma.Consumer component={Set} {...props} />,
};

export default Firestore;
