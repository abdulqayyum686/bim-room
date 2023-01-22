import { useEffect, useState } from 'react';
//import { useRouter } from 'next/router';
import { useNavigate, useLocation } from "react-router-dom";
// import PropTypes from 'prop-types';
// import { useAuth } from '../../hooks/use-auth';
import {
  useIsAuthenticated,
  useMsal,
} from '@azure/msal-react';

export const AuthGuard = (props) => {
  const { children } = props;
  //const auth = useAuth();
  const isAuthenticated = useIsAuthenticated();
  // !isAuthenticated

  //const router = useRouter();
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

      if (!isAuthenticated) {

        navigate("/");
      } else {
        setChecked(true);
      }
    }, [location.pathname]);
    
  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};