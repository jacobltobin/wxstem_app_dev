import axios from 'axios'

export default class WeatherOverlay {
  constructor() {
    // https://api.weather.com/v2/TileServer/series?apiKey=7bc857c51961635ab71f9e9f15634a70
    this.api_handler = new APIHandler(this)
    this.init()
  }
  callback() {}
  init() {
    this.api_handler.init(this.callback)
  }
}

class APIHandler {
  constructor(weathermap) {
    this.apiKey = '7bc857c51961635ab71f9e9f15634a70'
    this.baseEndPoint = 'https://api.weather.com/v2/TileServer/'
    this.seriesEndPoint = this.baseEndPoint + 'series?apiKey=' + this.apiKey
    // $.ajax({
    //   type: 'GET',
    //   url: self.seriesEndPoint,
    //   success: function(responseData, textStatus, jqXHR) {
    //     if (responseData.error) {
    //       console.log('An error was encountered: ' + responseData.error)
    //     }
    //     self.seriesInfo = responseData.seriesInfo
    //     console.log(self.seriesInfo)
    //     for (var i = 0, j = self.seriesInfo.length; i < j; i++) {
    //       console.log(self.seriesInfo[i])
    //     }
    //     if (callback) {
    //       callback()
    //     }
    //   },
    //   error: function(responseData, textStatus, errorThrown) {
    //     console.log(responseData + ':' + errorThrown)
    //   },
    // })
  }
  init(callback) {
    const self = this
    const api_callback = callback
    axios
      .get(this.seriesEndPoint)
      .then(function(response) {
        console.tron.log(response.data.seriesInfo)
        self.seriesInfo = response.data.seriesInfo
        if (callback) {
          callback()
        }
      })
      .catch(function(error) {
        // handle error
        console.tron.log(error)
      })
  }
}
