--liquibase formatted sql
--changeset liquibase:release_001_create_tables.sql

create table Survey(
id SERIAL Primary Key,
description text NOT NULL);

create table Question(
id SERIAL Primary Key,
question VARCHAR(100) NOT NULL);

create table Survey_Questions(
id SERIAL Primary Key,
survey_id integer REFERENCES Survey(id),
question_id integer REFERENCES Question(id));

create table Question_Answers(
id SERIAL Primary Key,
question_id integer REFERENCES Question(id),
answer VARCHAR(100) NOT NULL,
is_right Boolean NOT NULL);

create table Person(
id SERIAL Primary Key,
firstname VARCHAR(100) NOT NULL,
lastname VARCHAR(100) NOT NULL,
is_admin Boolean NOT NULL,
email VARCHAR(100) NOT NULL,
hash VARCHAR(100) NOT NULL);

create table Person_Question_Answers(
id SERIAL Primary Key,
expandedQuestion TEXT,
person_id integer REFERENCES Person(id),
survey_id integer REFERENCES Survey(id),
question_answers_id integer REFERENCES Question_Answers(id));

create table Person_Token(
id SERIAL Primary Key,
person_id integer REFERENCES Person(id),
token TEXT NOT NULL);
