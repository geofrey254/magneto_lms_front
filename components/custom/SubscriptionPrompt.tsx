import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function SubscriptionPrompt() {
  return (
    <Card className="w-full max-w-md mx-auto border-2 border-[#350203]">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-[#3502031e] rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">
          Access Premium Learning
        </CardTitle>
        <CardDescription className="text-gray-500">
          Subscribe to unlock exclusive learning materials
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground text-sm">
          Get access to curated study guides, expert lessons tailored for Kenyan
          high school students. Plus, enjoy the support of an AI assistant to
          guide your learning journey. Empower your learning with Magneto.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          href="/subscription"
          className="w-full sm:w-auto py-2 px-4 text-sm rounded-2xl border-2 border-[#350203] hover:bg-[#350203] hover:text-white"
        >
          Subscribe Now
        </Link>
      </CardFooter>
    </Card>
  );
}
