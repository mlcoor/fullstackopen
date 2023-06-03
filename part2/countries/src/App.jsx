import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <CountriesList countries={countries} filter={filter} />
    </>
  );
}

const CountriesList = ({ countries, filter }) => {
  const countriesToShow =
    filter !== ""
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        )
      : [];

  if (countriesToShow.length === 1) {
    return <OneCountries country={countriesToShow[0]} />;
  }

  return (
    <>
      {countriesToShow.length <= 10 ? (
        <ul>
          {countriesToShow.map((country) => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      ) : (
        <p>Too many matches,specify another filter</p>
      )}
    </>
  );
};

const OneCountries = ({ country }) => {
  console.log(Object.values(country.languages));
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h4>language:</h4>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img alt={country.flag} src={country.flags.png} />
    </>
  );
};

export default App;
