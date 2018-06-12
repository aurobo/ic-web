import React from 'react';
import CenteredColumn from './CenteredColumn';
import aurobo from '../assets/img/aurobo-broken.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const IFrame = styled.iframe`
  margin: 20px 0;
`;

class NotFound extends React.Component {
  render() {
    return (
      <CenteredColumn>
        <img src={aurobo} alt="Aurobo Broken" />
        <IFrame
          title="Not Found"
          src="https://giphy.com/embed/6uGhT1O4sxpi8"
          width="480"
          height="240"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        />
        <Link to="/dashboard">
          <h1>Go to Dashboard</h1>
        </Link>
      </CenteredColumn>
    );
  }
}

export default NotFound;
