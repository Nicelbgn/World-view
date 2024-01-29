import React from "react";

const CountryCard = ({ country }: { country: { flag: string; name: string; capital: string; population: number; otherDetails?: []; }; }) => {
  return (
    <div>
      
      {country.flag && <img src={country.flag} alt={country.name} />}
      
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
   
    </div>
  );
}

export default CountryCard;