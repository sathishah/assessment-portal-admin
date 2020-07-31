import React, { Component, useState } from "react";

// @material-ui/core components
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import endPoint from '../../variables/app.url'

let domainNameUrl = `${endPoint.serviceEndPoint}assessments`;

class ManageQuestions extends React.Component {
  state = {
    domains: [],
    selectedTeam: "",
    validationError: "",

  };

  componentDidMount() {
    fetch(
      domainNameUrl
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.assessments);
        let domainsFromApi = data.assessments.map(team => {
          return { value: team.id, display: team.name };
        });
       
        this.setState({
          domains: [
            {
              value: "",
              display:
                "Select Domain Name"
            }
          ].concat(domainsFromApi)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

 callApi=()=>{
  if(this.state.selectedTeam ==="") {
    alert("Please select domain name");
  }else{
    let url =  `${endPoint.serviceEndPoint}assessment?assessmentId=`+this.state.selectedTeam;
      fetch(url, {
          method:'GET',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': 'Origin, X-Requested-With, Content-Type, Accept'
          }
        }).then((res)=>res.json())
              .then((res) => {
                  console.log(res);
                  alert("Loaded successfully");
                  document.getElementById("domain-id").value = "";
                  this.state.selectedTeam = "";
              })
      }
 }


  render() {
       
    return (
     <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={this.classes}>
        <form className={this.classes}>
             <div>
              <select
               id = "domain-id"
                value={this.state.selectedTeam}
                onChange={e =>
                  this.setState({
                    selectedTeam: e.target.value,
                    validationError:
                      e.target.value === ""
                        ? "You must select domain name"
                        : ""
                  })
                  
                }
                className="form-control"
              >
                {this.state.domains.map(team => (
                  <option
                    key={team.value}
                    value={team.value}
                  >
                    {team.display}
                  </option>
                ))}
              </select>
              <div
                style={{
                  color: "red",
                  marginTop: "5px"
                }}
              >
                {this.state.validationError}
              </div>
          </div>
          <br/>  
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={this.classes}
            onClick={()=>this.callApi()}
          >
            Load Questions
          </Button>
        </form>
      </div>
    </Container>

    );
  }
}

export default ManageQuestions;