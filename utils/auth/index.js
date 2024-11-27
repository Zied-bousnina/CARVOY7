import { authActions } from "@/store/auth/authSlice";

export const refreshAuthentication = (dispatch, router) => {
  let jwt = localStorage.getItem("jwtToken");
  if (jwt) {
    dispatch(authActions.login({ token: jwt, router: router }));
  } else {
    dispatch(authActions.logout({ router }));
  }
};
