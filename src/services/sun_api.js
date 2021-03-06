// a library to wrap and simplify api calls
import axios from 'axios'

// our "constructor"
const create = (baseURL = 'https://data.weatherstem.com/') => {
  const api_key = '4898745f-d378-40d1-92a0-e79a3f4e3221'

  const get_current = (lat, lng) => {
    let url = baseURL + 'v1/geocode/'
    url += lat + '/' + lng + '/observations/current.json'
    url += '?apiKey=' + api_key
    return axios({
      method: 'get',
      url: url,
      responseType: 'json',
    })
  }

  const get_hourly_forecast = (lat, lng) => {
    let url = baseURL + 'v1/geocode/'
    url += lat + '/' + lng + '/forecast/hourly/12hour.json'
    url += '?language=en-US&units=e&apiKey=' + api_key
    return axios({
      method: 'get',
      url: url,
      responseType: 'json',
    })
  }

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    get_current,
    get_hourly_forecast,
  }
}

// let's return back our create method as the default.
export default {
  create,
}
