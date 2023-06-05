import { useState } from "react";
import Weather from "./Weather";

const CountriesList = ({ countries, filter }) => {
  const countriesToShow =
    filter !== ""
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        )
      : [];

  if (countriesToShow.length === 1) {
    return <CountryInfo country={countriesToShow[0]} />;
  }

  return (
    <>
      {countriesToShow.length <= 10 ? (
        <ul>
          {countriesToShow.map((country) => (
            <Country key={country.name.common} country={country} />
          ))}
        </ul>
      ) : (
        <p>Too many matches,specify another filter</p>
      )}
    </>
  );
};

const Country = ({ country }) => {
  const [state, setState] = useState(false);

  const handleClick = () => {
    setState(!state);
  };

  return (
    <li>
      {country.name.common} <button onClick={handleClick}>show</button>
      {state && <CountryInfo country={country} />}
    </li>
  );
};

const CountryInfo = ({ country }) => {
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
      <Weather capital={country.capital} />
    </>
  );
};

export default CountriesList;
