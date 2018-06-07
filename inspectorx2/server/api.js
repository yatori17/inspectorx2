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
const Resposta = require('./models/Partida');

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
   //TESTE

   app.post('/api/partidas/new', (req, res) =>{
    console.log("eeeeee");
    res.send();
   })

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