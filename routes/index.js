var express = require('express');
var router = express.Router();
var mongoose = require('../bdd/connexion');
var SHA256 = require('crypto-js/sha256')
var encBase64 = require('crypto-js/enc-base64')
var HoteModel = require('../bdd/SchemaHote');
var eventModel = require('../bdd/SchemaEvent')
var tourdevoteModel = require('../bdd/SchemaTourdevote')
var topModel = require('../bdd/SchemaTop');
var playlistModel = require('../bdd/SchemaPlaylistTitresProposes');
var server = require('../bin/www')


// -------------------- route initiale --------------------------------------------------------
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });
});



router.post('/findEvent', async function(req,res,next){

  var eventIsOpen= await eventModel.findOne({ user: req.body.idUserFromFront, isOpen: true })

  var eventIsClosed= await eventModel.findOne ({ user: req.body.idUserFromFront, isOpen: false })

if (eventIsOpen && eventIsClosed) {
  res.json({eventIsOpen, eventIsClosed})
}

else if (eventIsOpen) {
  res.json({eventIsOpen})
} 

else {
  res.json({result: false})
} 

})


// -------------------------------------- route appelant le TOP -------------------------------------
router.post('/findTOP', async function(req,res,next){

  var TOP = await topModel.find();

  var randomNumber = Math.floor(Math.random() * 117);
  var title1 = TOP[randomNumber].chanson
  var title2 = TOP[randomNumber + 1].chanson
  var title3 = TOP[randomNumber + 2].chanson
  var title4 = TOP[randomNumber + 3].chanson
  var title5 = TOP[randomNumber + 4].chanson

  var randomTitles = [title1, title2, title3, title4, title5]

  // ---------------------- 5 titres suggérés en BDD playlist sans passer par le front ---------------
  var title1FORMATTING = new playlistModel ({
    user: req.body.userIdFromFront,
    titre: title1,
    votes: [],
  })
  var title1SAVED = await title1FORMATTING.save();

  var title2FORMATTING = new playlistModel ({
    user: req.body.userIdFromFront,
    titre: title2,
    votes: [],
  })
  var title2SAVED = await title2FORMATTING.save();

  var title3FORMATTING = new playlistModel ({
    user: req.body.userIdFromFront,
    titre: title3,
    votes: [],
  })
  var title3SAVED = await title3FORMATTING.save();

  var title4FORMATTING = new playlistModel ({
    user: req.body.userIdFromFront,
    titre: title4,
    votes: [],
  })
  var title4SAVED = await title4FORMATTING.save();

  var title5FORMATTING = new playlistModel ({
    user: req.body.userIdFromFront,
    titre: title5,
    votes: [],
  })
  var title5SAVED = await title5FORMATTING.save();

  console.log(randomTitles)
  
  res.json({randomTitles})

 
})

// ---------------------- route d'acces à la playlist d'un évènement -------------------------------
router.post('/playlist', async function(req,res,next){

  var playlistDB = await playlistModel.find({user: req.body.idUserFromFront});

  res.json({playlistDB})

  console.log('playlist logguée ici ->', playlistDB)
})



router.post('/sign-up', async function (req, res, next) {

  console.log(req.body.email)

  var hotes = await HoteModel.findOne({ email: req.body.email });
  console.log(hotes)



  if (hotes === null) {

    var newHote = new HoteModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    var hoteSaved = await newHote.save();
    res.json({ result: true, hote: hoteSaved })

  }else{
    console.log('no')
    res.json({ result: false })

  }
 
})


router.post('/sign-in', async function (req, res, next) {
  var hotes = await HoteModel.findOne({ email: req.body.email, password: req.body.password });

  var isEvent = await eventModel.findOne({user: hotes._id})


  if (hotes === null) {
    console.log('no')
    res.json({ result: false})
  }
  else if (isEvent) {
    console.log('yes Seconde Home Host')
    res.json({ result: true, hote: hotes, isEvent })
  }
  else {
    console.log('yes Home Host')

    res.json({result: true, hote: hotes})
  }


})


router.post('/enregistrement', async function (req, res, next) {

  var error = []
  var result = false
  var eventExist = null


  if (req.body.pseudoFromFront == ''
    || req.body.eventIdFromFront == ''
    || req.body.eventPasswordFromFront == '') {
    error.push('champs vides')
  }

  console.log("1", req.body)

  if (error.length == 0) {
    var eventExist = await eventModel.findOne({
      eventId: req.body.eventIdFromFront,
      isOpen: true
    })

    console.log("2", eventExist)

    if (eventExist) {

      if (req.body.eventPasswordFromFront == eventExist.password) {
        result = true

      } else {
        result = false
        error.push('ID / mot de passe incorrect')
      }

    }

  }

  res.json({ result, eventExist, error })
})

//---------------------Création d'évent--------------------------

router.post('/eventcreation', async function (req, res, next) {

  var error = []
  var result = false
  var saveEvent = null


  if (req.body.eventNameFromFront == ''
    || req.body.eventPasswordFromFront == '') {
    error.push('champs vides')
  }

  if (req.body.eventPasswordFromFront.length < 3) {
    error.push('mot de passe trop court')
  }

  if (error.length == 0) {
    console.log('body', req.body)

    var userId = await eventModel.findOne(
      { user: req.body.idUserFromFront, isOpen: true }
    );

    console.log("userID", userId);

    if (userId) {

      console.log("userId.user", userId.user);

      await eventModel.updateMany(
        { user: userId.user },
        { isOpen: false }
      );
    }

    var newEvent = new eventModel({

      user: req.body.idUserFromFront,
      nameEvent: req.body.eventNameFromFront,
      date: new Date(),
      isOpen: true,
      eventId: (Math.floor(Math.random() * 10000) + 10000).toString().substring(1),
      password: req.body.eventPasswordFromFront,
    })

    var saveEvent = await newEvent.save()

    console.log('saveevent', saveEvent)

    if (saveEvent) {
      await playlistModel.deleteMany(
        {user: req.body.idUserFromFront}
        );
      result = true
    

    var newTourdevote = new tourdevoteModel({
      event: saveEvent._id,
      date: new Date(),
      isOpen: true,
      echeance: Date.now()+99999999999999, //ECHEANCE A L'INITIALISATION AVANT LE LANCEMENT DU VOTE
      participants: [],
    })
      await newTourdevote.save();
    }
  }
  res.json({ result, error, saveEvent })
})


//--------------------Route création tour de vote-------------------------------------


router.post('/tourdevotecreation', async function (req, res, next) {

  var isEventOpen = await eventModel.findOne(
    { isOpen: true, user: req.body.idUserFromFront }
  )

  await tourdevoteModel.updateMany(
    { event: isEventOpen._id },
    { isOpen: false }
  );

  var newTourdevote = new tourdevoteModel({
    event: isEventOpen._id,
    date: new Date(),
    isOpen: true,
    echeance: Date.now()+99999999999999, //ECHEANCE A L'INITIALISATION AVANT LE LANCEMENT DU VOTE
    participants: [],

  })

  var saveTourdevote = await newTourdevote.save();



  if (saveTourdevote) {

    console.log('result', saveTourdevote)
    await playlistModel.deleteMany(
      {user: req.body.idUserFromFront}
      );

    res.json({ result: true, idTourdeVote: saveTourdevote._id })
  }

  else {
    res.json({ result: false })
  }

}
);

// ---------------- route pour afficher le compte à rebours ------------------------------------

router.post('/initTimer5', async function (req, res, next) {

  console.log('body',req.body)

  mongoose.set('useFindAndModify', false);

  var userEvent = await eventModel.findOne(
    {user: req.body.idUserFromFront, isOpen: true}
  )

  console.log('userevent', userEvent);

  var tourdevoteMAJ = await tourdevoteModel.findOneAndUpdate(
    { event: userEvent._id},
    { echeance: Date.now()+300000 }
  )

  console.log(tourdevoteMAJ);

   
  if (tourdevoteMAJ) {
    res.json({result: true}) 
  }

  else {
    res.json({result: false})
  }

});

router.post('/initTimer10', async function (req, res, next) {

  console.log('body',req.body)

  mongoose.set('useFindAndModify', false);

  var userEvent = await eventModel.findOne(
    {user: req.body.idUserFromFront, isOpen: true}
  )

  var tourdevoteMAJ = await tourdevoteModel.findOneAndUpdate(
    { event: userEvent._id},
    { echeance: Date.now()+600000 }
  )

   
  if (tourdevoteMAJ) {
    res.json({result: true}) 
  }

  else {
    res.json({result: false})
  }

});

router.post('/initTimer20', async function (req, res, next) {

  console.log('body',req.body)

  mongoose.set('useFindAndModify', false);

  var userEvent = await eventModel.findOne(
    {user: req.body.idUserFromFront, isOpen: true}
  )

  console.log('user event', userEvent)

  var tourdevoteMAJ = await tourdevoteModel.findOneAndUpdate(
    {event: userEvent._id},
    { echeance: Date.now()+1200000 }
  )
   
  if (tourdevoteMAJ) {
    res.json({result: true}) 
  }

  else {
    res.json({result: false})
  }

});



router.post('/afficheTimer', async function (req, res, next) {

  var isEventOpen = await eventModel.findOne(
    { isOpen: true, user: req.body.idUserFromFront }
  )

  var isTourdevoteOpen = await tourdevoteModel.findOne(
    { isOpen: true, event: isEventOpen._id }
  )
 
  var echeanceMS = isTourdevoteOpen.echeance

  var maintenantMS = Date.now()
  
  var rebours = echeanceMS - maintenantMS

  var reboursSEC = rebours/1000
  var reboursFinal = Math.trunc(reboursSEC)

  console.log(reboursFinal)

  
  if (isTourdevoteOpen) {
    res.json({result: true, isTourdevoteOpen, reboursFinal}) 
  }

  else {
    res.json({result: false})
  }

  // console.log ('Comptes à rebours BACK ici ->', rebours)
  }
  );



router.post('/ajoutertitre', async function (req, res, next) {

 var newTitre = new playlistModel({
   titre: req.body.titreFromFront,
   vote: [],
   user: req.body.userIdFromFront
 })

 var titreSaved = await newTitre.save();
  
  res.json({ titreSaved })
});



router.post('/supprimertitre', async function (req, res, next) {

  console.log(req.body);

  var playlistSaved = await playlistModel.deleteOne(
    {user: req.body.idUserFromFront, titre: req.body.titreFromFront}
    )

  res.json({ playlist: playlistSaved })

})

// ---------------------------------------------------------------------- winner -----------------------------
router.post('/winner', async function (req, res, next) {

  var winnerSEARCH = await playlistModel.find({user: req.body.idUserFromFront});

  // console.log('win ----------- >', winnerSEARCH)

var arrayBRUT = []

  for (i=0; i < winnerSEARCH.length; i++) {
    arrayBRUT.push(
      {votes: winnerSEARCH[i].votes.length,
      titre : winnerSEARCH[i].titre}
    )
  }

var tri =  arrayBRUT.sort(function(a, b) {
  return b.votes - a.votes;
});

console.log('tri ----------- >', tri)

res.json({tri})
}
)



router.post('/voteguest', async function (req, res, next) {

  mongoose.set('useFindAndModify', false);

  var hasAlreadyVote = await playlistModel.findOne(
    { votes: {'$in':req.body.tokenFromFront} }
  )

  console.log('hasAlreadyVote', hasAlreadyVote);

  if (hasAlreadyVote == null) {

    var vote = await playlistModel.findOneAndUpdate(
      { titre: req.body.titreFromFront, user: req.body.idUserFromFront },
      { '$push': { 'votes': req.body.tokenFromFront } }
    )

    console.log('vote du guest ici -> ', vote)
  }


  if (hasAlreadyVote) {
    console.log('result')
    res.json({ result: false, hasAlreadyVote })
  }

  else {
    res.json({ result: true })
  }

}
)


// route désactivée / non utilisée par rapport à la version application mobile pour cause de délais
// router.post('/votehost', async function (req, res, next) {

//   mongoose.set('useFindAndModify', false);


//   var hasAlreadyVote = await playlistModel.findOne(
//     { votes: { $in: req.body.idUserFromFront} }
//   )

//   console.log('hasAlreadyVote', hasAlreadyVote);

//   if (hasAlreadyVote == null) {

//     var vote = await playlistModel.findOneAndUpdate(
//       { titre: req.body.titreFromFront },
//       { $push: { votes: req.body.idUserFromFront } }
//     )

//     console.log('vote', vote)
//   }


//   if (hasAlreadyVote) {
//     console.log('result')
//     res.json({ result: false, hasAlreadyVote })
//   }

//   else {
//     res.json({ result: true })
//   }
// }
// )


router.post('/getEventName', async function (req, res, next) {

  var findEventName = await eventModel.findOne({isOpen: true, password: req.body.eventPasswordFromFront, eventId: req.body.eventIdFromFront})
  console.log("findEventNameFromBack: ", findEventName)
  res.json({})
})

module.exports = router;