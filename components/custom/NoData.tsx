import { AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function NoSubscriptionData() {
  const router = useRouter();
  return (
    <Card className="w-full max-w-md mx-auto border-2 border-[#350203]">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-amber-500">
          <AlertCircle className="w-6 h-6" />
          <span>No Subscription Data</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-400">
          We couldn{"'"}t find any subscription data for your account. This
          could be because:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 dark:text-gray-400">
          <li>You haven{"'"}t subscribed to any services yet</li>
          <li>There was an error fetching your subscription data</li>
          <li>Your subscription has expired</li>
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => router.refresh()} className="rounded-2xl">
          Refresh Data
        </Button>
        <Link
          href="/subscription"
          className="p-4 px-4 py-1 border-2 border-[#350203] rounded-2xl text-sm"
        >
          View Plans
        </Link>
      </CardFooter>
    </Card>
  );
}
