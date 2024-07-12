export type Note = {
  id: string;
  content: {
    title: string;
    content: string;
    tags: string[];
  };
  isUser: boolean;
  sessionId: string;
  createdAt: string;
  session: {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
};
