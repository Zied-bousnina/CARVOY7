import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { AttachFile } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useRef } from "react";

function FileInput({ value, onChange, accept, name, className, id, multiple }) {
  const [file, setFile] = useState();
  const ref = useRef();

  return (
    <>
      <input
        type="file"
        accept={accept}
        name={name}
        ref={ref}
        style={{ display: "none" }}
        onChange={(e) => {
          const files = [];
          for (let i = 0; i < e.target.files.length; i++) {
            files.push(e.target.files[i].name);
          }
          setFile(files.join(", "));
          onChange(e);
        }}
        multiple={multiple}
      ></input>
      <InputGroup>
        <InputLeftAddon
          onClick={() => ref.current.click()}
          style={{ cursor: "pointer" }}
        >
          <AttachFile />
        </InputLeftAddon>
        <Input
          id={id}
          placeholder={file || "No file chosen"}
          value={value}
          onClick={() => ref.current.click()}
          style={{ cursor: "pointer" }}
          className={className ?? ""}
        />
      </InputGroup>
    </>
  );
}

export default FileInput;
