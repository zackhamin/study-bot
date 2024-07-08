import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NotesCardProps {
  title: string;
  description: string;
  tags: string[];
}

export function NotesCard({ title, description, tags }: NotesCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        {" "}
        <CardTitle className="text-lg font-semibold text-indigo-700">
          {" "}
          {title}{" "}
        </CardTitle>
      </CardHeader>{" "}
      <CardContent>
        {" "}
        <p className="text-sm text-gray-600">{description}</p>{" "}
        <div className="mt-4 flex space-x-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              //   className={`px-2 py-1 bg-${tag.color}-100 text-${tag.color}-800 text-xs rounded-full`}
            >
              {/* {tag.name}{" "} */}
            </span>
          ))}{" "}
        </div>{" "}
      </CardContent>{" "}
      /.....
    </Card>
  );
}
