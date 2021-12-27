import { Fragment } from "react";
import Head from 'next/head';
import ChangePasswordForm from "../../components/user/change-password-form";

function changePasswordPage() {
  return (
    <Fragment>
      <Head>
        <title>Change Password</title>
        <meta
          name="change password"
          content="User Profile Change Password"
        />
      </Head>
      <ChangePasswordForm/>
    </Fragment>
  );
}

export default changePasswordPage;