import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import "./Login.css";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    //onAuthStateChange() method allows to listen for changes in the user's authentication state
    //It takes a callback fn which is executed whenever the auth state changes
    //Callback fn args:
    // // 1. e - event (such as "SIGNED_IN", "SIGNED_OUT")
    // // 2. session - session obj if user is authenticated or "null" if is not
    supabase.auth.onAuthStateChange(async (e, session) => {
      if (session) {
        navigate("/home");
      }
    });
  }, [navigate]);

  return (
    <div className="Login">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="light"
        providers={[]}
      />
    </div>
  );
};

export default Login;
