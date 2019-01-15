const createSurveyTable = 
`create table Survey(
id SERIAL Primary Key,
description text NOT NULL);
`;

const createQuestionTable = 
`create table Question(
id SERIAL Primary Key,
question VARCHAR(100) NOT NULL);
`;

const createSurvey_QuestionsTable = 
`create table Survey_Questions(
id SERIAL Primary Key,
survey_id integer REFERENCES Survey(id),
question_id integer REFERENCES Question(id));
`;

const createQuestion_AnswersTable = 
`create table Question_Answers(
id SERIAL Primary Key,
question_id integer REFERENCES Question(id),
answer VARCHAR(100) NOT NULL,
is_right Boolean NOT NULL);`

const createPerson_Question_AnswersTable = 
`create table Person_Question_Answers(
id integer Primary Key,
expandedQuestion TEXT,
person_id integer REFERENCES Person(id),
survey_id integer REFERENCES Survey(id),
question_answers_id integer REFERENCES Question_Answers(id));`

const createPersonTable = 
`create table Person(
id integer Primary Key,
firstname VARCHAR(100) NOT NULL
lastname VARCHAR(100) NOT NULL
email VARCHAR(100) NOT NULL);`