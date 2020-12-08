import { showLoading, hideLoading } from 'react-redux-loading'
import { saveTweet, saveLikeToggle } from '../utils/api'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const ADD_TWEET = 'ADD_TWEET'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  }
}

function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet
  }
}

export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())


    return saveTweet({
      text,
      author:authedUser,
      replyingTo
    })
    .then(tweet => dispatch(addTweet(tweet)))
    .then(() => dispatch(hideLoading()))
  }
}

function toggleTweet({ id, hasLiked, authedUser }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}

export function handleToggleTweet(infos) {
  return (dispatch) => {
    return saveLikeToggle(infos)
      .then(dispatch(toggleTweet(infos)))
  }
}
