import React from 'react';
import { Tissue, ListCell, ViewCell } from '@aurobo/anatomy';
import pluralize from 'pluralize';

class MagicTissue extends React.Component {
  render() {
    const { name, organ, listTableColumns, viewList } = this.props;
    let pluralizedName = pluralize(name);
    let lowercasedName = String(name).toLowerCase();
    let lowercasedPluralizedName = String(pluralizedName).toLowerCase();
    let getUrl = '/' + lowercasedPluralizedName;
    let importLink = '/' + String(organ).toLowerCase() + '/' + lowercasedName + '/import-excel';
    let getUrlPrefix = '/' + lowercasedPluralizedName + '/';

    return (
      <Tissue
        renderList={() => (
          <ListCell name={pluralizedName} getUrl={getUrl} importLink={importLink} tableColumns={listTableColumns} />
        )}
        renderView={() => <ViewCell getUrlPrefix={getUrlPrefix} name={pluralizedName} list={viewList} />}
      />
    );
  }
}

export default MagicTissue;
