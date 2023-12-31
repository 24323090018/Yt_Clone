import React, { useEffect } from "react";
import "./_videoMetaData.scss";
import numeral from "numeral";
import moment from 'moment';
import { MdThumbUp, MdThumbsUpDown } from "react-icons/md";
import ShowMoreText from 'react-show-more-text'
import { useDispatch, useSelector } from 'react-redux'
import { getChannelDetails ,checkSubscriptionStatus } from "../../redux/actions/channel.action";
import HelmetCustom from "../HelmetCustom";


const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
  const { channelId, channelTitle, description, title, publishedAt } = snippet
  const { viewCount, likeCount, dislikeCount } = statistics

  const dispatch = useDispatch()

  const {
     snippet: channelSnippet,
     statistics: channelStatistics,
  } = useSelector(state => state.channelDetails.channel)

  const subscriptionStatus = useSelector(
    state => state.channelDetails.subscriptionStatus
 )
  
  useEffect(() => {
    dispatch(getChannelDetails(channelId))
    dispatch(checkSubscriptionStatus(channelId))
  }, [dispatch, channelId])
  
  return (
    <div className="videoMetaData py-2">

<HelmetCustom title={title} description={description} />

      <div className="videoMetaData__top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span className="mr-3">
            {numeral(viewCount).format("0.a")} Views •
            {moment(publishedAt).fromNow()}
          </span>

          <div>
            <span className="mr-3">
              <MdThumbUp size={26} />
              {numeral(likeCount).format("0.a")}
            </span>
            <span>
              <MdThumbsUpDown size={26} />
              {numeral(dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>
      <div className="videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex">
          <img
            src={channelSnippet?.thumbnails?.default?.url}
            alt=""
            className="rounded-circle mr-3"
          />
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span>{numeral(channelStatistics?.subscriberCount).format("0.a")} Subscribers</span>
          </div>
        </div>
        <button className={`p-2 m-2 border-0 btn ${
                  subscriptionStatus && 'btn-gray'
               }`}>{subscriptionStatus ? 'Subscribed' : 'Subscribe'}</button>
      </div>
      <div className="videoMetaData__description">
        <ShowMoreText
            Lines={3}
            more='SHOW MORE'
            Less='SHOW LESS'
            anchorClass='showMoreText'
            expanded={false}>
            {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
