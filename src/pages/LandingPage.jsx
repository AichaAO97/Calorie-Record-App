import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div>
      <h1>Welcome to your calorie tracker app</h1>
      <p>
        To get started, <Link to="/track">start tracking!</Link>
      </p>
    </div>
  );
}
