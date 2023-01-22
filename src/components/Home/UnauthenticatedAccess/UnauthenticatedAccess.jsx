import React from "react";

import "./unauthenticatedAccess.scss";
import background from "../../../assets/images/home/login-theme.png";
import bimroomlogoorange from '../../../assets/images/home/bimroom-demo-orange.svg'

import { loginRequest } from "../../../authConfig";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

const UnauthenticatedAccess = () => {
  const { instance, accounts } = useMsal();

  function handleLogin(instance) {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.error(e);
    });
  }

  return (
    <div style={{width: '100vw', height: '100vh', backgroundSize: 'cover', backgroundImage: `url(${background})`}}>    
      <div className="unauthenticated-section">
        <div className="unauthenticated-container">
          <div className="broom-logo">
            <img src={bimroomlogoorange} alt="" />
          </div>
          <div className="welcome-text">
            <br />
            {/* <p>Sign in to access Bimroom demo</p>
            <br /> */}
          </div>
          <div className="signin-btn" onClick={() => handleLogin(instance)}>
            Sign in
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <div id="background_branding_container" data-tenant-branding-background-color="true">
    //     <img data-tenant-branding-background="true" src="https://cdn.bimroom.com/static/login-theme.png" alt="Illustration"/>
    //   </div>
    //   <div class="container  unified_container " role="presentation">
    //     <div class="row">
    //       <div class="col-lg-6">
    //         <div class="panel panel-default">
    //           <div class="panel-body">
    //             <img class="companyLogo" data-tenant-branding-logo="true" src="https://bimform123.b2clogin.com/static/tenant/templates/images/logo.svg" alt="Company Logo" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default UnauthenticatedAccess;
