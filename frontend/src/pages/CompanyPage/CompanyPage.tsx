import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CompanyProfile } from '../../company';
import { getCompanyProfile } from '../../api';
import Sidebar from '../../components/Sidebar/Sidebar';
import Title from '../../components/Title/Title';
import CompanyDashboard from '../../components/CompanyDashboard/CompanyDashboard';
import Spinner from '../../components/Spinner/Spinner';

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
          <CompanyDashboard ticker={ticker!}>
            <Title title="Company Name" subTitle={company.companyName}/>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner/>
      )}
    </>
  )
}

export default CompanyPage