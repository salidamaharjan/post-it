type childrenProp = {
  children: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
export default function Button({ children, className, onClick }: childrenProp) {
  return (
    <button
      className={`rounded-md p-2 w-[100px] bg-blue-400 text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
