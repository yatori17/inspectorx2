// server/api.js
/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const Question = require('./models/Question');
const Partida = require('./models/Partida');
const Resposta = require('./models/Resposta');
const Artefato = require('./models/Artefato')
//const Resposta = require('./models/Partida');

/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
 */

module.exports = function(app, config) {
  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });

    // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[config.NAMESPACE] || [];
    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send({message: 'Not authorized for admin access'});
    }
  }


/*
 |--------------------------------------
 | API Routes
 |--------------------------------------
 */

  // Get Question
  app.get('/api/questions', (req, res) => {
    Question.find({}, (err, questions) => {
      let questionsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (questions) {
        questions.forEach(question => {
          questionsArr.push(question);
        });
      }
      res.send(questionsArr);
      });
  });



  // Get Partidas
  app.get('/api/partidas', (req, res) => {
    Partida.find({}, (err, partidas) => {
      let partidasArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (partidas) {
        partidas.forEach(partidas => {
          partidasArr.push(partidas);
        });
      }
      res.send(partidasArr);
      });
  });
   

   //Post partidas
   app.post('/api/partidas/new', (req, res) => {
    console.log("eeeeee");

     var partidaObj = new Partida({
      userId: req.body.UserId,
      dificuldade: req.body.dificuldade,
      modo: req.body.modo
      });
    console.log(req.originalUrl);
    console.log(req.body);
     console.log(partidaObj);
   
     partidaObj.save(err => {
        if (err){
          return res.status(500).send(err);
        } else {
        console.log(partidaObj._id);
        return res.status(200).send(partidaObj);
        }
         });
     });




   //Put partidas
   app.post('/api/respostas', (req, res) => {
    console.log("update");

     var respostaObj = new Resposta({
      idPartida: req.body.idPartida,
      idPergunta: req.body.idPergunta,
      trecho: req.body.trecho,
      tipo: req.body.tipo,
      trechoAcerto: req.body.trechoAcerto,
      tipoAcerto: req.body.tipoAcerto,
      modo: req.body.modo
      });
    console.log(req.originalUrl);
    console.log(req.body);
     console.log(respostaObj);
   
     respostaObj.save(err => {
        if (err){
          return res.status(500).send(err);
        } else {
 
        return res.status(200).send(respostaObj);
        }
         });
     });

//GET RESPOSTAS DE UMA PARTIDA
  app.get('/api/listarespostas/:idPartida', (req, res) => {
    Resposta.find({ idPartida: req.params.idPartida }, (err, respostas) => {
      let respostasArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (respostas) {
        respostas.forEach(respostas => {
          respostasArr.push(respostas);
        });
      }
      res.send(respostasArr);
      });
  });


   //FULLINSPECTIONPROCESS

   //Post artefato
   app.post('/api/artefatos/new', (req, res) => {
    console.log("artefatos");

     var artefatoObj = new Artefato({
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
      });
     console.log(artefatoObj);
   
     artefatoObj.save(err => {
        if (err){
          return res.status(500).send(err);
        } else {
        return res.status(200).send(artefatoObj);
        }
         });
     });



     /* partida.save((err) => {
        if (err) { 
          return res.status(500).send({message: err.message}); 
        }
        res.send(partida);
      });*/


  //  res.send(partida);
   /*})

   //Criar Partida
 /*app.post('/api/partidas/new', jwtCheck, (req, res) => {
    console.log("eeeeee");

    const partida = new Partida({
        //_id: new mongoose.Types.ObjectId(),
      UserId: req.body.UserId,
      dificuldade: req.body.dificuldade,
      Resposta: req.body.Resposta
    });

    partida.save((err) => {
        if (err) { return res.status(500).send({message: err.message}); }
        res.send(partida);
      });
  });

    
    
      /*Partida.collection('partidas').save(partida, (err, result) => {
        if (err) { 
          return console.log(err)
        };
        console.log('saved to database');
        res.redirect('/');
        }
    )});*/



  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });



};