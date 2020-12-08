import React from 'react'
import { useDispatch } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { useHistory } from 'react-router-dom'

export default function NewTweet({ replyingTo }) {
  const [text, setText] = React.useState('')
  const dispatch = useDispatch()

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(handleAddTweet(text, replyingTo))
    setText('')
    !replyingTo && history.push('/')
  }

  return (
    <div>
      <form action="" className='new-tweet' onSubmit={handleSubmit}>
         <textarea
          placeholder="What's happening?"
          value={ text}
          onChange={(event) => setText(event.currentTarget.value)}
          className='text-area'
          maxLength={280}
        />
        <button
          className='btn'
          type='submit'
          disabled={text === ''}>
            Submit
        </button>
      </form>
    </div>
  )
}
