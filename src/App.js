import React, { Component } from 'react';
import { Navbar} from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';
import ReactHighmaps from 'react-highcharts/ReactHighmaps';
import './App.css';
const maps = require('./map_data/mapdata.js');
const toMb = 1048576;

class App extends Component {

  constructor () {
    super();
    this.state = {
        platformData: [],
        platformStats: [],
        countryData: [],
        streamData: [],
    };
  }

  /**** Parsing data from file for the Country Map Chart ****/
  handleCountryMap () {

      const dataCall = require('./json_data/country.json');
      const countryData = dataCall.map((element) => {
        const data = {};
        data['hc-key'] = element.country.toLowerCase();
        data.value = parseFloat((element.total / toMb).toFixed(2), 10)
        return data;
      });
      this.setState({
          countryData: countryData,
      });

      // console.log("Country Data", this.state.countryData);
  }

  /**** Parsing data from file for the Platform Pie Chart ****/
  handlePlatformPie () {
    const dataCall = require('./json_data/platform.json');
    let platformData = this.state.platformData;
    this.setState({
        platformData: this.state.platformData,
    });
    dataCall.forEach( (e) => {
        const data = {};
        data.platform = e.platform;
        data.trafficPercentage = parseInt(e.trafficPercentage, 10);
        let tmpData = [];
        for (var key in data){
          tmpData.push(data[key]);
        }
        platformData.push(tmpData);
    });
      // console.log("Platform data", this.state.platformData);
  }

  /**** Parsing data from file for the Platform Stats Chart ****/
  handlePlatformStats () {
    const dataCall = require('./json_data/platform.json');
    let platformStats = this.state.platformStats;
    this.setState({
          platformStats: this.state.platformStats,
    });
    dataCall.forEach( (e) => {
        platformStats.push({
          name: e.platform,
          data: [
            parseFloat((e.cdn / toMb).toFixed(2), 10),
            parseFloat((e.p2p / toMb).toFixed(2), 10),
            parseFloat((e.upload / toMb).toFixed(2), 10)
          ],
        });
    });
      // console.log("Stats Data", this.state.platformStats);
  }

  /**** Parsing data from file for the Streaming Stats Chart ****/
  handleStreamStack () {

      /** Split the url and make a new string  **/
      const dictionary = {};
      function stringTrim (string) {
          const trimedString = string.split('.')[0];
          let finalString;
          if (dictionary[trimedString]) {
              dictionary[trimedString] += 1;
              finalString = `${trimedString} ${dictionary[trimedString] - 1}`;
          }
          else {
              dictionary[trimedString] = 1;
              finalString = trimedString;
          }
          return finalString;
      }

      const dataCall = require('./json_data/streams.json');
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

      // console.log("Stream Data", this.state.streamData);
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
        title : {
            text : 'World Wide Total Traffic'
        },

        colorAxis: {
            min: 0
        },
        credits: {
            enabled: false
        },
        series : [{
            data : this.state.countryData,
            mapData: maps,
            joinBy: 'hc-key',
            tooltip: {
                headerFormat: '',
                pointFormat: '{point.name}: <b>{point.value} MB</b>'
            },
            dataLabels: {
                enabled: false,
                formatter: function () {
                    /** Access hc-key property of this point **/
                    return this.point.properties['hc-key'];
                }
            }
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
            text: 'Service Streaming Analytics'
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

  /**** Plarform Stats Chart Builder ****/
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
              <div id="mapChart"><ReactHighmaps config={this.buildMapChart()} /></div>
              <div id="pieChart"><ReactHighcharts config={this.buildPieChart()} /></div>
              <div id="statsChart"><ReactHighcharts config={this.buildPlatformStatsChart()} /></div>
              <div id="streamChart"><ReactHighcharts config={this.buildStreamChart()} /></div>
           </div>
      </div>
    );
  }
}

export default App;
