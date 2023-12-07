import { useCallback, useEffect, useState } from "react";;

let logoutTimer;
export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpireDate, setTokenExpireDate] = useState();
  const [userId, setUserId] = useState(false);
  const [role, setRole] = useState(false);


  const login = useCallback((uid, token, userRole, expirationDate ) => {
    setToken(token);
    setRole(userRole);
    const currentDate = new Date();
    const tokenExpirationDate =
      expirationDate instanceof Date && expirationDate > currentDate
        ? expirationDate
        : new Date(currentDate.getTime() + 10000 * 60 * 6);
    setTokenExpireDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        role: userRole,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpireDate(null);
    setUserId(null);
    setRole(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpireDate) {
      const remainingTime =
        tokenExpireDate instanceof Date
          ? tokenExpireDate.getTime() - new Date().getTime()
          : 0;
      logoutTimer = setTimeout(logout, remainingTime);
    } else {;
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpireDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      storedData.role &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.role,
        new Date(storedData.expiration)
      );
    }
  }, [login]);
  return { token, login, logout, userId, role };
};
