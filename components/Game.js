import { useState, useEffect } from 'react';
import Timer from './Timer';
import Score from './Score';
import Image from 'next/image';

const Game = ({ lang }) => {
  const [letters, setLetters] = useState([]);
  const [inputWord, setInputWord] = useState('');
  const [correctWords, setCorrectWords] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [dictionary, setDictionary] = useState([]);
  const [showPopup, setShowPopup] = useState(false);  //for Time's Up Popup

  useEffect(() => {
    fetch(`/dictionaries/${lang}.json`)
      .then(response => response.json())
      .then(data => {
        setDictionary(data.words);
        const randomLetters = Array.from({ length: 7 }, () =>
          data.words.join('').charAt(Math.floor(Math.random() * data.words.join('').length))
        );
        setLetters(randomLetters);
      });
  }, [lang]);

  useEffect(() => {  //for Time's Up Popup
    if (time === 0) {
      setShowPopup(true);
    }
  }, [time]);

  const handleSubmit = () => {
    if (dictionary.includes(inputWord) && !correctWords.includes(inputWord)) {
      setCorrectWords([...correctWords, inputWord]);
      setScore(score + inputWord.length);
      setTime(time + 15);
    }
    setInputWord('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-300">
      <Image src="/spelling-bee-logo.png" alt='Spelling Bee Logo'
      width={300} height={300} className='rounded-full mb-6'/>
      <h1 className="text-4xl font-bold mb-8">{lang === 'en' ? 'Spelling Bee Game' : 'Heceleme Oyunu'}</h1>

      {/* Hexagon Letters starts */}
      <div className="flex justify-center mb-6">
        <div className="grid grid-cols-7 gap-2 hexagon-container">
          {letters.map((letter, index) => (
            <div key={index} className="hexagon">
              <span className="text-3xl">{letter}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Hexagon Letters ends */}

      {/* Word Input Textbox starts */}
      <input
        type="text"
        value={inputWord}
        onChange={(e) => setInputWord(e.target.value)}
        className="px-4 py-2 border border-yellow-600 rounded-md mb-6 focus:outline-none"
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 focus:outline-none"
      >
        {lang === 'en' ? 'Submit' : 'Gönder'}
      </button>
      {/* Word Input Textbox ends */}

      {/* Timer and Score starts */}
      <Timer time={time} setTime={setTime} lang={lang} />
      <Score score={score} lang={lang} />

      {/* Time's Up Popup starts */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-10 rounded shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">{lang === 'en' ? 'Time\'s Up!' : 'Süren Bitti'}</h2>
            <p className="text-lg mb-4">{lang === 'en' ? 'Your final score is' : 'Skorun'}: {score}</p>
            <button onClick={() => setShowPopup(false)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded">
              {lang === 'en' ? 'Close' : 'Kapat'}
            </button>
          </div>
        </div>
      )}
      {/* Time's Up Popup ends */}

    </div>
  );
};

export default Game;
