import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { IconSeparator, IconVercel } from '@/components/ui/icons'
import EnvCard from './cards/envcard'
import Image from 'next/image'
import logo from '/public/logo.webp'

export async function Header() {
  return (
    <header className="sticky flex items-center justify-between w-full h-16 px-4 shrink-0 text-neon-pink">
      <EnvCard />
      <Link href="/" rel="nofollow" className="mr-2 font-bold text-neon-green hover:text-neon-yellow flex items-center text-shadow">
        <Image src={logo} alt="Logo" width={100} height={100} className="mr-2" />
        <span className="bg-black bg-opacity-40 p-2 rounded-lg border-neon-blue shadow-neon">
          AetherYield: AI Agent for Cross-Chain Yield Optimizer using VIALabs and Compound III with natural language
        </span>
      </Link>
    </header>
  )
}
