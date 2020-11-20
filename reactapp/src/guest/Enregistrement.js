import React, {useState, } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {Button, Card,  Form, Input, Checkbox, Badge } from 'antd';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import uuid from 'react-uuid';
import {RemoveScrollBar} from 'react-remove-scroll-bar';

import logo from '../assets/logo.png'


function Enregistrement(props) {

  const [pseudo, setPseudo] = useState('');
  const [eventPassword, setEventPassword] = useState('');
  const [eventId, setEventId] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  var handleEnregistrement =  async () => {

var rawResponse = await fetch('/enregistrement', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: `eventIdFromFront=${eventId}&eventPasswordFromFront=${eventPassword}&pseudoFromFront=${pseudo}`
})

var response = await rawResponse.json();


if (response.result === true) {

  var token = uuid();

  var hostId = response.eventExist.user


  // addId(hostId);
  // addToken(token);
  return <Redirect to='/Homeguest'/>

} else {
  setErrorMessage(true)

}
  }

  var logInDenied

  if (errorMessage === true) {
    logInDenied = <Badge status="error" badgeStyle={{ color: 'white', backgroundColor: '#FF0060' }} value="Nom et/ou Mot de Passe Incorrect(es)"></Badge>
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
              <Link to="/HomeGuest">
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
                  onClick={() => handleEnregistrement()}
              >
                  <h4>CONNEXION</h4>

            </Button>
            </Link>
        </div>

        <div
         style={{ 
          margin: '20px',
          }}
        >

            <p style={{ 
            color: 'grey',
            paddingTop: '20px', 
            }}>
              Pseudo :
            </p>

            <Input placeholder="Jean-Jean"
            style={{
                width: "100%",
                borderRadius: '8px'
            }}
            // onChange={(e) => setEmail(e.target.value)}
            />

            <p style={{ 
            color: 'grey',
            paddingTop: '20px', 
            }}>
              Id de la soirée :
            </p>

            <Input 
            placeholder="•••••••••"

            style={{
                width: "100%",
                borderRadius: '8px'
            }}
            // onChange={(e) => setPassword(e.target.value)}
            />

            <p style={{ 
            color: 'grey',
            paddingTop: '20px', 
            }}>
              Mot de passe :
            </p>

            <Input 
            placeholder="•••••••••"

            style={{
                width: "100%",
                borderRadius: '8px'
            }}
            // onChange={(e) => setPassword(e.target.value)}
            />

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
    addToken: function (token) { 
      dispatch( {type: 'addToken', token: token} )
    },
    addId: function (hostId) { 
      dispatch( {type: 'addId', hostId: hostId} )
    }
  }
}


export default connect (null, mapDispatchToProps)(Enregistrement);