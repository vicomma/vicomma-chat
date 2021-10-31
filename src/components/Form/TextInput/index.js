import React from "react";

const Input = ({ type, name, onChange, style }) => {
  const styles = style || {};
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={"text example"}
        style={styles}
        onChange={(e) => {
          onChange(e);
        }}
      />
    </>
  );
};

export default Input;
