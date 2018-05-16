import React from 'react';

const IfHasPermission = props => {
  const LocalStoagePermissions = ['viewInvoice', 'EditInvoice'];
  let allowed = true;
  props.permissions.forEach(permission => {
    if (LocalStoagePermissions.indexOf(permission) < 0) {
      allowed = false;
    }
  });

  return <div> {allowed ? props.children : null}</div>;
};

export default IfHasPermission;
