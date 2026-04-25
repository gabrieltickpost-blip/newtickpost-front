export type AppPermission =
  | "campanhas:read"
  | "conteudos:read"
  | "lotes:read"
  | "canais:read"
  | "analytics:read";

export type AppRole = "owner" | "marketing" | "financeiro" | "operacoes";

export interface WorkspaceUser {
  name: string;
  role: AppRole;
  avatarFallback: string;
  workspaceName: string;
}

const rolePermissions: Record<AppRole, readonly AppPermission[]> = {
  owner: [
    "campanhas:read",
    "conteudos:read",
    "lotes:read",
    "canais:read",
    "analytics:read",
  ],
  marketing: ["campanhas:read", "conteudos:read", "lotes:read", "canais:read"],
  financeiro: ["analytics:read"],
  operacoes: ["campanhas:read", "conteudos:read", "lotes:read"],
};

export const currentWorkspaceUser: WorkspaceUser = {
  name: "Gabriel Barbosa",
  role: "owner",
  avatarFallback: "GB",
  workspaceName: "Tickpost",
};

export function hasPermission(role: AppRole, permission: AppPermission) {
  return rolePermissions[role].includes(permission);
}
