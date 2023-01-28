const Card = (props) => {
  return (
    <div className={props.cardLayout}>
      <div className="p-6">
        <h5 className={props.cardTitle}>{props.cardTitleText}</h5>
        <p className={props.cardContent}>{props.cardCentralText}</p>
      </div>
      <div className={props.cardFooter}>{props.cardFooterText}</div>
    </div>
  );
};

export default Card;
