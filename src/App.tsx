import {Button, Container, Modal, Table} from 'react-bootstrap';
import './App.css';

import data from "./data.json"
import Question, {QuestionType} from './Question';
import {useState} from 'react';

function App() {

    const [result, setResult] = useState<{ [key: number]: string }>({});
    const [calculateResult, setCalculateResult] = useState<{ [key: string]: number }>({})
    const [showResult, setShowResult] = useState<boolean>(false);
    const [isShowRightAnswers, setShowRightAnswers] = useState<boolean>(false)

    function addAnswer(questionNumber: number, answerResult: string) {
        setResult({...result, [questionNumber]: answerResult});
    }

    function showHideRightAnswers() {
        setShowRightAnswers(!isShowRightAnswers);
    }

    function calculate() {
        const results = data.questions.reduce((accumulator, question: QuestionType) => {
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
            <Container className={'mt-3'}>
                <h3 className={'text-center'}>ЄДКІ тести 2023 рік</h3>
            </Container>
            <Container style={{paddingBottom: 100}}>
                {data.questions.map((question: QuestionType, i: number) =>
                    <Question key={i} question={question} addAnswer={addAnswer} isShowRightAnswer={isShowRightAnswers}/>
                )}
            </Container>
            <div className='footer'>
                <Container>
                    <Button variant='outline-primary' onClick={calculate}>Порахувати</Button>{' '}
                    <Button variant='outline-danger'
                            onClick={() => window.confirm('Ви впевнені, що хочете обновити дані?') && window.location.reload()}>Скинути</Button>{' '}
                    <Button variant='outline-secondary'
                            onClick={showHideRightAnswers}>{(isShowRightAnswers ? "Сховати" : "Показати") + " правильні відповіді"}</Button>
                </Container>
            </div>
            <Modal show={showResult} onHide={() => setShowResult(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Результат</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered>
                        <tbody>
                        <tr>
                            <th>Всьго питань</th>
                            <td className='text-end'>{calculateResult.all}</td>
                        </tr>
                        <tr>
                            <th>Питань з відповіддю</th>
                            <td className='text-end'>{calculateResult.answered}</td>
                        </tr>
                        <tr className='table-success'>
                            <th>Вірно</th>
                            <td className='text-end'>{calculateResult.right}</td>
                        </tr>
                        <tr className='table-danger'>
                            <th>Не вірно</th>
                            <td className='text-end'>{calculateResult.wrong}</td>
                        </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='outline-secondary' onClick={() => setShowResult(false)}>Закрити</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default App;
