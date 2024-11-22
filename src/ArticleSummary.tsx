import React from "react";
import styles from "./ArticleSummary.module.css";
import { registerVevComponent } from "@vev/react";
import { SummaryButton } from "./SummaryButton";

type Props = {
  value: { points: string[] };
};

const ArticleSummary = ({ value }: Props) => {
  return (
    <ul className={styles.wrapper}>
      {value &&
        value.points &&
        value.points.map((point) => {
          return <li>{point}</li>;
        })}
    </ul>
  );
};

registerVevComponent(ArticleSummary, {
  emptyState: {
    action: "OPEN_PROPERTIES",
    checkProperty: "value",
    linkText: "Open properties",
    description: "to generate summary",
  },
  name: "ArticleSummary",
  props: [
    {
      name: "value",
      type: "string",
      component: SummaryButton,
    },
  ],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: [
        "color",
        "background",
        "list-style",
        "list-style-type",
        "font-style",
        "font-family",
        "padding",
      ],
    },
  ],
  type: "standard",
});

export default ArticleSummary;
