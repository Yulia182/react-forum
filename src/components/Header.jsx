import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import React, { useEffect, useState } from "react";
import { supabase } from "../client";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUserData = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      console.log(data.user);
      setUser(data.user);
    }
  };
  useEffect(() => {
    const checkAuthState = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        await getUserData();
        // console.log(session);
      } else {
        setUser(null);
      }
    };
    checkAuthState();
  }, [navigate]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      navigate("/home");
    }
  };
  return (
    <header>
      <nav className="Header">
        <div className="title">
          <Link to="home">
            <h1>{`<CodeConnect/>`}</h1>
          </Link>
        </div>
        <ul>
          {user ? (
            <>
              <li>
                <Link to="create">Create Post</Link>
              </li>
              <li>
                <Link to="home">Home</Link>
              </li>
              <button onClick={signOut} className="signOut">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <li>
                <Link to="home">Home</Link>
              </li>
              <button className="signIn">
                <Link to="login">Sign In</Link>
              </button>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
