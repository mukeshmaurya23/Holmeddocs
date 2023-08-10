import React from "react";
import { useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
const OurPolicy = () => {
  const { getFooterData } = useSelector((state) => state.api);
  const privacyPolicyHtml = getFooterData?.privacy_policy;
  return <>{HTMLReactParser(privacyPolicyHtml)}</>;
};

export default OurPolicy;
