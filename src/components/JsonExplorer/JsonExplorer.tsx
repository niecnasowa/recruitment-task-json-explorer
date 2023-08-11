import { FC, useState } from 'react';
import { JsonValue } from './types';
import { JsonView } from './JsonView';

interface JsonExplorerProps {
  json: string;
}

export const JsonExplorer: FC<JsonExplorerProps> = ({ json }) => {
  const [selectedKeyPath, setSelectedKeyPath] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleKeyClick = (path: string, value: JsonValue) => {
    setSelectedKeyPath(path);
    setSelectedValue(value ? value.toString() : JSON.stringify(value));
  };

  // Json.parse return type any
  const parsedData = JSON.parse(json);

  return (
    <div>
      <div className="pb-4">
        <div className="text-gray-600">Property</div>
        <div>
          <input
            value={selectedKeyPath}
            type="text"
            readOnly
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="text-gray-600">{selectedValue}</div>
      </div>

      <div>
        <div className="text-gray-600">Response</div>
        <div className="p-4 border border-gray-300 rounded-md whitespace-pre">
          <JsonView data={parsedData} path="res" onKeyClick={handleKeyClick} />
        </div>
      </div>
    </div>
  );
};
