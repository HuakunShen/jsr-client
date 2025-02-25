// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type OptionsLegacyParser } from '@hey-api/client-fetch';
import type { CreateScopeData, CreateScopeError, CreateScopeResponse, GetScopeData, GetScopeError, GetScopeResponse, UpdateScopeData, UpdateScopeError, UpdateScopeResponse, DeleteScopeData, DeleteScopeError, DeleteScopeResponse, ListScopeMembersData, ListScopeMembersError, ListScopeMembersResponse, AddScopeMemberData, AddScopeMemberError, AddScopeMemberResponse, UpdateScopeMemberData, UpdateScopeMemberError, UpdateScopeMemberResponse, RemoveScopeMemberData, RemoveScopeMemberError, RemoveScopeMemberResponse, ListScopeInvitesData, ListScopeInvitesError, ListScopeInvitesResponse, DeleteScopeInviteData, DeleteScopeInviteError, DeleteScopeInviteResponse, ListPackagesData, ListPackagesError, ListPackagesResponse, ListScopePackagesData, ListScopePackagesError, ListScopePackagesResponse, CreatePackageData, CreatePackageError, CreatePackageResponse, GetPackageData, GetPackageError, GetPackageResponse, UpdatePackageData, UpdatePackageError, UpdatePackageResponse, DeletePackageData, DeletePackageError, DeletePackageResponse, ListPackageDependentsData, ListPackageDependentsError, ListPackageDependentsResponse, GetPackageScoreData, GetPackageScoreError, GetPackageScoreResponse, ListPackageVersionsData, ListPackageVersionsError, ListPackageVersionsResponse, GetPackageVersionData, GetPackageVersionError, GetPackageVersionResponse, CreatePackageVersionData, CreatePackageVersionError, CreatePackageVersionResponse, UpdatePackageVersionData, UpdatePackageVersionError, UpdatePackageVersionResponse, ListDependenciesData, ListDependenciesError, ListDependenciesResponse, GetSelfUserError, GetSelfUserResponse, ListSelfUserScopesError, ListSelfUserScopesResponse, GetSelfUserScopeMemberData, GetSelfUserScopeMemberError, GetSelfUserScopeMemberResponse, ListSelfUserInvitesError, ListSelfUserInvitesResponse, AcceptScopeInviteData, AcceptScopeInviteError, AcceptScopeInviteResponse, DeclineScopeInviteData, DeclineScopeInviteError, DeclineScopeInviteResponse, GetUserData, GetUserError, GetUserResponse, ListUserScopesData, ListUserScopesError, ListUserScopesResponse, CreateAuthorizationData, CreateAuthorizationError, CreateAuthorizationResponse2, GetAuthorizationDetailsData, GetAuthorizationDetailsError, GetAuthorizationDetailsResponse, ApproveAuthorizationData, ApproveAuthorizationError, ApproveAuthorizationResponse, DenyAuthorizationData, DenyAuthorizationError, DenyAuthorizationResponse, ExchangeAuthorizationCodeData, ExchangeAuthorizationCodeError, ExchangeAuthorizationCodeResponse, GetPublishingTaskData, GetPublishingTaskError, GetPublishingTaskResponse, GetStatsError, GetStatsResponse } from './types.gen';

export const client = createClient(createConfig());

/**
 * Create a new scope
 * Creates a new scope
 */
export const createScope = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateScopeData, ThrowOnError>) => {
    return (options?.client ?? client).post<CreateScopeResponse, CreateScopeError, ThrowOnError>({
        ...options,
        url: '/scopes'
    });
};

/**
 * Get scope details
 * Returns details of a scope
 */
export const getScope = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetScopeData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetScopeResponse, GetScopeError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}'
    });
};

/**
 * Update scope
 * Updates the details of a scope
 */
export const updateScope = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateScopeData, ThrowOnError>) => {
    return (options?.client ?? client).patch<UpdateScopeResponse, UpdateScopeError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}'
    });
};

/**
 * Delete scope
 * Deletes a scope if the scope has no packages
 */
export const deleteScope = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteScopeData, ThrowOnError>) => {
    return (options?.client ?? client).delete<DeleteScopeResponse, DeleteScopeError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}'
    });
};

/**
 * List scope members
 * Returns a list of members of a scope
 */
export const listScopeMembers = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListScopeMembersData, ThrowOnError>) => {
    return (options?.client ?? client).get<ListScopeMembersResponse, ListScopeMembersError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/members'
    });
};

/**
 * Add scope member
 * Invites a user to a scope
 */
export const addScopeMember = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<AddScopeMemberData, ThrowOnError>) => {
    return (options?.client ?? client).post<AddScopeMemberResponse, AddScopeMemberError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/members'
    });
};

/**
 * Update scope member
 * Updates the roles of a scope member
 */
export const updateScopeMember = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdateScopeMemberData, ThrowOnError>) => {
    return (options?.client ?? client).patch<UpdateScopeMemberResponse, UpdateScopeMemberError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/members/{userId}'
    });
};

/**
 * Remove scope member
 * Removes a member from a scope
 */
export const removeScopeMember = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<RemoveScopeMemberData, ThrowOnError>) => {
    return (options?.client ?? client).delete<RemoveScopeMemberResponse, RemoveScopeMemberError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/members/{userId}'
    });
};

/**
 * List scope invites
 * Returns a list of invites to a scope
 */
export const listScopeInvites = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListScopeInvitesData, ThrowOnError>) => {
    return (options?.client ?? client).get<ListScopeInvitesResponse, ListScopeInvitesError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/invites'
    });
};

/**
 * Delete scope invite
 * Deletes an invite to a scope
 */
export const deleteScopeInvite = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeleteScopeInviteData, ThrowOnError>) => {
    return (options?.client ?? client).delete<DeleteScopeInviteResponse, DeleteScopeInviteError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/invites/{userId}'
    });
};

/**
 * List packages
 * Returns a list of packages
 */
export const listPackages = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<ListPackagesData, ThrowOnError>) => {
    return (options?.client ?? client).get<ListPackagesResponse, ListPackagesError, ThrowOnError>({
        ...options,
        url: '/packages'
    });
};

/**
 * List scope packages
 * Returns a list of packages in a scope
 */
export const listScopePackages = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListScopePackagesData, ThrowOnError>) => {
    return (options?.client ?? client).get<ListScopePackagesResponse, ListScopePackagesError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/packages'
    });
};

/**
 * Create a new package
 * Creates a new package in a scope
 */
export const createPackage = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreatePackageData, ThrowOnError>) => {
    return (options?.client ?? client).post<CreatePackageResponse, CreatePackageError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/packages'
    });
};

/**
 * Get package details
 * Returns details of a package
 */
export const getPackage = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetPackageData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetPackageResponse, GetPackageError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/packages/{package}'
    });
};

/**
 * Update package
 * Updates the details of a package
 */
export const updatePackage = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdatePackageData, ThrowOnError>) => {
    return (options?.client ?? client).patch<UpdatePackageResponse, UpdatePackageError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/packages/{package}'
    });
};

/**
 * Delete package
 * Deletes a package if the package has no versions
 */
export const deletePackage = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeletePackageData, ThrowOnError>) => {
    return (options?.client ?? client).delete<DeletePackageResponse, DeletePackageError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/packages/{package}'
    });
};

/**
 * List package dependents
 * Returns a list of packages that depend on a package
 */
export const listPackageDependents = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListPackageDependentsData, ThrowOnError>) => {
    return (options?.client ?? client).get<ListPackageDependentsResponse, ListPackageDependentsError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/packages/{package}/dependents'
    });
};

/**
 * Get package score
 * Returns the package score details
 */
export const getPackageScore = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetPackageScoreData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetPackageScoreResponse, GetPackageScoreError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/packages/{package}/score'
    });
};

/**
 * List package versions
 * Returns a list of versions of a package
 */
export const listPackageVersions = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListPackageVersionsData, ThrowOnError>) => {
    return (options?.client ?? client).get<ListPackageVersionsResponse, ListPackageVersionsError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/packages/{package}/versions'
    });
};

/**
 * Get package version details
 * Returns details of a package version
 */
export const getPackageVersion = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetPackageVersionData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetPackageVersionResponse, GetPackageVersionError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/packages/{package}/versions/{version}'
    });
};

/**
 * Create a new package version
 * Creates a new version of a package
 */
export const createPackageVersion = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreatePackageVersionData, ThrowOnError>) => {
    return (options?.client ?? client).post<CreatePackageVersionResponse, CreatePackageVersionError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/packages/{package}/versions/{version}'
    });
};

/**
 * Update package version
 * Updates the details of a package version
 */
export const updatePackageVersion = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<UpdatePackageVersionData, ThrowOnError>) => {
    return (options?.client ?? client).patch<UpdatePackageVersionResponse, UpdatePackageVersionError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/packages/{package}/versions/{version}'
    });
};

/**
 * List the dependencies of a package version
 * Returns a list of dependencies of a package
 */
export const listDependencies = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListDependenciesData, ThrowOnError>) => {
    return (options?.client ?? client).get<ListDependenciesResponse, ListDependenciesError, ThrowOnError>({
        ...options,
        url: '/scopes/{scope}/packages/{package}/versions/{version}/dependencies'
    });
};

/**
 * Get authenticated user's details
 * Returns details of the authenticated user
 */
export const getSelfUser = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<GetSelfUserResponse, GetSelfUserError, ThrowOnError>({
        ...options,
        url: '/user'
    });
};

/**
 * List authenticated user's scopes
 * Returns a list of scopes that the authenticated user is a member of
 */
export const listSelfUserScopes = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<ListSelfUserScopesResponse, ListSelfUserScopesError, ThrowOnError>({
        ...options,
        url: '/user/scopes'
    });
};

/**
 * Get authenticated user's scope member details
 * Returns details of the authenticated user's membership of a scope
 */
export const getSelfUserScopeMember = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetSelfUserScopeMemberData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetSelfUserScopeMemberResponse, GetSelfUserScopeMemberError, ThrowOnError>({
        ...options,
        url: '/user/member/{scope}'
    });
};

/**
 * List authenticated user's scope invites
 * Returns a list of invites to scopes that the authenticated user has received
 */
export const listSelfUserInvites = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<ListSelfUserInvitesResponse, ListSelfUserInvitesError, ThrowOnError>({
        ...options,
        url: '/user/invites'
    });
};

/**
 * Accept scope invite
 * Accepts an invite to a scope
 */
export const acceptScopeInvite = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<AcceptScopeInviteData, ThrowOnError>) => {
    return (options?.client ?? client).post<AcceptScopeInviteResponse, AcceptScopeInviteError, ThrowOnError>({
        ...options,
        url: '/user/invites/{scope}'
    });
};

/**
 * Decline scope invite
 * Declines an invite to a scope
 */
export const declineScopeInvite = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DeclineScopeInviteData, ThrowOnError>) => {
    return (options?.client ?? client).delete<DeclineScopeInviteResponse, DeclineScopeInviteError, ThrowOnError>({
        ...options,
        url: '/user/invites/{scope}'
    });
};

/**
 * Get user details
 * Returns details of a user
 */
export const getUser = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetUserData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetUserResponse, GetUserError, ThrowOnError>({
        ...options,
        url: '/users/{id}'
    });
};

/**
 * List user's scopes
 * Returns a list of scopes that a user is a member of
 */
export const listUserScopes = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ListUserScopesData, ThrowOnError>) => {
    return (options?.client ?? client).get<ListUserScopesResponse, ListUserScopesError, ThrowOnError>({
        ...options,
        url: '/users/{id}/scopes'
    });
};

/**
 * Create authorization
 * Starts an authorization flow
 */
export const createAuthorization = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<CreateAuthorizationData, ThrowOnError>) => {
    return (options?.client ?? client).post<CreateAuthorizationResponse2, CreateAuthorizationError, ThrowOnError>({
        ...options,
        url: '/authorizations'
    });
};

/**
 * Get authorization details
 * Returns details of an authorization
 */
export const getAuthorizationDetails = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetAuthorizationDetailsData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetAuthorizationDetailsResponse, GetAuthorizationDetailsError, ThrowOnError>({
        ...options,
        url: '/authorizations/details/{code}'
    });
};

/**
 * Approve authorization
 * Approves an authorization
 */
export const approveAuthorization = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ApproveAuthorizationData, ThrowOnError>) => {
    return (options?.client ?? client).post<ApproveAuthorizationResponse, ApproveAuthorizationError, ThrowOnError>({
        ...options,
        url: '/authorizations/approve/{code}'
    });
};

/**
 * Deny authorization
 * Denies an authorization
 */
export const denyAuthorization = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<DenyAuthorizationData, ThrowOnError>) => {
    return (options?.client ?? client).post<DenyAuthorizationResponse, DenyAuthorizationError, ThrowOnError>({
        ...options,
        url: '/authorizations/deny/{code}'
    });
};

/**
 * Exchange authorization code for access token
 * Exchanges an authorization code for an access token
 */
export const exchangeAuthorizationCode = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<ExchangeAuthorizationCodeData, ThrowOnError>) => {
    return (options?.client ?? client).post<ExchangeAuthorizationCodeResponse, ExchangeAuthorizationCodeError, ThrowOnError>({
        ...options,
        url: '/authorizations/exchange'
    });
};

/**
 * Get publishing task details
 * Returns details of a publishing task
 */
export const getPublishingTask = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetPublishingTaskData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetPublishingTaskResponse, GetPublishingTaskError, ThrowOnError>({
        ...options,
        url: '/publishing_tasks/{id}'
    });
};

/**
 * Get stats
 * Returns stats about the registry
 */
export const getStats = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<GetStatsResponse, GetStatsError, ThrowOnError>({
        ...options,
        url: '/stats'
    });
};