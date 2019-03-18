// a library to wrap and simplify api calls
import axios from 'axios'

// our "constructor"
const create = (baseURL = 'http://cdn.weatherstem.com') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  // const api = apisauce.create({
  // base URL is read from the "constructor"
  // baseURL,
  // here are some default headers
  // headers: {
  // 'Cache-Control': 'no-cache',
  // },
  // 10 second timeout...
  // timeout: 10000,
  // })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const get_all_stations = () => {
    return axios({
      method: 'get',
      url:
        'https://cdn.weatherstem.com/dashboard/data/dynamic/model/stations.json',
      responseType: 'json',
    })
  }

  const get_current = (handle, domainHandle) => {
    const url =
      'https://cdn.weatherstem.com/dashboard/data/dynamic/model/' +
      domainHandle +
      '/' +
      handle +
      '/latest.json'
    return axios({
      method: 'get',
      url: url,
      responseType: 'json',
    })
  }

  const login_user = (uid, pwd) => {
    return axios({
      method: 'post',
      url: 'https://m.weatherstem.com/api/util',
      data: {
        method: 'login',
        uid: uid,
        password: pwd,
        permanent_key: 'd2c0de4bd62957ed906075a28b02ea62',
      },
    })
  }

  const logoff_user = (uid, session_id) => {
    return axios({
      method: 'post',
      url: 'https://m.weatherstem.com/api/util/mobile',
      data: {
        method: 'logoff',
        session_id: session_id,
        uid: uid,
      },
    })
  }

  const create_user = action => {
    return axios({
      method: 'post',
      url: 'https://m.weatherstem.com/api/util',
      data: {
        method: 'create_user',
        uid: action.payload.uid,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        password: action.payload.pwd,
      },
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
    get_all_stations,
    get_current,
    login_user,
    create_user,
    logoff_user,
  }
}

// let's return back our create method as the default.
export default {
  create,
}
