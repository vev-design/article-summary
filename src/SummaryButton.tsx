import React, { useState } from "react";
import { SilkeBox, SilkeButton, SilkeTextField } from "@vev/silke";
import { generateSummary } from "./api";

export function SummaryButton(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState();

  let articleText = props.context.content
    ?.filter((content) => content.type === "text")
    .reduce((prev, curr) => {
      return prev + curr.content.text;
    }, "");

  let label = "Generate summary";
  if (props.value && props.value.points) {
    label = "Generate new summary";
  }
  return (
    <SilkeBox column gap="s">
      <SilkeBox>
        <SilkeTextField
          value={apiKey}
          label="OpenAI API Key"
          placeholder="Input API key"
          onChange={async (change) => {
            setApiKey(change);
          }}
        />
      </SilkeBox>
      <SilkeButton
        disabled={!apiKey}
        loading={isLoading}
        label={label}
        kind="secondary"
        size="s"
        onClick={async () => {
          setIsLoading(true);
          const results: string[] = await generateSummary(articleText, apiKey);
          props.onChange(results);
          setIsLoading(false);
        }}
      />
    </SilkeBox>
  );
}
