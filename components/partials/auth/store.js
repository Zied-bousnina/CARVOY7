import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import axios from "axios";
import { SetAuthToken } from "@/utils/SetAuthToken";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import { ApiConfigs } from "@/_helpers";
// import { useRouter } from "next/navigation";
const initialUsers = () => {
  if (typeof window !== "undefined") {
    const item = window?.localStorage.getItem("users");
    return item
      ? JSON.parse(item)
      : [
          {
            id: uuidv4(),
            name: "dashcode",
            email: "dashcode@gmail.com",
            password: "dashcode",
          },
        ];
  }
  return [
    {
      id: uuidv4(),
      name: "dashcode",
      email: "dashcode@gmail.com",
      password: "dashcode",
    },
  ];
};
// save users in local storage

const initialIsAuth = () => {
  if (typeof window !== "undefined") {
    const item = window?.localStorage.getItem("isAuth");
    return item ? JSON.parse(item) : false;
  }
  return false;
};
function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export const handlelogin2 = createAsyncThunk(
  "auth/handlelogin",
  async (data, router, thunkAPI) => {
    // const router = useRouter();

    const response = await axios.post(
      "https://my-krew-t2j4.onrender.com/api/users/login",
      data
    );

    if (response.data.preRegistration?.status == "NOTEXIST") {
      toast.info("Merci de completer votre dossier", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // router.push("/preRegistration");
    }
    return response.data;
  }
);

export const handleRegister2 = createAsyncThunk(
  "auth/handleRegister",
  async (data, thunkAPI) => {
  
    const response = await axios.post(
      `https://my-krew-t2j4.onrender.com/api/users`,
      data
    );
 
    return response.data;
  }
);

export const handleRegistretionStep1 = createAsyncThunk(
  "auth/handleRegistretionStep1",
  async (data, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");
    
    const response = await axios.post(
      `https://my-krew-t2j4.onrender.com/api/users/preRegistration/createPreRegistration1`,
      data,
      {
        headers: { Authorization: `${token}` },
      }
    );
    
    return response.data;
  }
);
export const handleRegistretionStep2 = createAsyncThunk(
  "auth/handleRegistretionStep2",
  async (data, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");
    
    const response = await axios.post(
      ApiConfigs.base_url +
        ApiConfigs.apis.preregistration.createPreRegistration2,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      }
    );
    
    return response.data;
  }
);

export const handleRegistretionStep4 = createAsyncThunk(
  "auth/handleRegistretionStep4",
  async (data, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");
    
    
    // const response = await axios.post(`https://my-krew-t2j4.onrender.com/api/users/preRegistration/createPreRegistration4`, data,
    // {
    //   headers: { "Content-Type": "multipart/form-data",
    //   Authorization: `${token}`,

    //  }
    // }
    // );
    
    const response = await axios.post(
      ApiConfigs.base_url +
        ApiConfigs.apis.preregistration.createPreRegistration4,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      }
    );
    
    return response.data;
  }
);

export const handleGetRegistrationByUserId = createAsyncThunk(
  "auth/handleGetRegistrationByUserId",
  async (data, thunkAPI) => {
    const token = localStorage.getItem("jwtToken");
   
    const response = await axios.get(
      `https://my-krew-t2j4.onrender.com/api/users/preRegistration/getPreregistration`,
      {
        headers: { Authorization: `${token}` },
      }
    );

   
    return response.data;
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: initialUsers(),
    isAuth: initialIsAuth(),
    isAuth: false,
    isLoading: false,
    error: false,
    role: "",
    user: {},
    preregistration: {},
  },
  reducers: {
    handleRegister: (state, action) => {
      const { name, email, password } = action.payload;
      const user = state.users.find((user) => user.email === email);
      if (user) {
        toast.error("User already exists", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        state.users.push({
          id: uuidv4(),
          name,
          email,
          password,
        });
        if (typeof window !== "undefined") {
          window?.localStorage.setItem("users", JSON.stringify(state.users));
        }
        toast.success("User registered successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },

    //     handleLogin: async (state, action) => {
    //       // state.isAuth = action.payload;
    //    
    //       // state.isLoading=true
    //       // save isAuth in local storage
    //       // if (typeof window !== "undefined") {
    //       //   window?.localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
    //       // }
    //       // toast.success("User logged in successfully", {
    //       //   position: "top-right",
    //       //   autoClose: 1500,
    //       //   hideProgressBar: false,
    //       //   closeOnClick: true,
    //       //   pauseOnHover: true,
    //       //   draggable: true,
    //       //   progress: undefined,
    //       //   theme: "light",
    //       // });
    //      
    //         {
    //           email: action.payload.email,
    //           password: action.payload.password,
    //         }
    //       )
    //       try {
    //         const res = await axios
    //           .post(`https://convoyage.onrender.com/api/users/login`, { email: action.payload.email, password: action.payload.password });
    //         const { token } = res.data;

    //        

    //         // AsyncStorage.setItem('jwtToken', token)
    //         localStorage.setItem('jwtToken', token);
    //         toast.success("User logged in successfully", {
    //           position: "top-right",
    //           autoClose: 1500,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "light",
    //         });
    //         // state.isLoading=false
    //         // Set token to Auth header
    //         SetAuthToken(token);
    //         // dispatch(GetProfile())
    //         // dispatch(GetCurrentUser())
    //         // Decode token to get user data
    //         const decoded = parseJwt(token);
    //       
    //         localStorage.setItem('role', decoded?.role);
    //         // Set current user
    //         // dispatch(setCurrentUser(decoded))
    //         // state.isAuth = true;
    //         // state.user = decoded;
    //         // state.role = decoded?.role;
    //       } catch (err) {
    //        
    //         // state.isLoading=false
    //         toast.error("Invalid credentials", {
    //           position: "top-right",
    //           autoClose: 1500,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "light",
    //         });
    //       }

    // },
    handleLogout: (state, action) => {
      state.isAuth = action.payload;
      // remove isAuth from local storage
      if (typeof window !== "undefined") {
        window?.localStorage.removeItem("isAuth");
        window?.localStorage.removeItem("jwtToken");
        window?.localStorage.removeItem("role");
      }
      toast.success("User logged out successfully", {
        position: "top-right",
      });
      window.location.href = "/";
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrors: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [handlelogin2.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [handlelogin2.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
      if ((action.payload.preRegistration.status = "NOTEXIST")) {
        toast.info("Merci de completer votre dossier", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // router.push("/preRegistration");
      }

      state.error = false;
      const token = action.payload.token;

     

      // AsyncStorage.setItem('jwtToken', token)
      localStorage.setItem("jwtToken", token);
      toast.success("User logged in successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // state.isLoading=false
      // Set token to Auth header
      SetAuthToken(token);
      // dispatch(GetProfile())
      // dispatch(GetCurrentUser())
      // Decode token to get user data
      const decoded = parseJwt(token);
      
      state.role = decoded?.role;
      localStorage.setItem("role", decoded?.role);
    },
    [handlelogin2.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    [handleRegister2.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
      
    },
    [handleRegister2.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
      state.error = false;
      const token = action.payload.token;
     

   

      // AsyncStorage.setItem('jwtToken', token)
      localStorage.setItem("jwtToken", token);
      toast.success("User registered successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // state.isLoading=false
      // Set token to Auth header
      SetAuthToken(token);
      // dispatch(GetProfile())
      // dispatch(GetCurrentUser())
      // Decode token to get user data
      const decoded = parseJwt(token);
    
      state.role = decoded?.role;
      localStorage.setItem("role", decoded?.role);
    },
    [handleRegister2.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    [handleRegistretionStep1.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [handleRegistretionStep1.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
      state.error = false;
      // const token  = action.payload.token;
     

    
      // AsyncStorage.setItem('jwtToken', token)
      // localStorage.setItem('jwtToken', token);
      toast.success("User registered successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // state.isLoading=false
      // Set token to Auth header
      // SetAuthToken(token);
      // // dispatch(GetProfile())
      // // dispatch(GetCurrentUser())
      // // Decode token to get user data
      // const decoded = parseJwt(token);
     
      // state.role = decoded?.role;
      // localStorage.setItem('role', decoded?.role);
    },
    [handleRegistretionStep1.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    [handleRegistretionStep2.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [handleRegistretionStep2.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
      state.error = false;
      // const token  = action.payload.token;
      

     

      // AsyncStorage.setItem('jwtToken', token)
      // localStorage.setItem('jwtToken', token);
      toast.success("User registered successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // state.isLoading=false
      // Set token to Auth header
      // SetAuthToken(token);
      // // dispatch(GetProfile())
      // // dispatch(GetCurrentUser())
      // // Decode token to get user data
      // const decoded = parseJwt(token);
     
      // state.role = decoded?.role;
      // localStorage.setItem('role', decoded?.role);
    },
    [handleRegistretionStep2.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    [handleRegistretionStep4.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [handleRegistretionStep4.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
      state.error = false;
      // const token  = action.payload.token;
      

     

      // AsyncStorage.setItem('jwtToken', token)
      // localStorage.setItem('jwtToken', token);
      toast.success("User registered successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // state.isLoading=false
      // Set token to Auth header
      // SetAuthToken(token);
      // // dispatch(GetProfile())
      // // dispatch(GetCurrentUser())
      // // Decode token to get user data
      // const decoded = parseJwt(token);
      
      // state.role = decoded?.role;
      // localStorage.setItem('role', decoded?.role);
    },
    [handleRegistretionStep4.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    [handleGetRegistrationByUserId.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [handleGetRegistrationByUserId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.preregistration = action.payload;
      state.error = false;
    },
    [handleGetRegistrationByUserId.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const { handleRegister, handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
