import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/Title";

function TaskPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <div className="flex justify-center relative mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0"
          >
            <ChevronLeftIcon />
          </button>
          <Title>DETALHES DA TAREFA</Title>
        </div>

        <div className="bg-slate-200 p-4 rounded-m">
          <h2 className="text-xl  font-bold text-slate-600">{title}</h2>
          <h2 className="text-slate-600">{description}</h2>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
