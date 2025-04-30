
import Terminal from "../components/Terminal";
import { aboutData } from "../data/about";

const Index = () => {
  return (
    <div className="min-h-screen bg-terminal-black p-4 sm:p-8">
      <h1 className="text-center text-terminal-green text-2xl mb-4 sr-only">{aboutData.name} - Terminal Portfolio</h1>
      <Terminal />
    </div>
  );
};

export default Index;
