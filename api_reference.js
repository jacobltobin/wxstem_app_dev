(function() {
  'use strict';

  angular
    .module('app')
    .constant('AppConfig', {
      // API URLS
      servicesUrl: 'https://m.weatherstem.com/api/util',
      notificationsUrl: 'https://m.weatherstem.com/api/util/mobile',
      tropicalSystemsUrl: 'https://wxstem-api.cuttlesoft.com/prod/tropical',
      // telescopeLivestreamUrl: 'https://www.youtube.com/embed/LrOUhFNJzjE?autoplay=1',
      telescopeLivestreamUrl: 'https://www.youtube.com/watch?v=LrOUhFNJzjE&autoplay=1',

      // Debug
      loggingType: 'default', // must be one of default, rollbarErrorOnly, rollbarErrorNative, rollbarAll
      offline: false,

      // Settings
      version: '3.3.0',

      // Modules Enabled
      modules: {
        dashboardCurrentAlerts: true,
      },

      // Timeouts & Intervals
      CoordsMaxAge: 1200000, // in milliseconds
      httpTimeout: 10000, // in milliseconds
      browseRefreshInterval: 180000, // in milliseconds
      unitRefreshInterval: 90000, // in milliseconds
      infoRefreshInterval: 3600000, // in milliseconds

      // 3rd Party API keys & ids
      oneSignalAppID: '3171a18b-6e3f-4949-a5e5-9447df3602bb',
      oneSignalGooglePN: '1027193509320',
      pushKey: 'nj832ofk',
      googleAnalytics: 'UA-73811187-1',
      weatherUnderground: 'cf55df642fd22858',
      awsKey: 'uGJxB01GJ91Zm7Xe6X7de2k4dcK1CBngLZxdS1bd',
    })
    .constant('EventTypes', {
      sensor: 8,
      alert: 9,
      scheduled: 10,
      forecast: 11,
      // lightning: 13,
      tropicalSystem: 16,
    })
    .constant('SensorUnits', {
      13: {
        name: 'Thermometer',
        id: '13',
        units_id_fk: '82',
        unit_name: 'Degrees Farenheit',
        symbol: '&deg;F',
      },
      24: {
        id: '24',
        name: 'Soil Temperature Probe',
        units_id_fk: '82',
        unit_name: 'Degrees Farenheit',
        symbol: '&deg;F',
      },
      25: {
        units_id_fk: '82',
        id: '25',
        name: 'Extra Temperature',
        unit_name: 'Degrees Farenheit',
        symbol: '&deg;F',
      },
      30: {
        units_id_fk: '82',
        name: 'Dewpoint',
        id: '30',
        unit_name: 'Degrees Farenheit',
        symbol: '&deg;F',
      },
      33: {
        units_id_fk: '82',
        id: '33',
        name: 'Heat Index',
        unit_name: 'Degrees Farenheit',
        symbol: '&deg;F',
      },
      // WBGT is duplicated due to discrepancy of ids between dev and production.
      34: {
        name: 'Wet Bulb Globe Temperature',
        id: '34',
        units_id_fk: '82',
        unit_name: 'Degrees Farenheit',
        symbol: '&deg;F',
      },
      35: {
        name: 'Wet Bulb Globe Temperature',
        id: '35',
        units_id_fk: '82',
        unit_name: 'Degrees Farenheit',
        symbol: '&deg;F',
      },
      39: {
        units_id_fk: '82',
        id: '39',
        name: 'Leaf Temperature',
        unit_name: 'Degrees Farenheit',
        symbol: '&deg;F',
      },
      42: {
        units_id_fk: '82',
        name: 'Wind Chill',
        id: '42',
        unit_name: 'Degrees Farenheit',
        symbol: '&deg;F',
      },
      15: {
        id: '15',
        name: 'Anemometer',
        units_id_fk: '88',
        symbol: 'mph',
        unit_name: 'Miles Per Hour',
      },
      47: {
        id: '47',
        name: '10 Minute Wind Gust',
        units_id_fk: '88',
        symbol: 'mph',
        unit_name: 'Miles Per Hour',
      },
      23: {
        units_id_fk: '89',
        name: 'Hygrometer',
        id: '23',
        unit_name: 'Percent Humidity',
        symbol: '%',
      },
      26: {
        units_id_fk: '89',
        id: '26',
        name: 'Extra Humidity',
        unit_name: 'Percent Humidity',
        symbol: '%',
      },
      16: {
        id: '16',
        name: 'Barometer',
        units_id_fk: '90',
        symbol: 'in. Hg',
        unit_name: 'Inches of Mercury',
      },
      17: {
        units_id_fk: '91',
        name: 'Wind Vane',
        id: '17',
        unit_name: 'Degrees',
        symbol: '&deg;',
      },
      21: {
        units_id_fk: '92',
        id: '21',
        name: 'Solar Radiation Sensor',
        symbol: 'W/m^2',
        unit_name: 'Watts Per Square Meter',
      },
      20: {
        id: '20',
        name: 'UV Radiation Sensor',
        units_id_fk: '93',
        symbol: ' ',
        unit_name: 'UV Index',
      },
      22: {
        name: 'Rain Rate',
        id: '22',
        units_id_fk: '94',
        unit_name: 'Inches Per Hour',
        symbol: 'in/hr',
      },
      18: {
        name: 'Soil Moisture Probe',
        id: '18',
        units_id_fk: '95',
        symbol: 'cb',
        unit_name: 'Centibar',
      },
      19: {
        units_id_fk: '96',
        id: '19',
        name: 'Leaf Wetness Indicator',
        symbol: 'lwi',
        unit_name: 'Leaf Wetness Index',
      },
      28: {
        id: '28',
        name: 'Rain Gauge',
        units_id_fk: '102',
        unit_name: 'Inches',
        symbol: 'in.',
      },
      29: {
        name: 'Barometer Tendency',
        id: '29',
        units_id_fk: '104',
        unit_name: 'Pressure Tendency',
        symbol: ' ',
      },
      31: {
        id: '31',
        name: 'CO2 Sensor',
        units_id_fk: '105',
        symbol: 'ppm',
        unit_name: 'Parts Per Million',
      },
      32: {
        name: 'Sound Detector',
        id: '32',
        units_id_fk: '106',
        unit_name: 'Decibels',
        symbol: 'dB',
      },
      43: {
        units_id_fk: '108',
        name: 'Current Solar Power',
        id: '43',
        unit_name: 'Watts',
        symbol: 'W',
      },
      45: {
        units_id_fk: '109',
        name: 'Solar Energy Today',
        id: '45',
        unit_name: 'Watt Hours',
        symbol: 'Wh',
      },
    })
    .constant('MessageModifiers', {
      // Name of the Alert that generated an alert type message
      'alert-name': {
        WSML: '<ws data-alert-name="this"/>',
        description: 'Name of the Alert that generated an alert type message',
        example: 'Thunderstorm Warning',
      },
      // When an Alert expires
      'alert-expires': {
        WSML: '<ws data-alert-expires="this"/>',
        description: 'When an Alert expires',
        example: '5:30PM',
      },
      // Full textual detail of an Alert
      'alert-message': {
        WSML: '<ws data-alert-message="this"/>',
        description: 'Full textual detail of an Alert',
        example: 'There is a thunderstorm watch in your area. Please use caution.',
      },
      // Reference to a WeatherSTEM unit’s current cloud camera (cumulus) image
      'camera-snapshot': {
        WSML: '<ws data-camera-snapshot="this"/>',
        description: 'Reference to a WeatherSTEM unit’s current cloud camera (cumulus) image',
        example: 'https://leon.weatherstem.com/skycamera/leon/fsu/cumulus/snapshot.jpg',
      },
      // Reference to the most recently published sky movie from a WeatherSTEM unit’s cloud camera
      'camera-movie': {
        WSML: '<ws data-camera-movie="this"/>',
        description:
          'Reference to the most recently published sky movie from a WeatherSTEM' +
          ' unit’s cloud camera (cumulus)',
        example: 'https://www.youtube.com/embed/dYvOqr2cpSA',
      },
      // // Magnitude of lightning from a lightning event
      // 'lightning-magnitude': {
      //   WSML: '<ws data-lightning-magnitude="this"/>',
      //   description: 'Magnitude of lightning from a lightning event',
      //   example: '-24.1',
      // },
      // // Distance of lightning from a lightning event
      // 'lightning-distance': {
      //   WSML: '<ws data-lightning-distance="this"/>',
      //   description: 'Distance of lightning from a lightning event',
      //   example: '1.3',
      // },
      // // Time of lightning from a lightning event
      // 'lightning-time': {
      //   WSML: '<ws data-lightning-time="this"/>',
      //   description: 'Time of lightning from a lightning event',
      //   example: 'January 23, 2016',
      // },
      // Name of the sensor that triggered an event in a sensor event
      'sensor-name': {
        WSML: '<ws data-sensor-name="this"/>',
        description: 'Name of the sensor that triggered an event in a sensor event',
        example: 'Thermometer',
      },
      // The observed value from the sensor that triggered an event in a sensor event
      'sensor-reading': {
        WSML: '<ws data-sensor-reading="this"/>',
        description: 'The observed value from the sensor that triggered an event in a sensor event',
        example: '80',
      },
      // The unit of measurement for the reading from a sensor event
      'sensor-unit': {
        WSML: '<ws data-sensor-unit="this"/>',
        description: 'The unit of measurement for the reading from a sensor event',
        example: 'degrees Farenheit',
      },
      // The property type of the unit of measurement for a sensor event
      // 'sensor-property': {
      //     'WSML': '<ws data-sensor-property="this"/>',
      //     'description': 'The property type of the unit of measurement for a sensor event',
      //     'example': ''
      // },
      // The unit symbol for the reading from a sensor event
      'sensor-unit-symbol': {
        WSML: '<ws data-sensor-unit-symbol="this"/>',
        description: 'The unit symbol for the reading from a sensor event',
        example: '&deg;F',
      },
      // The time of a sensor event
      'sensor-time': {
        WSML: '<ws data-sensor-time="this"/>',
        description: 'The time of a sensor event',
        example: '9:30 PM',
      },
      // The name of the station where the event was triggered
      'station-name': {
        WSML: '<ws data-station-name="this"/>',
        description: 'The name of the station where the event was triggered',
        example: 'Domi Station',
      },
      // The station handle for the station that triggered the event
      'station-handle': {
        WSML: '<ws data-station-handle="this"/>',
        description: 'The station handle for the station that triggered the event',
        example: 'domi',
      },
      // The station’s uid for the station that triggered the event (domi@leon.weatherstem.com)
      'station-uid': {
        WSML: '<ws data-station-uid="this"/>',
        description:
          'The station’s uid for the station that triggered the event (i.e. ' +
          'domi@leon.weatherstem.com)',
        example: 'domi@leon.weatherstem.com',
      },
      // The domain of the station that triggered the event
      'domain-name': {
        WSML: '<ws data-domain-name="this"/>',
        description: 'The domain of the station that triggered the event',
        example: 'Leon County',
      },
      // The domain handle of the station that triggered the event
      'domain-handle': {
        WSML: '<ws data-domain-handle="this"/>',
        description: 'The domain handle of the station that triggered the event',
        example: 'leon',
      },
    })
    .constant('ForecastSensors', [
      'Thermometer',
      'Anemometer',
      'Wind Vane',
      'UV Radiation Sensor',
      'Solar Radiation Sensor',
      'Rain Gauge',
      'Dewpoint',
      'Heat Index',
      'Wet Bulb Globe Temperature',
      'Hygrometer',
      'Barometer',
    ]);
})();
