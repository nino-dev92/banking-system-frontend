import "../styles/loading.css";

const Spinner = () => {
  return (
    <div className="flex-col justify-center align-center text-center m-50">
      <h1 className="text-3xl">Loading...</h1>
      <div className="round m-auto"></div>
    </div>
  );
};

export default Spinner;
