import { Fragment } from "react";
import Head from 'next/head';
import ProfileForm from "../../components/user/profile-form";

function ProfilePage() {
  return (
    <Fragment>
      <Head>
        <title>Profile</title>
        <meta
          name="profile"
          content="User Profile"
        />
      </Head>
      <ProfileForm/>
    </Fragment>
  )
}

export default ProfilePage;