import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BreweryDetail = () => {

  let params = useParams();
  const [itemDetail, setItemDetail] = useState(null);

  useEffect(() => {
    fetchBreweryFromId().catch(console.error);
  }, [params.id]);

  const fetchBreweryFromId = async () => {
    const query = `https://api.openbrewerydb.org/v1/breweries/${params.id}`;
    const response = await fetch(query);
    const json = await response.json();
    setItemDetail(json);
  };

  return (
    <div>{itemDetail ? (
      <div className="detail-container">
        <p>Name: {itemDetail.name}</p>
        <p>Phone: {itemDetail.phone}</p>
        <p>Brewery Type: {itemDetail.brewery_type}</p>
        <p>Address: {itemDetail.address_1}</p>
        <p>City: {itemDetail.city}</p>
        <p>State: {itemDetail.state_province}</p>
        <p>Postal Code: {itemDetail.postal_code}</p>
        <p>Country: {itemDetail.country}</p>
        {itemDetail.website_url !== "" ?
          <p>Website: <Link>{itemDetail.website_url}</Link></p> : null}
      </div>
      ) : null}
    </div>
  );
};

export default BreweryDetail;
