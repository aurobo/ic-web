import React from 'react';
import Cell from '@aurobo/anatomy/Cell';

const List = props => <div>I am List</div>;

class Material extends React.Component {
  render() {
    return (
      <div>
        I am Material<Cell component={List} />
      </div>
    );
  }
}

export default Material;
