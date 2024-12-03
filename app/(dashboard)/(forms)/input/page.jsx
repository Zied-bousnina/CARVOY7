"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
// import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";

const InputPage = () => {
  const errorMessage = {
    message: "This is invalid state",
  };
  const [value, setValue] = useState("");

  const handleFormatter = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  return (
    <div className="grid xl:grid-cols-2 gap-5">
      <Card title="Basic Inputs">
        <div className="space-y-3">


          <Textarea
            label="Project description"
            id="pn4"
            placeholder="Type here"
          />
          <Select
            options={["Option 1", "Option 2", "Option 3"]}
            label="Select Option's"
          />
        </div>
      </Card>
      <div className=" space-y-5">
        <Card title="Sizing Options">
          <div className="space-y-2">

          </div>
        </Card>
        <Card title="Sizing Options">
          <div className="space-y-2">

          </div>
        </Card>
      </div>
      <Card title="States">
        <div className="space-y-3">

        </div>
      </Card>
      <Card
        title="Input Validation States With Tootltips
"
      >
        <div className="space-y-3">

        </div>
      </Card>
      <div className="xl:col-span-2 col-span-1">
        <Card title=" Formatter Support">

        </Card>
      </div>
    </div>
  );
};

export default InputPage;
