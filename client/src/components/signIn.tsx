import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginFailed,
  updateCurrentUser,
  updateLoadingStatus,
} from "../store/userSlice";

import { useNavigate } from "react-router-dom";
import API from "../axios/api";
import { IAxiosError } from "../axios/interceptors";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    dispatch(updateLoadingStatus(true));
    try {
      const res = await API.signIn({ username, password });

      dispatch(updateCurrentUser(res.data));
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(updateLoadingStatus(false));
      navigate("/");
    } catch (err) {
      const error = err as IAxiosError;
      dispatch(loginFailed());
      alert(`login failed: ${error.data}`);
    }
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    dispatch(updateLoadingStatus(true));

    try {
      const res = await API.signUpAccount({
        email,
        username,
        password,
      });

      const token = res.data.access_token;
      if (token) {
        localStorage.setItem("access_token", token);
        dispatch(updateLoadingStatus(false));
        dispatch(updateCurrentUser(res.data));
        dispatch(updateLoadingStatus(false));
        navigate("/");
      } else {
        new Error("Something went wrong");
        alert("Something went wrong");
      }
    } catch (err) {
      dispatch(loginFailed());
    }
  };

  return (
    <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
      <h2 className="text-3xl font-bold text-center">Sign in to Twitter</h2>
      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="username"
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
        className="text-xl py-2 rounded-full px-4"
      />
      <button
        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
        onClick={handleLogin}
      >
        Sign in
      </button>
      <p className="text-center text-xl">Don't have an account?</p>
      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="username"
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="email"
        required
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
        className="text-xl py-2 rounded-full px-4"
      />
      <button
        onClick={handleSignUp}
        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
        type="submit"
      >
        Sign up
      </button>
    </form>
  );
};

export default SignIn;
