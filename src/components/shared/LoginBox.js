import React from 'react';
import logo from '@innovic/assets/img/logo.png';
import { Button, Form, Card, Input } from 'semantic-ui-react';
import styled from 'styled-components';
import firebase from 'firebase';

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

// const StyledMessage = styled(Message)`
//   &&& {
//     text-align: center;
//   }
// `;

class LoginBox extends React.Component {
  state = {
    username: '',
    password: '',
    loading: false,
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  authenticate = (email, password) => {
    this.setState({ loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        //TO handle other code dependecies, currently setting them dummmy
        window.localStorage.setItem('token', 'something');
        window.localStorage.setItem('role', 'admin');

        this.setState({ loading: false });
        this.props.onAuthSuccess();
      })
      .catch(error => {
        this.setState({ loading: false });

        console.log(error.code + ' ' + error.message);
      });
  };

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
                <Input
                  name="username"
                  icon="user"
                  placeholder="Username"
                  iconPosition="left"
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  name="password"
                  icon="lock"
                  placeholder="Password"
                  iconPosition="left"
                  type="password"
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Button
                fluid
                primary
                type="submit"
                onClick={() => this.authenticate(this.state.username, this.state.password)}
                loading={this.state.loading}
              >
                Submit
              </Button>
            </Form>
          </Card.Content>
        </LoginForm>
        {/* <StyledMessage>
          <p>Login is temporarily inactive.</p>
          <p>
            <Link to="/dashboard">Click here</Link> to go to dashboard.
          </p>
        </StyledMessage> */}
      </Wrapper>
    );
  }
}

export default LoginBox;
