import React from 'react'
import Table from '../../components/Table/Table'
import RatioList from '../../components/RatioList/RatioList'
import { testIncomeStatementData } from '../../components/Table/testData';

type Props = {}

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: any) => company.marketCapTTM,
    subTitle: "Total value of all a company's shares of stock",
  }
];

const DesignPage = (props: Props) => {
  return (
    <>
      <h1>FinShark Design Page</h1>
      <h2>This is Finshark's design page. This is where we well house various design aspects of the app</h2>
      <RatioList data={testIncomeStatementData} config={tableConfig}/>
      <Table data={testIncomeStatementData} configs={tableConfig} />
    </>
  )
}

export default DesignPage