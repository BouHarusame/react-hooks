import React from 'react'
import { useToggle } from 'qingsong-hooks'

const Demo: React.FC = () => {
  const [state, { toggle, setLeft, setRight }] = useToggle();

  return (
    <div>
      <div>
        当前状态：{String(state)}
      </div>
      <div>
        <button onClick={toggle}>切换</button>
        <button onClick={setLeft}>设为左值</button>
        <button onClick={setRight}>设为右值</button>
      </div>
    </div>
  );
};

export default Demo;
