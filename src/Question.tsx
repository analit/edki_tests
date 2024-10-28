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
    question: Question
}

function Question({ question }: Props) {
    const [result, setResult] = useState<string | null>(null);
    const [textResult, setTextResult] = useState<string | null>(null)

    function onClickCheck() {
        setTextResult(result === question.right ? "ok" : "error")
    }

    function Result({ result }: { result: string }) {
        return (
            result === 'ok'
                ?
                <CheckLg color='green' size={50} />
                :
                <X color='red' size={50} />
        )
    }

    return (
        <Card className='mt-5'>
            <Card.Body>
                <Card.Title>
                    {question.number}. {question.text}
                </Card.Title>
                <Card.Text>
                    <ListGroup>
                        {question.answers.map((answer: Answer, i: number) =>
                            <ListGroup.Item key={question.number + "-" + i}>
                                <Form.Check
                                    type={'radio'}
                                    label={answer.number + ") " + answer.text}
                                    name={'group-' + question.number}
                                    onClick={() => setResult(answer.number)}
                                    id={question.number + "_" + i}
                                />
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card.Text>
                <Button onClick={onClickCheck}>Check</Button>
                {textResult ? <Result result={textResult} /> : null}
            </Card.Body>
        </Card>
    )
}

export default Question