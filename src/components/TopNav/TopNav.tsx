"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Profil from "@/components/Profil/Profil"
import Image from "next/image"
import johnDoe from "../../../public/john-doe.png"
import { userApi } from "@/utils/api"
import useSWR from "swr"
import { getUserId } from "@/utils/cookieDecode"

interface BreadcrumbItem {
    label: string
    href?: string
}

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const fetcher = async () => await userApi.getUserById(getUserId())

export default function TopNav() {
    const pathname = usePathname().split("/").map(capitalize).pop()

    const { data: user, error } = useSWR("user", fetcher, { suspense: true, fallbackData: null })

    const breadcrumbs: BreadcrumbItem[] = [
        { label: "Helstorm-track" },
        { label: pathname || "dashboard" },
    ]

    return (
        <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23] h-full">
            <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
                {breadcrumbs.map((item, index) => (
                    <div key={item.label} className="flex items-center">
                        {index > 0 && (
                            <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />
                        )}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
                <button
                    type="button"
                    className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
                >
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
                </button>

                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none"></DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
                    ></DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                        <Image
                            src={johnDoe}
                            alt="User avatar"
                            width={28}
                            height={28}
                            className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
                    >
                        {user ? (
                            <Profil
                                name={`${user.firstname} ${user.lastname}`}
                                role="Membre"
                                avatarSrc={johnDoe.src}
                                subscription="Gratuit"
                            />
                        ) : (
                            <p className="p-4 text-gray-500 dark:text-gray-400">
                                Loading user...
                            </p>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}
