import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TweetList from './TweetList'
import NewTweet from './NewTweet'
import TweetShow from './TweetShow'
import Nav from './Nav'

export default function App () {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.authedUser === null)

  const store = useSelector(store => store)
  console.log(store)

  React.useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])

  return (
    <Router>
      <div className='container'>
        <Nav />
        {!loading &&
          <div>
            <Route path='/' exact>
              <TweetList />
            </Route>
            <Route path='/new'>
              <NewTweet />
            </Route>
            <Route path='/tweet/:id'>
              <TweetShow />
            </Route>
          </div>
        }
      </div>
    </Router>
  )
}
