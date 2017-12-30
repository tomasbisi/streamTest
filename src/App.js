import React, { Component } from 'react';
import { Navbar} from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';
import ReactHighmaps from 'react-highcharts/ReactHighmaps';
import Highcharts from 'highcharts';
import $ from 'jquery';
// import maps from 'maps';
import './App.css';

class App extends Component {

  constructor () {
    super();
    this.state = {
        platformData: [],
        platformStats: [],
        countryData: [],
        streamData: [],
    };
    // this.buildPieChart = this.buildPieChart.bind(this);
  }

  /**** Parsing data from file for the Country Map Chart ****/
  handleCountryMap () {
      // const dataCall = require('./json_data/country.json');
      // let countryData = this.state.countryData;
      // dataCall.forEach( (e) => {
      //   const data = {};
      //   data.country = e.country;
      //   data.cdn = parseInt(e.cdn, 10);
      //   // data.p2p = parseInt(e.p2p, 10);
      //   // data.total = parseInt(e.total, 10);
      //   let tmpData = [];
      //   for (var key in data){
      //     tmpData.push(data[key]);
      //   }
      //   countryData.push(tmpData);
      // });
      $.getJSON('http://127.0.0.1:8000/src/json_data/country.json', (dataCall) => {
            let countryData = this.state.countryData;
            this.setState({
              countryData: this.state.countryData,
            });
            dataCall.forEach( (e) => {
              const data = {};
              data.country = e.country;
              data.cdn = parseInt(e.cdn, 10);
              // data.p2p = parseInt(e.p2p, 10);
              // data.total = parseInt(e.total, 10);
              let tmpData = [];
              for (var key in data){
                tmpData.push(data[key]);
              }
              countryData.push(tmpData);
            });
      });
      /**** Testing json logs / Data structure ****/
      // console.log("Country full Json", dataCall);
      console.log("Country Data", this.state.countryData);
  }

  /**** Parsing data from file for the Platform Pie Chart ****/
  handlePlatformPie () {

      $.getJSON('http://127.0.0.1:8000/src/json_data/platform.json', (response) => {

          response.forEach( (e) => {
              let platformData = this.state.platformData;
              this.setState({
                  platformData: this.state.platformData,
              });
              const data = {};
              data.platform = e.platform;
              data.trafficPercentage = parseInt(e.trafficPercentage, 10);
              let tmpData = [];
              for (var key in data){
                tmpData.push(data[key]);
              }
              platformData.push(tmpData);
          });
      });
      /**** Testing json logs / Data structure ****/
      // console.log("Platform full Json", dataCall);
      console.log("Platform data", this.state.platformData);
  }

  /**** Parsing data from file for the Platform Stats Chart ****/
  handlePlatformStats () {

      // $.ajax({
      //     dataType: 'json',
      //     type: 'GET',
      //     url: 'http://127.0.0.1:8000/src/json_data/platform.json',
      //     success: (data) => {
      //         const toMb = 1048576;
      //         data.forEach( (e) => {
      //             let platformStats = this.state.platformStats;
      //             this.setState({
      //                 platformStats: this.state.platformStats,
      //             });
      //             platformStats.push({
      //               name: e.platform,
      //               data: [
      //                 parseFloat((e.cdn / toMb).toFixed(2), 10),
      //                 parseFloat((e.p2p / toMb).toFixed(2), 10),
      //                 parseFloat((e.upload / toMb).toFixed(2), 10)
      //               ],
      //             });
      //         });
      //     }
      // });
      $.getJSON('http://127.0.0.1:8000/src/json_data/platform.json', (dataCall) => {
          const toMb = 1048576;

          dataCall.forEach( (e) => {
              let platformStats = this.state.platformStats;
              this.setState({
                  platformStats: this.state.platformStats,
              });
              platformStats.push({
                name: e.platform,
                data: [
                  parseFloat((e.cdn / toMb).toFixed(2), 10),
                  parseFloat((e.p2p / toMb).toFixed(2), 10),
                  parseFloat((e.upload / toMb).toFixed(2), 10)
                ],
              });
          });
      });

        // const dataCall = require('./json_data/platform.json');
        // const toMb = 1048576;
        // let platformStats = this.state.platformStats;
        // this.setState({
        //       platformStats: this.state.platformStats,
        // });
        // dataCall.forEach( (e) => {
        //       platformStats.push({
        //         name: e.platform,
        //         data: [
        //           parseFloat((e.cdn / toMb).toFixed(2), 10),
        //           parseFloat((e.p2p / toMb).toFixed(2), 10),
        //           parseFloat((e.upload / toMb).toFixed(2), 10)
        //         ],
        //       });
        // });
        /**** Testing json logs / Data structure ****/
      console.log("Stats Data", this.state.platformStats);
  }
  /**** Parsing data from file for the Streaming Stats Chart ****/
  handleStreamStack () {

      function stringTrim (string) {
          const trimedString = string.split('.');
          let newString = trimedString[0];
          // console.log(newString[0]);
          // console.log(string);

          // const obj = {};
          // const result = [];
          // for (var i = 0; i < newString.length; i++){
          //   if (!(newString[i][0] in obj)){
          //     obj[newString[i]] = newString[i];
          //     result.push({name: newString[i]});
          //   }


          // const dict = {};
          // const res = [];
          // for (var i = 0; i < result.length; i++){
          //   // console.log(result[i]);
          //   if (result[i] === result[0])

          // }

          // const test = [];
          // for (var key in obj){
          //   // console.log(obj[key]);
          //   if (result[0] === obj[key]){
          //     test.push(obj[key] + ' 1');
          //   } else {
          //     obj[key] = obj[key];
          //   }
          return newString;
            // console.log(obj);
            // console.log("result", result[0]);
            // console.log(newString[i], typeof(newString));
      }

      // $.getJSON('http://127.0.0.1:8000/src/json_data/streams.json', (dataCall) => {

      //     const toMb = 1048576;
      //     dataCall.forEach( (e) => {
      //         let streamData = this.state.streamData;
      //         this.setState({
      //             streamData: this.state.streamData,
      //         });
      //         streamData.push({
      //           name: stringTrim(e.manifest),
      //           data: [
      //             parseFloat((e.cdn / toMb).toFixed(2), 10),
      //             parseFloat((e.p2p / toMb).toFixed(2), 10),
      //             parseFloat((e.total / toMb).toFixed(2), 10)
      //           ],
      //         });
      //     });
      // });
        const dataCall = require('./json_data/streams.json');
        const toMb = 1048576;
        let streamData = this.state.streamData;
        this.setState({
              streamData: this.state.streamData,
        });
        dataCall.forEach( (e) => {
              streamData.push({
                name: stringTrim(e.manifest),
                data: [
                  parseFloat((e.cdn / toMb).toFixed(2), 10),
                  parseFloat((e.p2p / toMb).toFixed(2), 10),
                  parseFloat((e.total / toMb).toFixed(2), 10)
                ],
              });
          });

        /**** Testing json logs / Data structure ****/
      console.log("Stream Data", this.state.streamData);

  }


  /**** Pie Chart Builder ****/
  buildPieChart () {

    let config = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Device Usage'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: "Traffic Percentage",
            colorByPoint: true,
            data: this.state.platformData,
        }]
    }
    return config;
  }

  /**** Map Chart Builder ****/
  buildMapChart () {
      const config = {
           chart: {
              spacingBottom: 20
            },
            title: {
              text: 'Europe time zones'
            },

            legend: {
              enabled: true
            },

            plotOptions: {
              map: {
                allAreas: false,
                joinBy: ['iso-a2', 'code'],
                dataLabels: {
                  enabled: true,
                  color: 'white',
                  style: {
                    fontWeight: 'bold'
                  }
                },
                mapData: 'test',
                tooltip: {
                  headerFormat: '',
                  pointFormat: '{point.name}: <b>{series.name}</b>'
                }

              }
            },
            credits: {
                enabled: false
            },

            series: [{
              name: 'UTC',
              data:  ['IE', 'IS', 'GB', 'PT'],
            }, {
              name: 'UTC + 1',
              data: ['NO', 'SE', 'DK', 'DE', 'NL', 'BE', 'LU', 'ES', 'FR', 'PL', 'CZ', 'AT', 'CH', 'LI', 'SK', 'HU', 'SI', 'IT', 'SM', 'HR', 'BA', 'YF', 'ME', 'AL', 'MK'].map(function (code) {
                return { code: 'test2' };
              })
            }]
      }
      return config;
  }

  /**** Stack Chart Builder ****/
  buildStreamChart () {
    const config = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Streaming Analytics'
        },
        xAxis: {
            categories: [
                'CDN',
                'P2P',
                'Total'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Amount of MegaBytes'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr id="toolTipSize"><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.2f} MB</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,

        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                showInLegend: false,
            }
        },
        credits: {
            enabled: false
        },
         series: this.state.streamData,
      }
      return config;
  }

  buildPlatformStatsChart () {
    const config = {

    title: {
        text: 'Device Stats'
    },
    xAxis: {
            categories: [
                'CDN',
                'P2P',
                'Upload'
            ],
            crosshair: true
    },
    yAxis: {
        title: {
            text: 'Values in MegaBytes'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            showInLegend: false,

        }
    },
    credits: {
        enabled: false
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y:.2f} MB</b>'
    },
    series: this.state.platformStats,
    }
    return config;
  }

  componentDidMount() {
    this.handlePlatformPie();
    this.handleCountryMap();
    this.handleStreamStack();
    this.handlePlatformStats();
  }

  render() {

    return (
        <div className="App">
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <a>Stream Statistics Dashboard</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
            </Navbar>

           <div id="charts">
              <div id="pieChart"><ReactHighcharts config={this.buildPieChart()} /></div>
              <div id="statsChart"><ReactHighcharts config={this.buildPlatformStatsChart()} /></div>
              <div id="streamChart"><ReactHighcharts config={this.buildStreamChart()} /></div>
              <div id="mapChart"><ReactHighmaps config={this.buildMapChart()} /></div>

           </div>
      </div>
    );
  }
}

export default App;














  // handleJsonData(file) {
  //     // const dataCall = require(file);
  //     let cleanData = this.state.cleanData;
  //     const data = {};
  //     cleanData.forEach(function (e) {
  //         if (!e.cdn || !e.p2p || !e.total || !e.platform || !e.trafficPercentage) {
  //           data.cdn = null;
  //           data.p2p = ' ';
  //           data.total = ' ';
  //           data.platform = ' ';
  //           data.trafficPercentage = ' ';
  //         } else {
  //           data.cdn = e.cdn;
  //           data.p2p = e.p2p;
  //           data.total = e.total;
  //           data.platform = e.platform;
  //           data.trafficPercentage = parseInt(e.trafficPercentage, 10);;
  //         }
  //       let testData = [];
  //       for (var key in data){
  //         testData.push(data[key]);
  //       }
  //       cleanData.push(testData);
  //     });
  //     return cleanData;
  // }
















// dataCall.forEach( (e) => {
//               let data = {};
//               let tmpData = [];
//               data.manifest = e.manifest;
//               data.cdn = e.cdn;
//               data.p2p = e.p2p;
//               data.total = e.total;
//               for (var key in data){
//                 tmpData.push({
//                   name: stringTrim(data.manifest),
//                   data: [(data.cdn / conversion), (data.p2p / conversion), (data.total / conversion)],
//                 });
//             }
//             streamData.push(tmpData);
//             // console.log("temp data", data);
//           });
