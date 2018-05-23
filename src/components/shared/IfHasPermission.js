import React from 'react';

const IfHasPermission = props => {
  let LocalStoagePermissions = [];
  let allowed = true;
  if (window.localStorage.getItem('claims')) {
    LocalStoagePermissions = window.localStorage
      .getItem('claims')
      .split(',')
      .filter(val => val);
  }

  //bypass the permission checks if logged in user is admin
  if (window.localStorage.getItem('role') !== 'admin') {
    if (props.permissions) {
      props.permissions.forEach(permission => {
        if (LocalStoagePermissions.indexOf(permission) < 0) {
          allowed = false;
        }
      });
    }
  }

  return <React.Fragment> {allowed ? props.children : null}</React.Fragment>;
};

export default IfHasPermission;
