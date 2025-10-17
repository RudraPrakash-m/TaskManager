import React from "react";

const ListIterators = (props) => {
  return (
    <>
      {props.map((ele, index) => {
        return <li key={index}>{ele}</li>;
      })}
    </>
  );
};

export default ListIterators;
