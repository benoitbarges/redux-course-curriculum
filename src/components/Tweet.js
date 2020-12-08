import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { handleToggleTweet } from '../actions/tweets'

export default function Tweet({ id }) {
  const dispatch = useDispatch()

  const tweets = useSelector(state => state.tweets)
  const users =  useSelector(state => state.users)
  const authedUser =  useSelector(state => state.authedUser)
  const tweet = tweets[id]
  const author = users[tweet.author]

  const replies = Object.keys(tweets)
    .filter(tweet => tweets[tweet].replyingTo === id)
    .sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)

  const likes = tweet.likes

  const hasLiked = tweet.likes.includes(authedUser)

  const history = useHistory()

  const handleClick = (e, id) => {
    e.preventDefault()
    history.push(`/tweet/${id}`)
  }

  const handleLike = (e) => {
    e.preventDefault()

    dispatch(handleToggleTweet({
      id: tweet.id,
      authedUser,
      hasLiked
    }))
  }

  return (
    <Link to={`/tweet/${id}`} className='tweet'>
      <img className='avatar' src={author.avatarURL} alt={`avatar of ${author.id}`} />
      <div className='tweet-infos'>
        <div>
          <span>{author.id}</span>
          <div>{formatDate(tweet.timestamp)}</div>
          {tweet.replyingTo &&
            <button
              className='replying-to'
              onClick={(e) => handleClick(e, tweet.replyingTo)}
            >
              {`Replying to @${tweets[tweet.replyingTo].author}`}
            </button>
          }
          <p>{tweet.text}</p>
        </div>
        <div className='tweet-icons'>
          <TiArrowBackOutline className='tweet-icon' style={{marginBottom: 3}}/>
          <span>{replies.length}</span>
          <button className='replying-to' onClick={handleLike}>
            {hasLiked
              ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
              : <TiHeartOutline className='tweet-icon' style={{marginBottom: 3}}/>
            }
          </button>
          <span>{likes.length}</span>
        </div>
      </div>
    </Link>
  )
}
