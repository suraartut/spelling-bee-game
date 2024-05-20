import { useEffect } from 'react';

const Timer = ({ time, setTime, lang }) => {
  const timeText = lang === 'en' ? 'Time' : 'Süre'; //dil seçeneği
  const gameOverText = lang === 'en' ? 'Game Over!' : 'Oyun Bitti!'; //dil seçeneği

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [time, setTime]);

  return (
    <div className="text-2xl font-semibold mt-4">
      {time > 0 ? `${timeText}: ${time}s` : gameOverText}
    </div>
  );
};

export default Timer;
