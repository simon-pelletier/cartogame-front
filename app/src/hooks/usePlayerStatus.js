import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useShallowEqualSelector } from "Hooks";

export default function usePlayerStatus() {
  let history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const authenticated = useSelector((state) => state.auth.get("authenticated"), shallowEqual);
  const authenticated = useShallowEqualSelector((state) => state.player.get("authenticated"));

  useEffect(() => {
    if (!authenticated) {
      history.replace("/");
    } else {
      setIsAuthenticated(true)
    }
  },  []);

  return isAuthenticated;
}