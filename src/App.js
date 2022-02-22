import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_KEY_GOOGLE, APY_KEY_WEATHER,getСurrentLocation } from './API';
import './App.css';
import CardMap from './components/CardMap/CardMap';
import Input from './components/Input';
import { addCard } from './Redux/mainReduser';

const axios = require('axios');


function App() {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    getСurrentLocation()
    .then(data=>dispatch(addCard(data)))
  }, [])

  return (
    <div className="App container">
      <Input />
      <CardMap />
    </div>
  );
}

export default App;
