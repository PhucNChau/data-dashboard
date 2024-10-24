import { Link } from "react-router-dom";

const BreweryList = ({list}) => {

  return (
    <div className="brewery-list">
      <table>
        <thead>
          <tr>
            <th>Brewery Name</th>
            <th>Type</th>
            <th>State</th>
            <th>Country</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.brewery_type}</td>
              <td>{item.state}</td>
              <td>{item.country}</td>
              <td><Link to={`/${item.id}`}>🔗</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BreweryList;
