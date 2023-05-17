import "./searchItem.css";
import {Link} from 'react-router-dom'


const SearchItem = (propsItem) => {
 
  return (
    <div className="searchItem">
      <img
        src={ propsItem.item.photo[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{ propsItem.item.name}</h1>
        <span className="siDistance">{ propsItem.item.distance} from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        { propsItem.item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{ propsItem.item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">{ propsItem.item.cheapeastPrice}</span>
          <span className="siTaxOp">cludes taxes and fees</span>
          <Link to={`/hotels/${ propsItem.item._id}`}>
          <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
