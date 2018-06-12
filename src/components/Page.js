import styled from 'styled-components';
import { Message } from 'semantic-ui-react';

const Page = styled(Message)`
  &&& {
    margin: 15px auto;
    border-radius: 0;
    background: #fff;
  }
  @media screen {
    width: 80%;
  }
`;

export default Page;
