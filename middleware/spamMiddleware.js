import { google } from 'googleapis';

class spamMiddleWare{
   // working fine
    async isReviewDescriptionSpam(req, res, next){
    const reviewDescription = req.body.comment || '';
    if (!reviewDescription.trim()) {
        return next();
    }

    google.discoverAPI(process.env.DISCOVERY_URL)
    .then(client => {
      const analyzeRequest = {
        comment: {
          text: req.body.courseName + req.body.description,
        },
        languages: ['en'], 
        requestedAttributes: {
          TOXICITY: {},
          SPAM: {},
        },
      };

      client.comments.analyze(
          {
            key: process.env.GOOGLE_API_KEY,
            resource: analyzeRequest,
          },
          (err, response) => {
            if (err) throw err;
            const toxicityScore = response.data.attributeScores['TOXICITY'].summaryScore.value;
            const spamScore = response.data.attributeScores['SPAM'].summaryScore.value;
            console.log('toxicityScore:', toxicityScore);
            console.log('Spam score:', spamScore);
            if (spamScore>=0.75 || toxicityScore>0.7) {
                if(toxicityScore>0.7) return res.status(400).json({ message: 'Toxic comments are not allowed.' });
                else return res.status(400).json({ message: 'Spam comments are not allowed.' });
            }
            next();
          });
    })
    .catch(err => {
      throw err;
    });
    }


// working fine
    async isReviewCommentSpam(req, res, next){
    console.log(req.body);
    const Reviewcomment = req.body.comment || '';

    if (!Reviewcomment.trim()) {
        return next();
    }
    google.discoverAPI(process.env.DISCOVERY_URL)
    .then(client => {
      const analyzeRequest = {
        comment: {
          text: req.body.comment,
        },
        languages: ['en'], 
        requestedAttributes: {
          TOXICITY: {},
          SPAM: {},
        },
      };

      client.comments.analyze(
          {
            key: process.env.GOOGLE_API_KEY,
            resource: analyzeRequest,
          },
          (err, response) => {
            if (err) throw err;
            const toxicityScore = response.data.attributeScores['TOXICITY'].summaryScore.value;
            const spamScore = response.data.attributeScores['SPAM'].summaryScore.value;
            console.log('toxicityScore:', toxicityScore);
            console.log('Spam score:', spamScore);
            if (spamScore>=0.75 || toxicityScore>0.7) {
                if(toxicityScore>0.7) return res.status(400).json({ message: 'Toxic comments are not allowed.' });
                else return res.status(400).json({ message: 'Spam comments are not allowed.' });
            }

            
          });
          next();
    })
    .catch(err => {
      throw err;
    });
    }

// working fine
    async isProjectDescriptionSpam(req, res, next){
    const projectName = req.body.projectName || '';

    if (!projectName.trim()) {
        return next();
    }
    google.discoverAPI(process.env.DISCOVERY_URL)
    .then(client => {
      const analyzeRequest = {
        comment: {
          text: req.body.projectName + req.body.description + req.body.skills,
        },
        languages: ['en'],
        requestedAttributes: {
          TOXICITY: {},
          SPAM: {},
        },
      };

      client.comments.analyze(
          {
            key: process.env.GOOGLE_API_KEY,
            resource: analyzeRequest,
          },
          (err, response) => {
            if (err) throw err;
            const toxicityScore = response.data.attributeScores['TOXICITY'].summaryScore.value;
            const spamScore = response.data.attributeScores['SPAM'].summaryScore.value;
            console.log('toxicityScore:', toxicityScore);
            console.log('Spam score:', spamScore);
            if (spamScore>=0.75 || toxicityScore>0.7) {
                if(toxicityScore>0.7) return res.status(400).json({ message: 'Toxic comments are not allowed.' });
                else return res.status(400).json({ message: 'Spam comments are not allowed.' });
            }

            next();
          });
    })
    .catch(err => {
      throw err;
    });
    }


    async isProjectCommentSpam(req, res, next){
    const temp = " ";
      let ans;
      req.body.skills.forEach(element => {
          ans  += temp.concat(" ", element)
      });
    google.discoverAPI(process.env.DISCOVERY_URL)
    .then(client => {
      const analyzeRequest = {
        comment: {
          text: ans,
        },
        languages: ['en'],
        requestedAttributes: {
          TOXICITY: {},
          SPAM: {},
        },
      };

      client.comments.analyze(
          {
            key: process.env.GOOGLE_API_KEY,
            resource: analyzeRequest,
          },
          (err, response) => {
            if (err) throw err;
            const toxicityScore = response.data.attributeScores['TOXICITY'].summaryScore.value;
            const spamScore = response.data.attributeScores['SPAM'].summaryScore.value;
            console.log('toxicityScore:', toxicityScore);
            console.log('Spam score:', spamScore);
            if (spamScore>=0.75 || toxicityScore>0.7) {
                if(toxicityScore>0.7) return res.status(400).json({ message: 'Toxic comments are not allowed.' });
                else return res.status(400).json({ message: 'Spam comments are not allowed.' });
            }

            next();
          });
    })
    .catch(err => {
      throw err;
    });
    }

// working fine
    async isSynergySpam(req, res, next){
    google.discoverAPI(process.env.DISCOVERY_URL)
    .then(client => {
      const analyzeRequest = {
        comment: {
          text: req.body.title + req.body.description,
        },
        languages: ['en'],
        requestedAttributes: {
          TOXICITY: {},
          SPAM: {},
        },
      };

      client.comments.analyze(
          {
            key: process.env.GOOGLE_API_KEY,
            resource: analyzeRequest,
          },
          (err, response) => {
            if (err) throw err;
            const toxicityScore = response.data.attributeScores['TOXICITY'].summaryScore.value;
            const spamScore = response.data.attributeScores['SPAM'].summaryScore.value;
            console.log('toxicityScore:', toxicityScore);
            console.log('Spam score:', spamScore);
            if (spamScore>=0.75 || toxicityScore>0.7) {
                if(toxicityScore>0.7) return res.status(400).json({ message: 'Toxic comments are not allowed.' });
                else return res.status(400).json({ message: 'Spam comments are not allowed.' });
            }
            next();
          });
    })
    .catch(err => {
      throw err;
    });
    }

// working fine
    async isSynergyCommentSpam(req, res, next){
    google.discoverAPI(process.env.DISCOVERY_URL)
    .then(client => {
      const analyzeRequest = {
        comment: {
          text: req.body.comment,
        },
        languages: ['en'],
        requestedAttributes: {
          TOXICITY: {},
          SPAM: {},
        },
      };

      client.comments.analyze(
          {
            key: process.env.GOOGLE_API_KEY,
            resource: analyzeRequest,
          },
          (err, response) => {
            if (err) throw err;
            const toxicityScore = response.data.attributeScores['TOXICITY'].summaryScore.value;
            const spamScore = response.data.attributeScores['SPAM'].summaryScore.value;
            console.log('toxicityScore:', toxicityScore);
            console.log('Spam score:', spamScore);
            if (spamScore>=0.75 || toxicityScore>0.7) {
                if(toxicityScore>0.7) return res.status(400).json({ message: 'Toxic comments are not allowed.' });
                else return res.status(400).json({ message: 'Spam comments are not allowed.' });
            }

            next();
          });
    })
    .catch(err => {
      throw err;
    });
    }

// working fine
    async isSynergyDomainsSpam(req, res, next){
      const temp = " ";
      let ans;
      req.body.domains.forEach(element => {
          ans  += temp.concat(" ", element)
      });
    google.discoverAPI(process.env.DISCOVERY_URL)
    .then(client => {
      const analyzeRequest = {
        comment: {
          text: ans,
        },
        languages: ['en'],
        requestedAttributes: {
          TOXICITY: {},
          SPAM: {},
        },
      };

      client.comments.analyze(
          {
            key: process.env.GOOGLE_API_KEY,
            resource: analyzeRequest,
          },
          (err, response) => {
            if (err) throw err;
            const toxicityScore = response.data.attributeScores['TOXICITY'].summaryScore.value;
            const spamScore = response.data.attributeScores['SPAM'].summaryScore.value;
            console.log('toxicityScore:', toxicityScore);
            console.log('Spam score:', spamScore);
            if (spamScore>=0.75 || toxicityScore>0.7) {
                if(toxicityScore>0.7) return res.status(400).json({ message: 'Toxic comments are not allowed.' });
                else return res.status(400).json({ message: 'Spam comments are not allowed.' });
            }

            next();
          });
    })
    .catch(err => {
      throw err;
    });
    }



}


export default new spamMiddleWare();