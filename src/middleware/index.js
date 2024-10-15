import { thunk } from 'redux-thunk';
import logger from './loggerAction'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
  thunk,
  logger,
)