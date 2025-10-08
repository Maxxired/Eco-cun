import img from "@/assets/img/404.jpg"
import { useNavigate } from "react-router-dom";


const NotResults: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className="w-full h-dvh flex justify-center text-gray-700 items-center">
            <div>
                <h1 className={"text-4xl font-bold max-w-lg"}>No hemos podido encontrar esta
                    página.</h1>
                <h2 className="text-gray-500 text-lg max-w-lg mt-2 mb-7">Pero no te
                    preocupes, puedes encontrar muchas otras en nuestra página principal.</h2>

                <button
                    onClick={() => navigate("/")}
                    className="bg-primary text-white py-2 px-8 rounded-md transition-all duration-300 font-bold text-lg hover:bg-primary/[0.8] hover:transform hover:-translate-y-1 active:bg-green-700 focus:outline-hidden">
                    Volver al inicio
                </button>
            </div>
            <img alt="Not results" src={img} className="mix-blend-multiply"></img>

        </div>
    );
}

export default NotResults;