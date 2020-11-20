import React, { } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {Button, Card,} from 'antd';
import {Link} from 'react-router-dom';
import {RemoveScrollBar} from 'react-remove-scroll-bar';


import logo from './assets/logo.png'


export default function Onboarding() {
  
  return (
    <div 

    >
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
                height: 430,
                // margin:'20px', 
                marginTop:'40px', 
                marginRight: '10px',
                // padding : '20px',
                display:'flex',
                justifyContent:'center',
                alignItems: 'flex-start',
                // flexDirection: 'column',
                border: 'solid',
                borderWidth: '1px',
                borderRadius: '10px',
                backgroundColor: '#131313',
                borderColor: '#282828',
                
                }}
          >


          <div style={{display:'flex', justifyContent:'center', alignItems: 'center', margin: '20px'
                }}>
              <Link to="/DJhoteFirstScreen">
              <Button 
                    title="Hôte"
                    style={{
                    display:'flex',
                    backgroundColor: '#E59622',
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop: '20px',
                    borderRadius: 10,
                    width: '250px',
                    height: '60px'
                  }}
              >
                  <h4>DJ HOTE</h4>

            </Button>
            </Link>
        </div>

          <h5 style={{ 
            color: 'grey',
            textAlign: 'justify', 
            padding: '30px',
            marginBottom: '20px',
            }}>
              Organise des soirées, des tours de votes pour la chanson prochaine à écouter en te basant sur les suggestions ou en entrant tes propositions et fais vibrer tes invités avec des musiques aimées de tous.</h5>

          </Card>


          <Card
                    
                    style={{ 
                    width: 300,
                    height: 430,
                    marginTop:'40px', 
                    marginRight: '10px',
                    // padding : '20px',
                    display:'flex',
                    justifyContent:'center',
                    alignItems: 'flex-start',
                    // flexDirection: 'column',
                    border: 'solid',
                    borderWidth: '1px',
                    borderRadius: '10px',
                    borderColor: '#282828',
                    backgroundColor: '#131313'
                    
                    }}
              >
    
    
              <div style={{display:'flex', justifyContent:'center', alignItems: 'center', margin: '20px'
                    }}>
                  <Link to="/Enregistrement">
                  <Button 
                        title="invité"
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
                  >
                      <h4>DJ INVITE</h4>
                </Button>
                </Link>
            </div>
    
              <h5 style={{ 
                color: 'grey',
                textAlign: 'justify', 
                padding: '30px',
                marginBottom: '20px',
                }}>
                  Rejoins une soirée, vote pour le titre que tu veux entendre et fais des suggestions de chanson. Entre en démocratie musicale et fais ententre ta voix.</h5>
    
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

