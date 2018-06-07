import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

export default styled(Button)`
  &&& {
    background: ${props => props.theme.primary.default};
    text-transform: ${props => (props.fluid ? '' : 'uppercase')};
    color: #fff;
  }
  &&&:hover {
    background: ${props => props.theme.primary.dark};
  }
`;
