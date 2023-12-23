/* eslint-disable react/prop-types */
// TextField.jsx
import React from "react";
import { TextInput } from "@mantine/core";

const TextField = ({ placeholder, name, form, md }) => {
  return (
    <TextInput
      placeholder={placeholder}
      mt={md}
      name={name}
      {...form.getInputProps(name)}
      required
    />
  );
};

export default TextField;
