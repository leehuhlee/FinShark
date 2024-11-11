﻿using api.Dtos.Stock;
using Api.Dtos.Stock;
using Api.Models;

namespace Api.Mappers
{
    public static class StockMappers
    {
        public static StockDto ToStockDto(this Stock stockModel)
        {
            return new StockDto
            {
                Id = stockModel.Id,
                Symbol = stockModel.Symbol,
                CompanyName = stockModel.CompanyName,
                Purchase = stockModel.Purchase,
                LastDiv = stockModel.LastDiv,
                Industry = stockModel.Industry,
                MarketCap = stockModel.MarketCap,
                Comments = stockModel.Comments.Select(c => c.ToCommentDto()).ToList(),
            };
        }

        public static Stock ToStockFromCreateDto(this CreateStockRequestDto stockDto)
        {
            return new Stock
            {
                Symbol = stockDto.Symbol,
                CompanyName = stockDto.CompanyName,
                Purchase = stockDto.Purchase,
                LastDiv = stockDto.LastDiv,
                Industry = stockDto.Industry,
                MarketCap = stockDto.MarketCap
            };
        }

        public static Stock ToStockFromFinancialModelingPrep(this FinancialModelingPrepStock financialModelingPrepStock)
        {
            return new Stock
            {
                Symbol = financialModelingPrepStock.symbol,
                CompanyName = financialModelingPrepStock.companyName,
                Purchase = (decimal)financialModelingPrepStock.price,
                LastDiv = (decimal)financialModelingPrepStock.lastDiv,
                Industry = financialModelingPrepStock.industry,
                MarketCap = financialModelingPrepStock.mktCap
            };
        }
    }
}
