import { useEffect, useState } from "react";

export function useDelayedTextValue(value: string): [string, boolean] {
  const [delayedValue, setDelayedValue] = useState("");
  const [isFinished, setIsFinished] = useState(true);

  useEffect(() => {
    async function startDelayAnimation() {
      if (delayedValue.length > 0) setDelayedValue("");
      if (value) {
        setIsFinished(false);
        const allCharacters = value.split("");

        for await (const character of allCharacters) {
          const newCharacter = await new Promise<string>((resolve, reject) => {
            setTimeout(() => {
              resolve(character);
            }, 2);
          });

          setDelayedValue((prevValue) => (prevValue += newCharacter));
        }

        setIsFinished(true);
      }
    }

    startDelayAnimation();
  }, [value]);

  return [delayedValue, isFinished];
}
