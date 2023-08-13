import Button from './ui/Button';

interface SwaggerInputProps {
  onPaste: (content: string) => void;
  onClear: () => void;
  onError: (error: unknown) => void;
}

const SwaggerInput: React.FC<SwaggerInputProps> = ({
  onPaste,
  onClear,
  onError,
}) => {
  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      onPaste(clipboardText);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <div className='flex justify-center my-1'>
      <Button onClick={handlePaste}>Get Swagger Data From Clipboard</Button>
      <Button onClick={onClear}>Clear Endpoints</Button>
    </div>
  );
};

export default SwaggerInput;
