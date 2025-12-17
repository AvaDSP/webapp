import React, { useState } from 'react'
import { parse } from './Parser';

export const Prompt = () => {

  const [log, setLog] = useState(["Initialzied..."]);
  const [cmd, setCmd] = useState("");

  const handleButton = () => parse(cmd, log, (e) => setLog(e), (e) => setCmd(e));

  return (
    <div className="flex h-full w-[calc(100vw-250px)] flex-col shadow rounded">
      <div className="bg-white flex-1 p-5 text-slate-600 overflow-y-auto">
        <div className="flex flex-col">
          {
            log.map((item, index) => (
              <pre key={`${item}-${index}`}>{item}</pre>
            ))
          }

        </div>
      </div>

      <div className="fixed bottom-0 left-[230px] w-[calc(100vw-230px)] flex my-2 mx-2">
        <input value={cmd} onKeyDown={e => e.key === 'Enter' ? handleButton() : ''} onChange={(event) => setCmd(() => event.target.value)} className="w-full rounded shadow-lg p-1 border-2 border-gray-100" placeholder="Enter 'help' to get available commands..." type="text" />
        <button onClick={handleButton}
          className="rounded-lg border border-slate-300 hover:bg-gray-200 py-2 px-5">Enter</button>
      </div>

    </div>
  )
}
