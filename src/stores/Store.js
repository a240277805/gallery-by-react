/**
 * Created by zmk on 2017/8/8.
 */
import { createStore, applyMiddleware, combineReducers } from 'redux'

import promiseMiddleware from '../middlewares/PromiseMiddleware.js'

import * as reducers from '../reducers/reducers.js'

export default function(data){
  var reducer=combineReducers(reducers)
  var finalCreateStore=applyMiddleware(promiseMiddleware)(createStore)
  var store =finalCreateStore(reducer,data)
  return store;
}
