import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    height: "100% !important",
  },
  inputForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    gridGap: "20px",
    height: "20% !important",
  },
  inputWidth: {
    width: "90%",
  },
  patternOutput: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gridGap: "20px",
    color: "white",
  },
  patternData: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gridGap: "20px",
    color: "white",
    width: "50%"
  }
});

function App() {
  const cssClasses = useStyles();
  const [countryCode, setCountryCode] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [price, setPrice] = useState("");
  const [finalPattern, setFinalPattern] = useState([]);
  var cityCodes = [];
  var pattern = [];

  const convertData = () => {
    cityCodes = cityCode.split(",");
    // Make Pattern
    for (var i = 0; i < cityCodes.length; i++) {
      // Push to pattern
      pattern.push({
        key: countryCode + cityCodes[i],
        value: {
          code: countryCode + cityCodes[i],
          price: price,
        },
      });
    }
    setFinalPattern(pattern);
  };

  return (
    <div className={cssClasses.root}>
      <div id="input-form" className={cssClasses.inputForm}>
        <TextField
          className={cssClasses.inputWidth}
          id="country-code"
          label="Country Code"
          value={countryCode}
          onChange={(e) => {
            setCountryCode(e.target.value.replace(/ /g, ""));
          }}
        />
        <TextField
          className={cssClasses.inputWidth}
          multiline
          id="city-code"
          label="City Code"
          value={cityCode}
          onChange={(e) => {
            setCityCode(e.target.value.replace(/ /g, ""));
          }}
        />
        <TextField
          className={cssClasses.inputWidth}
          id="price"
          label="Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value.replace(/ /g, ""));
          }}
        />
        <Button
          variant="contained"
          className={cssClasses.inputWidth}
          onClick={convertData}
        >
          Convert Data
        </Button>
      </div>
      <div className={cssClasses.patternOutput}>
      <div className={cssClasses.patternData} >
              <div>Code</div>
              <div>Price</div>
            </div>
        {finalPattern.map((pattern) => {
          return (
            <div key={pattern.key} className={cssClasses.patternData} >
              <div>{pattern.value.code}</div>
              <div>{pattern.value.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
