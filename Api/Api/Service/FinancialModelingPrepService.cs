using api.Dtos.Stock;
using Api.Interfaces;
using Api.Mappers;
using Api.Models;
using Newtonsoft.Json;

namespace Api.Service
{
    public class FinancialModelingPrepService : IFinancialModelingPrepService
    {
        private HttpClient _httpClient;
        private IConfiguration _configuration;

        public FinancialModelingPrepService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<Stock?> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={_configuration["FinancialModelingPrepKey"]}");
                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var tasks = JsonConvert.DeserializeObject<FinancialModelingPrepStock[]>(content);
                    var stock = tasks[0];

                    if (stock != null) 
                    {
                        return stock.ToStockFromFinancialModelingPrep();
                    }
                }

                return null;
            }
            catch (Exception e) 
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}
