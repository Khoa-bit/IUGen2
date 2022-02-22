interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div
      className="mb-4 rounded-lg bg-rose-100 p-4 text-sm text-rose-700 dark:bg-rose-200 dark:text-rose-800"
      role="alert"
    >
      {message}
    </div>
  );
};

export default ErrorAlert;
