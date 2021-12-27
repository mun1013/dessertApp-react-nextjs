import { Fragment } from "react";
import AboutSummary from "./about-summary";
import ContactSummary from "./contact-summary";
import Introduction from "./introduction";

function MainPage() {
  return (
    <Fragment>
      <Introduction/>
      <AboutSummary/>
      <ContactSummary/>
    </Fragment>
  );
};

export default MainPage;
