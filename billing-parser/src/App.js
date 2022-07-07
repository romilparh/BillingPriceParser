import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { CSVLink } from "react-csv";

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
    width: "50%",
  },
});

function App() {
  const cssClasses = useStyles();
  const [countryNames, setCountryNames] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [cityCodes, setCityCodes] = useState([]);
  const [prices, setPrices] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const [finalPattern, setFinalPattern] = useState([]);
  const [processingDone, setProcessingDone] = useState(false);

  var patternEntries = [];

  const addEntries = () => {
    // Add Header Entry to CSV
    patternEntries.push(["Country","Pattern","Amount","DisplayName"]);
    // Start
    var countryNameArray = countryNames.split(";");
    var countryCodeArray = countryCodes.split(";");
    var cityCodeArray = cityCodes.split(";");
    var priceArray = prices.split(";");

    // Sort Country Entries
    if (countryCodeArray.length === cityCodeArray.length) {
      // Make Pattern Data
      for (var i = 0; i < countryNameArray.length; i++) {
        var cityCodeSubArray = cityCodeArray[i].split(",");
        for (var j = 0; j < cityCodeSubArray.length; j++) {
          var pattern;
          if(cityCodeSubArray[j] === 'NA') {
            pattern = countryCodeArray[i]
          } else {
            pattern = countryCodeArray[i] + cityCodeSubArray[j];
          }
          var entryDisplayName =
            displayName + " " + countryNameArray[i] + " - " + pattern;
          const entry = [
            countryNameArray[i],
            pattern,
            priceArray[i],
            entryDisplayName,
          ];
          patternEntries.push(entry);
        }
      }
      setFinalPattern(patternEntries);
      setProcessingDone(true);
    } else {
      console.error("Count not good");
    }
  };

  return (
    <div className={cssClasses.root}>
      <div id="input-form" className={cssClasses.inputForm}>
        <TextField
          multiline
          className={cssClasses.inputWidth}
          id="country-name"
          label="Country Name"
          value={countryNames}
          onChange={(e) => {
            setCountryNames(e.target.value.replace(/ /g, ""));
          }}
        />
        <TextField
          multiline
          className={cssClasses.inputWidth}
          id="country-code"
          label="Country Code"
          value={countryCodes}
          onChange={(e) => {
            setCountryCodes(e.target.value.replace(/ /g, ""));
          }}
        />
        <TextField
          className={cssClasses.inputWidth}
          multiline
          id="city-code"
          label="City Code"
          value={cityCodes}
          onChange={(e) => {
            setCityCodes(e.target.value.replace(/ /g, ""));
          }}
        />
        <TextField
          multiline
          className={cssClasses.inputWidth}
          id="price"
          label="Price"
          value={prices}
          onChange={(e) => {
            setPrices(e.target.value.replace(/ /g, ""));
          }}
        />
        <TextField
          className={cssClasses.inputWidth}
          id="displayName"
          label="Service Display Name"
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value.replace(/ /g, ""));
          }}
        />
        <Button
          variant="contained"
          className={cssClasses.inputWidth}
          onClick={addEntries}
        >
          Convert Data
        </Button>
        {processingDone && (
          <>
            <CSVLink data={finalPattern}>Download me</CSVLink>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
