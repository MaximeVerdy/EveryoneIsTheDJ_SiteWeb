import React, {useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {Button, Card,  Form, Input, Checkbox, Badge } from 'antd';
import {Link, Redirect} from 'react-router-dom';
import Countdown, { zeroPad} from 'react-countdown';
import {connect} from 'react-redux';
import {RemoveScrollBar} from 'react-remove-scroll-bar';

import logo from '../assets/logo.png'

function HomeHost(props) {

  //COUNTDOWN 
  const [TIMER, setTIMER] = useState(0)

  //EVENT OUVERT
  const [eventOuvert, setEventOuvert] = useState("")
  const [dateOuvert, setDateOuvert] = useState("")
  const [ouvert, setOuvert] = useState ("")


  //EVENT CLOTURE
  const [eventCloture, setEventCloture] = useState("")
  const [dateCloture, setDateCloture] = useState("")
  const [cloture, setCloture] = useState ("")

  const theWinnerIs = () => <Redirect to="Winner" />;

  const [songlist, setSonglist] = useState (false)
  const [powerOff, setPowerOff] = useState (false)

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {

      return <theWinnerIs />;
    } else {

      return (
        <div style={{justifyContent:"center", alignItems:'center', marginTop: '5px'}}>
        <p style={{}}>Temps restant avant de découvrir le vainqueur:</p>
        <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
        </div>
      )
    }
  };

  useEffect(() => {

    const findTIMER = async () => {

      var TIMERdata = await fetch('/afficheTimer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `idUserFromFront=${props.hostId}`
      })


      var timer = await TIMERdata.json();
      setTIMER(timer.reboursFinal)

    }

    const findEvent = async () => {

      var rawResponse = await fetch('/findEvent', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `idUserFromFront=${props.hostId}`
    })

      var response = await rawResponse.json();

      if (response.eventIsOpen)
      {
        setOuvert("Ouvert")
        setEventOuvert(response.eventIsOpen.nameEvent)
        setDateOuvert(response.eventIsOpen.date)
      }

      if (response.eventIsClosed)
      {
        setCloture("Clôturée")
        setEventCloture(response.eventIsClosed.nameEvent)
        setDateCloture(response.eventIsClosed.date)
      }

  }

    findTIMER()
    findEvent()


  }, []);

  var handleNewVote  = async() => {

    var rawResponse = await fetch('/tourdevotecreation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `idUserFromFront=${props.hostId}`
    })
  
    var response = await rawResponse.json()
  
    if (response.result){
      setSonglist(true)

      return <Redirect to='EventCreation' />
    }
  }


  return (

    <div>
      <RemoveScrollBar />

        <div style={{backgroundColor: '#131313',   height: '100vh',
                  display:'flex',flexDirection:'column', alignItems: 'center',
                }}>

        <Row>
                  <img
                      alt="DJ"
                      src={logo}
                      style={{ 
                        marginTop:'50px', 
                        }}
                  />
        </Row>

        <Row>
          <Card
                    
                style={{ 
                width: 600,
                height: 520,
                marginTop:'40px', 
                marginRight: '10px',
                display:'flex',
                alignItems: 'flex-start',
                border: 'solid',
                borderWidth: '1px',
                borderRadius: '10px',
                backgroundColor: '#131313',
                borderColor: '#282828',
                }}
          >

              <div
                  style={{
                    color:'white',
                    margin:'20px',
                  }}
              >
                    <h4
                      style={{
                        color:'white',
                        }}>
                      SOIREE EN COURS 
                      {props.nameToDisplay}
                    </h4>

                  <br></br>

                    {TIMER <= 0 && (
                        <div>

                  <Link to="/EventCreation">
                        <Button
                          style={{
                            display:'flex',
                            backgroundColor: '#FF0060',
                            justifyContent:'center',
                            alignItems:'center',
                            marginTop: '20px',
                            borderRadius: 10,
                            width: '250px',
                            height: '60px',
                            color: 'white'
                          }}
                          onClick={()=> handleNewVote()}
                          >
                          
                          <h4>Nouveau vote</h4>
                        </Button>
                      </Link>

                        </div>
                    )}
                    <br></br>
                      {TIMER <= 0 && (
                        <Link to="/Winner">
                                <Button
                                    style={{
                                      display:'flex',
                                      backgroundColor: '#FF0060',
                                      justifyContent:'center',
                                      alignItems:'center',
                                      marginTop: '20px',
                                      borderRadius: 10,
                                      width: '250px',
                                      height: '60px',
                                    }}
                                      >
                                      
                                      <h4>Découvrir le gagnant</h4>
                                </Button>
                          </Link>
                    )}

                    {TIMER > 0 && (
                      <div>
                      <p>Ton vote a bien été pris en compte !</p>
                      <p>Vote en cours, résultat dans : </p>

                      <Countdown
                        date={Date.now() + TIMER}
                        renderer={renderer}
                      >
                      </Countdown>

                      </div>
                    )}   




              <div
                  style={{
                  marginTop:'30px',
                }}>
                  <br></br>
              <h4
                style={{
                  color:'white',
                  }}>
              Mes soirées :
              </h4>

              <p>Soirée: {eventOuvert}. Date: {dateOuvert}. Statut: {ouvert}</p>
             <p>Soirée : Fièvre du samedi soir. Date : 06 / 11 / 2020. Statut : Fermé.</p>


             {TIMER > 0 && (
                  <Link to="/ShareEvent"> 
                          <Button
                                style={{
                                  color:'white',
                                  backgroundColor: '#FF0060',
                                  justifyContent:'center',
                                  alignItems:'center',
                                  marginTop: '20px',
                                  borderRadius: 10,
                                  width: '250px',
                                  height: '60px',
                                }}
                                >
                                
                                <h4>Partage du lien de la soirée</h4>
                          </Button>
                    </Link>
               )}


              <br></br>
              <br></br>



              </div>   
            
            </div>

          </Card>

          </Row>
      </div>
      <div 
            style={{ 
              display:'flex',
              justifyContent:'center',
              position: 'absolute',          
              bottom: 0,
              right: 0

            }}
          >
            <Link to="/MentionsLegales">
            <p style={{ 
                color: 'grey',
                padding: '30px',
                marginBottom: '20px',
                }}>
                  Mentions légales
            </p>
            </Link>
      </div>

      <div 
            style={{ 
              display:'flex',
              justifyContent:'center',
              position: 'absolute',          
              top: 0,
              right: 0

            }}
          >
            <Link to="/">
            <p style={{ 
                color: 'grey',
                padding: '30px',
                marginBottom: '20px',
                }}>
                  Déconnexion
            </p>
            </Link>
      </div>

    </div>
  );
}

function mapStateToProps(state) {
  return {
    hostId: state.hostId,
    nameToDisplay: state.EventName,
  }
}

export default connect(
  mapStateToProps,
  null
)(HomeHost);