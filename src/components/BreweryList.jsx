
const BreweryList = ({list}) => {

  return (
    <div className="brewery-list">
      <table>
        <thead>
          <tr>
            <th>Brewery Name</th>
            <th>Type</th>
            <th>Phone</th>
            <th>State</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.brewery_type}</td>
              <td>{item.phone}</td>
              <td>{item.state}</td>
              <td>{item.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BreweryList;
