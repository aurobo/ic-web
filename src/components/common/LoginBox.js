import React from "react";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import { Button, Form, Card, Input, Message } from "semantic-ui-react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  height: 60px;
  width: 60px;
`;

const Title = styled.span`
  font-size: 30px;
  line-height: 30px;
  padding-left: 10px;
  color: ${props => props.theme.primary};
`;

const LoginForm = styled(Card)`
  &&& {
    width: 100%;
  }
`;

const StyledMessage = styled(Message)`
  &&& {
    text-align: center;
  }
`;

class LoginBox extends React.Component {
  state = {
    credentials: {}
  };

  componentDidMount() {
    // axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
    //   const credentials = res.data;
    //   this.setState({ credentials });
    // });
  }

  render() {
    return (
      <Wrapper>
        <Heading>
          <Logo src={logo} alt="Innovic ERP Logo" />
          <Title>Log-in to your account</Title>
        </Heading>
        <LoginForm>
          <Card.Content>
            <Form>
              <Form.Field>
                <Input icon="user" placeholder="Email" iconPosition="left" />
              </Form.Field>
              <Form.Field>
                <Input icon="lock" placeholder="Password" iconPosition="left" />
              </Form.Field>
              <Button fluid primary type="submit">
                Submit
              </Button>
            </Form>
          </Card.Content>
        </LoginForm>
        <StyledMessage>
          <p>Login is temporarily inactive.</p>
          <p>
            <Link to="/dashboard">Click here</Link> to go to dashboard.
          </p>
        </StyledMessage>
      </Wrapper>
    );
  }
}

export default LoginBox;
