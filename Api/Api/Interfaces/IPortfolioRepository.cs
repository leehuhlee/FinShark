﻿using Api.Models;

namespace Api.Interfaces
{
    public interface IPortfolioRepository
    {
        Task<List<Stock>> GetUserPortfolio(AppUser appUser);
        Task<Portfolio> CreateAsync (Portfolio portfolio);
        Task<Portfolio> DeleteAsync (AppUser appUser, string symbol);
    }
}