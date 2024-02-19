import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const REDIRECT_COUNT = 10;
const COUNT_DOWN_INTERVAL = 1000;
const HOME_LINK = '/';

export function ErrorPage() {
  const [counter, setCount] = useState(REDIRECT_COUNT);
  const intervalHandler = useRef();
  const navigateToHome = useNavigate();

  useEffect(() => {
    if (counter === 0) {
      clearInterval(intervalHandler.current);
      navigateToHome(HOME_LINK);
    }
  }, [counter]);

  useEffect(() => {
    intervalHandler.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, COUNT_DOWN_INTERVAL);

    // the clean up function
    return () => {
      clearInterval(intervalHandler.current);
    };
  }, []);
  return (
    <>
      <h1>Something went wrong...</h1>
      <p> Redirecting to home page in {counter}</p>
      <p>
        {' '}
        Or click <Link to={HOME_LINK}> Home page</Link> to go back...{' '}
      </p>
    </>
  );
}
