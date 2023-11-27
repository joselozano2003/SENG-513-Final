import Link from "next/link";

interface NeonButtonProps {
  href: string;
  textSize: string;
  padding?: string;
  hoverScale?: string;
  borderColor: string; // Added a new prop for the border color
  children: React.ReactNode;
}

const NeonButton: React.FC<NeonButtonProps> = ({ href, textSize, padding, hoverScale, borderColor, children }) => {
    return (
        <Link href={href}>
            <button
                className={`text-white ${textSize} font-bold ${padding || "py-6 px-8"} rounded-md transition duration-300 ease-in-out transform ${hoverScale || "hover:scale-110"}`}
                style={{
                    backgroundColor: "#0c0d0c",  
                    border: `2px solid ${borderColor}`,
                    boxShadow: `0 0 10px 5px ${borderColor}`,
                    textShadow: `2px 2px 5px ${borderColor}`,     
                }}>
                {children}
            </button>
        </Link>
    );
};

export default NeonButton;