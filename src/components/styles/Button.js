import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

export default styled(Button)`
  &&& {
    ${props => (props.light ? 'background: ' + props.theme.secondary.default : null)};
    ${props => (props.dark ? 'background: ' + props.theme.primary.default : null)};
    text-transform: ${props => (props.fluid ? '' : 'uppercase')};
    ${props => (props.light || props.dark ? 'color: #fff' : null)};
    ${props => (props.flat ? 'border-radius: 0' : null)};
  }
  &&&:hover {
    ${props => (props.light ? 'background: ' + props.theme.secondary.dark : null)};
    ${props => (props.dark ? 'background: ' + props.theme.primary.dark : null)};
  }
`;
