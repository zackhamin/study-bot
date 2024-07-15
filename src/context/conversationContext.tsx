import { Turn } from "@/types/conversation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

export interface ConversationContextState {
  conversation: Turn[];
  addTurn: (role: Turn["role"], content: string) => void;
  clearConversation: () => void;
}

export const ConversationContext = createContext<
  ConversationContextState | undefined
>(undefined);

export function ConversationProvider({ children }: { children: ReactNode }) {
  const [conversation, setConversation] = useState<Turn[]>([
    { role: "user", content: "" },
  ]);

  const addTurn = useCallback((role: Turn["role"], content: string) => {
    setConversation((prev) => [...prev, { role, content }]);
  }, []);

  const clearConversation = useCallback(() => {
    setConversation([]);
  }, []);

  const value = React.useMemo(
    () => ({
      conversation,
      addTurn,
      clearConversation,
    }),
    [conversation, addTurn, clearConversation]
  );

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
}
