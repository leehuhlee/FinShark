import React, { useEffect, useState } from 'react'
import { CompanyCashFlow } from '../../company';
import { getCashFlowStatement } from '../../api';
import { useOutletContext } from 'react-router';
import RatioList from '../RatioList/RatioList';
import Spinner from '../Spinner/Spinner';

type Props = {}

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) => company.operatingCashFlow,
  },
  {
    label: "Property/Machinery Cashflow",
    render: (company: CompanyCashFlow) =>
      company.investmentsInPropertyPlantAndEquipment,
  },
  {
    label: "Other Investing Cashflow",
    render: (company: CompanyCashFlow) => company.otherInvestingActivites,
  },
  {
    label: "Debt Cashflow",
    render: (company: CompanyCashFlow) =>
      company.netCashUsedProvidedByFinancingActivities,
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) => company.capitalExpenditure,
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) => company.freeCashFlow,
  },
];

const CashFlowStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [cashFlowStatement, setCashFlowStatement] = useState<CompanyCashFlow>();
  useEffect(() => {
    const getCompanyCashFlowStatement = async () => {
      const result = await getCashFlowStatement(ticker);
      setCashFlowStatement(result?.data[0]);
    }
    getCompanyCashFlowStatement();
  }, []);

  return (
    <>
      { cashFlowStatement ? (
        <RatioList config={config} data={cashFlowStatement}/>
      ) : (
        <Spinner/>
      )}
    </>
  )
}

export default CashFlowStatement