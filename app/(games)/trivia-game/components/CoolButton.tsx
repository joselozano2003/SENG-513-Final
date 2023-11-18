import Link from "next/link";

interface CoolButtonProps {
    href: string;
    textSize: string;
    padding?: string;
    hoverScale?: string;
    children: React.ReactNode;
}

const CoolButton: React.FC<CoolButtonProps> = ({ href, textSize, padding, hoverScale, children }) => {
    return (
        <Link href={href}>
            <button
                className={`bg-blue-500 hover:bg-blue-700 text-white ${textSize} font-bold ${
                    padding || "py-6 px-8"
                } rounded-md transition duration-300 ease-in-out transform ${hoverScale || "hover:scale-110"}`}
                style={{textShadow: "2px 2px 10px blue"}}
            >
                {children}
            </button>
        </Link>
    );
};

export default CoolButton;
