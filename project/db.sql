DROP TABLE UserHomework;
DROP TABLE Homework;
DROP TABLE Users;

CREATE TABLE Homework (
    id              SERIAL          PRIMARY KEY,
    hwName          varchar(50)     NOT NULL,
    hwType          varchar(25)     NOT NULL,
    dueDate         date            NOT NULL
);

CREATE TABLE Users (
    id              SERIAL          PRIMARY KEY,
    firstName       varchar(25)     NOT NULL,
    lastName        varchar(25)     NOT NULL,
    email           varchar(50)     NOT NULL,
    username        varchar(25)     UNIQUE NOT NULL,
    password        varchar(100)    NOT NULL
);

CREATE TABLE UserHomework (
    id              SERIAL          PRIMARY KEY,
    users_id        int             REFERENCES Users(id),
    homework_id     int             REFERENCES Homework(id)
);

INSERT INTO Homework (hwName, hwType, dueDate) VALUES ('Milestone 1 Submission', 'Assignment', '2019-11-10'), ('Design Test', 'Exam', '2019-11-18'), ('SDD Workday', 'Discussion Board', '2019-11-25');

INSERT INTO Users (firstName, lastName, email, username, password) VALUES ('admin', 'person', 'admin@me.com', 'admin', 'password');

INSERT INTO UserHomework (users_id, homework_id) VALUES (1, 1), (1, 2), (1, 3);