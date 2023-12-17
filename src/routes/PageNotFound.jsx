import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link,  useRouteError } from "react-router-dom";
import { selectUser } from "../redux/user/selectors";
export default function PageNotFound() {
  const user =useSelector(selectUser)
  const error = useRouteError();
  return (
    <Box className="w-screen h-screen flex flex-col items-center justify-center">
      <Typography variant="h2" className="pb-8">
        404
      </Typography>
      <Typography variant="h1" className="pb-8">
        Page not found
      </Typography>
      <Typography variant="h2" className="pb-44">
        Go to page:
        {user? (
            <Link className="text-black text-3xl md:text-4xl" to="/home/about/">
              About
            </Link>
          ) : (
            <Link className="text-black text-3xl md:text-4xl" to="/">
              Login
            </Link>
          )}
      </Typography>
    </Box>
  );
}
