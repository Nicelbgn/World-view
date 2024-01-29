'use client'
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../components/navbar';

type CountryData = {
  ccn3: any;
  cca3: string;
  name: { common: string };
  flags: {
    svg: string | undefined;
    png: string;
  };
  region: string;
};

const Home: React.FC = () => {
  const [countries, setCountries] = useState<CountryData[] | null>(null);
  const [originalCountries, setOriginalCountries] = useState<CountryData[] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');

  const filteredCountries = useMemo(() => {
    if (!originalCountries) return null;

    let filtered = originalCountries;

    if (searchTerm) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (region) {
      filtered = filtered.filter((country) => country.region === region);
    }

    return filtered;
  }, [originalCountries, searchTerm, region]);

  const handleSearch = () => {
    setCountries(filteredCountries);
  };

  const handleRegionChange = (selectedRegion: string) => {
    setRegion(selectedRegion);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countriesData: CountryData[] = response.data;
        countriesData.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(countriesData);
        setOriginalCountries(countriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Ajoutez une gestion d'erreur pour informer l'utilisateur ici
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Page d'accueil</h1>
      <div>
        <label htmlFor="regionSelect">Recherche par région :</label>
        <select id="regionSelect" value={region} onChange={(e) => handleRegionChange(e.target.value)}>
          <option value="">Toutes les régions</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asie</option>
          <option value="Africa">Afrique</option>
        </select>
      </div>
      <div>
        <label htmlFor="searchInput">Recherche par nom :</label>
        <input type="text" id="searchInput" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Rechercher</button>
      </div>
      <div>
        <Navbar />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {filteredCountries?.map((country) => (
            <Link key={country.ccn3} href={`/details/${country.ccn3}`}>
              <div>
                <img
                  src={country.flags ? country.flags.svg : ''}
                  alt={`Flag of ${country.name.common}`}
                  style={{ width: '150px', height: 'auto' }}
                />
                <h2>{country.name.common}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;