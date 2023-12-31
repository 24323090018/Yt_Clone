import React, { useState } from 'react'
import './_categoriesBatr.scss'
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action'
import {useDispatch} from 'react-redux'

const keywords = [
  'All',
  'React js',
  'Node js',
  'Java',
  'Redux',
  'Music',
  'Sports',
  'Bhajan',
  'Cricket',
  'Funny',
  'Moody',
  'Oye',
  'Coding',
  'Node js',
  'Java',
  'Redux',
  'Music',
  'Sports',
  'Bhajan',
  'Cricket',
  'Funny',
  'Moody',
  'Oye',
]
const CategoriesBar = () => {

  const[activeElement,setActiveElement] = useState('All')

  const dispatch = useDispatch();
  const handleClick = value=>{
    setActiveElement(value)
    if(value==='All')
    dispatch(getPopularVideos())
    else{
      dispatch(getVideosByCategory(value))
    }
  }


  return (
    
    <div className="categoriesBar">
      {keywords.map((value,i) => (
        <span 
        onClick={()=>handleClick(value)}
        key={i}
        className={activeElement === value?'active':''}>
        {value}
          
        </span>
      ))}
    </div>
  )
}

export default CategoriesBar
