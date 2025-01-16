import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Search from '../../components/Search/Search'
import ListPortfolio from '../../components/Portfolio/ListPortfolio/ListPortfolio'
import CardList from '../../components/CardList/CardList'
import { CompanySearch } from '../../company'
import { searchCompanies } from '../../api'
import { PortfolioGet } from '../../models/Portfolio'
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from '../../services/PortfolioService'
import { toast } from 'react-toastify'

type Props = {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };

  useEffect(() => {
    getPortfolio();
  }, []);

  const getPortfolio = () => {
    portfolioGetAPI().then((res) => {
      if (res?.data) {
        setPortfolioValues(res?.data);
      }
    }).catch((e) => {
      toast.warning("Could not get portfolio values!");
    });
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
    
    console.log("HHH");
    portfolioAddAPI(e.target[0].value).then((res) => {
      if (res?.status === 204) {
        toast.success("Stock added to portfolio!");
        getPortfolio();
      }
    }).catch((e) => {
      toast.warning("Could not get portfolio values!");
    });
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    
    portfolioDeleteAPI(e.target[0].value).then((res) => {
      if (res?.status === 200) {
        toast.success("Stock deleted to portfolio!");
        getPortfolio();
      }
    }).catch((e) => {
      toast.warning("Could not get portfolio values!");
    });
  };

  return (
    <div>
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues!}
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