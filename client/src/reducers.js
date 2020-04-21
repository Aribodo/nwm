import {combineReducers} from 'redux';
// sets store global state
export default combineReducers({
  exchanges(state = [], {type, exchanges}){
    if (type === 'SET_STOCK_EXCHANGES') return exchanges;
    return state;
  },
  exchange(state = null, {type, exchange}){
    if (type === 'SET_EXCHANGE') return exchange;
    return state;
  },
  exchangeID(state = null, {type, exchangeID}){
    if (type === 'SET_EXCHANGE_ID') return exchangeID;
    return state;
  },
  profile(state = null, {type, profile}){
    if (type === 'SET_PROFILE') return profile;
    return state;
  }
});
