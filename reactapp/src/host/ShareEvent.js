import React, {useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import { faBars, faServer, faRedo, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {Button, Card,  Form, Input, Checkbox, Badge } from 'antd';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {RemoveScrollBar} from 'react-remove-scroll-bar';

import logo from '../assets/logo.png'


function ShareEvent(props) {

  const [copiedText, setCopiedText] = useState('')
  const [TIMER, setTIMER] = useState(0)

  // utilisation de clipboard pour copier un bloc de text 
    
  
 useEffect(() => {

   const findTIMER = async () => {

     var TIMERdata = await fetch('/afficheTimer', {
       method: 'POST',
       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
       body: `idUserFromFront=${props.hostId}`
     })


     var timer = await TIMERdata.json();
     setTIMER(timer.reboursFinal)
     console.log("rebours", timer)
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
                  }}
              >

              <div
                  style={{
                  marginTop:'20px',
                }}>
              <h4
                style={{
                  color:'white',
                  }}>
                    Informations sur la soirée à partager </h4>

              <br></br>

              <div
                  style={{
                    width: '550px',
                    backgroundColor:'grey',
                    borderRadius: '8px',
                    padding: '20px', 
                    color: 'black',
                  }}>
                  <p>Ce soir, sur le site Everyone is the DJ...</p>
                  <p>Vote pour tes chansons préférées</p> 
                  <p>ID de l'évènement : </p>
                  <p> 4518 </p>
                  <p>Mot de passe de l'évènement : </p>
                  <p> {props.passToDisplay}4322</p>
              </div>


            <row
              style={{
                display:'flex'
              }}
>

            </row>

              </div>   
          

              <Link to="/HomeHost">
              <Button 
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
                  <h4>Retour à l'accueil</h4>

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
    nameToDisplay: state.EventName,
    passToDisplay: state.EventPass,
    idToDisplay: state.EventID,
  }
}




export default connect(
  mapStateToProps,
  null
)(ShareEvent);