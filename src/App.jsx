import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card';
import BreweryList from './components/BreweryList';

function App() {
  const [breweryList, setBreweryList] = useState(null);
  const [breweryType, setBreweryType] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [breweryCountries, setBreweryCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    fetchBreweries().catch(console.error);
  }, []);

  const fetchBreweries = async () => {
    let limit = 100;
    let query = `https://api.openbrewerydb.org/v1/breweries?per_page=${limit}`;
    let response = await fetch(query);
    let json = await response.json();
    setBreweryList(json);
    var type = new Set(json.map((item) => item.brewery_type));
    setBreweryType([...type]);
    var countries = new Set(json.map((item) => item.country));
    setBreweryCountries([...countries]);
  };

  const searchItems = (name, value) => {
    switch(name) {
      case "brewery_type":
        setSelectedType(value);
        if (selectedCountry !== "" && value !== "") {
          const filteredData = breweryList.filter((item) =>
            {
              if (item.country.toLowerCase().includes(selectedCountry.toLowerCase())
                && item.brewery_type.toLowerCase().includes(value.toLowerCase())) {
                  return true;
              }
              return false;
            }
          );
          setFilteredResults(filteredData);
        } else if (selectedCountry !== "") {
          const filteredData = breweryList.filter((item) =>
            item.country
              .toLowerCase()
              .includes(selectedCountry.toLowerCase())
          );
          setFilteredResults(filteredData);
        } else if (value !== "") {
          const filteredData = breweryList.filter((item) =>
            item.brewery_type
              .toLowerCase()
              .includes(value.toLowerCase())
          );
          setFilteredResults(filteredData);
        } else {
          setFilteredResults(breweryList);
        }
        break;
      case "brewery_country":
        setSelectedCountry(value);
        if (selectedType !== "" && value !== "") {
          const filteredData = breweryList.filter((item) =>
            {
              if (item.country.toLowerCase().includes(value.toLowerCase())
                && item.brewery_type.toLowerCase().includes(selectedType.toLowerCase())) {
                  return true;
              }
              return false;
            }
          );
          setFilteredResults(filteredData);
        } else if (selectedType !== "") {
          const filteredData = breweryList.filter((item) =>
            item.brewery_type
              .toLowerCase()
              .includes(selectedType.toLowerCase())
          );
          setFilteredResults(filteredData);
        } else if (value !== "") {
          const filteredData = breweryList.filter((item) =>
            item.country
              .toLowerCase()
              .includes(value.toLowerCase())
          );
          setFilteredResults(filteredData);
        } else {
          setFilteredResults(breweryList);
        }
        break;
      default:
        setFilteredResults(breweryList);
    }
  };

  return (
    <div className="app">
      <h1>Breweries Dashboard</h1>
      <div className="summary-container">
        <Card title="Breweries Counts" info={filteredResults.length} />
        <Card title="Types Counts" info={breweryType?.length} />
        <Card title="Countries Counts" info={breweryCountries?.length} />
      </div>
      <div className="list-container">
        <label htmlFor="type">Select brewery type: </label>
        {breweryType && 
          <select name="brewery_type" id="type" value={selectedType}
            onChange={e => searchItems(e.target.name, e.target.value)}
          >
            <option value=""></option>
            {breweryType.map((item, index) => (
              <option value={item} key={index}>{item}</option>
            ))}
          </select>
        }
        <label htmlFor="country">Select country: </label>
        {breweryCountries && 
          <select name="brewery_country" id="country" value={selectedCountry}
            onChange={e => searchItems(e.target.name, e.target.value)}
          >
            <option value=""></option>
            {breweryCountries.map((item, index) => (
              <option value={item} key={index}>{item}</option>
            ))}
          </select>
        }
        {selectedType.length > 0 || selectedCountry.length > 0
          ? <BreweryList 
              list={filteredResults}
            />
          : breweryList && 
            <BreweryList 
              list={breweryList}
            />
        }
      </div>
    </div>
  );
};

export default App;
