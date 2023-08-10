import React from "react";
import { useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
const UserAggrement = () => {
  const { getFooterData } = useSelector((state) => state.api);
  const userAggrement = getFooterData?.user_agreement;
  return <>{HTMLReactParser(userAggrement)}</>;
};

export default UserAggrement;
