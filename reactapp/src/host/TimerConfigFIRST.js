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


function TimerConfigFIRST(props) {

  var handleInitTimer5 = async () => {

    //APPEL AU BACKEND//
    var rawResponse = await fetch('/initTimer5', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `idUserFromFront=${props.hostId}`
    })

    var response = await rawResponse.json();

    return <Redirect to='ShareEvent' />
  }

  var handleInitTimer10 = async () => {

    //APPEL AU BACKEND//
    var rawResponse = await fetch('/initTimer10', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `idUserFromFront=${props.hostId}`
    })

    var response = await rawResponse.json();

    return <Redirect to='ShareEvent' />
  }

  var handleInitTimer20 = async () => {

    //APPEL AU BACKEND//
    var rawResponse = await fetch('/initTimer20', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `idUserFromFront=${props.hostId}`
    })

    var response = await rawResponse.json();

    return <Redirect to='ShareEvent' />
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

                  }}
              >
                    <h4
                      style={{
                        color:'white',
                        }}>
                    Règle le timer
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

            <Link to="/ShareEvent">
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
                  onClick={() => handleInitTimer5()}
              >
                  <h4>5 minutes</h4>

            </Button>
            </Link>

            <Link to="/ShareEvent">
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
                  onClick={() => handleInitTimer10()}
              >
                  <h4>10 minutes</h4>

            </Button>
            </Link>

            <Link to="/ShareEvent">
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
                  onClick={() => handleInitTimer20()}
              >
                  <h4>20 minutes</h4>

            </Button>
            </Link>

             </div>

            <br>
            </br>
            <br>
            </br>
            
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
    nameToDisplay: state.EventName, hostId: state.hostId
  }
}

export default connect(
  mapStateToProps,
  null
)(TimerConfigFIRST);