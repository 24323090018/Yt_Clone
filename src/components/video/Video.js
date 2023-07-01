import React, { useEffect, useState } from 'react'
import "./_video.scss"

import {AiFillEye} from 'react-icons/ai'
import request from '../../api'

import moment from 'moment'
import numeral from 'numeral'
import {LazyLoadImage} from 'react-lazy-load-image-component'

import {useHistory, useNavigate} from 'react-router-dom'
const Video = ({video,channelScreen}) => {

  const {
    id,
    snippet:{
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: {medium},
    },
    contentDetails,
  } = video

  const [views,setViews] = useState(null)
  const [duration,setDuration] = useState(null)
  const [channelIcon,setChannelIcon] = useState(null)

  const seconds = moment.duration(duration).asSeconds()
  const _duration = moment.utc(seconds * 1000).format("mm:ss")

  const history =  useNavigate();
  const _videoId = id?.videoId || contentDetails?.videoId || id

  useEffect(()=>{
    const get_video_details = async()=>{
      const {
        data:{items}
      } = await request('/videos',{
        params:{
          part:'contentDetails,statistics',
          id:_videoId,
        },
      })
      setDuration(items[0].contentDetails.duration)
      setViews(items[0].statistics.viewCount)
    }
    get_video_details()
  },[_videoId])



  useEffect(()=>{
    const get_channel_icon = async()=>{
      const {
        data:{items},
      } = await request('/channels',{
        params:{
          part:'snippet',
          id:channelId,
        },
      })
      setChannelIcon(items[0].snippet.thumbnails.default)
    }
    get_channel_icon()
  },[channelId])

  const handleVideoClick = () => {
    history(`/watch/${_videoId}`)
  }

  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video__top">
        {/* <img src="	https://i.ytimg.com/vi/2Hh9FiyDMKw/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLAmk35-MMQ46it-H2XiOXgCioo-IQ" alt="" />
        <span> 9:39</span> */}
        {/* <img src={medium.url} alt="" /> */}
        <LazyLoadImage src={medium.url} effect='blur'/>
        <span>{_duration}</span>
      </div>
      
      <div className='video__title'>
        {/* Mood bnao 5 min m by Anubhav */}
        {title}
      </div>

      <div className="video__details">
        <span>
          <AiFillEye/> {numeral(views).format("0.a")} Views •
          {/* <AiFillEye/> 5M Views • */}
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
        {/* <span>1 days ago</span> */}
      </div>


        {!channelScreen && (
      <div className="video__channel">
        {/* <img 
          //  src="https://yt3.ggpht.com/WrjDeIWr2pmRdCKFuEDfvkovr0O_o7gyfT_J_AMJjFk5KR9HGQVirOP0DeimyAoBUHRfH79X=s68-c-k-c0x00ffffff-no-rj" 
          //  alt="" 

        /> */}
        <LazyLoadImage src={channelIcon?.url} effect='blur' />

        <p>{channelTitle}</p>
        {/* <p>abc</p> */}
      </div>
        )}
    </div>
  )
}

export default Video

