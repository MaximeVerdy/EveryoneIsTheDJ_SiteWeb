import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Button, Input, Card } from 'antd';
import { Container, Row, Col } from 'reactstrap'
import '../App.css';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff} from '@fortawesome/free-solid-svg-icons'
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';
import { connect } from 'react-redux';
import {RemoveScrollBar} from 'react-remove-scroll-bar';

import logo from '../assets/logo.png'

function VoteOK(props) {


  const [TIMER, setTIMER] = useState(0)
  const [powerOff, setPowerOff] = useState (false)
  const [EventNameFromBack, setEventNameFromBack] = useState()
  const [SONGchosen, setSONGchosen] =  useState('')
  const [playlist, setPlaylist] = useState([])

  const theWinnerIs = () => <Redirect to="/Winner" />;


  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {

      return <theWinnerIs />;
    } else {

      return <span style={{ backgroundColor: '#FF0060', borderColor: '#FF0060', borderRadius: 5, width: '10vh', height: '5vh', marginTop: '3vh' }}>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
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
        setTIMER(timer.reboursMS)
      }

      findTIMER()
  
  
    }, [])
  


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
                width: 300,
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
                    color:'black',

                  }}
              >

                    {TIMER > 0 && (
                            <h4
                            style={{
                              color:'white',
                            }}>
                            Vote en cours, résultat dans :
                            </h4>
                    )}


              <div
                  style={{
                  marginTop:'20px',
                }}>


              <br></br>

              {TIMER > 0 && (
                <Countdown
                  date={Date.now() + TIMER}
                  renderer={renderer}
                >
                </Countdown>
              )
              }

            {TIMER <= 0 && (
              <p className="Title"
              style={{
                color:'white',
              }}>
              VOTE TERMINÉ</p>
              )
              }   

              {TIMER > 0 && (
              <p className="Title"
              style={{
                color:'white',
              }}>
              VOTE EN COURS</p>
              )
              }   

              {TIMER > 0 && (
              <p className="Champs"
              style={{
                color:'white',
              }}>
              Ton vote a bien été pris en compte !</p>
              )
              }   

              {TIMER <= 0 && (
                <Link to="/Winner">
                  <Button className="Button" type="primary" 
                  style={{ 
                    backgroundColor: '#584DAD', 
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop: '20px',
                    borderRadius: 10,
                    width: '250px',
                    height: '60px'
                    }}
                    >
                    <h4>Découvre le gagnant</h4>
                    </Button>
                </Link>
              )
            }

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
    }
  }
  
  export default connect(
    mapStateToProps,
    null
  )(VoteOK);