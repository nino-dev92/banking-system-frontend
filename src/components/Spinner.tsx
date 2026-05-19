import "../styles/loading.css";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-50 z-100">
      <div className="flex flex-col items-center gap-4">
        <div className="round"></div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Accessing Vault...</h1>
      </div>
    </div>
  );
};

export default Spinner;
