import React from 'react';
import SearchCity from '../components/SearchCity';

interface Props {
  unit: string;
}

const SearchCityPage: React.FC = () => {
  return (
    <div>
      <h1>Search City</h1>
      <SearchCity />
    </div>
  );
}

export default SearchCityPage;
