"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname , useRouter} from "next/navigation"
import { Menu, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const navItems = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    href: "/about",
    subItems: [
      { name: "Our History", href: "/about#history" },
      { name: "Our Mission", href: "/about#mission" },
      { name: "Our Vision", href: "/about#vision" },
      { name: "Our Values", href: "/about#values" },
    ],
  },
  {
    name: "Academics",
    href: "#",
    subItems: [
      { name: "Pre-School", href: "/academics/pre-school" },
      { name: "Primary", href: "/academics/primary" },
     // { name: "Faculty", href: "/academics/faculty" },
    ],
  },
  { name: "News", href: "/news" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact Us", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <nav className="sticky top-0 z-[998] bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">Star Hacs</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-8 lg:flex">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className={`group relative px-2 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                  isActive(item.href) ? "text-primary" : "text-foreground/60"
                }`}
              >
                {item.name}
                {item.subItems && <ChevronDown className="ml-1 inline-block h-4 w-4" />}
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.5 bg-primary transition-transform duration-300 ease-out ${
                    isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
              {item.subItems && (
                <div className="absolute left-0 mt-2 w-48 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                  <div className="rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`block px-4 py-2 text-sm ${
                          isActive(subItem.href) ? "bg-gray-100 text-primary" : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Button onClick={()=> router.push("/application")} className=" cursor-pointer">Apply</Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {navItems.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={item.name} className="border-b-0">
                    {item.subItems ? (
                      <>
                        <AccordionTrigger
                          className={`py-4 text-lg font-medium hover:no-underline ${
                            isActive(item.href) ? "text-primary" : ""
                          }`}
                        >
                          {item.name}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-2 pb-4">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`py-2 text-sm ${
                                  isActive(subItem.href)
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </>
                    ) : (
                      <div className="py-4">
                        <Link
                          href={item.href}
                          className={`text-lg font-medium transition-colors hover:text-primary ${
                            isActive(item.href) ? "text-primary" : ""
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </div>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
              <Button onClick={()=> router.push("/application")} className="mt-4 w-full">Apply</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

