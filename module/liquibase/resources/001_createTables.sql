--liquibase formatted sql
--changeset liquibase:release_001_create_tables.sql

create table PERSON(
id SERIAL Primary Key,
firstname VARCHAR(100) NOT NULL,
lastname VARCHAR(100) NOT NULL,
is_admin Boolean NOT NULL,
email VARCHAR(100) NOT NULL,
hash VARCHAR(100) NOT NULL);

create table STATUS(
id SERIAL Primary Key,
description VARCHAR(100) NOT NULL
);

create table SURVEY(
id SERIAL Primary Key,
person_id integer REFERENCES PERSON(id),
description text NOT NULL,
status_id integer REFERENCES STATUS(id));

create table TOPIC(
id SERIAL Primary Key,
description VARCHAR(100) NOT NULL
);

create table DEGREE(
id SERIAL Primary Key,
description VARCHAR(100) NOT NULL
);

create table QUESTION(
id SERIAL Primary Key,
question VARCHAR(100) NOT NULL,
topic_id integer REFERENCES TOPIC(id),
degree_id integer REFERENCES DEGREE(id)
);

create table SURVEY_QUESTIONS(
id SERIAL Primary Key,
survey_id integer REFERENCES SURVEY(id),
question_id integer REFERENCES QUESTION(id));

create table QUESTION_ANSWERS(
id SERIAL Primary Key,
question_id integer REFERENCES QUESTION(id),
answer VARCHAR(100),
is_right Boolean);

create table QUESTION_PERSON_ANSWERS(
id SERIAL Primary Key,
full_answer TEXT,
survey_id integer REFERENCES SURVEY(id),
question_answers_id integer REFERENCES QUESTION_ANSWERS(id));

create table PERSON_TOKEN(
id SERIAL Primary Key,
person_id integer REFERENCES PERSON(id),
token TEXT NOT NULL);

create table TEMPORARY_SURVEYS(
id SERIAL Primary Key,
survey_id integer REFERENCES SURVEY(id),
random_url TEXT NOT NULL,
time TIMESTAMP);