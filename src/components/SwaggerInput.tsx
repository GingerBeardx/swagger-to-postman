import Button from "./ui/Button";

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
      if (!clipboardText.toLowerCase().includes("openapi")) {
        onError(
          "This doesen't look like a Swagger document. Please confirm and retry."
        );
        return;
      }
      onPaste(clipboardText);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <div className="flex justify-center my-2">
      <Button onClick={handlePaste}>Get Swagger Data From Clipboard</Button>
      <Button onClick={onClear}>Clear Endpoints</Button>
    </div>
  );
};

export default SwaggerInput;
