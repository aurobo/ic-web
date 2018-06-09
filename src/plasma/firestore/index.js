import React from 'react';
import Plasma from '..';
import Collection from './Collection';
import Document from './Document';
import Set from './Set';
import Delete from './Delete';

const Firestore = {
  Collection: props => <Plasma.Consumer component={Collection} {...props} />,
  Document: props => <Plasma.Consumer component={Document} {...props} />,
  Set: props => <Plasma.Consumer component={Set} {...props} />,
  Delete: props => <Plasma.Consumer component={Delete} {...props} />,
};

export default Firestore;
