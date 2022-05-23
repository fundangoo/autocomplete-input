import AutoCompleteInput from './components/autoCompleteInput.component';
import './App.css';
import { mockData } from './data/mock';

function App() {
  return (
    <div className="App">
      <AutoCompleteInput
        // dataSource={mockData}
        dataSource="https://random-data-api.com/api/beer/random_beer?size=100"
        dataKey="name"
        debounceMs={300}
        // placeHolder="Type here"
      />
    </div>
  );
}

export default App;
