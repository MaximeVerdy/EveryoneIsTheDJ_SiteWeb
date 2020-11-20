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


function SongListCreation(props) {

  const [titreProposeHote, setTitreProposeHote] = useState();
  const [TOPlist, setTOPlist] = useState([]);
  const [errorArtist, setErrorArtist] = useState();

  const [error, setError] = useState()

  var listHote;


  useEffect(() => {
    const findTOP = async () => {
      const TOPdata = await fetch('/findTOP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `userIdFromFront=${props.hostId}`
      })
      var TOP = await TOPdata.json();
      
     
      setTOPlist(TOP.randomTitles)
    }
    setError()
    setTitreProposeHote();
    findTOP()

  },[])


  var handleAjouterTitre = async () => {

    if (titreProposeHote === undefined) {
      setErrorArtist(<Badge >Le champ est vide</Badge>)
      
    } else {
      
       setErrorArtist()
       setTOPlist([...TOPlist, titreProposeHote])
       setTitreProposeHote();
    }

    var rawResponse = await fetch('/ajoutertitre', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `titreFromFront=${titreProposeHote}&userIdFromFront=${props.hostId}`
    })

    var response = await rawResponse.json();
    setError()
    
  }

  var handleSupprimerTitre = async (element) => {

    setTOPlist(TOPlist.filter((e)=>(e !== element)))



    var rawResponse = await fetch('/supprimertitre', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `titreFromFront=${element}&idUserFromFront=${props.hostId}`
    })

    var response = await rawResponse.json();
    setError()

  }



  var handleValidationList = async () => {

    if (TOPlist.length > 2) {
      setError()
      props.onSettingPlaylist(TOPlist)
      return <Redirect to='TimerConfigFIRST' />
    }

    else {
      setError(<Badge status="error" badgeStyle={{color:'#fff', backgroundColor:'#FF0060'}} value='Merci de choisir au moins 3 titres'></Badge>)
    }
  }


  var listDUR = 
  ["Stardust - Music Sounds Better With You",
  "Basement Jaxx - Red Alert",
  "Bjork - Violently Happy",
  "Metronomy - A thing for me",
  "Moloko - sing it back"]

  var listHote = listDUR.map((titre, i) => {
                  // TOPlist.map((titre, i) => {
    return (
      <div key={i}>
        <row>
        <FontAwesomeIcon 
          onClick={()=> handleSupprimerTitre(titre)} 
          icon={faTrash} 
          size={20} 
          style={{color: "#fff", marginLeft: '2%'}}
        />
        <span>  </span>
        {titre}
        </row>
      </div>
    )
  }
)


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
                    <h4>
                    {props.nameToDisplay}
                    </h4>



              <div
                  style={{
                  marginTop:'20px',
                }}>
              <h4
                style={{
                  color:'white',
                  }}>
              Compose ta liste de titres candidats au vote </h4>
              <h6
                style={{
                  color:'GREY',
                  }}>
              3 titres minimum</h6>

              <br></br>

                  <p style={{ 
                color: 'WHITE',
                paddingTop: '0px', 
                }}>
                  Titres suggérés :</p>

                    {listHote}

                    <p style={{ 
            color: 'white',
            paddingTop: '20px', 
            }}>
              Titre personnel que tu peux ajouter :
            </p>

            <row
              style={{
                display:'flex'
              }}
>
            <Button
              style={{
                borderRadius: '8px'

              }}
              onClick={() => handleAjouterTitre()}
            >
              +
            </Button>

            <Input placeholder="Shakira - Waka Waka"
            style={{
                width: "100%",
                borderRadius: '8px'
            }}
            onChange={(e) => setTitreProposeHote(e.target.value)}
            />

            </row>
            {errorArtist}
              </div>   
            
              <Link to="/TimerConfigFIRST">
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
                  onClick={() => handleValidationList()}
              >
                  <h4>VALIDATION</h4>

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
    nameToDisplay: state.EventName, hostId: state.hostId,
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSettingPlaylist: function(playlist) {
      dispatch({type: 'setPlaylist', reduxPlaylist: playlist})
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongListCreation);