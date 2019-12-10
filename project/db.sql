DROP TABLE UserHomework;
DROP TABLE Homework;
DROP TABLE HomeworkType;
DROP TABLE Users;

CREATE TABLE HomeworkType (
    id              SERIAL          PRIMARY KEY,
    hwType          varchar(25)     NOT NULL
);

CREATE TABLE Homework (
    id              SERIAL          PRIMARY KEY,
    hwName          varchar(50)     NOT NULL,
    hwType_id       int             REFERENCES HomeworkType(id)
);

CREATE TABLE Users (
    id              SERIAL          PRIMARY KEY,
    username        varchar(25)     UNIQUE,
    password        varchar(100)
);

CREATE TABLE UserHomework (
    id              SERIAL          PRIMARY KEY,
    users_id        int             REFERENCES Users(id),
    homework_id     int             REFERENCES Homework(id)
);

INSERT INTO HomeworkType (hwType) VALUES ('Assignments'), ('Quizzes'), ('Discussion Boards'), ('Projects'), ('Exams');

INSERT INTO Homework (hwName, hwType_id) VALUES ('Milestone 1 Submission', 1);
INSERT INTO Homework (hwName, hwType_id) VALUES ('Design Test', 2);
INSERT INTO Homework (hwName, hwType_id) VALUES ('SDD Workday', 3);
INSERT INTO Homework (hwName, hwType_id) VALUES ('Project 4 Submission', 4);
INSERT INTO Homework (hwName, hwType_id) VALUES ('Final Exam', 5);

INSERT INTO Users (username, password) VALUES ('admin', 'password');

INSERT INTO UserHomework (users_id, homework_id) VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5);