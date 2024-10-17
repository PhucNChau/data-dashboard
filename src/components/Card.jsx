
const Card = ({title, info}) => {

  return (
    <div className="summary-card">
      <span>{title}</span>
      <span>{info}</span>
    </div>
  );
};

export default Card;
