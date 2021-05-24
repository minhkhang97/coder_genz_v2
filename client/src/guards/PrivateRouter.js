import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router";
import { fetchUser } from "./userSlice";
import SyncLoader from "react-spinners/SyncLoader";

const PrivateRouter = ({ component, path, ...rest }) => {
  const { status } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchUser());
    })();
  }, []);

  if (status === "loading") {
    return (
      <div>
        <p>doi teo</p>
        <SyncLoader loading="true" size={20} />
      </div>
    );
  } else if (status === "failed") {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        <Route component={component} path={path} {...rest} />
      </div>
    );
  }
};

export default PrivateRouter;
