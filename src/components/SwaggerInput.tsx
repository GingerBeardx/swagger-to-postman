interface SwaggerInputProps {
  onPaste: (content: string) => void;
}

const SwaggerInput: React.FC<SwaggerInputProps> = ({ onPaste }) => {
  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      onPaste(clipboardText);
    } catch (error) {
      console.error("Failed to read clipboard content:", error);
    }
  };

  return (
    <div>
      <button onClick={handlePaste}>Get Swagger Data From Clipboard</button>
    </div>
  );
};

export default SwaggerInput;
