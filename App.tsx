import { SafeAreaView, View } from "react-native";

import Header from "./src/components/Header";
import Suggestions from "./src/components/Suggestions";
import MainInput from "./src/components/MainInput";
import Result from "./src/components/Result";
import { useCallback, useMemo, useState } from "react";

import { geminiModel } from "./src/services/geminiModel";
import { useDelayedTextValue } from "./src/hooks/useDelayedTextValue";
import Empty from "./src/components/Empty";
import Loading from "./src/components/Loading";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [textValue, setTextValue] = useState("");

  const [suggestionsHide, setSuggestionsHide] = useState(false);
  const [promptResult, setPromptResult] = useState("");
  const [delayedValue, isFinished] = useDelayedTextValue(promptResult);

  const handlePrompt = useCallback(async () => {
    try {
      setIsLoading(true);
      setPromptResult("");
      if (textValue) {
        const result = await geminiModel.generateContent(textValue);

        const response = result.response;
        const text = response.text();
        if (text) {
          setTextValue("");
        }
        setPromptResult(text);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
      setTextValue("");
    }
  }, [textValue]);

  const handleTextValue = useCallback(
    (value: string) => setTextValue(value),
    []
  );

  const hasPrompt = useMemo(
    () => (promptResult.length > 0 ? true : false),
    [promptResult]
  );

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 bg-white">
        <Header />
        <Suggestions
          isHide={suggestionsHide}
          handleSuggestionsHide={(value: boolean) => setSuggestionsHide(value)}
          onSelectSuggestion={handleTextValue}
        />
        {!promptResult && !isLoading && !textValue && <Empty />}
        {promptResult && !isLoading && (
          <Result data={delayedValue} suggestionsHide={suggestionsHide} />
        )}
        {!promptResult && isLoading && <Loading />}
        <MainInput
          isLoading={false}
          disabled={!isFinished}
          value={textValue}
          onChangeText={handleTextValue}
          onComplete={handlePrompt}
          hasPrompt={hasPrompt}
        />
      </SafeAreaView>
    </View>
  );
}
