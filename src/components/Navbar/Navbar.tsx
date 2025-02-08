"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Menu} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import Link from "next/link";
import {ModeToggle} from "@/components/ui/mode-toogle";
const Navbar = () => {
    return (
        <Card className="w-full bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5">
            <p>Helstorm-Track</p>

            <ul className="hidden md:flex items-center gap-10 text-card-foreground">
                <li className="text-primary font-medium">
                    <Link href="/" className="text-primary font-medium">
                        Home
                    </Link>
                </li>
                <li>
                    <a href="#features">Features</a>
                </li>
                <li>
                    <a href="#pricing">Pricing</a>
                </li>
                <li>
                    <a href="#faqs">FAQs</a>
                </li>
                <li>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <span className="cursor-pointer">Pages</span>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="start">
                            {landings.map((page) => (
                                <DropdownMenuItem key={page.id}>
                                    <Link href={page.route}>{page.title}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </li>
            </ul>

            <div className="flex items-center">

                <Link href="/login">
                <Button variant="secondary" className="hidden md:block px-2">
                    Login
                </Button>
                </Link>
                <Button className="hidden md:block ml-2 mr-2">Get Started</Button>

                <div className="flex md:hidden mr-2 items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <span className="py-2 px-2 bg-gray-100 rounded-md">Pages</span>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="start">
                            {landings.map((page) => (
                                <DropdownMenuItem key={page.id}>
                                    <Link href={page.route}>{page.title}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5 rotate-0 scale-100" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <a href="#home">Home</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#features">Features</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#pricing">Pricing</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#faqs">FAQs</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button variant="secondary" className="w-full text-sm">
                                    Login
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button className="w-full text-sm">Get Started</Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <ModeToggle />
            </div>
        </Card>
    );
};

const landings = [
    {
        id: nanoid(),
        title: "landing 01",
        route: "/project-management",
    },
    {
        id: nanoid(),
        title: "landing 02",
        route: "/crm-landing",
    },
    {
        id: nanoid(),
        title: "landing 03",
        route: "/ai-content-landing",
    },
    {
        id: nanoid(),
        title: "landing 04",
        route: "/new-intro-landing",
    },
    {
        id: nanoid(),
        title: "landing 05",
        route: "/about-us-landing",
    },
    {
        id: nanoid(),
        title: "landing 06",
        route: "/contact-us-landing",
    },
    {
        id: nanoid(),
        title: "landing 07",
        route: "/faqs-landing",
    },
    {
        id: nanoid(),
        title: "landing 08",
        route: "/pricing-landing",
    },
    {
        id: nanoid(),
        title: "landing 09",
        route: "/career-landing",
    },
];

export default Navbar;