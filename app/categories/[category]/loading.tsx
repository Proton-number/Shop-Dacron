import { Metronome } from "ldrs/react";
import "ldrs/react/Metronome.css";

export default function loader() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Metronome size="40" speed="1.6" color="black" />;
    </div>
  );
}
