import React from "react";
import "./Rank.css";

const Rank = ({ userEntries, userName }) => {
  const firstName = userName.split(" ").at(0);
  return (
    <p className="rank">
      {`${firstName}`}, your current number of entries is:
      <span> {`${userEntries}`} Images! </span>
    </p>
  );
};

export default Rank;
