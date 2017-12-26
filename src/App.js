import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';
import './App.css';

class App extends Component {

  constructor () {
    super();
    this.state = {
        platformData: [],
        countryData: [],
    };
  }

  /**** Parsing data from file for the Country Map Chart ****/
  handleCountryMap () {
      const dataCall = require('./json_data/country.json');
      let countryData = this.state.countryData;
      dataCall.forEach(function (e) {
        const data = {};
        data.country = e.country;
        data.cdn = parseInt(e.cdn, 10);
        data.p2p = parseInt(e.p2p, 10);
        data.total = parseInt(e.total, 10);
        let tmpData = [];
        for (var key in data){
          tmpData.push(data[key]);
        }
        countryData.push(tmpData);
      });

      /**** Testing json logs / Data structure ****/
      console.log("Country full Json", dataCall);
      console.log(this.state.countryData);
  }

  /**** Parsing data from file for the Platform Pie Chart ****/
  handlePlatformPie () {
      const dataCall = require('./json_data/platform.json');
      let platformData = this.state.platformData;

      this.setState({
          platformData: this.state.platformData,
      });
      dataCall.forEach(function (e) {
        const data = {};
        data.platform = e.platform;
        data.trafficPercentage = parseInt(e.trafficPercentage, 10);
        let testData = [];
        for (var key in data){
          testData.push(data[key]);
        }
        platformData.push(testData);
      });

      /**** Testing json logs / Data structure ****/
      // console.log("Platform full Json", dataCall);
      // console.log(this.state.platformData);
    }


  /**** Pie Chart Builder ****/
  buildPieChart () {
    const config = {
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
    return config;
  }

  buildMapChart () {

  }

  componentDidMount() {
    this.handlePlatformPie();
    this.buildPieChart();
    this.handleCountryMap();
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
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
   <div>
        <ReactHighcharts config={this.buildPieChart()} />
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
