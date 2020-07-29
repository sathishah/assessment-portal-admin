import React, { Component } from "react";

// @material-ui/core components
import CssBaseline from "@material-ui/core/CssBaseline";
import GridItem from "components/Grid/GridItem.js";
  
import TextField from "@material-ui/core/TextField";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import CardFooter from "components/Card/CardFooter.js";
import style from "./style.module.css";
import Container from "@material-ui/core/Container";
import endPoint from "../../variables/app.url";

let domainNameUrl = `${endPoint.serviceEndPoint}assessments`;
let domainNameQUrl = `${endPoint.serviceEndPoint}questionTypes`;

let url = `${endPoint.serviceEndPoint}questionOptionsAssessment`;
let questionId=0;
//http://api.urlipaddress:8080/questionOptionsAssessment

//http://3.20.222.19:8080/answers  //To get the answerId, can be 

class InviteCandidate extends Component {
  state = {
    domains: [],
    selectedTeam: "",
    questionTypeId:'',
    
   // validationError: "",
  };
  componentDidMount() {
    fetch(domainNameUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data.assessments[0]);
        let domainsFromApi = data.assessments.map((team) => {
          return { value: team.id, display: team.name };
        });

        this.setState({
          domains: [
            {
              value: "",
              display: "Select Domain Name",
            },
          ].concat(domainsFromApi),
        });
      })
      .catch((error) => {
        console.log(error);
      });


      //for Question Id
      fetch(domainNameQUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
       questionId = data[0].id;
        //console.log(questionId);
      
       
      })
      .catch((error) => {
        console.log(error);
      });
  }
// fetch the assessment id 



  handleQuestionRequest() {
    //event.preventDefault();
    let questionTypeId = '';
    let answerId =  Math.floor(1000 + Math.random() * 9000);
   // console.log(answerId);
    let assessmentIds= Math.floor(1000 + Math.random() * 9000);
    let answer1 = document.getElementById("answer1").value;
    let answer2 = document.getElementById("answer2").value;
    let answer3 = document.getElementById("answer3").value;
    let answer4 = document.getElementById("answer4").value;

    const optionsAr = [];
    let optionTrueCount = 0;

    let answerOption1 = optionsAr[0] = document.getElementById("answerOption1").value;
    let answerOption2 = optionsAr[1] = document.getElementById("answerOption2").value;
    let answerOption3 = optionsAr[2] = document.getElementById("answerOption3").value;
    let answerOption4 = optionsAr[3] = document.getElementById("answerOption4").value;

    //console.log(optionsAr);

    optionsAr.forEach(findTrueOptions);
    function findTrueOptions(val, index) {
      
      if(val === "True"){
        optionTrueCount++;
      }
    }
    let questionChar = document.getElementById("question").value.length;
    let selectedTechnology = this.state.technology;
    let assignedMarks =  document.getElementById("marks").value.length;
    var data = {
      "header":this.state.question,
      "answerId":1,
      "options":[
        {"description":answer1,"answerOption":answerOption1},
          {"description":answer2, "answerOption":answerOption2},
          {"description":answer3, "answerOption":answerOption3},
          {"description":answer4, "answerOption":answerOption4}
      ],
      "technology":this.state.technology,
      "questionTypeId": questionId,
	    "assessmentIds": [this.state.selectedItem],
      "marks":this.state.marks
     
    };
    console.log(data);

    if(optionTrueCount == 1 && questionChar >= 20 && selectedTechnology != undefined && assignedMarks >=1 ){
      //   fetch(url, {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin":
      //       "Origin, X-Requested-With, Content-Type, Accept",
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then((res) => res.json())
      //   .then((res) => {
      //     alert("Question added successfully!");
      //     console.log(res)
      // });
      console.log("Inside If Block")
    }else{
      alert("Please fill in all details !")
      //alert("Please select 1 True option, can't more than 1");
    }
      
  }

  render() {
    return (
      <Container component="main">
        <CssBaseline />
        <div className={this.classes}>
          {/* <form onSubmit={this.handleSendInvitation} className={this.classes}> */}
          <form className={this.classes}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Question"
                      id="question"
                      required="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => (this.state.question = e.target.value),
                        required: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                  <GridContainer>
                  <GridItem xs={12} sm={12} md={9}>
                    <CustomInput
                      labelText="Answer1"
                      id="answer1"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => (this.state.answer1 = e.target.value),
                        required: true,
                      }}
                    />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                    <div className={style.dropdownBool}>
                      <select id="answerOption1" className="form-control">
                        <option value="False">False</option>
                        <option value="True">True</option>
                      </select>
                      </div>
                    </GridItem>
                    </GridContainer>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                  <GridContainer>
                  <GridItem xs={12} sm={12} md={9}>
                    <CustomInput
                      labelText="Answer2"
                      id="answer2"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => (this.state.answer2 = e.target.value),
                        required: true,
                      }}
                    />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                    <div className={style.dropdownBool}>
                      <select id="answerOption2" className="form-control">
                        <option value="False">False</option>
                        <option value="True">True</option>
                      </select>
                      </div>
                    </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <GridContainer>
                  <GridItem xs={12} sm={12} md={9}>
                    <CustomInput
                      labelText="Answer3"
                      id="answer3"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => (this.state.answer3 = e.target.value),
                        required: true,
                      }}
                    />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                    <div className={style.dropdownBool}>
                      <select id="answerOption3" className="form-control">
                        <option value="False">False</option>
                        <option value="True">True</option>
                      </select>
                      </div>
                    </GridItem>
                    </GridContainer>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                  <GridContainer>
                  <GridItem xs={12} sm={12} md={9}>
                    <CustomInput
                      labelText="Answer4"
                      id="answer4"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => (this.state.answer4 = e.target.value),
                        required: true,
                      }}
                    />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <div className={style.dropdownBool}>
                      <select id="answerOption4" className="form-control">
                        <option value="False">False</option>
                        <option value="True">True</option>
                      </select>
                      </div>
                    </GridItem>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <div className={style.dropdown}>
                      <select
                        id="domain-id"
                       onChange={(e) =>
                        
                        {
                          //console.log(e.target.qid)
                          this.setState({
                            selectedItem: e.target.value,
                            technology: e.target.value,
                            validationError:
                              e.target.value === ""
                                ? "You must select domain name"
                                : "",
                          })
                        }
                        }
                        
                        className="form-control"
                      >
                        {this.state.domains.map((item) => (
                          <option key={item.value} value={item.value} >
                          {item.display}
                        </option>
                        ))}
                      </select>
                      <div
                        style={{
                          color: "red",
                          marginTop: "5px",
                        }}
                      >
                        {this.state.validationError}
                        {/*  {this.state.selectedTeam} */}
                      </div>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                   <div  className={style.marks}>
                      <TextField
                      id="marks"
                      label="Marks"
                      type="number"
                     
                      fullWidth
                      InputProps={{
                        inputProps: {
                          max: 5,
                          min: 0,
                        },
                        onChange: (e) => (this.state.marks = e.target.value),
                      }}
                    />
                    </div>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
            <CardFooter>
              <Button color="danger" type="reset">
                Reset
              </Button>
              <Button
                color="primary"
                type="reset"
                variant="contained"
                color="primary"
                className={this.classes}
                onClick={() => this.handleQuestionRequest()}
              >
                Add Question
              </Button>
            </CardFooter>

            {/* <Button color="primary" type="submit">Send Invite</Button> */}
          </form>
        </div>
      </Container>
    );
  }
}

export default InviteCandidate;
