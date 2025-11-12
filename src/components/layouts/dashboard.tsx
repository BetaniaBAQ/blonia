"use client";

import type { User } from "@workos/authkit-tanstack-react-start";
// import { Link } from "@tanstack/react-router";
import {
	// Bell,
	// FolderKanban,
	LogOut,
	Search,
	Settings,
	// Users,
	// Workflow,
} from "lucide-react";
import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "@/components/ui/sidebar";

// import { Logo } from './logo';

// type Module = "workflows" | "workspaces" | "users";

// Get user initials from name
const getInitials = (name: string) => {
	return name
		.split(" ")
		.slice(0, 2)
		.map((word) => word[0])
		.join("")
		.toUpperCase();
};

// const modules = [
// 	{
// 		id: "workflows" as Module,
// 		name: "Flujos de Trabajo",
// 		icon: Workflow,
// 		href: "/",
// 	},
// 	{
// 		id: "workspaces" as Module,
// 		name: "Espacios de Trabajo",
// 		icon: FolderKanban,
// 		href: "/workspaces",
// 	},
// 	{
// 		id: "users" as Module,
// 		name: "Directorio de Usuarios",
// 		icon: Users,
// 		href: "/users",
// 	},
// ];

export function DashboardLayout({
	user,
	children,
}: {
	user: User;
	children: React.ReactNode;
}) {
	const name = `${user?.firstName ?? "Sin Nombre"} ${user?.lastName ?? "Sin Apellido"}`;
	return (
		<SidebarProvider defaultOpen={true}>
			<Sidebar collapsible="icon">
				<SidebarHeader className="grid grid-cols-[2rem_max-content] gap-0 gap-x-2 items-center">
					<Avatar className="col-start-1 row-start-1 row-span-2 h-8 w-8">
						<AvatarImage src={user.profilePictureUrl || undefined} alt={name} />
						<AvatarFallback className="text-xs">
							{getInitials(name)}
						</AvatarFallback>
					</Avatar>
					<span className="col-start-2 text-sm font-semibold text-sidebar-foreground truncate group-data-[collapsible=icon]:hidden">
						{name}
					</span>
					<span className="col-start-2 text-xs text-muted-foreground truncate group-data-[collapsible=icon]:hidden">
						{user.email}
					</span>
					{/* <div className="flex items-center gap-3 px-0.5 py-2 w-fit">
						<div className="flex flex-col overflow-hidden "></div>
					</div> */}
				</SidebarHeader>

				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu>
								{/* {modules.map((module) => {
									const Icon = module.icon;
									// const isActive = pathname === module.href
									return (
										<SidebarMenuItem key={module.id}>
											<SidebarMenuButton
												asChild isActive={isActive}
												tooltip={module.name}
											>
												<Link href={module.href}>
													<Icon />
													<span>{module.name}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									);
								})} */}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>

				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton tooltip="Configuración">
								<Settings />
								<span>Configuración</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton
								tooltip="Cerrar Sesión"
								className="text-destructive hover:text-destructive data-[active=true]:text-destructive"
							>
								<LogOut />
								<span>Cerrar Sesión</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>

			<SidebarInset>
				{/* Header */}
				<header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6 gap-4">
					{/* <Logo /> */}

					<div className="flex items-center gap-4">
						<div className="relative w-96">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Buscar flujos, espacios o usuarios..."
								className="pl-10 bg-secondary border-input"
							/>
						</div>

						{/* <Button variant="ghost" size="icon">
							<Bell className="h-5 w-5" />
						</Button> */}
					</div>
				</header>

				{/* Content Area */}
				<main className="flex-1 overflow-auto p-6">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
