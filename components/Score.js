const Score = ({ score, lang }) => (
  <div className="text-xl font-semibold mt-4">
    {lang === 'en' ? `Your Score: ${score}` : `Puanın: ${score}`}
  </div>
);

export default Score;
