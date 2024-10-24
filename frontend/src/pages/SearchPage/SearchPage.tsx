import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Search from '../../components/Search/Search'
import ListPortfolio from '../../components/Portfolio/ListPortfolio/ListPortfolio'
import CardList from '../../components/CardList/CardList'
import { CompanySearch } from '../../company'
import { searchCompanies } from '../../api'

type Props = {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)){
      setSearchResult(result.data);
    }
    console.log(searchResult);
  };
  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    
    const exists = portfolioValues.find((value) => value === e.target[0].value);
    if (exists) return;
    
    const updatedPortfolio = [...portfolioValues, e.target[0].value]
    setPortfolioValues(updatedPortfolio);
  }
  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    
    const removed = portfolioValues.filter((value) => {
      return value !== e.target[0].value;
    });
    setPortfolioValues(removed);
  }

  return (
    <div>
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />
      <CardList
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />

      {serverError && <div>Unable to connect to API</div>}
    </div>
  )
}

export default SearchPage