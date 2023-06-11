import { NextPage } from "next";

export type TypeRoles = {
  isOnlyAdmin?: boolean;
}

export type NextAdminPage<P = {}> = NextPage<P> & TypeRoles;

export type TypeComponentAuthFields = {
  Component: TypeRoles;
}