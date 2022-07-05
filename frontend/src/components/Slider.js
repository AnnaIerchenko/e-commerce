import React, {useState, useEffect, useReducer} from 'react'
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faArrowCircleLeft, faArrowCircleRight} from "@fortawesome/free-solid-svg-icons"
import '../styles/slider.css'

//import { sliderItems } from '../data'
import axios from 'axios'


const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case 'FETCH_SUCCESS':
      return {...state, slider: action.payload, loading: false};
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload};
      default:
        return state;
  }
}

const Slider = () => {

  const [{loading, error, slider}, dispatch] = useReducer(reducer, {
    slider: [],
    loading: true,
    error: ''
  })
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left"){
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2) //is last img
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0) //0 is first index
    }
  }

 // const [slider, setSlider] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST'})
      try {
        const result = await axios.get('/api/slider')
        dispatch({type: "FETCH_SUCCESS", payload: result.data})
      } catch(err) {
        dispatch({type: "FETCH_FAIL", payload: err.message})
      } 
      
      //setSlider(result.data);
    }
    fetchData();
  }, [])

  return (
    <div className='s-container'>
      <div className="s-arrow left" 
           onClick={() => handleClick("left")}
           >
        <FontAwesomeIcon icon={faArrowCircleLeft} />
      </div>
      <div className="wrapper" slideIndex={slideIndex}
           style={{transform: `translateX(${slideIndex * -100}vw)`}}>
        { loading ? (<h1 className='loading'>Loading...</h1>) : error ? (
          <h1 className='error'>{error}</h1>
        ) :
        (slider.map((item) =>(
            <div className="slide" key={item._id}>
            <div className="img-container">
              <img src={item.image} className="s-img" alt="slider1"/>
            </div>
          </div>
        ))
      )}
      </div>
      <div className="s-arrow right">
        <FontAwesomeIcon icon={faArrowCircleRight}  onClick={() => handleClick("right")}/>
      </div>
    </div>
  )
}

export default Slider