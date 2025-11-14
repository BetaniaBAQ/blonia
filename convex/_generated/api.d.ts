/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as http from "../http.js";
import type * as userSpaces_mutations from "../userSpaces/mutations.js";
import type * as userSpaces_queries from "../userSpaces/queries.js";
import type * as userSpaces_validations from "../userSpaces/validations.js";
import type * as users_actions from "../users/actions.js";
import type * as users_mutations from "../users/mutations.js";
import type * as users_validations from "../users/validations.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  http: typeof http;
  "userSpaces/mutations": typeof userSpaces_mutations;
  "userSpaces/queries": typeof userSpaces_queries;
  "userSpaces/validations": typeof userSpaces_validations;
  "users/actions": typeof users_actions;
  "users/mutations": typeof users_mutations;
  "users/validations": typeof users_validations;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
