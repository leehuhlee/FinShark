import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CompanyProfile } from '../../company';
import { getCompanyProfile } from '../../api';
import Sidebar from '../../components/Sidebar/Sidebar';
import CardDashboard from '../../components/CardDashboard/CardDashboard';
import Title from '../../components/Title/Title';

type Props = {}

const CompanyPage: React.FC<Props> = (props: Props): JSX.Element => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getCompanyInit = async () => {
      const result = await getCompanyProfile(ticker!);
      setCompany(result?.data[0]);
    }
    getCompanyInit();
  }, []);

  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CardDashboard>
            <Title title="Company Name" subTitle={company.companyName}/>
          </CardDashboard>
        </div>
      ) : (
        <p>Company not found!</p>
      )}
    </>
  )
}

export default CompanyPage