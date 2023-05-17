import { createContext,useEffect,useReducer } from "react"
   

const INITIAL_STATE={
//   user: null,

// user:JSON.parse(localStorage.getItem("user")) || null,
user: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : null,
  loadong:false,
  error:null,
}


export const AuthContext= createContext(INITIAL_STATE)

const AuthReducer=(state,action) =>{
    switch(action.type){
      case "LOGIN_START":
        return {
            user: null,
            loadong:true,
            error:null,
        };
        case "LOGIN_SUCCESS":
        return {
            user: action.payload,
            loadong:false,
            error:null,
        };
        case "LOGIN_FAILURE":
        return {
            user: null,
            loadong:false,
            error:action.payload,
        };
        case "LOGOUT":
            return {
                user: null,
                loadong:false,
                error:null,
            };
        default:
            return state;
    }
}


export const AuthContextProvider = ({children}) => {
    const [state , dispatch]= useReducer(AuthReducer,INITIAL_STATE);
    
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])
   

    return (
        <AuthContext.Provider value={{user:state.user,loading:state.loading,error:state.error, dispatch}}>
      
          {children}
        </AuthContext.Provider>
    )
};