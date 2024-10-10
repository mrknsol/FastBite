import { Navbar } from "../../components/Navbar/Navbar";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <div className="HomePage">
      <div className="HomePage__background" />
      <span className="HomePage__desc">Your Perfect Snack</span>
      <span className="HomePage__logo">FastBite</span>
      <Navbar />
    </div>
  );
};
