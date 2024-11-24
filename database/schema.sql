/* This is using PostgresSQL, so all this file should be taken as such. */ 
CREATE DATABASE minesweeper;

/* This connects to the database. */
\c minesweeper;

CREATE TABLE leaderboard (
  playerName VARCHAR(255),
  difficulty VARCHAR(30),
  time INT
);

/* List tables to confirm */
\dt
