import React from 'react';
import { Tissue, ListCell, ViewCell } from '@innovic/components/shared/anatomy';
import pluralize from 'pluralize';

class MagicTissue extends React.Component {
  render() {
    const { name, organ, listTableColumns, viewList } = this.props;
    let pluralizedName = pluralize(name);
    let lowercasedName = String(name).toLowerCase();
    let lowercasedPluralizedName = String(pluralizedName).toLowerCase();
    let getUrl = '/' + lowercasedPluralizedName;
    let importLink = '/' + String(organ).toLowerCase() + '/' + lowercasedName + '/import-excel';

    return (
      <Tissue
        list={
          <ListCell name={pluralizedName} getUrl={getUrl} importLink={importLink} tableColumns={listTableColumns} />
        }
        view={<ViewCell name={pluralizedName} list={viewList} />}
      />
    );
  }
}

export default MagicTissue;
