import { getInitialData } from '../utils/api'
import { setAuthedUser } from './authedUser'
import { receiveTweets } from './tweets'
import { receiveUsers } from './users'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, tweets }) => {
        dispatch(hideLoading())
        dispatch(receiveUsers(users))
        dispatch(receiveTweets(tweets))
        dispatch(setAuthedUser(AUTHED_ID))
      })
  }
}
