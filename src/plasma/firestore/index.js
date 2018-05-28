import React from 'react';
import Plasma from '..';
import Collection from './Collection';
import Document from './Document';

const Firestore = {
  Collection: props => <Plasma.Consumer component={Collection} {...props} />,
  Document: props => <Plasma.Consumer component={Document} {...props} />,
};

export default Firestore;
