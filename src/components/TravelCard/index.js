import './index.css'

const TravelCard = props => {
  const {travelDetails} = props
  const {id, name, imageUrl, description} = travelDetails

  return (
    <li className="travel-card">
      <img src={imageUrl} className="image" alt={name} />
      <div className="details-container">
        <h1 className="name">{name}</h1>
        <p className="description">{description}</p>
      </div>
    </li>
  )
}

export default TravelCard
