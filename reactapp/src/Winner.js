import React, {useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import { faIcons, faTrophy, faPowerOff} from '@fortawesome/free-solid-svg-icons'
import {Button, Card,  Form, Input, Checkbox, Badge } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {RemoveScrollBar} from 'react-remove-scroll-bar';

import logo from './assets/logo.png'


function Winner(props) {

    const [CLASSEMENTb, setCLASSEMENTb] = useState ([{titre: ""}]);
    const [powerOff, setPowerOff] = useState (false);
    // const [supportedURL, setSupportedURL] =useState();
  
    useEffect(() => {
    
      const findCLASSEMENT = async () => {
    
      const TRIdata = await fetch('/winner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `idUserFromFront=${props.hostId}`
      })
      var classement = await TRIdata.json();
    
      setCLASSEMENTb(classement.tri)
    
      }
    
      findCLASSEMENT()
    
    }, [])
  
  
    var handlePowerOff = async() => {
      setPowerOff(true)
      }
      
      if (powerOff) {
        return <Redirect to='/'></Redirect>
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
                    Et le gagnant est ...
                    </h4>


                    <div
                    style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '205px',
                    marginTop:'40px', 
                    marginBottom:'40px', 

                    }}
                    >
                    <FontAwesomeIcon icon={faTrophy} style={{ height: 100, width: 100, color: "#E59522" }} />
                    </div>

              <div
                  style={{
                  marginTop:'20px',
                  textAlign: 'center', 
                  alignItems: 'center'
                }}>
              <h4
               style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '55px',

                   }}
              >{CLASSEMENTb[0].titre}
                            <br></br>
              <a  target="_blank" href={`https://www.youtube.com/results?search_query=${CLASSEMENTb[0].titre}`}> 
              <p style={{
                marginLeft: '60px',
                color: "#FF0060"
              }}>Lancer le titre sur Youtube</p>
              </a>
              
              </h4>

              <br></br>



              <Link to="/HomeHost">
              <Button 
                    style={{
                    display:'flex',
                    backgroundColor: '#584DAD',
                    marginLeft: '130px',
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop: '20px',
                    borderRadius: 10,
                    width: '250px',
                    height: '60px'

                  }}
              >
                  <h4>Retour à l'accueil</h4>

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
    return {
      hostId: state.hostId,
    }
  }
  
  export default connect(
    mapStateToProps,
    null
  )(Winner);