import React, { useState } from 'react'
import { Button, Card, Form, ListGroup } from 'react-bootstrap'
import { CheckLg, X } from 'react-bootstrap-icons'

export type Answer = {
    number: string,
    text: string,
}

export type Question = {
    number: number,
    text: string,
    right: string,
    answers: Answer[],
}

type Props = {
    question: Question,
    addAnswer: (questionNumber: number, answerResult: string) => void
}

function Question({ question, addAnswer }: Props) {
    const [result, setResult] = useState<string | null>(null);
    const [textResult, setTextResult] = useState<string | null>(null)

    function onClickCheck() {
        setTextResult(result === question.right ? "ok" : "error")
    }

    function onClickRadio(answerNumber: string) {
        setResult(answerNumber)
        addAnswer(question.number, answerNumber);
    }

    function Result({ result }: { result: string }) {
        return (
            result === 'ok'
                ?
                <CheckLg color='green' size={35} />
                :
                <X color='red' size={35} />
        )
    }

    function getColorButton(): string {
        const colorMap: { [key: string]: string } = {
            ok: "success",
            error: "danger",
        }
        return textResult ? colorMap[textResult] : 'primary'
    }

    return (
        <Card className='mt-5'>
            <Card.Body>
                <Card.Title>
                    {question.number}. {question.text}
                </Card.Title>
                <ListGroup className='mb-3'>
                    {question.answers.map((answer: Answer, i: number) =>
                        <ListGroup.Item key={question.number + "-" + i}>
                            <Form.Check
                                type={'radio'}
                                label={answer.number + ") " + answer.text}
                                name={'group-' + question.number}
                                onClick={() => onClickRadio(answer.number)}
                                id={question.number + "_" + i}
                            />
                        </ListGroup.Item>
                    )}
                </ListGroup>
                <Button onClick={onClickCheck} variant={'outline-' + getColorButton()} disabled={result===null}>Check</Button>{' '}
                {textResult ? <Result result={textResult} /> : null}
            </Card.Body>
        </Card>
    )
}

export default Question