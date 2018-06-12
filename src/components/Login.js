import React from 'react';
import { Input, Label } from 'semantic-ui-react';
import { Button, CenteredColumn } from '@aurobo/components';
import styled from 'styled-components';
import logo from '../assets/img/logo.png';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase/app';
import 'firebase/auth';

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Field = styled.div`
  margin-bottom: 20px;
  display: flex;
  position: relative;
`;

const ErrorMessage = styled(Label)`
  &&& {
    position: absolute;
    right: 100%;
    min-width: 150px;
    top: 5px;
  }
`;

const StyledInput = styled(Input)`
  &&& {
    width: 100%;
  }
`;

class Login extends React.Component {
  render() {
    return (
      <CenteredColumn>
        <Heading>
          <Logo src={logo} alt="Aurobo Logo" />
          <Title>Aurobo</Title>
        </Heading>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={() =>
            Yup.object().shape({
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required!'),
              password: Yup.string().required('Password is required!'),
            })
          }
          onSubmit={(values, { setSubmitting, setErrors }) => {
            firebase
              .auth()
              .signInWithEmailAndPassword(values.email, values.password)
              .then(user => setSubmitting(false))
              .catch(error => {
                setSubmitting(false);
              });
          }}
          render={({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Field>
                <StyledInput
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  icon="user"
                  placeholder="Email"
                  iconPosition="left"
                  error={touched.email && errors.email ? true : false}
                />
                {touched.email && errors.email ? (
                  <ErrorMessage basic color="red" pointing="right">
                    {errors.email}
                  </ErrorMessage>
                ) : (
                  ''
                )}
              </Field>
              <Field>
                <StyledInput
                  error={touched.password && errors.password ? true : false}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  icon="lock"
                  placeholder="Password"
                  iconPosition="left"
                />
                {touched.password && errors.password ? (
                  <ErrorMessage basic color="red" pointing="right">
                    {errors.password}
                  </ErrorMessage>
                ) : (
                  ''
                )}
              </Field>
              <Button fluid type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        />
      </CenteredColumn>
    );
  }
}

export default Login;
