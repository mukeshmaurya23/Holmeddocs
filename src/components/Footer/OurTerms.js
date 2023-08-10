import React from "react";
import { useSelector } from "react-redux";
import HTMLReactParser from "html-react-parser";
const OurTerms = () => {
  const { getFooterData } = useSelector((state) => state.api);
  const termsAndConditionsHtml = getFooterData.terms_condition;
  console.log(getFooterData);
  return <> {HTMLReactParser(termsAndConditionsHtml)}</>;
};

export default OurTerms;
