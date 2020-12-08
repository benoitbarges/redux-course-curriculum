import React from 'react'
import Tweet from './Tweet'
import NewTweet from './NewTweet'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function TweetShow() {
  const { id } = useParams()

  const tweets = useSelector(state => state.tweets)
  const replies = Object.keys(tweets)
    .filter(tweet => tweets[tweet].replyingTo === id)
    .sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)

  return (
    <React.Fragment>
      <Tweet id={id} />
      <NewTweet replyingTo={id}/>
      {replies.map((replie) => (
        <Tweet id={replie} key={replie}/>
      ))}
    </React.Fragment>
  )
}
