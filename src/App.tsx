import {Button, Container, Modal, Table} from 'react-bootstrap';
import './App.css';

import data from "./data.json"
import Question, {Question as QuestonType} from './Question';
import {useState} from 'react';

function App() {

    const [result, setResult] = useState<{ [key: number]: string }>({});
    const [calculateResult, setCalculateResult] = useState<{ [key: string]: number }>({})
    const [showResult, setShowResult] = useState<boolean>(false);

    function addAnswer(questionNumber: number, answerResult: string) {
        setResult({...result, [questionNumber]: answerResult});
    }

    function calculate() {
        const results = data.questions.reduce((accumulator, question: QuestonType) => {
            if (result[question.number] !== undefined) {
                if (result[question.number] === question.right) {
                    accumulator.right++
                } else {
                    accumulator.wrong++
                }
            }
            return accumulator;
        }, {right: 0, wrong: 0});

        setCalculateResult({
            all: data.questions.length,
            answered: Object.keys(result).length,
            right: results.right,
            wrong: results.wrong
        });
        setShowResult(true);
    }

    return (
        <div className="App">
            <Container>
                {data.questions.map((question: QuestonType, i: number) =>
                    <Question key={i} question={question} addAnswer={addAnswer}/>
                )}
            </Container>
            <div className='footer'>
                <Container>
                    <Button variant='outline-primary' onClick={calculate}>Calculate</Button>{' '}
                    <Button variant='outline-danger' onClick={() => window.location.reload()}>Reset</Button>
                </Container>
            </div>
            <Modal show={showResult} onHide={() => setShowResult(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered>
                        <tbody>
                        <tr>
                            <th>All</th>
                            <td className='text-end'>{calculateResult.all}</td>
                        </tr>
                        <tr>
                            <th>Answered</th>
                            <td className='text-end'>{calculateResult.answered}</td>
                        </tr>
                        <tr className='table-success'>
                            <th>Right</th>
                            <td className='text-end'>{calculateResult.right}</td>
                        </tr>
                        <tr className='table-danger'>
                            <th>Wrong</th>
                            <td className='text-end'>{calculateResult.wrong}</td>
                        </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='outline-secondary' onClick={() => setShowResult(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default App;
