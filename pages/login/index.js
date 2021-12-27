import { Fragment } from "react";
import Head from 'next/head';
import LoginForm from "../../components/user/login-form";

function LoginPage() {
  return (
    <Fragment>
      <Head>
        <title>Login</title>
        <meta
          name="login"
          content="Froggie Dessert Login"
        />
      </Head>
      <LoginForm/>
    </Fragment>
  )
}

export default LoginPage;