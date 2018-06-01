import React from 'react';
import Plasma from '..';
import Collection from './Collection';
import Document from './Document';
import Create from './Create';
import Update from './Update';

const Firestore = {
  Collection: props => <Plasma.Consumer component={Collection} {...props} />,
  Document: props => <Plasma.Consumer component={Document} {...props} />,
  Create: props => <Plasma.Consumer component={Create} {...props} />,
  Update: props => <Plasma.Consumer component={Update} {...props} />,
};

export default Firestore;
