import React, {useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {Button, Card,  Form, Input, Checkbox, Badge } from 'antd';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {RemoveScrollBar} from 'react-remove-scroll-bar';

import logo from '../assets/logo.png'


function EventCreation(props) {

  const [errorMessage, setErrorMessage] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventPassword, setEventPassword] = useState('');
  const [eventID, setEventID] = useState('')

  var handleEventCreation = async () => {

        var rawResponse = await fetch('/eventcreation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: `eventNameFromFront=${eventName}&eventPasswordFromFront=${eventPassword}&idUserFromFront=${props.hostId}`
        })

        var response = await rawResponse.json();
        

        if (response.result === true) {

              var ID = response.saveEvent.eventId
              
            //   props.onSettingEventName(eventName), 
            //   props.onSettingPassword(eventPassword),
             
              return <Redirect to='SongListCreation' />

        } else {
              setErrorMessage(true)
        }
  }

  var nameForget;
  if (eventName === "" || eventPassword === "") {
        // setErrorMessage(true)
        nameForget = <p> value="Les deux champs sont obligatoires :) "</p>
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
                    color:'white',
                  //   margin:'20px',

                  }}
              >
                    <h4
                        style={{
                              color:'white',
                              }}>
                    Crée une soirée
                    </h4>



              <div
                  style={{
                  marginTop:'0px',
                }}>

              <br></br>




              </div>   

              <div
         style={{ 
          margin: '0px',
          }}
        >

            <p style={{ 
            color: 'grey',
            paddingTop: '20px', 
            }}>
              Nom de la soirée :
            </p>

            <Input placeholder="Anniversaire de Kévin"
            style={{
                width: "100%",
                borderRadius: '8px'
            }}
            onChange={(e) => setEventName(e.target.value)}
            />

            <p style={{ 
            color: 'grey',
            paddingTop: '20px', 
            }}>
              Mot de passe de l'évènement :
            </p>

            <Input 
            placeholder="kekev"
            
            style={{
                width: "100%",
                borderRadius: '8px'
            }}
            onChange={(e) => setEventPassword(e.target.value)}
            />

             </div>

            <br>
            </br>
            <br>
            </br>

            <Link to="/SongListCreation">
              <Button 
                    title="Hôte"
                    style={{
                    display:'flex',
                    backgroundColor: '#584DAD',
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop: '20px',
                    borderRadius: 10,
                    width: '250px',
                    height: '60px'
                  }}
                  onClick={() => handleEventCreation()}
              >
                  <h4>CREATION</h4>

            </Button>
            </Link>
            
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

    </div>
  );
}

function mapDispatchToProps(dispatch) {
      return {
      onSettingEventName: function (eventName) {
            dispatch({ type: 'setting', eventName: eventName })
      },
      onSettingPassword: function (pass) {
            dispatch({ type: "set", eventsPass: pass})
      },
      onSettingIdEvent: function (id) {
            dispatch({ type: 'setID', eventsID: id})
      }
      }
}


function mapStateToProps(state) {
      return { hostId: state.hostId }
}

export default connect(
      mapStateToProps,
      mapDispatchToProps
)(EventCreation);