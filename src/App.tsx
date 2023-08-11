import { ChangeEvent, useState } from 'react';
import { JsonExplorer } from './components';

const exampleJson = `{"date":"2021-10-27T07:49:14.896Z","hasError":false,"fields":[{"id":"4c212130","prop":"iban","value":"DE81200505501265402568","hasError":false}]}`;

export const App = () => {
  const [json, setJson] = useState(exampleJson);
  const [jsonInputValue, setJsonInputValue] = useState(exampleJson);

  // Add simple validation if it is really json
  const handleUpdateJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInputValue);
      if (typeof parsedJson === 'object') {
        setJson(jsonInputValue);
      } else {
        alert(
          'Looks like you json is not valid, please try paste the correct one'
        );
      }
    } catch (e) {
      alert(
        'Looks like you json is not valid, please try paste the correct one'
      );
    }
  };

  const handleChangeJsonInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInputValue(e.target.value);
  };

  return (
    <div className="p-6">
      <JsonExplorer key={json} json={json} />

      <div className="mt-4">
        <div className="flex items-end mb-1">
          <div className="text-gray-600 mr-4">Raw json</div>
          <button
            onClick={handleUpdateJson}
            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Update
          </button>
        </div>
        <textarea
          value={jsonInputValue}
          onChange={handleChangeJsonInput}
          name="json"
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};
