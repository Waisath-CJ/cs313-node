DROP TABLE Homework;
DROP TABLE Users;

CREATE TABLE Users (
    id              SERIAL          PRIMARY KEY,
    firstName       varchar(25)     NOT NULL,
    lastName        varchar(25)     NOT NULL,
    email           varchar(50)     NOT NULL,
    username        varchar(25)     UNIQUE NOT NULL,
    password        varchar(100)    NOT NULL
);

CREATE TABLE Homework (
    id              SERIAL          PRIMARY KEY,
    userId          int             REFERENCES Users(id),
    hwName          varchar(50)     NOT NULL,
    hwType          varchar(25)     NOT NULL,
    dueDate         date            NOT NULL
);

INSERT INTO Users (firstName, lastName, email, username, password) VALUES ('admin', 'person', 'admin@me.com', 'admin', '$2b$10$nxO6yGMpApInpj0Q81j05eylztIFvMSGGzfFurMxBu6WwatAtYJuy');

INSERT INTO Homework (userId, hwName, hwType, dueDate) VALUES (1, 'Milestone 1 Submission', 'Assignment', '2019-11-10'), (1, 'Design Test', 'Exam', '2019-11-18'), (1, 'SDD Workday', 'Discussion Board', '2019-11-25');