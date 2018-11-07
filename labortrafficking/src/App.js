import React, { Component } from 'react';
import logo from './logo.svg';
import instructions from './instructions.jpg';
import instructions1 from './instructions1.jpg';
import instructions2 from './instructions2.jpg';
import instructions3 from './instructions3.jpg';
import instructions4 from './instructions4.jpg';
import './App.css';
import Question from './components/Question';
import SeriousHarmquizQuestions from './api/SeriousHarmquizQuestions';
import AbuseofLawquizQuestions from './api/AbuseofLawquizQuestions';
import ExtortionquizQuestions from './api/ExtortionquizQuestions';
import FinancialHarmquizQuestions from './api/FinancialHarmquizQuestions';
import RestraintquizQuestions from './api/RestraintquizQuestions';
import IdentityDocumentsquizQuestions from './api/IdentityDocumentsquizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import update from 'react-addons-update';
import Popup from "reactjs-popup";
import jsPDF from 'jspdf';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
     counter: 0,
     questionId: 1,
     qcategory: 1,
     question: '',
     answerOptions: [],
     answer: '',
     line: 0,
     page: 1,
     addpage: 0,
     result: '',
     doc : new jsPDF(),
     answersCount: {
       No: 0,
       Yes: 0,
       Maybe: 0
     },
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this._onAssessClick = this._onAssessClick.bind(this);
    this._onPrepareClick = this._onPrepareClick.bind(this);
    this.sHarmQuizFunc = this.sHarmQuizFunc.bind(this);
    this.restraintQuizFunc = this.restraintQuizFunc.bind(this);
    this.abuseQuizFunc = this.abuseQuizFunc.bind(this);
    this.identitydocQuizFunc = this.identitydocQuizFunc.bind(this);
    this.extortionQuizFunc = this.extortionQuizFunc.bind(this);
    this.fharmQuizFunc = this.fharmQuizFunc.bind(this);
    this._onCompleteClick = this._onCompleteClick.bind(this);
    this._onInvestigateClick = this._onInvestigateClick.bind(this);
    this._onVictimClick = this._onVictimClick.bind(this);
    this.downloadPdf = this.downloadPdf.bind(this);
  }
  

  // cwm() {
  //   if (this.state.qcategory == 1) {
  //     const shuffledAnswerOptions = SeriousHarmquizQuestions.map((question) => this.shuffleArray(question.answers));  

  //     this.setState({
  //       question: SeriousHarmquizQuestions[0].question,
  //       answerOptions: shuffledAnswerOptions[0]
  //     });
  //   }
  //   else if (this.state.qcategory == 2) {
  //     const shuffledAnswerOptions = RestraintquizQuestions.map((question) => this.shuffleArray(question.answers));  

  //     this.setState({
  //       question: RestraintquizQuestions[0].question,
  //       answerOptions: shuffledAnswerOptions[0]
  //     });
  //   }
  //   else if (this.state.qcategory == 3) {
  //     const shuffledAnswerOptions = AbuseofLawquizQuestions.map((question) => this.shuffleArray(question.answers));  

  //     this.setState({
  //       question: AbuseofLawquizQuestions[0].question,
  //       answerOptions: shuffledAnswerOptions[0]
  //     });
  //   }
  //   else if (this.state.qcategory == 4) {
  //     const shuffledAnswerOptions = IdentityDocumentsquizQuestions.map((question) => this.shuffleArray(question.answers));  

  //     this.setState({
  //       question: IdentityDocumentsquizQuestions[0].question,
  //       answerOptions: shuffledAnswerOptions[0]
  //     });
  //   }
  //   else if (this.state.qcategory == 5) {
  //     const shuffledAnswerOptions = ExtortionquizQuestions.map((question) => this.shuffleArray(question.answers));  

  //     this.setState({
  //       question: ExtortionquizQuestions[0].question,
  //       answerOptions: shuffledAnswerOptions[0]
  //     });
  //   }
  //   else if (this.state.qcategory == 6) {
  //     const shuffledAnswerOptions = FinancialHarmquizQuestions.map((question) => this.shuffleArray(question.answers));  

  //     this.setState({
  //       question: FinancialHarmquizQuestions[0].question,
  //       answerOptions: shuffledAnswerOptions[0]
  //     });
  //   }
  // }

  shuffleArray(array) {
    return array;
  };

  writePdf(answer) {

    var a = this.state.line + 20;
    if (a > 297) {
      a = 20;
    }
    var b = a + 10;
    if (b > 297) {
      b = 20;
    }
    var c = b + 10;
    if (c > 297) {
      c = 20;
    }
    this.state.doc.text('Question No. ' + String(this.state.questionId), 10, a);
    this.state.doc.text(String(this.state.question), 10, b);
    this.state.doc.text('Chosen Answer: ' + String(answer), 10, c); 
    this.setState({line: c});
  }

  downloadPdf() {
    this.state.doc.save('Assessment Results.pdf');
  }

  setUserAnswer(answer) {
    this.writePdf(answer);
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue + 1}
    });
    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
      counter: counter,
      questionId: questionId,
      answer: ''
    });
    if (this.state.qcategory == 1) {
      this.setState({
        question: SeriousHarmquizQuestions[counter].question,
        answerOptions: SeriousHarmquizQuestions[counter].answers
      });
    }
    else if (this.state.qcategory == 2) {
      this.setState({
        question: RestraintquizQuestions[counter].question,
        answerOptions: RestraintquizQuestions[counter].answers
      });
    }
    else if (this.state.qcategory == 3) {
      this.setState({
        question: AbuseofLawquizQuestions[counter].question,
        answerOptions: AbuseofLawquizQuestions[counter].answers
      });
    }
    else if (this.state.qcategory == 4) {
      this.setState({
        question: IdentityDocumentsquizQuestions[counter].question,
        answerOptions: IdentityDocumentsquizQuestions[counter].answers
      });
    }
    else if (this.state.qcategory == 5) {
      this.setState({
        question: ExtortionquizQuestions[counter].question,
        answerOptions: ExtortionquizQuestions[counter].answers
      });
    }
    else if (this.state.qcategory == 6) {
      this.setState({
        question: FinancialHarmquizQuestions[counter].question,
        answerOptions: FinancialHarmquizQuestions[counter].answers
      });
    }
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);
    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults (result) {
    if (result.length === 1) {
      const a = this.state.line + 20;
      this.state.doc.text('Labor Trafficking case: ' + String(result[0]), 10, a);
      this.setState({ result: result[0] });
    } else {
      const a = this.state.line + 20;
      this.state.doc.text('Labor Trafficking case: Maybe', 10, a);
      this.setState({ result: 'Maybe' });
    }
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < SeriousHarmquizQuestions.length && this.state.qcategory == 1) {
        setTimeout(() => this.setNextQuestion(), 300);
      } 
      else if (this.state.questionId < RestraintquizQuestions.length && this.state.qcategory == 2) {
        setTimeout(() => this.setNextQuestion(), 300);
      } 
      else if (this.state.questionId < AbuseofLawquizQuestions.length && this.state.qcategory == 3) {
        setTimeout(() => this.setNextQuestion(), 300);
      } 
      else if (this.state.questionId < IdentityDocumentsquizQuestions.length && this.state.qcategory == 4) {
        setTimeout(() => this.setNextQuestion(), 300);
      } 
      else if (this.state.questionId < ExtortionquizQuestions.length && this.state.qcategory == 5) {
        setTimeout(() => this.setNextQuestion(), 300);
      } 
      else if (this.state.questionId < FinancialHarmquizQuestions.length && this.state.qcategory == 6) {
        setTimeout(() => this.setNextQuestion(), 300);
      } 
      else {
        setTimeout(() => this.setResults(this.getResults()), 300);
      }
  }

  renderQuiz() {
    return (
      <div>
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal ={this.state.qcategory == 1 ? SeriousHarmquizQuestions.length : this.state.qcategory == 2 ? 
          RestraintquizQuestions.length : this.state.qcategory == 3 ? AbuseofLawquizQuestions.length : this.state.qcategory == 4 ? 
          IdentityDocumentsquizQuestions.length : this.state.qcategory == 5 ? ExtortionquizQuestions.length : FinancialHarmquizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
      <br></br><br></br>
      <button class="button" >Interview Tips --></button>
      <br></br><br></br>
      <button class="button" >Fact Patterns --></button>
      <br></br><br></br>
      <button class="button" >Mass Statute --></button>
      <br></br><br></br>
      </div>
    );
  }
  
  renderResult() {
    return (
        <div>
        <br></br><br></br><br></br>
        <Popup
          trigger={<button className="button"> See Assessment Results </button>}
          modal
          contentStyle={{ maxWidth: "600px", width: "90%" }}>
          {close => (
          <div className="modal">
            <div className="header"> <strong>Assessment Results </strong></div>
            <div className="content1">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
              nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
              quibusdam voluptates delectus doloremque, explicabo tempore dicta
              adipisci fugit amet dignissimos?
              <br />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
              sit commodi beatae optio voluptatum sed eius cumque, delectus saepe
              repudiandae explicabo nemo nam libero ad, doloribus, voluptas rem
              alias. Vitae?
              <br></br><br></br>
              <Result quizResult={this.state.result} />
              <br></br><br></br>
            </div>
            <div className="actions">
              <div className="btn-group">
                <button className="button1" onClick={this.downloadPdf}>Download PDF</button>
                <button className="button1" onClick={this._onAssessClick}>Next Category</button>
                <button className="button1" onClick={() => { console.log("modal closed ");
                close(); this._onCompleteClick();}}>
                Exit
                </button>
              </div>
            </div>
          </div>
          )}
        </Popup>
        </div>
    );
  }

  renderHome() {
    return (
      <div className="App">
      <p className="HomeHead">Labor Trafficking <br></br>Identification Tool</p>
      <div class="ButBar">
        <p className="HomeHead1">A tool to help investigators identify labor trafficking under Massachusetts law.<br></br></p>
        <div className="buttonContainer">
          <button type="button" class="button1" onClick={this._onPrepareClick}>Prepare</button>
          <button type="button" onClick={this._onAssessClick} class="button1">Begin</button>
        </div>
      </div>
      <picture>
        <source srcset={instructions1} media= "(max-width: 760px)"/>
        <img src={instructions} alt="Instructions" className = "Desc-Image"/>
      </picture>
      <picture>
        <source srcset={instructions2} media= "(max-width: 760px)"/>
        <img src="" className = "Desc-Image"/>
      </picture>
      <picture>
        <source srcset={instructions3} media= "(max-width: 760px)"/>
        <img src="" className = "Desc-Image"/>
      </picture>
      <picture>
        <source srcset={instructions4} media= "(max-width: 760px)"/>
        <img src="" className = "Desc-Image"/>
      </picture>
      </div>
    );
  }

  prepareFunc() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    }
  }

  _onPrepareClick() {
    this.setState({
      page: 2,
    });
  }

  _onAssessClick() {
    this.setState({
      page: 3,
    });
  }

  sHarmQuizFunc() {
    const shuffledAnswerOptions = SeriousHarmquizQuestions.map((question) => this.shuffleArray(question.answers));  
    this.setState({
      page: 4,
      questionId: 1,
      question: SeriousHarmquizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      qcategory: 1
    });
    
  }
  restraintQuizFunc() {
    const shuffledAnswerOptions = RestraintquizQuestions.map((question) => this.shuffleArray(question.answers));      
    this.setState({
      page: 4,
      questionId: 1,
      question: RestraintquizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      qcategory: 2
    });
    
  }
  abuseQuizFunc() {
    const shuffledAnswerOptions = AbuseofLawquizQuestions.map((question) => this.shuffleArray(question.answers));  
    this.setState({
      page: 4,
      questionId: 1,
      question: AbuseofLawquizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      qcategory: 3
    });
    
  }
  identitydocQuizFunc() {
    const shuffledAnswerOptions = IdentityDocumentsquizQuestions.map((question) => this.shuffleArray(question.answers));  
    this.setState({
      page: 4,
      questionId: 1,
      question: IdentityDocumentsquizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      qcategory: 4
    });
    
  }
  extortionQuizFunc() {
    const shuffledAnswerOptions = ExtortionquizQuestions.map((question) => this.shuffleArray(question.answers));  
    this.setState({
      page: 4,
      questionId: 1,
      question: ExtortionquizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      qcategory: 5
    });
    
  }
  fharmQuizFunc() {
    const shuffledAnswerOptions = FinancialHarmquizQuestions.map((question) => this.shuffleArray(question.answers));  
    this.setState({
      page: 4,
      questionId: 1,
      question: FinancialHarmquizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      qcategory: 6
    });
    
  }

  _onCompleteClick() {
    this.setState({
      page: 1,
    });
  }

  _onInvestigateClick() {
    this.setState({
      page: 5,
    });
  }

  _onVictimClick() {
    this.setState({
      page: 6,
    });
  }

  renderPrepare() {
    return (
    <div>
      <div class = "prep">
      <div style = {{'text-align' : 'center'}}>
      <p style={{'font-size': '20px'}}><center>Step 1</center></p>
      <p className="asse">Prepare for Assessment</p>
      <p className="disc">If you are a law enforcement investigator, these are the steps to think about when you prepare your investigation. If you are not law enforcement, please also consider where you will hand your assessment report off when you are done. </p>
      <button className="button2" onClick = {this._onAssessClick}>Skip and Begin</button>
      </div>
      </div>

      <div className="prep1">
      <p style={{'padding-bottom': '10px', 'width' : '100%'}}><strong>Preliminary Interview Information</strong></p>

      <div className="collap">
      <button class="accordion" onClick = {this.prepareFunc}>Tip 1: Develop trust.</button>
      <div class="panel">
        <ul>
          <li>Explain at the outset about confidentiality and its limits. As an investigator, you will not be able to keep details disclosed by the victim confidential. Explaining this at the beginning will allow the victim to understand your role and not to feel betrayed if you have to share information with prosecutors and/or other government officials.</li>
          <br></br>
          <li>Understand that establishing trust with the victim may be difficult during the initial interviews. It may take multiple interviews to develop trust, and victims may not be forthcoming initially about key details due to fear.</li>
          <br></br>
          <li>In the human trafficking context, it is common to engage in multiple interviews as trust develops. It is common to that there may be initial inconsistencies as a result of distrust or the victim’s lack of understanding about the legal process.</li>
          <br></br>
          <li>Make referrals to appropriate legal, social, and mental health services as soon as possible. This can help to establish trust and to ensure that the victim receives the services helpful to support him or her throughout the investigation process. Click here for more information about appropriate referrals.</li>
          <br></br>
          <li>If there are language barriers, trust will be nearly impossible to establish without a skilled interpreter. Click here (link to Tip#4 below) to read more about tips when using interpreters and here (link to interpreter resources at page 13) to learn more about interpreter resources.</li>
        </ul>
        <hr></hr>
        <h4>Trust is the most essential part of the interviewing process. It may take multiple interviews to develop trust and know that inconsistencies may develop early on due to lack of trust.</h4>
        <a href="#">Learn more about how to make appropriate referrals to victim services→</a>
        <br></br>
        <a href="#">Learn more about how to find a skilled interpreter→</a>
        <br></br>
        <a href="#">Learn more about barriers to trust for undocumented victims→</a>

      </div>
      </div>

      <br></br><br></br><br></br>

      <div className="collap">
      <button class="accordion" onClick = {this.prepareFunc}>Tip 2: Engage in safety planning.</button>
      <div class="panel">
        <ul>
          <li>Ask about the victim’s immediate safety and take appropriate steps to ensure safety both before and after interviewing. </li>
          <br></br>
          <li>Safety planning is very important. Involve a victim advocate in the process as soon as possible. Click here (link to safety planning information at page 17) for a list of questions to consider when thinking about safety planning.</li>
          <br></br>
          <li>Safety planning should take into account a variety of considerations. Victims may be fearful of reprisals to themselves and their family members. Also, safety planning should take into account the victim’s continued need to work whenever possible. It is often true that a victim may feel the need to continue to work to repay debt and/or to support family members in their home country. For undocumented victims, there may be immigration options available that help them to obtain lawful work authorization.  Click here (link to immigration options at page 14) to learn more about immigration relief.</li>
          <br></br>
          <li>Make referrals to organizations that can assist with safety planning. Click here (link to victim services at page 8) to learn about available victim services.</li>
        </ul>
        <hr></hr>
        <h4>Make appropriate referrals and engage in safety planning early in the process to ensure that the victim is safe during the investigation process.</h4>
        <a href="#">Learn more about questions to ask during the safety planning process</a>
        <br></br>
        <a href="#">Learn more about pro bono immigration legal services for victims</a>
        </div>
      </div>

      <br></br><br></br><br></br>
      
      <div className="collap">
      <button class="accordion" onClick = {this.prepareFunc}>Tip 3: Know how immigration status affects crime reports.</button>
      <div class="panel">
        <ul>
          <li>Know that the subject may use immigration threats or status as a means of power and control over the victim. For this reason, referring the victim to an experienced immigration attorney early in the process is very important. Click here (link to immigration legal providers at page 9) for a list of local immigration legal services providers.</li>
          <br></br>
          <li>There may be important protections available for undocumented victims. If the victim is undocumented, it is important to make a referral immediately to an experienced immigration attorney to ensure the person receives protection and does not miss important deadlines in his or her immigration case.</li>
          <br></br>
          <li>Immigrant victims of labor trafficking may be eligible for immigration relief, such as Continued Presence, T visas, and U visas. Click here (link to immigration options at page 14) to learn more about immigration options available to victims.</li>
        </ul>
        <hr></hr>
        <h4>Undocumented victims are particularly at risk for human trafficking and may fear engaging with law enforcement.</h4>
        <a href="#">Learn more about immigration options for undocumented victims</a>
        <br></br>
        <a href="#">Learn more about pro bono immigration legal services for victims</a>
      </div>
      </div>

      <br></br><br></br><br></br>
      
      <div className="collap">
      <button class="accordion" onClick = {this.prepareFunc}>Tip 4: Use a qualified interpreter.</button>
      <div class="panel">
      <ul>
          <li>It is important to use skilled, culturally competent interpreters to assist in interviews with victims who have limited English proficiency. Always ask the victim about any languages he or she speaks and what language he or she feels most proficient and comfortable.</li>
          <br></br>
          <li>In-person interpretation is preferable, and it is important to consider whether to find an interpreter of the same gender as the victim.</li>
          <br></br>
          <li>Before the interview, screen your interpreter to make sure he or she is not involved in the case and does not have connections to the subject. Often, ethnic communities can be small, and it is essential that the interpreter has no relationship with the subject and understands the importance of confidentiality.</li>
          <br></br>
          <li>Understand that there may be stigma and subtle cultural considerations that can affect the victim’s disclosures to interpreters. For example, a victim may not feel comfortable disclosing about a sexual assault in front of someone from his or her same ethnicity due to fear of stigma or blame.</li>
          <br></br>
          <li>To learn more about interpretation resources, click here (link to interpreter resources at page 3).</li>
        </ul>
        <hr></hr>
        <h4>Having a trained interpreter is essential when working with victims with limited English proficiency.</h4>
        <a href="#">Click here for a list of available interpreter services</a>
        <br></br>
        <a href="#">Learn more about victim services for victims</a>
      </div>
      </div>

      <br></br><br></br><br></br>
      
      <div className="collap">
      <button class="accordion" onClick = {this.prepareFunc}>Tip 5: Make referrals to victim services ASAP.</button>
      <div class="panel">
        <ul>
          <li>The first priority is ensuring that the victim’s basic needs are met. This includes access to safe housing, mental health services, medical services, and food. Click here (link to victim services at page 8) to learn more about available victim services.</li>
          <br></br>
          <li>It is important to refer the victim to an attorney as soon as possible to ensure that he or she can learn about his or her rights. A victim of trafficking in persons for forced services may be eligible for certain protections under law, such as victim compensation, criminal restitution, immigration relief, and civil remedies. Also, the victim has many rights during the criminal prosecution, such as the right to receive information about the status of the case, present a victim impact statement, and receive mandatory criminal restitution, among other protections. MASS. GEN. LAWS ch. 258B, § 3. Click here (link to legal services at page 10) to learn more about available legal services and how to make a referral.</li>
        </ul>
        <hr></hr>
        <h4>Make appropriate referrals to victim services as soon as possible to ensure that the victim has access to legal and social services.</h4>
        <a href="#">Click here for a list of victim services</a>
        <br></br>
        <a href="#">Click here for a list of legal services</a>
        <br></br>
        <a href="#">Learn more about immigration legal options for undocumented survivors</a>
      </div>
      </div>

      <br></br><br></br><br></br>
      
      <div className="collap">
      <button class="accordion" onClick = {this.prepareFunc}>Tip 6: Ask open-ended questions.</button>
      <div class="panel">
        <ul>
          <li>At the outset, allowing the victim to tell as much or as little of his/her experience as he or she is comfortable is key in building trust and a successful investigation.</li>
          <br></br>
          <li>It is important to understand how trauma can affect a victim’s disclosure and how to respond when the signs of trauma present themselves in an interview. Trauma can make victims reluctant to disclose and may affect their memory of the event. Also, trauma can cause victims to disclose their stories in a non-linear or inconsistent manner. In such situations, it is important to allow for multiple interviews to help the victim fully disclose the traumatic event and to understand that there may be inconsistencies that emerge in early interviews.</li>
        </ul>
        <hr></hr>
        <h4>Asking open-ended questions is important to build trust.</h4>
        <a href="#">Click here for a list of victim services</a>
        <br></br>
        <a href="#">If interviewing a child victim, find your local Children’s Advocacy Center</a>
      </div>
      </div>

      <br></br><br></br><br></br>
      
      <div className="collap">
      <button class="accordion" onClick = {this.prepareFunc}>Tip 7: Educate yourself about trauma. </button>
      <div class="panel">
        <ul>
          <li>Approach the interview in a trauma-informed manner. It’s important to understand how trauma can affect a victim’s disclosure and how to respond when the signs of trauma present themselves in an interview.</li>
          <br></br>
          <li>Be mindful of the location of the interview, making sure it is convenient, accessible, and comfortable for the victim.</li>
          <br></br>
          <li>Consider whether the gender of the interviewer is an important consideration and keep the number of persons present for the interview to the minimum necessary.</li>
          <br></br>
          <li>Often, victims may suffer from Post-Traumatic Stress Disorder, Depression, and/or other mental health conditions. For this reason, they may have difficulty telling you about key parts of their story. Please keep in mind that trauma can make victims reluctant to disclose and may affect their memory of an event, causing them to disclose their stories in a non-linear or inconsistent manner. Facts may emerge over time, and it may be important to consider engaging in multiple interviews or asking for the assistance of a forensic interviewer, when appropriate.</li>
          <br></br>
          <li>Explore whether the victim has mental health supports in place at the outset and if not, make appropriate referrals to ensure the victim has support throughout the process. Click here (link to victim services at page 8) for a list of victim services.</li>
          <li>If a child (any victim under 18) is involved, mandated reporters must file a 51A report with the Massachusetts Department of Children and Families (DCF), which will report the incident to the local District Attorney’s Office. By law, DCF will work to establish a multidisciplinary team to provide comprehensive, tailored services to the child victim.
          <ul>
            <li>Please consult with your local Children’s Advocacy Center to coordinate and the multi-disciplinary team will work with you to consider if an interview of the child is appropriate and if so, how best to approach the interview. Consider conducting a child forensic interview. Even in cases wherein there is no physical or sexual violence, a child forensic interview still may be helpful given emotional abuse and fear.</li>
            <li>Child forensic interviewers are trained to take into account the unique family relationships, community support, histories of trauma, and cultural or social attitudes that may shape a child’s disclosure. Each child victim is different, due to different past experiences of violence and trauma. It is important to note that no two children will react in the same manner or provide the same level of detail and clarity.</li>
            <li>Click here to locate the closest Children’s Advocacy Center near you.</li>
          </ul></li>
        </ul>
        <hr></hr>
        <h4>It is important to engage in a trauma-informed interview. If working with child victims, contact the local Children’s Advocacy Center as soon as possible.</h4>
        <a href="#">Click here for a list of victim services</a>
        <br></br>
        <a href="#">Learn more about reporting requirements when dealing with child victims</a>
        <br></br>
        <a href="#">Find your local Children’s Advocacy Center</a>
      </div>
      </div>

      <br></br><br></br><br></br>
      
      <div className="collap">
      <button class="accordion" onClick = {this.prepareFunc}>Tip 8: Educate Yourself About The Culture.</button>
      <div class="panel">
        <ul>
          <li>If the victim is from a distinct ethnic or social group, educate yourself about the culture. Cultural norms may shape what or how the victim will disclose critical information. Consider connecting with social service providers with expertise serving this population. Click here for a list of various non-governmental agencies with cultural expertise in Massachusetts.</li>
        </ul>
        <hr></hr>
        <h4>Culture can play an important role in how a victim engages in the interview process.</h4>
        <a href="#">Learn more about non-governmental agencies with cultural expertise in Massachusetts</a>
      </div>
      </div>

      <br></br><br></br><br></br>
      <button class="button" onClick = {this._onAssessClick}>Begin</button>
      </div>
      </div>
    );
  }

  renderAssessmentSteps() {
    return (
    <div>
      <div class = "prep">
      <div style = {{'text-align': 'center'}}>
      <p style={{'font-size': '20px'}}><center>Step 2</center></p>
      <p className="asse">Assessment</p>
      </div>
      <p className="disc"><strong>Communication of information by, in, to or through this website and your receipt or use of it</strong></p>
      <div className="disc">
      <ol style = {{'font-size' : '17px', 'float': 'right'}}>
          <i><li>is not provided in the course of and does not create or constitute an attorney-client relationship</li></i>
          <i><li>is not intended as a solicitation</li></i>
          <i><li>is not intended to convey or constitute legal advice, and</li></i>
          <i><li>is not a substitute for obtaining legal advice from a qualified attorney</li></i>
      </ol>
      </div>
      <p className="disc"><strong>You should not act upon any such information without first seeking qualified professional counsel on the specific matter. </strong></p>

      </div>

      <div className="prep1" style = {{'background-color' : '#eee'}}>

      <div className="collap">
      <button class="accordion1" onClick = {this.prepareFunc}>HARM: <br></br><i>causes or threatens to cause serious harm to any person</i></button>
      <div class="panel1">
        <ul>
          <li><strong>Lay Definition :</strong> Serious harm is not defined under Massachusetts law, but federal law is persuasive authority. Under
              federal law, serious harm can be physical and nonphysical, and includes psychological, financial,
              economic, or reputational harm. Generally, the test contemplates whether it is sufficiently serious, under all
              the surrounding circumstances, to compel a reasonable person of the same background and in the same
              circumstances to perform or to continue performing labor or services in order to avoid incurring that harm.</li>
          <br></br>
          <li><strong>Legal Definition : </strong>Serious harm is defined federally as "any harm, whether physical or nonphysical, including psychological,
              financial, or reputational harm, that is sufficiently serious, under all the surrounding circumstances, to
              compel a reasonable person of the same background and in the same circumstances to perform or to
              continue performing labor or services in order to avoid incurring that harm." 18 USC § 1589(c)(2).</li>
          <br></br>
          <li><strong>Examples: </strong>Subject kicks the victim to wake her up to work for her as a domestic worker.</li>
        </ul>
        <hr></hr>
        <a href="#">Link to Massachusetts Statute→</a>
        <br></br><br></br><br></br>
        <button class="button" style = {{'font-size' : '18px', 'justify-text' : 'center'}} onClick = {this.sHarmQuizFunc}>Start “Harm” Questions →</button>

      </div>
      </div>

      <br></br><br></br><br></br>

      <div className="collap">
      <button class="accordion1" onClick = {this.prepareFunc}>RESTRAINT: <br></br><i>physically restrains or threatens to physically restrain another person</i></button>
      <div class="panel1">
        <ul>
          <li><strong>Lay Definition :</strong> Physical restraint means purposely limiting or obstructing the freedom of a person's bodily movement.
              This can include using locks on doors or windows to more subtle forms of control that restrict another
              person’s ability to move around.</li>
          <br></br>
          <li><strong>Examples: </strong>The subject locks the victim in the restaurant in the morning and requires her to cook and clean.</li>
        </ul>
        <hr></hr>
        <a href="#">Link to Massachusetts Statute→</a>
        <br></br><br></br><br></br>
        <button class="button" style = {{'font-size' : '18px', 'justify-text' : 'center'}} onClick = {this.restraintQuizFunc}>Start “Restraint” Questions →</button>
        </div>
      </div>

      <br></br><br></br><br></br>
      
      <div className="collap">
      <button class="accordion1" onClick = {this.prepareFunc}>ABUSE OF LAW: <br></br><i>abuses or threatens to abuse the law or legal process</i></button>
      <div class="panel1">
        <ul>
          <li><strong>Lay Definition :</strong> Abuse of the legal process is not defined under Massachusetts law but federal law is persuasive authority.
              Federally, abuse of the legal process includes the use or threatened use of a law or legal process, whether
              administrative, civil, or criminal, in any manner or for any purpose for which the law was not designed.
              Common examples are deportation threats, whether subtle or overt. Click here to view the federal
              definition of abuse of the legal process.</li>
          <br></br>
          <li><strong>Legal Definition : </strong>Abuse of the legal process is defined federally as "the use or threatened use of a law or legal process,
              whether administrative, civil, or criminal, in any manner or for any purpose for which the law was not
              designed, in order to exert pressure on another person to cause that person to take some action or refrain
              from taking some action." 22 U.S.C. § 7102(1).</li>
          <br></br>
          <li><strong>Examples: </strong>The subject threatens the victim with deportation if she stops working.</li>
        </ul>
        <hr></hr>
        <a href="#">Link to Massachusetts Statute→</a>
        <br></br><br></br><br></br>
        <button class="button" style = {{'font-size' : '18px', 'justify-text' : 'center'}} onClick = {this.abuseQuizFunc}>Start “Abuse of Law” Questions →</button>
      </div>
      </div>

      <br></br><br></br><br></br>
      
      <div className="collap">
      <button class="accordion1" onClick = {this.prepareFunc}>IDENTITY DOCUMENTS: <br></br><i>knowingly destroys, conceals, removes, confiscates or possesses any actual or purported passport or other immigration document, or any other actual or purported government identification document, of another person</i></button>
      <div class="panel1">
      <ul>
          <li><strong>Lay Definition :</strong> This includes taking someone's passport for any period of time, even if it is brief. In addition, it can include
              the tearing or mutilating of identity documents.</li>
          <br></br>
          <li><strong>Examples: </strong>The subject takes the victim's passport and holds it while working for him.</li>
        </ul>
        <hr></hr>
        <a href="#">Link to Massachusetts Statute→</a>
        <br></br><br></br><br></br>
        <button class="button" style = {{'font-size' : '18px', 'justify-text' : 'center'}} onClick = {this.identitydocQuizFunc}>Start “Identity Documents” Questions →</button>
      </div>
      </div>

      <br></br><br></br><br></br>
      
      <div className="collap">
      <button class="accordion1" onClick = {this.prepareFunc}>EXTORTION: <br></br><i>engages in extortion under Massachusetts law</i></button>
      <div class="panel1">
        <ul>
          <li><strong>Lay Definition :</strong>Extortion generally is the practice of trying to get something through force, threats, or blackmail. For
              example, extortion might be involved if a subject threatens to release embarrassing photographs, unless
              the victim continues to work.</li>
          <br></br>
          <li><strong>Legal Definition : </strong>Massachusetts General Laws define extortion as involving "[w]hoever, verbally or by a written or printed
              communication, maliciously threatens to accuse another of a crime or offence, or by a verbal or written or
              printed communication maliciously threatens an injury to the person or property of another, or any police officer
              or person having the powers of a police officer, or any officer, or employee of any licensing authority who
              verbally or by written or printed communication maliciously and unlawfully uses or threatens to use against
              another the power or authority vested in him, with intent thereby to extort money or any pecuniary advantage, or
              with intent to compel any person to do any act against his will, shall be punished by imprisonment in the state
              prison for not more than fifteen years, or in the house of correction for not more than two and one half years, or
              by a fine of not more than five thousand dollars, or both." Mass. Gen. Laws Ch. 265, § 25.</li>
          <br></br>
          <li><strong>Examples: </strong>The subject threatens to send compromising photographs of the victim to the media if she refuses to work.</li>
        </ul>
        <hr></hr>
        <a href="#">Link to Massachusetts Statute→</a>
        <br></br><br></br><br></br>
        <button class="button" style = {{'font-size' : '18px', 'justify-text' : 'center'}} onClick = {this.extortionQuizFunc}>Start “Extortion” Questions →</button>
      </div>
      </div>

      <br></br><br></br><br></br>
      
      <div className="collap">
      <button class="accordion1" onClick = {this.prepareFunc}>FINANCIAL HARM: <br></br><i>causes or threatens to cause financial harm to any person</i></button>
      <div class="panel1">
        <ul>
          <li><strong>Lay Definition :</strong> Financial harm is involved if the subject puts the victim in a detrimental position in relation to wealth,
              property, or other monetary benefits through extortion, criminal usury, or illegal employment contracts.
              This might include a situation where the subject uses an illegal employment contract to lure a victim to
              work in demeaning conditions.</li>
          <br></br>
          <li><strong>Legal Definition : </strong>Financial harm is defined as "a detrimental position in relation to wealth, property or other monetary benefits
              that occurs as a result of another person's illegal act including, but not limited to, extortion under Mass. Gen.
              Laws Ch. 265, Sec. 49 (“Criminal Usury”) or illegal employment contracts." Mass. Gen. Laws Ch. 265, § 49.</li>
          <br></br>
          <li><strong>Examples: </strong>The subject runs up a debt of $10,000 on credit cards in the victim's name and says she has to work to pay it off.</li>
        </ul>
        <hr></hr>
        <a href="#">Link to Massachusetts Statute→</a>
        <br></br><br></br><br></br>
        <button class="button" style = {{'font-size' : '18px', 'justify-text' : 'center'}} onClick = {this.fharmQuizFunc}>Start “Financial Harm” Questions →</button>
      </div>
      </div>

      <br></br>
      
      <button class="button" style = {{'font-size' : '20px'}} onClick = {this._onCompleteClick}>Final Evaluation</button>
      </div>
      </div>
    );
  }

  renderAssessmentSteps1() {
    return (
      <div class = "prep">
      <p className="asse"><strong>Assessment Steps</strong></p>
      <button class="btn category" onClick = {this.sHarmQuizFunc}>Serious Harm</button>
      <br></br><br></br>
      <button class="btn category" onClick = {this.restraintQuizFunc}>Restraint</button>
      <br></br><br></br>
      <button class="btn category" onClick = {this.abuseQuizFunc}>Abuse of Law</button>
      <br></br><br></br>
      <button class="btn category" onClick = {this.identitydocQuizFunc}>Identity Documents</button>
      <br></br><br></br>
      <button class="btn category" onClick = {this.extortionQuizFunc}>Extortion</button>
      <br></br><br></br>
      <button class="btn category" onClick = {this.fharmQuizFunc}>Financial Harm</button>
      <br></br><br></br><br></br>
      <button class="button"  onClick = {this._onCompleteClick}>Complete</button>
      </div>
    );
  }

  renderInvestigate() {
    return (
      <div>
        <p className="asse">Checklist</p>
        <ol>
          <li> Some Text........ </li>
          <li> Some Text........ </li>
          <li> Some Text........ </li>
          <li> Some Text........ </li>
        </ol>
      </div>
    );
  }

  renderVictim() {
    return (
      <div>
        <p className="asse">Hotlines</p>
        <ol>
          <li> Some Text........ </li>
          <li> Some Text........ </li>
          <li> Some Text........ </li>
          <li> Some Text........ </li>
        </ol>
      </div>
    );
  }

  // renderAssessment() {
  //   return (
  //   <div className="Assess">
  //     <p className="asse">
  //         <strong>Assessment</strong>
  //     </p>
  //     <button type="button" class="button" onClick={this._onPrepareClick}>Prepare</button>
  //     <br></br>
  //     <br></br>
  //     <br></br>
  //     <button type="button" onClick={this._onAssessClick} class="button">Start</button>
  //   </div>
  //   );
  // }

  renderNavHome() {
    return (
      <ul id="menu" class="menu">
        <li class="lis"><a class="active" onClick= {this._onCompleteClick}><strong>HOME</strong></a></li>
        <li class="lis"><a onClick= {this._onPrepareClick}>PREPARE</a></li>
        <li class="lis"><a onClick= {this._onAssessClick}>ASSESS</a></li>
        <li class="lis"><a onClick= {this._onInvestigateClick}>INVESTIGATE</a></li>
        <li class="lis"><a onClick= {this._onVictimClick}>VICTIM SERVICES</a></li>
      </ul>
    );
  }

  renderNavPrepare() {
    return (
      <ul id="menu" class="menu">
        <li class="lis"><a onClick= {this._onCompleteClick}><strong>HOME</strong></a></li>
        <li class="lis"><a class="active" onClick= {this._onPrepareClick}><strong>PREPARE</strong></a></li>
        <li class="lis"><a onClick= {this._onAssessClick}>ASSESS</a></li>
        <li class="lis"><a onClick= {this._onInvestigateClick}>INVESTIGATE</a></li>
        <li class="lis"><a onClick= {this._onVictimClick}>VICTIM SERVICES</a></li>
      </ul>
    );
  }

  renderNavAsses() {
    return (
      <ul id="menu" class="menu">
        <li class="lis"><a onClick= {this._onCompleteClick}>HOME</a></li>
        <li class="lis"><a onClick= {this._onPrepareClick}>PREPARE</a></li>
        <li class="lis"><a class="active" onClick= {this._onAssessClick}><strong>ASSESS</strong></a></li>
        <li class="lis"><a onClick= {this._onInvestigateClick}>INVESTIGATE</a></li>
        <li class="lis"><a onClick= {this._onVictimClick}>VICTIM SERVICES</a></li>
      </ul>
    );
  }

  renderNavInvestigate() {
    return (
      <ul id="menu" class="menu">
        <li class="lis"><a onClick= {this._onCompleteClick}>HOME</a></li>
        <li class="lis"><a onClick= {this._onPrepareClick}>PREPARE</a></li>
        <li class="lis"><a onClick= {this._onAssessClick}>ASSESS</a></li>
        <li class="lis"><a class="active" onClick= {this._onInvestigateClick}><strong>INVESTIGATE</strong></a></li>
        <li class="lis"><a onClick= {this._onVictimClick}>VICTIM SERVICES</a></li>
      </ul>
    );
  }

  renderNavVictim() {
    return (
      <ul id="menu" class="menu">
        <li class="lis"><a onClick= {this._onCompleteClick}>HOME</a></li>
        <li class="lis"><a onClick= {this._onPrepareClick}>PREPARE</a></li>
        <li class="lis"><a onClick= {this._onAssessClick}>ASSESS</a></li>
        <li class="lis"><a onClick= {this._onInvestigateClick}>INVESTIGATE</a></li>
        <li class="lis"><a class="active" onClick= {this._onVictimClick}><strong>VICTIM SERVICES</strong></a></li>
      </ul>
    );
  }

  render() {
    
    return (
      <div className="Assess">

        <div class="topRowContainer">
        <div class="topRow">
        <img src={logo} className="topDivHL" alt="logo" />
        <h3 class ="topDivH"> Mass.gov </h3>
        </div>

        <div class="topRow1">
        <label for="show-menu" class="show-menu">Show/Hide Menu</label>
        <input type="checkbox" id="show-menu" role="button" />
        {this.state.page == 2 ? this.renderNavPrepare() : this.state.page == 3 || this.state.page == 4 ?
          this.renderNavAsses() : this.state.page == 5 ? this.renderNavInvestigate() : this.state.page == 6 ?
          this.renderNavVictim() : this.renderNavHome()}
        </div>
        </div>

        {this.state.page == 1 ? this.renderHome() : this.state.page == 2 ? this.renderPrepare() : 
          this.state.page == 3 ? this.renderAssessmentSteps() : this.state.page == 4 ? (this.state.result ? 
          this.renderResult() : this.renderQuiz()) : this.state.page == 5 ?
          this.renderInvestigate() : this.state.page == 6 ? this.renderVictim() : this.renderHome()}
      </div>
    );
  }
}

export default App;
