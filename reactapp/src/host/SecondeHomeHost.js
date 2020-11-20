import React, {useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {Button, Card,  Form, Input, Checkbox, Badge } from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {RemoveScrollBar} from 'react-remove-scroll-bar';

import logo from '../assets/logo.png'


function SecondeHomeHost(props) {

    //COUNTDOWN 
  const [TIMER, setTIMER] = useState(0)

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
                    Aucune soirée en cours actuellement
                    </h4>



              <div
                  style={{
                  marginTop:'20px',
                }}>
              <h5
                  style={{
                    color:'white',
                  }}>
              Ajoute une soirée pour lancer un vote</h5>

              <br></br>

                  <Link to="/EventCreation">
                          <Button
                                style={{
                                  color:'white',
                                  backgroundColor: '#FF0060',
                                  justifyContent:'center',
                                  alignItems:'center',
                                  marginTop: '20px',
                                  borderRadius: 10,
                                  width: '250px',
                                  height: '60px'
                                }}
                                >
                                <h4>Nouvelle soirée</h4>
                          </Button>
                    </Link>


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
  return { hostId: state.hostId }
}

export default connect(
  mapStateToProps,
  null
)(SecondeHomeHost);