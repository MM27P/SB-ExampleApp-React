import { useEffect, useState } from 'react';

type Props = {
  messages: string[];
  time: number;
};

export const MessageDisplayer = ({ messages, time }: Props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, time * 1000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="message-ticker">
      <span className="react-symbol">⚛</span>

      <span className="message-text">{messages[index]}</span>

      <span className="react-symbol">⚛</span>
    </div>
  );
};
