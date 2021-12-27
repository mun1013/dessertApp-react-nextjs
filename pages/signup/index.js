import { Fragment } from "react";
import Head from 'next/head';
import SignUpForm from "../../components/user/signup-form";

function SignupPage() {
  return (
    <Fragment>
      <Head>
        <title>Sign Up</title>
        <meta
          name="signup"
          content="Froggie Dessert SignUp"
        />
      </Head>
      <SignUpForm/>
    </Fragment>
  )
}

export default SignupPage;