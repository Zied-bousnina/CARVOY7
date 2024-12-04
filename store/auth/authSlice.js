import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  id: "",
  email: "",
  role: "",
  token: "",
  exp: null,
  iat: null,
  isLoggedIn: false,
  driverIsVerified: false,
  firstLogin: false,
  isBlocked: false,
  name: "",
  onligne: false,
  verified: false,
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    login(state, action) {
      const decodedToken = jwtDecode(action.payload.token);
      console.log("login", decodedToken);
      if (decodedToken.role) {
        localStorage.setItem("jwtToken", action.payload.token);
       // Update the state
state.id = decodedToken.id;
state.email = decodedToken.email;
state.role = decodedToken.role;
state.token = action.payload.token;
state.isLoggedIn = true;
state.exp = decodedToken.exp;
state.iat = decodedToken.iat;

// Add new fields from the API response or token payload
state.name = decodedToken.name || ""; // Ensure defaults for missing fields
state.verified = decodedToken.verified || false;
state.driverIsVerified = decodedToken.driverIsVerified || false;
state.firstLogin = decodedToken.firstLogin || false;
state.isBlocked = decodedToken.isBlocked || false;
state.onligne = decodedToken.onligne || false;
        console.log("connected++++++++++++++",decodedToken.role)
        switch (decodedToken.role) {
          case "PARTNER":
            action.payload.router.push("/partner");
            break;
          case "ADMIN":
            action.payload.router.push("/admin");
            // action.payload.router.push("/admin/devis/674f51d4a19dfdd91429bfe8");
            break;

          default:
            action.payload.router.push("/");
            break;
        }
      }
    },
    logout(state, action) {
      localStorage.removeItem("jwtToken");
      state.id = "";
      state.email = "";
      state.role = "";
      state.token = "";
      state.isLoggedIn = false;
      state.exp = null;
      state.iat = null;
      action.payload.router.push("/");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
