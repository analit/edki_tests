// import React from 'react';
// import logo from './logo.svg';
import { Container } from 'react-bootstrap';
import './App.css';

import data from "./data.json"
import Question, { Question as QuestonType } from './Question';

function App() {
  return (
    <div className="App">
      <Container>
        {data.questions.map((question: QuestonType, i: number) => <Question key={i} question={question} />)}
      </Container>
    </div>
  );
}

export default App;
