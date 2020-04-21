import axios from 'axios';
import store from './store';

//  api calls for the application
const actions = {
  // returns all stock Exchange markets
  fetchStockExchanges() {
    axios.get('/stockExchanges').then(r => {
      store.dispatch({
        type: 'SET_STOCK_EXCHANGES',
        exchanges: r.data
      });
    });
  },
  // takes an stock exchange symbol and returns the company profile for that symbol as an object
  fetchProfile(id) {
    axios.get(`/profile/${id}`).then(r => {
      r.data.profile &&
      store.dispatch({
        type: 'SET_PROFILE',
        profile: r.data.profile
      });
    });
  },
  // takes in the code for a particular exchage market and returns that that exchange markets stock echanges 
  fetchExchange(id) {
    axios.get(`/exchange/${id}`).then(r => {
      store.dispatch({
        type: 'SET_EXCHANGE',
        exchange: r.data
      });
      store.dispatch({
        type: 'SET_EXCHANGE_ID',
        exchangeID: id
      });
    });
  }
};

export default actions;
