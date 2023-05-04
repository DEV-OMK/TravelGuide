import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelCard from '../TravelCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class TravelGuide extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    travelGuideList: [],
  }

  componentDidMount() {
    this.getTravelGuidePackage()
  }

  getTravelGuidePackage = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(url)
    const data = await response.json()
    const {packages} = data
    const updatedData = packages.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      imageUrl: eachItem.image_url,
      description: eachItem.description,
    }))

    this.setState({
      apiStatus: apiStatusConstants.success,
      travelGuideList: updatedData,
    })
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {travelGuideList} = this.state

    return (
      <ul className="list-container">
        {travelGuideList.map(eachItem => (
          <TravelCard key={eachItem.id} travelDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderTravelGuide = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="responsive-container">
          <h1 className="title">Travel Guide</h1>
          {this.renderTravelGuide()}
        </div>
      </div>
    )
  }
}

export default TravelGuide
