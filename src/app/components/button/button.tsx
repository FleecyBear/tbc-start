interface ButtonProps {
  buttonText?: string;
}

const Button = ({ buttonText }: ButtonProps) => {
  return (
    <button className="bg-purple-700 text-white hover:bg-purple-600 
                       px-4 py-2 rounded-md transition 
                       duration-300 ease-in-out
                       focus:outline-none focus:ring-2 
                       focus:ring-purple-300 focus:ring-opacity-50">
      {buttonText}
    </button>
  );
};

export default Button;
