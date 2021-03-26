import React from "react"
import { Tabs, TabList, TabPanels, Tab, TabPanel, Input, Button, useToast } from "@chakra-ui/react"
import styled from '@emotion/styled'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios'

function App() {
  const toast = useToast()
  return (
    <TabBox size="md" variant="enclosed">
      <TabList>
        <TabTitle>登录</TabTitle>
        <TabTitle>注册</TabTitle>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Email Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              axios.post('https://conduit.productionready.io/api/users/login', {
                ...values
              }).then(resp => {
                console.log(resp)
              }).catch(err => {
                toast({
                  title: `email or password is invalid`,
                  status: 'error',
                  isClosable: true,
                })
              })
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="email">
                  {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>
                      <Input placeholder="Email" size="md" {...field} />
                    </div>
                  )}
                </Field>
                <Field name="password">
                  {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>
                      <Input placeholder="Password" size="md" {...field} />
                    </div>
                  )}
                </Field>
                <ErrorMessageBox name="email" component="div" />
                <ErrorMessageBox name="password" component="div" />
                <ButtonBox colorScheme="teal" size="md" type="submit">
                  登录
                </ButtonBox>
              </Form>
            )}
          </Formik>
        </TabPanel>
        <TabPanel>
        <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Email Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              axios.post(' https://conduit.productionready.io/api/users', {
                user: {
                  ...values
                }
              }).then(resp => {
                if (resp.data.user) {
                  toast({
                    title: `注册成功`,
                    status: 'success',
                    isClosable: true,
                  })
                }
              }).catch(err => {
                toast({
                  title: `email or password is invalid`,
                  status: 'error',
                  isClosable: true,
                })
              })
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="username">
                  {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>
                      <Input placeholder="Username" size="md" {...field} />
                    </div>
                  )}
                </Field>
                <Field name="email">
                  {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>
                      <Input placeholder="Email" size="md" {...field} />
                    </div>
                  )}
                </Field>
                <Field name="password">
                  {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>
                      <Input placeholder="Password" size="md" {...field} />
                    </div>
                  )}
                </Field>
                <ErrorMessageBox name="email" component="div" />
                <ErrorMessageBox name="password" component="div" />
                <ButtonBox colorScheme="teal" size="md" type="submit">
                  注册
                </ButtonBox>
              </Form>
            )}
          </Formik>
        </TabPanel>
      </TabPanels>
    </TabBox>
  );
}

const TabBox = styled(Tabs)`
  width: 400px;
  margin: 100px auto
`

const TabTitle = styled(Tab)`
  width: 50%;
`

const ButtonBox = styled(Button)`
  width: 368px;
  margin-top: 20px;
`

const ErrorMessageBox = styled(ErrorMessage)`
  font-size: 12px;
  color: red;
  margin-top: 10px;
`

export default App;
