import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const ScopeName = z.string();
const CreateScopeRequest = z
  .object({
    scope: ScopeName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/).optional(),
  })
  .passthrough();
const UserId = z.string();
const User = z
  .object({
    id: UserId.uuid(),
    name: z.string(),
    email: z.string().optional(),
    avatarUrl: z.string(),
    githubId: z.number().int().optional(),
    isBlocked: z.boolean().optional(),
    isStaff: z.boolean().optional(),
    scopeUsage: z.number().int().optional(),
    scopeLimit: z.number().int().optional(),
    inviteCount: z.number().int().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const Scope = z
  .object({
    scope: ScopeName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
    creator: User.optional(),
    quotas: z
      .object({
        packageUsage: z.number().int(),
        packageLimit: z.number().int(),
        newPackagePerWeekUsage: z.number().int(),
        newPackagePerWeekLimit: z.number().int(),
        publishAttemptsPerWeekUsage: z.number().int(),
        publishAttemptsPerWeekLimit: z.number().int(),
      })
      .partial()
      .passthrough()
      .optional(),
    ghActionsVerifyActor: z.boolean().optional(),
    requirePublishingFromCI: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const Error = z.object({ code: z.string(), message: z.string() }).passthrough();
const UpdateScopeRequest = z.union([
  z.object({ ghActionsVerifyActor: z.boolean() }).passthrough(),
  z.object({ requirePublishingFromCI: z.boolean() }).passthrough(),
]);
const ScopeMember = z
  .object({
    scope: ScopeName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
    user: User,
    isAdmin: z.boolean(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AddScopeMemberRequest = z
  .object({ githubLogin: z.string() })
  .passthrough();
const ScopeInvite = z
  .object({
    scope: ScopeName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
    targetUser: User.and(z.unknown()),
    inviter: User.and(z.unknown()),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const UpdateScopeMemberRequest = z
  .object({ isAdmin: z.boolean() })
  .passthrough();
const PackageName = z.string();
const RuntimeCompat = z
  .object({
    browser: z.boolean().nullable(),
    deno: z.boolean().nullable(),
    node: z.boolean().nullable(),
    workerd: z.boolean().nullable(),
    bun: z.boolean().nullable(),
  })
  .partial()
  .passthrough();
const GitHubRepository = z
  .object({ owner: z.string(), name: z.string() })
  .partial()
  .passthrough();
const Package = z
  .object({
    scope: ScopeName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
    name: PackageName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
    description: z.string(),
    runtimeCompat: RuntimeCompat.optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
    githubRepository: GitHubRepository.optional(),
    score: z.number().optional(),
  })
  .passthrough();
const CreatePackageRequest = z
  .object({ package: PackageName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/) })
  .passthrough();
const UpdatePackageRequest = z.union([
  z.object({ description: z.string().regex(/^.{0,250}$/) }).passthrough(),
  z
    .object({
      githubRepository: z
        .object({ owner: z.string(), repo: z.string() })
        .passthrough()
        .nullable(),
    })
    .passthrough(),
  z.object({ runtimeCompat: RuntimeCompat }).passthrough(),
  z.object({ isArchived: z.boolean() }).passthrough(),
]);
const Version = z.string();
const Dependent = z
  .object({
    scope: ScopeName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
    name: PackageName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
    versions: z.array(Version).optional(),
    totalVersions: z.number().int(),
  })
  .passthrough();
const PackageScore = z
  .object({
    hasReadme: z.boolean(),
    hasReadmeExamples: z.boolean(),
    allEntrypointsDocs: z.boolean(),
    percentageDocumentedSymbols: z.number(),
    allFastCheck: z.boolean(),
    hasProvenance: z.boolean(),
    hasDescription: z.boolean(),
    atLeastOneRuntimeCompatible: z.boolean(),
    multipleRuntimesCompatible: z.boolean(),
    total: z.number().int().optional(),
  })
  .passthrough();
const PackageVersion = z
  .object({
    scope: ScopeName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
    package: PackageName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/).optional(),
    version: Version,
    yanked: z.boolean(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
    rekorLogId: z.string().optional(),
  })
  .passthrough();
const PublishingTask = z
  .object({
    id: z.string().uuid(),
    status: z.enum([
      "pending",
      "processing",
      "processed",
      "success",
      "failure",
    ]),
    error: z
      .object({ code: z.string(), message: z.string() })
      .partial()
      .passthrough()
      .nullable(),
    userId: UserId.and(z.null()),
    packageScope: ScopeName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
    packageName: PackageName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
    packageVersion: Version,
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const UpdatePackageVersionRequest = z
  .object({ yanked: z.boolean() })
  .passthrough();
const Dependency = z
  .object({
    kind: z.enum(["jsr", "npm"]),
    name: z.string(),
    constraint: z.string(),
    path: z.string(),
  })
  .passthrough();
const Permission = z.union([
  z
    .object({
      permission: z.literal("package/publish"),
      scope: ScopeName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
    })
    .passthrough(),
  z
    .object({
      permission: z.literal("package/publish"),
      scope: ScopeName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      package: PackageName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
    })
    .passthrough(),
  z
    .object({
      permission: z.literal("package/publish"),
      scope: ScopeName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      package: PackageName.regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      version: Version,
      tarballHash: z.string(),
    })
    .passthrough(),
]);
const CreateAuthorizationRequest = z
  .object({
    challenge: z.string(),
    permissions: z.array(Permission).optional(),
  })
  .passthrough();
const CreateAuthorizationResponse = z
  .object({
    verificationUrl: z.string().optional(),
    code: z.string(),
    exchangeToken: z.string(),
    pollInterval: z.number().int(),
    expiresAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const Authorization = z
  .object({
    code: z.string(),
    permissions: z.array(Permission),
    expiresAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AuthorizationExchangeRequest = z
  .object({ exchangeToken: z.string(), verifier: z.string() })
  .passthrough();
const AuthorizationExchangeResponse = z
  .object({ token: z.string(), user: User.and(z.unknown()) })
  .passthrough();
const Stats = z
  .object({
    newest: z.array(Package),
    updated: z.array(PackageVersion),
    featured: z.array(Package),
  })
  .passthrough();

export const schemas = {
  ScopeName,
  CreateScopeRequest,
  UserId,
  User,
  Scope,
  Error,
  UpdateScopeRequest,
  ScopeMember,
  AddScopeMemberRequest,
  ScopeInvite,
  UpdateScopeMemberRequest,
  PackageName,
  RuntimeCompat,
  GitHubRepository,
  Package,
  CreatePackageRequest,
  UpdatePackageRequest,
  Version,
  Dependent,
  PackageScore,
  PackageVersion,
  PublishingTask,
  UpdatePackageVersionRequest,
  Dependency,
  Permission,
  CreateAuthorizationRequest,
  CreateAuthorizationResponse,
  Authorization,
  AuthorizationExchangeRequest,
  AuthorizationExchangeResponse,
  Stats,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/authorizations",
    alias: "createAuthorization",
    description: `Starts an authorization flow`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Authorization properties`,
        type: "Body",
        schema: CreateAuthorizationRequest,
      },
    ],
    response: CreateAuthorizationResponse,
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
    ],
  },
  {
    method: "post",
    path: "/authorizations/approve/:code",
    alias: "approveAuthorization",
    description: `Approves an authorization`,
    requestFormat: "json",
    parameters: [
      {
        name: "code",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 404,
        description: `Authorization not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "post",
    path: "/authorizations/deny/:code",
    alias: "denyAuthorization",
    description: `Denies an authorization`,
    requestFormat: "json",
    parameters: [
      {
        name: "code",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 404,
        description: `Authorization not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/authorizations/details/:code",
    alias: "getAuthorizationDetails",
    description: `Returns details of an authorization`,
    requestFormat: "json",
    parameters: [
      {
        name: "code",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Authorization,
    errors: [
      {
        status: 404,
        description: `Authorization not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "post",
    path: "/authorizations/exchange",
    alias: "exchangeAuthorizationCode",
    description: `Exchanges an authorization code for an access token`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: AuthorizationExchangeRequest,
      },
    ],
    response: AuthorizationExchangeResponse,
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/packages",
    alias: "listPackages",
    description: `Returns a list of packages`,
    requestFormat: "json",
    parameters: [
      {
        name: "limit",
        type: "Query",
        schema: z.number().int().gte(1).lte(100).optional().default(20),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().gte(1).optional().default(1),
      },
      {
        name: "query",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({ items: z.array(Package), total: z.number().int() })
      .partial()
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/publishing_tasks/:id",
    alias: "getPublishingTask",
    description: `Returns details of a publishing task`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: PublishingTask,
    errors: [
      {
        status: 404,
        description: `Publishing task not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "post",
    path: "/scopes",
    alias: "createScope",
    description: `Creates a new scope`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Scope properties`,
        type: "Body",
        schema: CreateScopeRequest,
      },
    ],
    response: Scope,
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/scopes/:scope",
    alias: "getScope",
    description: `Returns details of a scope`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
    ],
    response: Scope,
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 404,
        description: `Scope not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "patch",
    path: "/scopes/:scope",
    alias: "updateScope",
    description: `Updates the details of a scope`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Scope properties`,
        type: "Body",
        schema: UpdateScopeRequest,
      },
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
    ],
    response: Scope,
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 403,
        description: `User is not scope admin`,
        schema: Error,
      },
      {
        status: 404,
        description: `Scope not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "delete",
    path: "/scopes/:scope",
    alias: "deleteScope",
    description: `Deletes a scope if the scope has no packages`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid request / Scope has packages`,
        schema: Error,
      },
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 403,
        description: `User is not scope admin`,
        schema: Error,
      },
      {
        status: 404,
        description: `Scope not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/scopes/:scope/invites",
    alias: "listScopeInvites",
    description: `Returns a list of invites to a scope`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
    ],
    response: z.array(ScopeInvite),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 403,
        description: `User is not a scope admin`,
        schema: Error,
      },
      {
        status: 404,
        description: `Scope not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "delete",
    path: "/scopes/:scope/invites/:userId",
    alias: "deleteScopeInvite",
    description: `Deletes an invite to a scope`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "userId",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 403,
        description: `User is not a scope admin`,
        schema: Error,
      },
      {
        status: 404,
        description: `Scope or scope invite not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/scopes/:scope/members",
    alias: "listScopeMembers",
    description: `Returns a list of members of a scope`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
    ],
    response: z.array(ScopeMember),
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 404,
        description: `Scope not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "post",
    path: "/scopes/:scope/members",
    alias: "addScopeMember",
    description: `Invites a user to a scope`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Scope member properties`,
        type: "Body",
        schema: z.object({ githubLogin: z.string() }).passthrough(),
      },
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
    ],
    response: ScopeInvite,
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 403,
        description: `User is not scope admin`,
        schema: Error,
      },
      {
        status: 404,
        description: `Scope not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "patch",
    path: "/scopes/:scope/members/:userId",
    alias: "updateScopeMember",
    description: `Updates the roles of a scope member`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Scope member properties`,
        type: "Body",
        schema: z.object({ isAdmin: z.boolean() }).passthrough(),
      },
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "userId",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: ScopeMember,
    errors: [
      {
        status: 400,
        description: `Invalid request / Can not remove last scope admin`,
        schema: Error,
      },
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 403,
        description: `User is not a scope admin`,
        schema: Error,
      },
      {
        status: 404,
        description: `Scope or scope member not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "delete",
    path: "/scopes/:scope/members/:userId",
    alias: "removeScopeMember",
    description: `Removes a member from a scope`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "userId",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid request / Can not remove last scope admin`,
        schema: Error,
      },
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 403,
        description: `User is not a scope admin`,
        schema: Error,
      },
      {
        status: 404,
        description: `Scope or scope member not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/scopes/:scope/packages",
    alias: "listScopePackages",
    description: `Returns a list of packages in a scope`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().int().gte(1).lte(100).optional().default(20),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().gte(1).optional().default(1),
      },
    ],
    response: z
      .object({ items: z.array(Package), total: z.number().int() })
      .partial()
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
      {
        status: 404,
        description: `Scope not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "post",
    path: "/scopes/:scope/packages",
    alias: "createPackage",
    description: `Creates a new package in a scope`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Package properties`,
        type: "Body",
        schema: CreatePackageRequest,
      },
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
    ],
    response: Package,
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 403,
        description: `User is not a scope member`,
        schema: Error,
      },
      {
        status: 404,
        description: `Scope not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/scopes/:scope/packages/:package",
    alias: "getPackage",
    description: `Returns details of a package`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "package",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
    ],
    response: Package,
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
      {
        status: 404,
        description: `Package not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "patch",
    path: "/scopes/:scope/packages/:package",
    alias: "updatePackage",
    description: `Updates the details of a package`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Package properties`,
        type: "Body",
        schema: UpdatePackageRequest,
      },
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "package",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
    ],
    response: Package,
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 403,
        description: `User is not a scope member / User is not a scope admin`,
        schema: Error,
      },
      {
        status: 404,
        description: `Package not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "delete",
    path: "/scopes/:scope/packages/:package",
    alias: "deletePackage",
    description: `Deletes a package if the package has no versions`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "package",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid request / Package has versions`,
        schema: Error,
      },
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 403,
        description: `User is not a scope admin`,
        schema: Error,
      },
      {
        status: 404,
        description: `Package not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/scopes/:scope/packages/:package/dependents",
    alias: "listPackageDependents",
    description: `Returns a list of packages that depend on a package`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "package",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().int().gte(1).lte(100).optional().default(20),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().gte(1).optional().default(1),
      },
      {
        name: "versions_per_package_limit",
        type: "Query",
        schema: z.number().int().gte(1).lte(10).optional().default(10),
      },
    ],
    response: z
      .object({ items: z.array(Dependent), total: z.number().int() })
      .partial()
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
      {
        status: 404,
        description: `Package not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/scopes/:scope/packages/:package/score",
    alias: "getPackageScore",
    description: `Returns the package score details`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "package",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
    ],
    response: PackageScore,
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
      {
        status: 404,
        description: `Package not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/scopes/:scope/packages/:package/versions",
    alias: "listPackageVersions",
    description: `Returns a list of versions of a package`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "package",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
    ],
    response: z.array(PackageVersion),
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
      {
        status: 404,
        description: `Package not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/scopes/:scope/packages/:package/versions/:version",
    alias: "getPackageVersion",
    description: `Returns details of a package version`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "package",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "version",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: PackageVersion,
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
      {
        status: 404,
        description: `Package version not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "post",
    path: "/scopes/:scope/packages/:package/versions/:version",
    alias: "createPackageVersion",
    description: `Creates a new version of a package`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "package",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "version",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "config",
        type: "Query",
        schema: z.string(),
      },
    ],
    response: PublishingTask,
    errors: [
      {
        status: 400,
        description: `Invalid request / Package version already exists`,
        schema: Error,
      },
      {
        status: 401,
        description: `Unauthorized / User is not a scope member`,
        schema: Error,
      },
      {
        status: 403,
        description: `User is not a scope member`,
        schema: Error,
      },
      {
        status: 404,
        description: `Package not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "patch",
    path: "/scopes/:scope/packages/:package/versions/:version",
    alias: "updatePackageVersion",
    description: `Updates the details of a package version`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Package version properties`,
        type: "Body",
        schema: z.object({ yanked: z.boolean() }).passthrough(),
      },
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "package",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "version",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: PackageVersion,
    errors: [
      {
        status: 400,
        description: `Invalid request / Package version already exists`,
        schema: Error,
      },
      {
        status: 401,
        description: `Unauthorized / User is not a scope member`,
        schema: Error,
      },
      {
        status: 403,
        description: `User is not a scope member`,
        schema: Error,
      },
      {
        status: 404,
        description: `Package not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/scopes/:scope/packages/:package/versions/:version/dependencies",
    alias: "listDependencies",
    description: `Returns a list of dependencies of a package`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "package",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
      {
        name: "version",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.array(Dependency),
    errors: [
      {
        status: 400,
        description: `Invalid request`,
        schema: Error,
      },
      {
        status: 404,
        description: `Package not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/stats",
    alias: "getStats",
    description: `Returns stats about the registry`,
    requestFormat: "json",
    response: Stats,
  },
  {
    method: "get",
    path: "/user",
    alias: "getSelfUser",
    description: `Returns details of the authenticated user`,
    requestFormat: "json",
    response: User,
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/user/invites",
    alias: "listSelfUserInvites",
    description: `Returns a list of invites to scopes that the authenticated user has received`,
    requestFormat: "json",
    response: z.array(ScopeInvite),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
    ],
  },
  {
    method: "post",
    path: "/user/invites/:scope",
    alias: "acceptScopeInvite",
    description: `Accepts an invite to a scope`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
    ],
    response: ScopeMember,
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 404,
        description: `Scope invite not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "delete",
    path: "/user/invites/:scope",
    alias: "declineScopeInvite",
    description: `Declines an invite to a scope`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
      {
        status: 404,
        description: `Scope invite not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/user/member/:scope",
    alias: "getSelfUserScopeMember",
    description: `Returns details of the authenticated user&#x27;s membership of a scope`,
    requestFormat: "json",
    parameters: [
      {
        name: "scope",
        type: "Path",
        schema: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
      },
    ],
    response: ScopeMember,
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/user/scopes",
    alias: "listSelfUserScopes",
    description: `Returns a list of scopes that the authenticated user is a member of`,
    requestFormat: "json",
    response: z.array(Scope),
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/users/:id",
    alias: "getUser",
    description: `Returns details of a user`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: User,
    errors: [
      {
        status: 404,
        description: `User not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/users/:id/scopes",
    alias: "listUserScopes",
    description: `Returns a list of scopes that a user is a member of`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.array(Scope),
    errors: [
      {
        status: 404,
        description: `User not found`,
        schema: Error,
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
