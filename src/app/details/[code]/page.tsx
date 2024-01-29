'use client'
import React, { useState, useEffect } from 'react';
import Chargement from '../[code]/loanding'; // Assurez-vous du chemin correct
import styles from '../[code]/style.module.css';

interface CountryData {
  currencies: { [key: string]: { name: string; symbol: string } };
  name: {
    common: string;
    nativeName: { [key: string]: { common: string; official: string } };
    official: string;
  };
  flags: { svg: string };
  tld: string[];
  population: number;
  languages: { [key: string]: string };
  demonyms: { [key: string]: { f: string; m: string } };
  area: number;
  borders: string[];
  region: string;
  subregion: string;
  capital: string;
  independent: boolean;
  gini: number;
  UN: boolean;
  latlng: number[];
}

interface DetailsCountryProps {
  params: { code: string };
}

const DetailsCountry: React.FC<DetailsCountryProps> = ({ params }) => {
  const [countryData, setCountryData] = useState<CountryData | null>(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${params.code?.toUpperCase()}`);
        const data = await response.json();

        if (data && data.length > 0) {
          const country = data[0];
          setCountryData(country);
        } else {
          console.error('Aucune donnée disponible pour le pays avec le code:', params.code);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du pays :', error);
      }
    };

    fetchCountryData();
  }, [params.code]);

  if (!countryData) {
    return <Chargement />;
  }

  const {
    name: { common = 'N/A', nativeName = { '': { common: 'N/A', official: 'N/A' } } },
    flags = { svg: 'N/A' },
    population = 0,
    area = 0,
    borders = [],
    region = 'N/A',
    subregion = 'N/A',
    capital = 'N/A',
    independent = false,
    currencies = {},
    gini = 0,
    languages = {},
    demonyms = { f: 'N/A', m: 'N/A' },
    UN = false,
    latlng = [0, 0],
    tld = [],
  } = countryData;

  return (
    <div className={styles.container}>
      <h1>{common}</h1>
      <img src={flags.svg} alt={`Flag of ${common}`} className={styles.image} />
      <div className={styles.text}>
        <h1>GEOGRAPHICAL DATA</h1>
        <p>Region: {region}</p>
        <p>Subregion: {subregion}</p>
        <p>Borders: {borders.join(', ')}</p>
        <p>Latlng: {latlng.join(', ')}</p>
        <p>Area: {area} sq km</p>

        <h1>POLITICAL AND ADMINISTRATIVE DATA</h1>
        <p>Capital: {capital}</p>
        <p>Membre des Nations unies : {UN ? 'Oui' : 'Non'}</p>
        <p>Independent: {independent ? 'Yes' : 'No'}</p>

        <h1>CULTURAL DATA</h1>
        <p>Demonym: {`${demonyms.f}/${demonyms.m}`}</p>
        <p>
          Langages :{' '}
          {countryData.languages
            ? Object.keys(countryData.languages).map((item, i) => <span key={i}>{countryData.languages[item]}</span>)
            : 'N/A'}
        </p>

        <h1>ECONOMIC AND DEMOGRAPHIC</h1>
        <p>Population: {population}</p>
        <p>
          Currencies:{' '}
          {Object.keys(currencies).length > 0
            ? Object.keys(currencies).map((item, i) => (
                <span key={i}>
                  {currencies[item].name} {currencies[item].symbol}
                </span>
              ))
            : 'N/A'}
        </p>

        <h1>BASIC COUNTRY INFORMATION</h1>
        <p>Nom commun : {common}</p>
        <p>
          Nom natif :{' '}
          {Object.keys(nativeName).length > 0
            ? Object.keys(nativeName).map((item, i) => (
                <span key={i}>
                  {nativeName[item].common} ({nativeName[item].official})
                </span>
              ))
            : 'N/A'}
       
        </p>
      </div>
    </div>
  );
};

export default DetailsCountry;