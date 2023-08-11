import { FC } from 'react';
import { JsonValue } from './types';
import { getIsKeyClickable } from './getIsKeyClickable';

interface JsonViewProps {
  // Because Json.parse return type any, I have also decided to use that type here
  data: any;
  path: string;
  onKeyClick(path: string, value: JsonValue): void;
}

export const JsonView: FC<JsonViewProps> = ({ data, path, onKeyClick }) => {
  // String
  if (typeof data === 'string') {
    return <span className="text-green-700">'{data}'</span>;
  }

  // Number
  if (typeof data === 'number') {
    return <span className="text-blue-400">{data}</span>;
  }

  // Boolean
  if (typeof data === 'boolean') {
    return <span className="text-red-700">{JSON.stringify(data)}</span>;
  }

  if (typeof data === 'object') {
    // Array
    if (Array.isArray(data)) {
      return (
        <span>
          [
          <ul className="list-inside pl-5">
            {data.map((value, index) => {
              const newPath = `${path}[${index}]`;
              return (
                <li key={newPath} className="my-1">
                  <JsonView
                    data={value}
                    path={newPath}
                    onKeyClick={onKeyClick}
                  />
                  {index !== data.length - 1 && ','}
                </li>
              );
            })}
          </ul>
          ]
        </span>
      );
    }

    // Null
    if (data === null) {
      return <span className="text-gray-500">null</span>;
    }

    // Object
    const keys = Object.keys(data);
    return (
      <span>
        {'{'}
        <ul className="list-inside pl-5">
          {keys.map((key, index) => {
            const newPath = `${path}.${key}`;
            const isClickable = getIsKeyClickable(data[key]);
            const handleKeyClick = () => onKeyClick(newPath, data[key]);

            return (
              <li key={newPath} className="my-1">
                <span
                  className={
                    isClickable
                      ? 'text-blue-700 cursor-pointer hover:underline'
                      : undefined
                  }
                  onClick={isClickable ? handleKeyClick : undefined}
                >
                  {key}
                </span>
                :{' '}
                <JsonView
                  data={data[key]}
                  path={newPath}
                  onKeyClick={onKeyClick}
                />
                {index !== keys.length - 1 && ','}
              </li>
            );
          })}
        </ul>
        {'}'}
      </span>
    );
  }

  return null;
};
