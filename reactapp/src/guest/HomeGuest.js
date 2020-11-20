import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import {Button, Card,  Form, Input, Checkbox, Badge } from 'antd';
import { Container, Row, Col } from 'reactstrap'
import '../App.css';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import Countdown, { zeroPad } from 'react-countdown';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {RemoveScrollBar} from 'react-remove-scroll-bar';

import logo from '../assets/logo.png'


function HomeGuest(props) {

  const [TIMER, setTIMER] = useState(0)
  const [powerOff, setPowerOff] = useState(false)

  const [EventNameFromBack, setEventNameFromBack] = useState()

  const [SONGchosen, setSONGchosen] = useState('')
  const [playlist, setPlaylist] = useState([])

  const [validation, setValidation] = useState(false)

  const theWinnerIs = () => <Redirect to="/Winner" />;


  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {

      return <theWinnerIs />;
    } else {

      return <span style={{ backgroundColor: '#FF0060', borderColor: '#FF0060', borderRadius: 5, width: '10vh', height: '5vh', marginTop: '6vh' }}>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
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


    const findPLAYLIST = async () => {
      const rawDATA = await fetch('/playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `idUserFromFront=${props.hostId}`
      })
      var data = await rawDATA.json();

      var arrayPL = data.playlistDB
      setPlaylist(arrayPL)
    }

    findTIMER()
    findPLAYLIST()

  }, [])



  var handleRefresh = async () => {

    var rawResponse = await fetch('/afficheTimer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `idUserFromFront=${props.hostId}`
    })

    var timer = await rawResponse.json();

    setTIMER(timer.reboursMS)
  }

  var handlePowerOff = async () => {
    setPowerOff(true)

  }

  var handleChange = async (event) => {
    setSONGchosen(event.target.value)
  }

  var voteList = []
  for (let i = 0; i < playlist.length; i++) {
    voteList.push(<FormControlLabel key={i} label={playlist[i].titre} type='radio' onChange={handleChange} value={playlist[i].titre} control={<Radio/> } />)
  }

  var handleVoteGuest = async () => {
    const SONGdata = await fetch('/voteguest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `titreFromFront=${SONGchosen}&idUserFromFront=${props.hostId}&tokenFromFront=${props.token}`
    })
    var SONG = await SONGdata.json();
    setValidation(true)
  }

  if (validation) {
    return <Redirect to='/VoteOK' />
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
                color: 'white'
                }}
          >

              <div
                  style={{
                    color:'black',
                    margin:'20px',

                  }}
              >
                    <h4
                      style={{
                        color:'white',
                        }}>
                    Bienvenue dans la soirée
                    </h4>

              {TIMER > 0 && (
                <p className="Champs"
                style={{
                  color:'white',
                  }}>
                Vote en cours, résultat dans :</p>
              )}

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

                <FormControl component="fieldset">
                  <p className='Champs' component="legend"
                      style={{
                        color:'white',
                        }}>
                  Vote pour le titre de ton choix :</p>

                  <RadioGroup style={{color: '#FF0060'}} aria-label="vote" name="vote1"> 
                  {voteList}
                  </RadioGroup>

                </FormControl>

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
                  }}>
                  <h4>Découvre le gagnant</h4>
                  </Button>
                  </Link>
                )
                }

                {TIMER > 0 && (
                  <Button onClick={() => handleVoteGuest()} className="Button" type="primary" 
                  style={{ 
                    backgroundColor: '#584DAD', 
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop: '20px',
                    borderRadius: 10,
                    width: '250px',
                    height: '60px'
                  
                  }}>
                  <h4>Valider le vote</h4>
                  </Button>
                )
                }



              <div
                  style={{
                  marginTop:'20px',
                }}>

                  <Button onClick={() => handleRefresh()} className="Button" type="primary" 
                  style={{ 
                    backgroundColor: '#E59622', 
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop: '20px',
                    borderRadius: 10,
                    width: '250px',
                    height: '60px'
                    }}>
                    <h4>Raffraichissement</h4>
                    </Button>


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
    token: state.token
  }
}

export default connect(
  mapStateToProps,
  null
)(HomeGuest);