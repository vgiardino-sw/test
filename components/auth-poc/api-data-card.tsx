import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { fetchApiWelcomeData } from "@/lib/fetcher";

export async function ApiDataComponent({title,token, endpoint}: {title: string, token: string, endpoint: string}) {

    const result = await fetchApiWelcomeData(token, endpoint);
  
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="capitalize">{title} Data</CardTitle>
        </CardHeader>
        <CardContent>
          {typeof result === 'object' && 'error' in result ? (
            <p className="text-red-500">{(result as { error: string }).error}</p>
          ) : (
            <p>{(result as { message: string }).message}</p>
          )}
        </CardContent>
      </Card>
    );
  }