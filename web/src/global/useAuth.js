import { useDispatch } from "react-redux";
import { useLoginMutation } from "../services/authService";
import { loginStart, loginSuccess, loginFailure, logoutSuccess } from "../features/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [loginMutation] = useLoginMutation();

  const login = async (credentials) => {
    dispatch(loginStart());
    try {
      const user = await loginMutation(credentials).unwrap();
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailure(error.data?.message || "Inicio Sesión Fallido"));
      throw error;
    }
  };

  const logout = () => {
    dispatch(logoutSuccess());
  };

  return { login, logout };
};