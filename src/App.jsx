import Applayout from "./Applayout";
import { ContextDataProvider } from "./Context";

function App() {
  return (
    <ContextDataProvider>
      <div>
        <Applayout />
      </div>
    </ContextDataProvider>
  );
}

export default App;
