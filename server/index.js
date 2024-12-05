import express from 'express';
import Knex from 'knex';
import logger from './logging.js';

const app = express();


// createUnixSocketPool initializes a Unix socket connection pool for
// a Cloud SQL instance of Postgres.
const createUnixSocketPool = async config => {
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  return Knex({
    client: 'pg',
    connection: {
      user: process.env.DB_USER, // e.g. 'my-user'
      password: process.env.DB_PASS, // e.g. 'my-user-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
      host: process.env.INSTANCE_UNIX_SOCKET, // e.g. '/cloudsql/project:region:instance'
    },
    // ... Specify additional properties here.
    ...config,
  });
};

const createPool = () => {
    const config = {pool: {}};
    config.pool.max = 5;
    config.pool.min = 0;
    config.pool.acquireTimeoutMillis = 60000;
    config.pool.createTimeoutMillis = 30000;
    config.pool.idleTimeoutMillis = 600000;
    config.pool.createRetryIntervalMillis = 200;
    return createUnixSocketPool(config);
}

class ClientError extends Error {
  constructor(msg, statusCode=400) {
    super(msg);
    this.error = msg;
    this.statusCode = statusCode;
  }
}

const GetScoresForDifficulty = (req, res) => {
    const pool = createPool();
    logger.info(JSON.stringify(req.query));
    
    if (!req.query || !req.query.difficulty) {
      throw new ClientError('No difficulty given.');
    }
    const difficulty = req.query.difficulty.toString();
    
    if (difficulty !== 'easy') {
      throw new ClientError('Invalid difficulty.');
    }

    res.status(200).send();
}

const AddNewScore = (req, res) => {
    const pool = createPool();
    const {playerName, difficulty, time} = req.body;

    if (!difficulty || !playerName || !time) {
        res.status(400).send('Invalid request.').end();
    }

    const row = {
        playerName: playerName,
        difficulty: difficulty,
        time: parseInt(time)
    }

    try {
        pool('leaderboard').insert(row)
    } catch {
        logger.error(`Error while attempting to add score:${err}`);
        res.status(500).send('Unable to add score; see logs for more details.')
    }

    res.status(200).send(`Score added successfully: ${row}`);
}

app.get('/leaderboard', (req, res) => {
    GetScoresForDifficulty(req, res);
});

app.post('/leaderboard', (req, res) => {
    AddNewScore(req, res);
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});

export default app;
