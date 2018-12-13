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
const Artefato = require('./models/Artefato');
const Listuser = require('./models/Listuser');
const Partfip = require('./models/Partfip');
const Respfip = require('./models/Respfip');
const Conferefip = require('./models/Conferefip');
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




   //Post partidas
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
      defectbool: req.body.defectbool,
      defectdescript: req.body.defectdescript,
      defecttaxonomy: req.body.defecttaxonomy
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

   //Post usuarionline
   app.post('/api/listusers/new', (req, res) => {
    console.log("Listuser");

     var listuserObj = new Listuser({
      userId: req.body.userId,
      title: req.body.title
      });
     console.log(listuserObj);
   
     listuserObj.save(err => {
        if (err){
          return res.status(500).send(err);
        } else {
        return res.status(200).send(listuserObj);
        }
         });
     });   

      //Post partfip
   app.post('/api/partfip/new', (req, res) => {
    console.log("Partfip");

     var partfipObj = new Partfip({
      userId: req.body.userId,
      title: req.body.title,
      modo: req.body.modo,
      artefato: req.body.artefato,
      inspetor: req.body.inspetor
      });
     console.log(partfipObj);
   
     partfipObj.save(err => {
        if (err){
          return res.status(500).send(err);
        } else {
        return res.status(200).send(partfipObj);
        }
         });
     });

      //Post Respfip
   app.post('/api/respfip/new', (req, res) => {
    console.log("Respfip");

     var respfipObj = new Respfip({
      userId: req.body.userId,
      partidaId: req.body.partidaId,
      artefatoId: req.body.artefatoId,
      comment: req.body.comment,
      detbool: req.body.detbool,
      detdescript: req.body.detdescript,
      dettaxonomy: req.body.dettaxonomy,
      inspector: req.body.inspector
      });
     console.log(respfipObj);
   
     respfipObj.save(err => {
        if (err){
          return res.status(500).send(err);
        } else {
        return res.status(200).send(respfipObj);
        }
         });
     }); 

         //Post Conferefip
   app.post('/api/conferefip/new', (req, res) => {
    console.log("Conferefip");

     var conferefipObj = new Conferefip({
      userId: req.body.userId,
      partidaId: req.body.partidaId,
      artefatoId: req.body.artefatoId,
      respfipId: req.body.respfipId,
      comment: req.body.comment,
      detbool: req.body.detbool,
      detdescript: req.body.detdescript,
      dettaxonomy: req.body.dettaxonomy,
      });
     console.log(conferefipObj);
   
     conferefipObj.save(err => {
        if (err){
          return res.status(500).send(err);
        } else {
        return res.status(200).send(conferefipObj);
        }
         });
     }); 





   //GET usuarioonline
     app.get('/api/listusers', (req, res) => {
    Listuser.find({}, (err, listusers) => {
      let listusersArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (listusers) {
        listusers.forEach(listusers => {
          listusersArr.push(listusers);
        });
      }
      res.send(listusersArr);
      });
  });

   //REMOVE usuarioonline
     app.post('/api/listusers/del/:userId', (req, res) => {
    Listuser.remove({userId: req.params.userId}, (err, listusers) => {
      let listusersArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      else
       {
        console.log("deletado!");
        return res.status(200).send();
      }
        
      
      
      res.send(listusersArr);
      });
  });     

   //GET artefato
     app.get('/api/artefatos', (req, res) => {
    Artefato.find({}, (err, artefatos) => {
      let artefatosArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (artefatos) {
        artefatos.forEach(artefatos => {
          artefatosArr.push(artefatos);
        });
      }
      res.send(artefatosArr);
      });
  });

        //GET artefato
     app.get('/api/partfip', (req, res) => {
    Partfip.find({}, (err, partfips) => {
      let partfipsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (partfips) {
        partfips.forEach(partfips => {
          partfipsArr.push(partfips);
        });
      }
      res.send(partfipsArr);
      });
  });

        //GET artefato by id
     app.get('/api/partfips/:id', (req, res) => {
    Partfip.find({ _id: req.params.id }, (err, partfips) => {
      let partfipsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (partfips) {
        partfips.forEach(partfips => {
          partfipsArr.push(partfips);
        });
      }
      res.send(partfipsArr);
      });
  });


   //GET artefato
     app.get('/api/artefatos/:id', (req, res) => {
    Artefato.find({ _id: req.params.id }, (err, artefatos) => {
      let artefatosArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (artefatos) {
        artefatos.forEach(artefatos => {
          artefatosArr.push(artefatos);
        });
      }
      res.send(artefatosArr);
      });
  });

        //GET respfip
     app.get('/api/respfip/:userId/:partidaId', (req, res) => {
    Respfip.find({ userId: req.params.userId, partidaId: req.params.partidaId}, (err, respfips) => {
      let respfipsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (respfips) {
        respfips.forEach(respfips => {
          respfipsArr.push(respfips);
        });
      }
      res.send(respfipsArr);
      });
  });

        //GET respfip
     app.get('/api/respfips/:partidaId/:artefatoId', (req, res) => {
    Respfip.find({ partidaId: req.params.partidaId, artefatoId: req.params.artefatoId }, (err, respfips) => {
      let respfipsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (respfips) {
        respfips.forEach(respfips => {
          respfipsArr.push(respfips);
        });
      }
      res.send(respfipsArr);
      });
  });

  //GET artefato
     app.get('/api/partfip/:userId', (req, res) => {
    Partfip.find({ userId: req.params.userId}, (err, partfips) => {
      let partfipsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (partfips) {
        partfips.forEach(partfips => {
          partfipsArr.push(partfips);
        });
      }
      res.send(partfipsArr);
      });
  });

             //GET respfip
     app.get('/api/respfipdiscrim/:partidaId', (req, res) => {
    Respfip.find({ partidaId: req.params.partidaId }, (err, respfips) => {
      let respfipsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (respfips) {
        respfips.forEach(respfips => {
          respfipsArr.push(respfips);
        });
      }
      res.send(respfipsArr);
      });
  });


        //GET conferefip
     app.get('/api/conferefip/:userId/:partidaId', (req, res) => {
    Conferefip.find({ userId: req.params.userId, partidaId: req.params.partidaId}, (err, conferefips) => {
      let conferefipsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (conferefips) {
        conferefips.forEach(conferefips => {
          conferefipsArr.push(conferefips);
        });
      }
      res.send(conferefipsArr);
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