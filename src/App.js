import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';
import ReactHighmaps from 'react-highcharts/ReactHighmaps';
import $ from 'jquery';
// import maps from 'maps';
import './App.css';

class App extends Component {

  constructor () {
    super();
    this.state = {
        platformData: [],
        countryData: [],
        streamData: [],
    };
    this.buildPieChart = this.buildPieChart.bind(this);
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
      console.log("Country data", this.state.countryData);
  }

  /**** Parsing data from file for the Platform Pie Chart ****/
  handlePlatformPie () {
      // const dataCall = require('./json_data/platform.json');
      // let platformData = this.state.platformData;

      // this.setState({
      //     platformData: this.state.platformData,
      // });
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
              // console.log(tmpData);
          });

      });

      // dataCall.forEach((e) => {
      //     const data = {};
      //     data.platform = e.platform;
      //     data.trafficPercentage = parseInt(e.trafficPercentage, 10);
      //     let tmpData = [];
      //     for (var key in e){
      //       tmpData.push(e[key]);
      //     }
      //     platformData.push(tmpData);
      // });


      // let jsonData = $.getJSON('http://127.0.0.1:8000/src/json_data/platform.json', (dataCall) => {
      //        return dataCall;
          // dataCall.forEach((e) => {
          //   const data = {};
          //   data.platform = e.platform;
          //   data.trafficPercentage = parseInt(e.trafficPercentage, 10);
          //   let tmpData = [];
          //   for (var key in e){
          //     tmpData.push(e[key]);
          //   }
          //   platformData.push(tmpData);
          // });
      // });
      /**** Testing json logs / Data structure ****/
      // console.log("Platform full Json", dataCall);
      console.log("Platform data", this.state.platformData);
  }

  handleStreamStack () {
      // const dataCall = require('./json_data/streams.json');
      // let streamData = this.state.streamData;

      // this.setState({
      //     streamData: this.state.streamData,
      // });

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
          // const conversion = 1048576; // Conversion form bytes to megabytes
          // dataCall.forEach( (e) => {
          //     streamData.push({
          //       name: e.manifest,
          //       data: [(e.cdn / conversion), (e.p2p / conversion), (e.total / conversion)],
          //     });
          // });

      $.getJSON('http://127.0.0.1:8000/src/json_data/streams.json', (dataCall) => {
          const conversion = 1048576; // Conversion form bytes to megabytes
          let streamData = this.state.streamData;
          this.setState({
              streamData: this.state.streamData,
          });

          dataCall.forEach( (e) => {
              streamData.push({
                name: stringTrim(e.manifest),
                data: [(e.cdn / conversion), (e.p2p / conversion), (e.total / conversion)],
              });
          });

          // dataCall.forEach( (e) => {
          //     let data = {};
          //     let tmpData = [];
          //     data.manifest = e.manifest;
          //     data.cdn = e.cdn;
          //     data.p2p = e.p2p;
          //     data.total = e.total;
          //     for (var key in data){
          //       tmpData.push({
          //         name: stringTrim(data.manifest),
          //         data: [(data.cdn / conversion), (data.p2p / conversion), (data.total / conversion)],
          //       });
          //   }
          //   streamData.push(tmpData);
          //   // console.log("temp data", data);
          // });

      });

        /**** Testing json logs / Data structure ****/
      // console.log("Platform full Json", dataCall);
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
            text: 'Platform Usage'
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
                showInLegend: true
            }
        },
        series: [{
            name: "Traffic Percentage",
            colorByPoint: true,
            data: this.state.platformData,
        }]
    }
    // console.log("test!");
    // return (<div><ReactHighcharts config={config}/></div>);
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
  buildStackChart () {
    const config = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Analytics'
        },
        subtitle: {
            text: ''
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
                text: 'Amount of MB'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f} MB</b></td></tr>',
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
        series: this.state.streamData
      }
      return config;
  }

  componentDidMount() {
    this.handlePlatformPie();
    this.handleCountryMap();
    this.handleStreamStack();
    this.buildPieChart();
    this.buildMapChart();
    this.buildStackChart();
  }

  render() {

    return (
        <div className="App">
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <a>StreamTest</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavDropdown title="Statistics" id="basic-nav-dropdown">
                    <MenuItem>Platforms</MenuItem>
                    <MenuItem>Streaming</MenuItem>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

           <div>
              <ReactHighcharts config={this.buildPieChart()} />
              <ReactHighcharts config={this.buildStackChart()} />
              <ReactHighmaps config={this.buildMapChart()} />

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
