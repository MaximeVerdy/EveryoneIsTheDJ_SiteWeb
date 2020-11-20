import React, {useState, } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {Button, Card,  Form, Input, Checkbox, Badge } from 'antd';
import {Link} from 'react-router-dom';
import {RemoveScrollBar} from 'react-remove-scroll-bar';


import logo from '../assets/logo.png'


export default function DJhoteFirstScreen() {
  

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
                height: 185,
                marginTop:'40px', 
                marginRight: '10px',
                display:'flex',
                justifyContent:'center',
                alignItems: 'flex-start',
                border: 'solid',
                borderWidth: '1px',
                borderRadius: '10px',
                backgroundColor: '#131313',
                borderColor: '#282828',
                
                }}
          >


          <div style={{display:'flex', justifyContent:'center', alignItems: 'center', margin: '20px'
                }}>
              <Link to="/SignUp">
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
                  <h4>INSCRIPTION</h4>

            </Button>
            </Link>
        </div>

      </Card>


      <Card
                    
                    style={{ 
                    width: 300,
                    height: 185,
                    marginTop:'40px', 
                    marginRight: '10px',
                    display:'flex',
                    justifyContent:'center',
                    alignItems: 'flex-start',
                    border: 'solid',
                    borderWidth: '1px',
                    borderRadius: '10px',
                    backgroundColor: '#131313',
                    borderColor: '#282828',
                    }}
              >
    
    
              <div style={{display:'flex', justifyContent:'center', alignItems: 'center', margin: '20px'
                    }}>
                  <Link to="/SignIn">
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
                  >
                      <h4>RECONNEXION</h4>
    
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

