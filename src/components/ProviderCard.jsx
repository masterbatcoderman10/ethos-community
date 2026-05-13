import Icon from "./Icon.jsx";
import { showToast } from "./Toast.jsx";

export default function ProviderCard({ name, category, verified = false, location, rating = 4.5, desc }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(rating) ? "★" : i < rating ? "½" : "☆").join("");
  return (
    <div className="provider-card">
      <div className="provider-card-top">
        <span className="tag">{category}</span>
        <span className={`provider-verified ${verified ? "verified" : "pending"}`}>
          <Icon name="shield" size={14} />
          {verified ? "Verified" : "Pending"}
        </span>
      </div>
      <h3 className="provider-card-name">{name}</h3>
      <div className="provider-card-loc"><Icon name="pin" size={13}/> {location}</div>
      <div className="provider-card-stars" aria-label={`Rating: ${rating} out of 5`}>{stars} <span className="provider-card-rating">{rating}</span></div>
      <p className="provider-card-desc">{desc}</p>
      <button className="btn btn-ghost sm provider-card-cta" onClick={() => showToast(`Introduction request sent for ${name}`)}>
        Request Introduction <Icon name="arrow" size={14}/>
      </button>
    </div>
  );
}
