import React from 'react';
import styled from 'styled-components';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';

class StatesMenu extends React.Component {
  render() {
    return (
      <div>
        <Dropdown item text="State">
          <Dropdown.Menu>
            <Dropdown.Item>Andra Pradesh</Dropdown.Item>
            <Dropdown.Item>Arunachal Pradesh</Dropdown.Item>
            <Dropdown.Item>Assam</Dropdown.Item>
            <Dropdown.Item>Bihar</Dropdown.Item>
            <Dropdown.Item>Chhattisgarh</Dropdown.Item>
            <Dropdown.Item>Goa</Dropdown.Item>
            <Dropdown.Item>Gujarat</Dropdown.Item>
            <Dropdown.Item>Haryana</Dropdown.Item>
            <Dropdown.Item>Himachal Pradesh</Dropdown.Item>
            <Dropdown.Item>Jammu and Kashmir</Dropdown.Item>
            <Dropdown.Item>Jharkhand</Dropdown.Item>
            <Dropdown.Item>Karnataka</Dropdown.Item>
            <Dropdown.Item>Kerala</Dropdown.Item>
            <Dropdown.Item>Madya Pradesh</Dropdown.Item>
            <Dropdown.Item>Maharashtra</Dropdown.Item>
            <Dropdown.Item>Manipur</Dropdown.Item>
            <Dropdown.Item>Meghalaya</Dropdown.Item>
            <Dropdown.Item>Mizoram</Dropdown.Item>
            <Dropdown.Item>Nagaland</Dropdown.Item>
            <Dropdown.Item>Orissa</Dropdown.Item>
            <Dropdown.Item>Punjab</Dropdown.Item>
            <Dropdown.Item>Rajasthan</Dropdown.Item>
            <Dropdown.Item>Sikkim</Dropdown.Item>
            <Dropdown.Item>Tamil Nadu</Dropdown.Item>
            <Dropdown.Item>Telangana</Dropdown.Item>
            <Dropdown.Item>Tripura</Dropdown.Item>
            <Dropdown.Item>Uttar Pradesh</Dropdown.Item>
            <Dropdown.Item>Uttarakhand</Dropdown.Item>
            <Dropdown.Item>West Bengal</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Union Territories">
          <Dropdown.Item>Andaman and Nicobar Islands</Dropdown.Item>
          <Dropdown.Item>Chandigarh</Dropdown.Item>
          <Dropdown.Item>Delhi</Dropdown.Item>
          <Dropdown.Item>Dadra and Nagar Haveli</Dropdown.Item>
          <Dropdown.Item>Daman and Diu</Dropdown.Item>
          <Dropdown.Item>Lakshadweep</Dropdown.Item>
          <Dropdown.Item>Puducherry</Dropdown.Item>
        </Dropdown>
      </div>
    );
  }
}

export default StatesMenu;
