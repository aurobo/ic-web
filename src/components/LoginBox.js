import React from 'react';
import { Button, Form, Card, Input } from 'semantic-ui-react';
import styled from 'styled-components';
import { getClaims } from './ClaimsManager';

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

  authenticate = (username, password) => {
    this.setState({ loading: true });
    var data = 'grant_type=password&username=' + username + '&password=' + password;
    // api
    //   .post('/token', data, {
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //     onDownloadProgress: progressEvent => this.setState({ loading: false }),
    //   })
    //   .then(response => {
    //     window.localStorage.setItem('token', response.data.access_token);

    //     //setting role staticlly till we have respective implementation on API
    //     window.localStorage.setItem('role', 'admin');
    //     window.localStorage.setItem('claims', getClaims(window.localStorage.getItem('role')));

    //     this.props.onAuthSuccess();
    //   })
    //   .catch(error => {
    //     window.localStorage.clear();
    //   });
  };

  render() {
    const { logo } = this.props;
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
