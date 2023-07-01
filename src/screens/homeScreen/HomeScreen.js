import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CategoriesBar from '../../components/categoriesBar/CategoriesBar'
import Video from '../../components/video/Video'
import { useDispatch, useSelector } from 'react-redux'
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action'

import skeleton from 'react-loading-skeleton'
import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton from 'react-loading-skeleton'
import SkeletonVideos from '../../components/Skeleton/SkeletonVideos'
const HomeScreen = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPopularVideos())
  },[dispatch])


  const {videos,activeCategory,loading} = useSelector(state=>state.homeVideos)
  
  const fetchData = () =>{
    if(activeCategory==='All')
    dispatch(getPopularVideos())
    else{
      dispatch(getVideosByCategory(activeCategory))
    }
  }

  return (
    <Container>
        <CategoriesBar/>
        <InfiniteScroll
              dataLength={videos.length}
              next = {fetchData}
              hasMore={true}
              Loader={
                <div className='spinner-border text-danger d-block mx-auto'></div>

              }
            
            >
        <Row>
            
              {/* {[...new Array(20)].map(()=>(
                <Col Lg={3} md={4}>
                    <Video/>
                </Col>
            ))} */}

            { videos.map(video =>(
              <Col Lg={3} md={3}>
                <Video video={video} key={video.id}/>
              </Col>
              
            ))}



            {/*  !loading?videos.map(video =>(
              <Col Lg={3} md={3}>
                <Video video={video} key={video.id}/>
              </Col> : [...Array(20)].map(()=>(
              <Col Lg={3} md={3}>
                     <Skeleton height={180} width="100%"/>  
                    {/*now we are
                    using own skeleton component
                     <SkeletonVideos/> 
                </Col> )) */}

            
              
            
        </Row>
        </InfiniteScroll>
    </Container>
  )
}

export default HomeScreen
