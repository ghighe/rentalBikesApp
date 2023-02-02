const Card = ({
  cardLayout,
  cardTitleText,
  cardCentralText,
  cardFooterText,
  cardTitle,
  cardContent,
  cardFooter
}) => {
  return (
    <div className={cardLayout}>
      <div className="p-6">
        <h5 className={cardTitle}>{cardTitleText}</h5>
        <p className={cardContent}>{cardCentralText}</p>
      </div>
      <div className={cardFooter}>{cardFooterText}</div>
    </div>
  );
};

export default Card;
