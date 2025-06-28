import "./Quiz.css";
import { useState, useRef } from "react";
import { data } from "../../assets/data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [result, setResult] = useState(false);
  let [score, setScore] = useState(0);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let optionArray = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(score + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        optionArray[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const nextQuestion = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex(index + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      optionArray.forEach((option) =>
        option.current.classList.remove("correct", "wrong")
      );
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setLock(false);
    setResult(false);
    setScore(0);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          {" "}
          <h3>
            {index + 1}. {question.question}
          </h3>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={nextQuestion}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions{" "}
          </div>
        </>
      )}
      {result && <h2>Congratulation, Quiz is Completed!</h2>}
      {result && (
        <h3>
          You scored {score} out of {data.length}
        </h3>
      )}
      {result && <button onClick={reset}>Play Again</button>}
      {/* {result && <button onClick={() => window.location.reload()}>Play Again</button>} */}
    </div>
  );
};

export default Quiz;
