import {
  ConversationContext,
  ConversationContextState,
} from "@/context/conversationContext";
import { useContext } from "react";

export function useConversation(): ConversationContextState {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error(
      "useConversation must be used within a ConversationProvider"
    );
  }
  return context;
}
