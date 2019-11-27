DROP TABLE Homework;
DROP TABLE HomeworkType;

CREATE TABLE HomeworkType (
    id              SERIAL          PRIMARY KEY,
    hwType          varchar(25)     NOT NULL
);

CREATE TABLE Homework (
    id              SERIAL          PRIMARY KEY,
    hwName          varchar(50)     NOT NULL,
    hwType_id       int             REFERENCES HomeworkType(id)
);

INSERT INTO HomeworkType (hwType) VALUES ('Assignments'), ('Quizzes'), ('Discussion Boards'), ('Projects'), ('Exams');
INSERT INTO Homework (hwName, hwType_id) VALUES ('Milestone 1 Submission', 1);
INSERT INTO Homework (hwName, hwType_id) VALUES ('Design Test', 2);
INSERT INTO Homework (hwName, hwType_id) VALUES ('SDD Workday', 3);
INSERT INTO Homework (hwName, hwType_id) VALUES ('Project 4 Submission', 4);
INSERT INTO Homework (hwName, hwType_id) VALUES ('Final Exam', 5);