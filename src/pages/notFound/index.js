import React from "react";
import { useUserContext } from "../../hooks";

export const NotFound = () => {
  const { user } = useUserContext();

  return (
    <h1>
      {user.firstname}, the page you are looking for either removed or does not
      exist
    </h1>
  );
};
