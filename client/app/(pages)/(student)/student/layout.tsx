import Headers from "@/components/common/Header";
import Protected from "./Protected";
import Chatbot from "@/components/features/chatbot/Chatbot";


const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {


    return (
        <Protected>
            <div className="flex flex-col min-h-screen bg-linear-to-br from-gray-900 via-[#1a1c2e] to-gray-950">
                <Headers />
                <main className="grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
                <Chatbot />
            </div>
        </Protected>
    );
};

export default layout;