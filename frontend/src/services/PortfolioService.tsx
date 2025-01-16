import axios from "axios";
import { PortfolioGet, PortfolioPost } from "../models/Portfolio";
import { handleError } from "../helpers/ErrorHandler";

const api="https://localhost:7242/api/portfolio";
const token = localStorage.getItem('token');

export const portfolioAddAPI = async (symbol: string) => {
  try {
    const data = await axios.post<PortfolioPost>(api + `?symbol=${symbol}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return data;
  } catch (error) {
    handleError(error);
  }
}

export const portfolioDeleteAPI = async (symbol: string) => {
  try {
    const data = await axios.delete<PortfolioPost>(api + `?symbol=${symbol}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return data;
  } catch (error) {
    handleError(error);
  }
}

export const portfolioGetAPI = async () => {
  try {
    const data = await axios.get<PortfolioGet[]>(api, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return data;
  } catch (error) {
    handleError(error);
  }
}