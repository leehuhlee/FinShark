type Props = {
  configs: any;
  data: any;
}

const Table = ({ configs, data }: Props) => {
  const renderedRows = data.map((company: any) => {
    return (
      <tr key={company.cik}>
        {configs.map((val: any) => {
          return (
            <td className="p-3">
              {val.render(company)}
            </td>
        )})}
      </tr>
    )
  })
  const renderedHeaders = configs.map((configs: any) => {
    return (
      <th className="p-3" key={configs.label}>
        {configs.label}
      </th>
    )
  })

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <table>
        <thead className="min-w-full divide-y divide-gray-200 m-5">
          {renderedHeaders}
        </thead>
        <tbody>
          {renderedRows}
        </tbody>
      </table>
    </div>
  )
}

export default Table