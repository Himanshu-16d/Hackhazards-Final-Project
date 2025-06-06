'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { UserNav } from '@/components/user-nav'
import { useSession, signIn } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const { toast } = useToast()

  const handleProtectedRoute = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault()
      toast({
        title: "Sign in required",
        description: "Please sign in to access this feature",
        variant: "destructive"
      })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b shadow-sm"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo/Title */}
        <div className="flex items-center gap-4 min-w-[180px]">
          <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent font-poppins tracking-tight">
            HireSenseAI
          </Link>
        </div>
        {/* Center: Nav Links */}
        <div className="hidden md:flex gap-8 flex-1 justify-center">
          <Link href="/resume-builder" className={cn(
            "font-medium text-base px-3 py-2 rounded transition-colors hover:bg-primary/10 hover:text-primary",
            pathname === "/resume-builder" && "text-primary font-semibold bg-primary/10"
          )} onClick={handleProtectedRoute}>
            Resume Builder
          </Link>
          <Link href="/job-finder" className={cn(
            "font-medium text-base px-3 py-2 rounded transition-colors hover:bg-primary/10 hover:text-primary",
            pathname === "/job-finder" && "text-primary font-semibold bg-primary/10"
          )} onClick={handleProtectedRoute}>
            Job Finder
          </Link>
        </div>
        {/* Right: Actions */}
        <div className="flex items-center gap-2 min-w-[120px] justify-end">
          <ModeToggle />
          {status === 'authenticated' ? (
            <UserNav />
          ) : (
            <Button onClick={() => signIn()} variant="default" className="font-semibold">
              Sign in
            </Button>
          )}
        </div>
      </div>
      {/* Mobile Nav */}
      <div className="flex md:hidden justify-center gap-4 pb-2">
        <Link href="/resume-builder" className={cn(
          "font-medium text-base px-3 py-2 rounded transition-colors hover:bg-primary/10 hover:text-primary",
          pathname === "/resume-builder" && "text-primary font-semibold bg-primary/10"
        )} onClick={handleProtectedRoute}>
          Resume Builder
        </Link>
        <Link href="/job-finder" className={cn(
          "font-medium text-base px-3 py-2 rounded transition-colors hover:bg-primary/10 hover:text-primary",
          pathname === "/job-finder" && "text-primary font-semibold bg-primary/10"
        )} onClick={handleProtectedRoute}>
          Job Finder
        </Link>
      </div>
    </motion.nav>
  )
} 