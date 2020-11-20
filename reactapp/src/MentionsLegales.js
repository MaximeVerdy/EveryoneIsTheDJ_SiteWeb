import React, { } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {Button, Card,} from 'antd';
import {Link, useHistory} from 'react-router-dom';


import logo from './assets/logo.png'


export default function MentionsLegales(props) {
  let history = useHistory();
  return (
    <div>
        <div style={{backgroundColor: '#131313', 
                  display:'flex',flexDirection:'column', justifyContent:'center', alignItems: 'center',
                }}>

        <Row>
                  <img
                      alt="DJ"
                      src={logo}
                      style={{ 
                      marginTop:'100px', 
                      marginBottom:'5px', 
                      }}

                  />
        </Row>

        <Row>
        <div style={{display:'flex', justifyContent:'center', alignItems: 'center', margin: '20px'
                }}>

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
                  onClick={() => history.goBack()}
              >
                  <h4>RETOUR</h4>

            </Button>

        </div>
        </Row>

        <Row>
          <Card
                    
                style={{ 
                width: 600,

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

          <div style={{ 
            color: 'grey',
            padding: '30px',
            marginBottom: '20px',
            }}>

              <p>DÉCLARATION DE CONFIDENTIALITÉ</p>
             <p>ARTICLE 1 – RENSEIGNEMENTS PERSONNELS RECUEILLIS</p>
            <p>Lorsque vous venez sur notre application, nous recueillons les renseignements personnels que vous nous fournissez, tels que votre nom et votre adresse e-mail.</p>

            <p>Marketing par e-mail (le cas échéant): Avec votre permission, nous pourrions vous envoyer des e-mails au sujet de notre site, de nouveaux produits et d’autres mises à jour.</p>

            <p>ARTICLE 2 - CONSENTEMENT</p>

            <p>Comment obtenez-vous mon consentement ?</p>

            <p>Lorsque vous nous fournissez vos renseignements personnels, nous présumons que vous consentez à ce que nous recueillions vos renseignements et à ce que nous les utilisions à cette fin uniquement.</p>

            <p>Si nous vous demandons de nous fournir vos renseignements personnels pour une autre raison, à des fins de marketing par exemple, nous vous demanderons directement votre consentement explicite, ou nous vous donnerons la possibilité de refuser.</p>

            <p>Comment puis-je retirer mon consentement?</p>

            <p>Si après nous avoir donné votre consentement, vous changez d’avis et ne consentez plus à ce que nous puissions vous contacter, recueillir vos renseignements ou les divulguer, vous pouvez nous en aviser en nous contactant à verdy.dev@gmail.com ou par courrier à: Everyone Is The DJ 56 boulevard Pereire , Paris, J, 75017, France </p>

            <p>ARTICLE 3 – DIVULGATION</p>

            <p>Nous pouvons divulguer vos renseignements personnels si la loi nous oblige à le faire ou si vous violez nos Conditions Générales de Vente et d’Utilisation.</p>

            <p>ARTICLE 4 – APPLICATION</p>

            <p>Notre site est hébergée sur Heroku. Ils nous fournissent la plate-forme en ligne qui nous permet de vous fournir nos services et produits.</p>

            <p>Vos données sont stockées dans le système de stockage de données et les bases de données de MongoDB, et dans l’application. Vos données sont conservées sur un serveur sécurisé protégé par un pare-feu.</p>
            <p>Paiement:</p>

            <p>ARTICLE 5 – SERVICES FOURNIS PAR DES TIERS</p>

            <p>De manière générale, les fournisseurs tiers que nous utilisons vont uniquement recueillir, utiliser et divulguer vos renseignements dans la mesure du nécessaire pour pouvoir réaliser les services qu’ils nous fournissent.</p>

            <p>En ce qui concerne ces fournisseurs, nous vous recommandons de lire attentivement leurs politiques de confidentialité pour que vous puissiez comprendre la manière dont ils traiteront vos renseignements personnels.</p>

            <p>Il ne faut pas oublier que certains fournisseurs peuvent être situés ou avoir des installations situées dans une juridiction différente de la vôtre ou de la nôtre. Donc si vous décidez de poursuivre une transaction qui requiert les services d’un fournisseur tiers, vos renseignements pourraient alors être régis par les lois de la juridiction dans laquelle ce fournisseur se situe ou celles de la juridiction dans laquelle ses installations sont situées.</p>

            <p>Une fois que vous quittez le site de notre boutique ou que vous êtes redirigé vers le site web ou l’application d’un tiers, vous n’êtes plus régi par la présente Politique de Confidentialité ni par les Conditions Générales de Vente et d’Utilisation de notre site web.</p>

          
            <p>ARTICLE 6 – SÉCURITÉ</p>

            <p>Pour protéger vos données personnelles, nous prenons des précautions raisonnables et suivons les meilleures pratiques de l’industrie pour nous assurer qu’elles ne soient pas perdues, détournées, consultées, divulguées, modifiées ou détruites de manière inappropriée.</p>

            <p>ARTICLE 7 – ÂGE DE CONSENTEMENT</p>

            <p>En utilisant ce site, vous déclarez que vous avez au moins l’âge de la majorité dans votre État ou province de résidence, et que vous nous avez donné votre consentement pour permettre à toute personne d’âge mineur à votre charge d’utiliser ce site web.</p>

            <p>ARTICLE 8 – MODIFICATIONS APPORTÉES À LA PRÉSENTE POLITIQUE DE CONFIDENTIALITÉ</p>

            <p>Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment, donc veuillez s’il vous plait la consulter fréquemment. Les changements et les clarifications prendront effet immédiatement après leur publication sur le site web. Si nous apportons des changements au contenu de cette politique, nous vous aviserons ici qu’elle a été mise à jour, pour que vous sachiez quels renseignements nous recueillons, la manière dont nous les utilisons, et dans quelles circonstances nous les divulguons, s’il y a lieu de le faire.</p>

            <p>Si notre site fait l’objet d’une acquisition par ou d’une fusion avec une autre entreprise, vos renseignements pourraient être transférés aux nouveaux propriétaires pour que nous puissions continuer à vous vendre des produits.</p>

            <p>QUESTIONS ET COORDONNÉES</p>

            <p>Si vous souhaitez: accéder à, corriger, modifier ou supprimer toute information personnelle que nous avons à votre sujet, déposer une plainte, ou si vous souhaitez simplement avoir plus d’informations, contactez notre agent responsable des normes de confidentialité à erica.diasmatos99@gmail.com ou par courrier à Everyone Is The DJ
            </p>

            <p>[56 boulevard Pereire, 75017 Paris, France]</p>
            </div>

          </Card>

          </Row>

          <Row>
        <div style={{display:'flex', justifyContent:'center', alignItems: 'center', margin: '20px'
                }}>

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
                  onClick={() => history.goBack()}
              >
                  <h4>RETOUR</h4>

            </Button>

        </div>
        </Row>
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

