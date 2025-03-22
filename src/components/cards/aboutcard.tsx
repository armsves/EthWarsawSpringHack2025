import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function AboutCard() {
  return (
    <div className="max-w-xl bg-black bg-opacity-90 mx-auto mt-20">
      <Card className="text-neon-pink shadow-neon">
        <CardHeader>
          <CardTitle className="text-neon-green">AetherYield</CardTitle>
          <CardDescription className="text-neon-yellow">Using Vercel-AI VIALabs and Compound III</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-neon-pink leading-normal prose"> 
          <p className="mb-3 font-semibold">Test these prompts:</p>
          <ul className="flex flex-col mb-2">
            <li>→ what is my wallet address</li>
            <li>→ what is the &quot;USDC&quot; balance in mantle mainnet</li>
            <li>→ what is the &quot;MNT&quot; balance in mantle mainnet</li>
            <li>→ get route from Mantle to Mantle for &quot;MNT&quot; to &quot;USDC&quot; for 4 MNT from my wallet</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}