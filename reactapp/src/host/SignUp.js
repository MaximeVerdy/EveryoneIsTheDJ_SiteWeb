import React, {useState, } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {Button, Card,  Form, Input, Checkbox, Badge } from 'antd';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {RemoveScrollBar} from 'react-remove-scroll-bar';

import logo from '../assets/logo.png'


function SignUp(props) {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [signUp, setSignUp] = useState(false);
  const [confirmationPassword, setConfirmationPassword] = useState('')

  var handleSignUp = async() => {
        
        
            var rawResponse = await fetch('/sign-up', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `username=${username}&email=${email}&password=${password}`
            })
    
            var response = await rawResponse.json();

      
            if (response.result === false){
                setSignUp(true)
            } else {
    
                    var hostId = response.hote._id
                    // await AsyncStorage.setItem("hostId", JSON.stringify(hostId));
                    props.addId(hostId)
                    return <Redirect to='SecondeHomeHost' />
                   
            }
            
        };
    
        var passwordError;
        if (password != confirmationPassword) {
            passwordError = <Badge status="error" badgeStyle={{color: 'white', backgroundColor:'#FF0060'}} value="Le mot de passe n'est pas identique"></Badge>
        }
    
        var emailMessage;
    
    
        if(signUp === true){
    
            emailMessage = <Badge status="error" badgeStyle={{color: 'white', backgroundColor:'#FF0060'}} value="Cet email a déja été utilisé"></Badge>
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
              <Link to="/SecondeHomeHost">
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
                  onClick={() => handleSignUp()}
              >
                  <h4>INSCRIPTION</h4>

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
          }}>
              Username :
          </p>

          <Input placeholder="Antoine"
          style={{
              width: "100%",
              borderRadius: '8px'
          }}
          onChange={(e) => setUsername(e.target.value)}
          />

            <p style={{ 
            color: 'grey',
            paddingTop: '20px', 
            }}>
              Email :
            </p>

            <Input placeholder="antoine.grey@email.com"
            style={{
                width: "100%",
                borderRadius: '8px'
            }}
            onChange={(e) => setEmail(e.target.value)}
            />

            <p style={{ 
            color: 'grey',
            paddingTop: '20px', 
            }}>
              Mot de passe :
            </p>

            <Input 
            placeholder="•••••••••"
            type='password'
            style={{
                width: "100%",
                borderRadius: '8px'
            }}
            onChange={(e) => setPassword(e.target.value)}
            />

            <p style={{ 
            color: 'grey',
            paddingTop: '20px', 
            }}>
              Confirmation de mot de passe :
            </p>

            <Input 
            placeholder="•••••••••"
            type='password'
            style={{
                width: "100%",
                borderRadius: '8px'
            }}
            onChange={(e) => setConfirmationPassword(e.target.value)}
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
    addId: function (hostId) { 
      dispatch( {type: 'addId', hostId: hostId} )
    }
  }
}

export default connect (null, mapDispatchToProps)(SignUp);