export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string | Date; output: string | Date; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: { input: Record<string, unknown>; output: Record<string, unknown>; }
};

/** Represents a AuditLog record in the database. */
export type AuditLog = {
  __typename?: 'AuditLog';
  /** (Optional) action field of AuditLog. Type: String. */
  action?: Maybe<Scalars['String']['output']>;
  /** (Optional) Related Type record linked to this AuditLog. */
  actionType?: Maybe<Type>;
  /** (Optional) actionTypeId field of AuditLog. Type: String. */
  actionTypeId?: Maybe<Scalars['String']['output']>;
  /** (Optional) Related User record linked to this AuditLog. */
  actor?: Maybe<User>;
  /** (Optional) actorId field of AuditLog. Type: String. */
  actorId?: Maybe<Scalars['String']['output']>;
  /** (Optional) List of related AuditLog records linked to this AuditLog. */
  auditLogs: Array<AuditLog>;
  /** (Optional) Related BasicInformation record linked to this AuditLog. */
  basicInformation?: Maybe<BasicInformation>;
  /** (Optional) Related Company record linked to this AuditLog. */
  company?: Maybe<Company>;
  /** (Optional) createdAt field of AuditLog. Type: DateTime (ISO 8601). */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) Related Department record linked to this AuditLog. */
  department?: Maybe<Department>;
  /** (Optional) Related GroupOfCompany record linked to this AuditLog. */
  groupOfCompany?: Maybe<GroupOfCompany>;
  /** (Optional) Related Holiday record linked to this AuditLog. */
  holiday?: Maybe<Holiday>;
  /** Unique identifier of the AuditLog record. */
  id: Scalars['ID']['output'];
  /** (Optional) isActive field of AuditLog. Type: Boolean. */
  isActive?: Maybe<Scalars['Boolean']['output']>;
  /** (Optional) Related JobLevel record linked to this AuditLog. */
  jobLevel?: Maybe<JobLevel>;
  /** (Optional) Related Location record linked to this AuditLog. */
  location?: Maybe<Location>;
  /** (Optional) modelId field of AuditLog. Type: String. */
  modelId?: Maybe<Scalars['String']['output']>;
  /** (Optional) modelName field of AuditLog. Type: String. */
  modelName?: Maybe<Scalars['String']['output']>;
  /** (Optional) newDetails field of AuditLog. Type: JSON object. */
  newDetails?: Maybe<Scalars['Json']['output']>;
  /** (Optional) oldDetails field of AuditLog. Type: JSON object. */
  oldDetails?: Maybe<Scalars['Json']['output']>;
  /** (Optional) Related AuditLog record linked to this AuditLog. */
  parent?: Maybe<AuditLog>;
  /** (Optional) parentId field of AuditLog. Type: String. */
  parentId?: Maybe<Scalars['String']['output']>;
  /** (Optional) Related Permission record linked to this AuditLog. */
  permission?: Maybe<Permission>;
  /** (Optional) Related Position record linked to this AuditLog. */
  position?: Maybe<Position>;
  /** (Optional) Related Role record linked to this AuditLog. */
  role?: Maybe<Role>;
  /** (Optional) Related RolePermission record linked to this AuditLog. */
  rolePermission?: Maybe<RolePermission>;
  /** (Optional) Related ShiftingSchedule record linked to this AuditLog. */
  shiftSchedule?: Maybe<ShiftingSchedule>;
  /** (Optional) Related Status record linked to this AuditLog. */
  status?: Maybe<Status>;
  /** (Optional) timestamp field of AuditLog. Type: DateTime (ISO 8601). */
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) Related Type record linked to this AuditLog. */
  type?: Maybe<Type>;
  /** (Optional) updatedAt field of AuditLog. Type: DateTime (ISO 8601). */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) Related User record linked to this AuditLog. */
  user?: Maybe<User>;
  /** (Optional) Related UserRole record linked to this AuditLog. */
  userRole?: Maybe<UserRole>;
  /** (Optional) Related WorkInformation record linked to this AuditLog. */
  workInformation?: Maybe<WorkInformation>;
};

/** Input to connect an existing AuditLog record by its unique ID. Use this when you want to link to an already existing AuditLog without creating a new one. */
export type AuditLogConnectInput = {
  /** The unique identifier of the existing AuditLog record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new AuditLog record. Required fields must be provided. Relation fields support nested create or connect. */
export type AuditLogCreateInput = {
  /** (Optional) The action of the new AuditLog. Type: String. */
  action?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Type relation — create a new Type inline or connect to an existing one by ID. */
  actionType?: InputMaybe<TypeCreateOrConnectInput>;
  /** (Optional) The actionTypeId of the new AuditLog. Type: String. */
  actionTypeId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single User relation — create a new User inline or connect to an existing one by ID. */
  actor?: InputMaybe<UserCreateOrConnectInput>;
  /** (Optional) The actorId of the new AuditLog. Type: String. */
  actorId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Optional) Single BasicInformation relation — create a new BasicInformation inline or connect to an existing one by ID. */
  basicInformation?: InputMaybe<BasicInformationCreateOrConnectInput>;
  /** (Optional) Single Company relation — create a new Company inline or connect to an existing one by ID. */
  company?: InputMaybe<CompanyCreateOrConnectInput>;
  /** (Optional) The createdAt of the new AuditLog. Type: DateTime. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single Department relation — create a new Department inline or connect to an existing one by ID. */
  department?: InputMaybe<DepartmentCreateOrConnectInput>;
  /** (Optional) Single GroupOfCompany relation — create a new GroupOfCompany inline or connect to an existing one by ID. */
  groupOfCompany?: InputMaybe<GroupOfCompanyCreateOrConnectInput>;
  /** (Optional) Single Holiday relation — create a new Holiday inline or connect to an existing one by ID. */
  holiday?: InputMaybe<HolidayCreateOrConnectInput>;
  /** (Optional) The isActive of the new AuditLog. Type: Boolean. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Single JobLevel relation — create a new JobLevel inline or connect to an existing one by ID. */
  jobLevel?: InputMaybe<JobLevelCreateOrConnectInput>;
  /** (Optional) Single Location relation — create a new Location inline or connect to an existing one by ID. */
  location?: InputMaybe<LocationCreateOrConnectInput>;
  /** (Optional) The modelId of the new AuditLog. Type: String. */
  modelId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The modelName of the new AuditLog. Type: String. */
  modelName?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The newDetails of the new AuditLog. Type: Json. */
  newDetails?: InputMaybe<Scalars['Json']['input']>;
  /** (Optional) The oldDetails of the new AuditLog. Type: Json. */
  oldDetails?: InputMaybe<Scalars['Json']['input']>;
  /** (Optional) Single AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  parent?: InputMaybe<AuditLogCreateOrConnectInput>;
  /** (Optional) The parentId of the new AuditLog. Type: String. */
  parentId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Permission relation — create a new Permission inline or connect to an existing one by ID. */
  permission?: InputMaybe<PermissionCreateOrConnectInput>;
  /** (Optional) Single Position relation — create a new Position inline or connect to an existing one by ID. */
  position?: InputMaybe<PositionCreateOrConnectInput>;
  /** (Optional) Single Role relation — create a new Role inline or connect to an existing one by ID. */
  role?: InputMaybe<RoleCreateOrConnectInput>;
  /** (Optional) Single RolePermission relation — create a new RolePermission inline or connect to an existing one by ID. */
  rolePermission?: InputMaybe<RolePermissionCreateOrConnectInput>;
  /** (Optional) Single ShiftingSchedule relation — create a new ShiftingSchedule inline or connect to an existing one by ID. */
  shiftSchedule?: InputMaybe<ShiftingScheduleCreateOrConnectInput>;
  /** (Optional) Single Status relation — create a new Status inline or connect to an existing one by ID. */
  status?: InputMaybe<StatusCreateOrConnectInput>;
  /** (Optional) The timestamp of the new AuditLog. Type: DateTime. */
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single Type relation — create a new Type inline or connect to an existing one by ID. */
  type?: InputMaybe<TypeCreateOrConnectInput>;
  /** (Optional) The updatedAt of the new AuditLog. Type: DateTime. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single User relation — create a new User inline or connect to an existing one by ID. */
  user?: InputMaybe<UserCreateOrConnectInput>;
  /** (Optional) Single UserRole relation — create a new UserRole inline or connect to an existing one by ID. */
  userRole?: InputMaybe<UserRoleCreateOrConnectInput>;
  /** (Optional) Single WorkInformation relation — create a new WorkInformation inline or connect to an existing one by ID. */
  workInformation?: InputMaybe<WorkInformationCreateOrConnectInput>;
};

/** Either create a new AuditLog record or connect to an existing one. Provide 'create' to insert a new AuditLog, or 'connect' to link to an existing AuditLog by ID. Do not provide both. */
export type AuditLogCreateOrConnectInput = {
  /** Connect an existing AuditLog record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<AuditLogConnectInput>;
  /** Create a new AuditLog record and link it to the parent. Provide all required fields for AuditLog. */
  create?: InputMaybe<AuditLogCreateInput>;
};

/** Paginated response wrapper for AuditLog. Returns a paged list of AuditLog records with pagination metadata and counts. */
export type AuditLogDeletedListResponse = {
  __typename?: 'AuditLogDeletedListResponse';
  /** Operation result code for the AuditLog pagination query. e.g. 'AUDITLOG_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of AuditLog records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the AuditLog pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the AuditLog pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for AuditLog. Returns multiple AuditLog records along with operation status. */
export type AuditLogListResponse = {
  __typename?: 'AuditLogListResponse';
  /** Operation result code for the AuditLog list operation. e.g. 'AUDITLOG_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of AuditLog records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<AuditLog>>;
  /** Indicates whether the AuditLog list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the AuditLog list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying AuditLog records. Use this to control which page of results to return and how to filter the dataset. */
export type AuditLogPageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down AuditLog results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter AuditLog records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of AuditLog records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter AuditLog records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for AuditLog. Returns a paged list of AuditLog records with pagination metadata and counts. */
export type AuditLogPaginationResponse = {
  __typename?: 'AuditLogPaginationResponse';
  /** Total number of active (isActive: true) AuditLog records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of AuditLog records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the AuditLog pagination query. e.g. 'AUDITLOG_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of AuditLog records. Null if the query failed. */
  data?: Maybe<Array<AuditLog>>;
  /** Total number of inactive (isActive: false) AuditLog records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the AuditLog pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the AuditLog pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for AuditLog. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for AuditLog. Returns the created/updated/deleted AuditLog record along with operation status. */
export type AuditLogResponse = {
  __typename?: 'AuditLogResponse';
  /** Operation result code for AuditLog. e.g. 'AUDITLOG_CREATE_SUCCESS' or 'AUDITLOG_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The AuditLog record returned from the operation. Null if the operation failed. */
  data?: Maybe<AuditLog>;
  /** Indicates whether the AuditLog operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the AuditLog operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing AuditLog record. All fields are optional — only provided fields will be updated. */
export type AuditLogUpdateInput = {
  /** (Optional) Update the action of the AuditLog. Type: String. Leave empty to keep existing value. */
  action?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Type relation — update the related record inline or reconnect to a different Type by ID. */
  actionType?: InputMaybe<TypeUpdateOrConnectInput>;
  /** (Optional) Update the actionTypeId of the AuditLog. Type: String. Leave empty to keep existing value. */
  actionTypeId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single User relation — update the related record inline or reconnect to a different User by ID. */
  actor?: InputMaybe<UserUpdateOrConnectInput>;
  /** (Optional) Update the actorId of the AuditLog. Type: String. Leave empty to keep existing value. */
  actorId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Single BasicInformation relation — update the related record inline or reconnect to a different BasicInformation by ID. */
  basicInformation?: InputMaybe<BasicInformationUpdateOrConnectInput>;
  /** (Optional) Single Company relation — update the related record inline or reconnect to a different Company by ID. */
  company?: InputMaybe<CompanyUpdateOrConnectInput>;
  /** (Optional) Update the createdAt of the AuditLog. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single Department relation — update the related record inline or reconnect to a different Department by ID. */
  department?: InputMaybe<DepartmentUpdateOrConnectInput>;
  /** (Optional) Single GroupOfCompany relation — update the related record inline or reconnect to a different GroupOfCompany by ID. */
  groupOfCompany?: InputMaybe<GroupOfCompanyUpdateOrConnectInput>;
  /** (Optional) Single Holiday relation — update the related record inline or reconnect to a different Holiday by ID. */
  holiday?: InputMaybe<HolidayUpdateOrConnectInput>;
  /** (Optional) Update the id of the AuditLog. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the isActive of the AuditLog. Type: Boolean. Leave empty to keep existing value. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Single JobLevel relation — update the related record inline or reconnect to a different JobLevel by ID. */
  jobLevel?: InputMaybe<JobLevelUpdateOrConnectInput>;
  /** (Optional) Single Location relation — update the related record inline or reconnect to a different Location by ID. */
  location?: InputMaybe<LocationUpdateOrConnectInput>;
  /** (Optional) Update the modelId of the AuditLog. Type: String. Leave empty to keep existing value. */
  modelId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the modelName of the AuditLog. Type: String. Leave empty to keep existing value. */
  modelName?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the newDetails of the AuditLog. Type: Json. Leave empty to keep existing value. */
  newDetails?: InputMaybe<Scalars['Json']['input']>;
  /** (Optional) Update the oldDetails of the AuditLog. Type: Json. Leave empty to keep existing value. */
  oldDetails?: InputMaybe<Scalars['Json']['input']>;
  /** (Optional) Single AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  parent?: InputMaybe<AuditLogUpdateOrConnectInput>;
  /** (Optional) Update the parentId of the AuditLog. Type: String. Leave empty to keep existing value. */
  parentId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Permission relation — update the related record inline or reconnect to a different Permission by ID. */
  permission?: InputMaybe<PermissionUpdateOrConnectInput>;
  /** (Optional) Single Position relation — update the related record inline or reconnect to a different Position by ID. */
  position?: InputMaybe<PositionUpdateOrConnectInput>;
  /** (Optional) Single Role relation — update the related record inline or reconnect to a different Role by ID. */
  role?: InputMaybe<RoleUpdateOrConnectInput>;
  /** (Optional) Single RolePermission relation — update the related record inline or reconnect to a different RolePermission by ID. */
  rolePermission?: InputMaybe<RolePermissionUpdateOrConnectInput>;
  /** (Optional) Single ShiftingSchedule relation — update the related record inline or reconnect to a different ShiftingSchedule by ID. */
  shiftSchedule?: InputMaybe<ShiftingScheduleUpdateOrConnectInput>;
  /** (Optional) Single Status relation — update the related record inline or reconnect to a different Status by ID. */
  status?: InputMaybe<StatusUpdateOrConnectInput>;
  /** (Optional) Update the timestamp of the AuditLog. Type: DateTime. Leave empty to keep existing value. */
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single Type relation — update the related record inline or reconnect to a different Type by ID. */
  type?: InputMaybe<TypeUpdateOrConnectInput>;
  /** (Optional) Update the updatedAt of the AuditLog. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single User relation — update the related record inline or reconnect to a different User by ID. */
  user?: InputMaybe<UserUpdateOrConnectInput>;
  /** (Optional) Single UserRole relation — update the related record inline or reconnect to a different UserRole by ID. */
  userRole?: InputMaybe<UserRoleUpdateOrConnectInput>;
  /** (Optional) Single WorkInformation relation — update the related record inline or reconnect to a different WorkInformation by ID. */
  workInformation?: InputMaybe<WorkInformationUpdateOrConnectInput>;
};

/** Either update an existing related AuditLog record inline or reconnect to a different AuditLog by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing AuditLog. Do not provide both. */
export type AuditLogUpdateOrConnectInput = {
  /** Reconnect to a different existing AuditLog record by its unique ID. */
  connect?: InputMaybe<AuditLogConnectInput>;
  /** Update the fields of the related AuditLog record inline. Only provided fields will be changed. */
  update?: InputMaybe<AuditLogUpdateInput>;
};

/** Represents a BasicInformation record in the database. */
export type BasicInformation = {
  __typename?: 'BasicInformation';
  /** (Optional) address field of BasicInformation. Type: String. */
  address?: Maybe<Scalars['String']['output']>;
  /** (Optional) List of related AuditLog records linked to this BasicInformation. */
  auditLogs: Array<AuditLog>;
  /** (Optional) birthDate field of BasicInformation. Type: DateTime (ISO 8601). */
  birthDate?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) city field of BasicInformation. Type: String. */
  city?: Maybe<Scalars['String']['output']>;
  /** (Optional) country field of BasicInformation. Type: String. */
  country?: Maybe<Scalars['String']['output']>;
  /** (Optional) createdAt field of BasicInformation. Type: DateTime (ISO 8601). */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) firstName field of BasicInformation. Type: String. */
  firstName?: Maybe<Scalars['String']['output']>;
  /** (Optional) fullName field of BasicInformation. Type: String. */
  fullName?: Maybe<Scalars['String']['output']>;
  /** (Optional) gender field of BasicInformation. Type: String. */
  gender?: Maybe<Scalars['String']['output']>;
  /** Unique identifier of the BasicInformation record. */
  id: Scalars['ID']['output'];
  /** (Optional) isActive field of BasicInformation. Type: Boolean. */
  isActive?: Maybe<Scalars['Boolean']['output']>;
  /** (Optional) lastName field of BasicInformation. Type: String. */
  lastName?: Maybe<Scalars['String']['output']>;
  /** (Optional) middleName field of BasicInformation. Type: String. */
  middleName?: Maybe<Scalars['String']['output']>;
  /** (Optional) phoneNumber field of BasicInformation. Type: String. */
  phoneNumber?: Maybe<Scalars['String']['output']>;
  /** (Optional) province field of BasicInformation. Type: String. */
  province?: Maybe<Scalars['String']['output']>;
  /** (Optional) List of related WorkInformation records linked to this BasicInformation. */
  reportingManager: Array<WorkInformation>;
  /** (Optional) suffix field of BasicInformation. Type: String. */
  suffix?: Maybe<Scalars['String']['output']>;
  /** (Optional) updatedAt field of BasicInformation. Type: DateTime (ISO 8601). */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) Related User record linked to this BasicInformation. */
  user?: Maybe<User>;
  /** (Optional) userId field of BasicInformation. Type: String. */
  userId?: Maybe<Scalars['String']['output']>;
  /** (Optional) List of related WorkInformation records linked to this BasicInformation. */
  workInformations: Array<WorkInformation>;
};

/** Input to connect an existing BasicInformation record by its unique ID. Use this when you want to link to an already existing BasicInformation without creating a new one. */
export type BasicInformationConnectInput = {
  /** The unique identifier of the existing BasicInformation record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new BasicInformation record. Required fields must be provided. Relation fields support nested create or connect. */
export type BasicInformationCreateInput = {
  /** (Optional) The address of the new BasicInformation. Type: String. */
  address?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Optional) The birthDate of the new BasicInformation. Type: DateTime. */
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) The city of the new BasicInformation. Type: String. */
  city?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The country of the new BasicInformation. Type: String. */
  country?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The createdAt of the new BasicInformation. Type: DateTime. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) The firstName of the new BasicInformation. Type: String. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The fullName of the new BasicInformation. Type: String. */
  fullName?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The gender of the new BasicInformation. Type: String. */
  gender?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The isActive of the new BasicInformation. Type: Boolean. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) The lastName of the new BasicInformation. Type: String. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The middleName of the new BasicInformation. Type: String. */
  middleName?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The phoneNumber of the new BasicInformation. Type: String. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The province of the new BasicInformation. Type: String. */
  province?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of WorkInformation relation — create a new WorkInformation inline or connect to an existing one by ID. */
  reportingManager?: InputMaybe<Array<WorkInformationCreateOrConnectInput>>;
  /** (Optional) The suffix of the new BasicInformation. Type: String. */
  suffix?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The updatedAt of the new BasicInformation. Type: DateTime. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single User relation — create a new User inline or connect to an existing one by ID. */
  user?: InputMaybe<UserCreateOrConnectInput>;
  /** (Optional) The userId of the new BasicInformation. Type: String. */
  userId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of WorkInformation relation — create a new WorkInformation inline or connect to an existing one by ID. */
  workInformations?: InputMaybe<Array<WorkInformationCreateOrConnectInput>>;
};

/** Either create a new BasicInformation record or connect to an existing one. Provide 'create' to insert a new BasicInformation, or 'connect' to link to an existing BasicInformation by ID. Do not provide both. */
export type BasicInformationCreateOrConnectInput = {
  /** Connect an existing BasicInformation record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<BasicInformationConnectInput>;
  /** Create a new BasicInformation record and link it to the parent. Provide all required fields for BasicInformation. */
  create?: InputMaybe<BasicInformationCreateInput>;
};

/** Paginated response wrapper for BasicInformation. Returns a paged list of BasicInformation records with pagination metadata and counts. */
export type BasicInformationDeletedListResponse = {
  __typename?: 'BasicInformationDeletedListResponse';
  /** Operation result code for the BasicInformation pagination query. e.g. 'BASICINFORMATION_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of BasicInformation records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the BasicInformation pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the BasicInformation pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for BasicInformation. Returns multiple BasicInformation records along with operation status. */
export type BasicInformationListResponse = {
  __typename?: 'BasicInformationListResponse';
  /** Operation result code for the BasicInformation list operation. e.g. 'BASICINFORMATION_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of BasicInformation records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<BasicInformation>>;
  /** Indicates whether the BasicInformation list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the BasicInformation list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying BasicInformation records. Use this to control which page of results to return and how to filter the dataset. */
export type BasicInformationPageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down BasicInformation results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter BasicInformation records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of BasicInformation records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter BasicInformation records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for BasicInformation. Returns a paged list of BasicInformation records with pagination metadata and counts. */
export type BasicInformationPaginationResponse = {
  __typename?: 'BasicInformationPaginationResponse';
  /** Total number of active (isActive: true) BasicInformation records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of BasicInformation records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the BasicInformation pagination query. e.g. 'BASICINFORMATION_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of BasicInformation records. Null if the query failed. */
  data?: Maybe<Array<BasicInformation>>;
  /** Total number of inactive (isActive: false) BasicInformation records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the BasicInformation pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the BasicInformation pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for BasicInformation. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for BasicInformation. Returns the created/updated/deleted BasicInformation record along with operation status. */
export type BasicInformationResponse = {
  __typename?: 'BasicInformationResponse';
  /** Operation result code for BasicInformation. e.g. 'BASICINFORMATION_CREATE_SUCCESS' or 'BASICINFORMATION_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The BasicInformation record returned from the operation. Null if the operation failed. */
  data?: Maybe<BasicInformation>;
  /** Indicates whether the BasicInformation operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the BasicInformation operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing BasicInformation record. All fields are optional — only provided fields will be updated. */
export type BasicInformationUpdateInput = {
  /** (Optional) Update the address of the BasicInformation. Type: String. Leave empty to keep existing value. */
  address?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Update the birthDate of the BasicInformation. Type: DateTime. Leave empty to keep existing value. */
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the city of the BasicInformation. Type: String. Leave empty to keep existing value. */
  city?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the country of the BasicInformation. Type: String. Leave empty to keep existing value. */
  country?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the createdAt of the BasicInformation. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the firstName of the BasicInformation. Type: String. Leave empty to keep existing value. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the fullName of the BasicInformation. Type: String. Leave empty to keep existing value. */
  fullName?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the gender of the BasicInformation. Type: String. Leave empty to keep existing value. */
  gender?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the id of the BasicInformation. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the isActive of the BasicInformation. Type: Boolean. Leave empty to keep existing value. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Update the lastName of the BasicInformation. Type: String. Leave empty to keep existing value. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the middleName of the BasicInformation. Type: String. Leave empty to keep existing value. */
  middleName?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the phoneNumber of the BasicInformation. Type: String. Leave empty to keep existing value. */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the province of the BasicInformation. Type: String. Leave empty to keep existing value. */
  province?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of WorkInformation relation — update the related record inline or reconnect to a different WorkInformation by ID. */
  reportingManager?: InputMaybe<Array<WorkInformationUpdateOrConnectInput>>;
  /** (Optional) Update the suffix of the BasicInformation. Type: String. Leave empty to keep existing value. */
  suffix?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the updatedAt of the BasicInformation. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single User relation — update the related record inline or reconnect to a different User by ID. */
  user?: InputMaybe<UserUpdateOrConnectInput>;
  /** (Optional) Update the userId of the BasicInformation. Type: String. Leave empty to keep existing value. */
  userId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of WorkInformation relation — update the related record inline or reconnect to a different WorkInformation by ID. */
  workInformations?: InputMaybe<Array<WorkInformationUpdateOrConnectInput>>;
};

/** Either update an existing related BasicInformation record inline or reconnect to a different BasicInformation by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing BasicInformation. Do not provide both. */
export type BasicInformationUpdateOrConnectInput = {
  /** Reconnect to a different existing BasicInformation record by its unique ID. */
  connect?: InputMaybe<BasicInformationConnectInput>;
  /** Update the fields of the related BasicInformation record inline. Only provided fields will be changed. */
  update?: InputMaybe<BasicInformationUpdateInput>;
};

/** Represents a Company record in the database. */
export type Company = {
  __typename?: 'Company';
  /** (Optional) acronym field of Company. Type: String. */
  acronym?: Maybe<Scalars['String']['output']>;
  /** (Optional) List of related AuditLog records linked to this Company. */
  auditLogs: Array<AuditLog>;
  /** (Optional) conctactNumber field of Company. Type: String. */
  conctactNumber?: Maybe<Scalars['String']['output']>;
  /** (Required) createdAt field of Company. Type: DateTime (ISO 8601). */
  createdAt: Scalars['DateTime']['output'];
  /** (Optional) List of related Department records linked to this Company. */
  departments: Array<Department>;
  /** (Optional) description field of Company. Type: String. */
  description?: Maybe<Scalars['String']['output']>;
  /** (Optional) email field of Company. Type: String. */
  email?: Maybe<Scalars['String']['output']>;
  /** (Optional) Related GroupOfCompany record linked to this Company. */
  groupOfCompany?: Maybe<GroupOfCompany>;
  /** (Optional) groupOfCompanyId field of Company. Type: String. */
  groupOfCompanyId?: Maybe<Scalars['String']['output']>;
  /** Unique identifier of the Company record. */
  id: Scalars['ID']['output'];
  /** (Optional) List of related JobLevel records linked to this Company. */
  jobLevels: Array<JobLevel>;
  /** (Optional) Related Location record linked to this Company. */
  locations?: Maybe<Location>;
  /** (Optional) locationsid field of Company. Type: String. */
  locationsid?: Maybe<Scalars['String']['output']>;
  /** (Optional) logo field of Company. Type: String. */
  logo?: Maybe<Scalars['String']['output']>;
  /** (Optional) name field of Company. Type: String. */
  name?: Maybe<Scalars['String']['output']>;
  /** (Required) updatedAt field of Company. Type: DateTime (ISO 8601). */
  updatedAt: Scalars['DateTime']['output'];
  /** (Optional) List of related WorkInformation records linked to this Company. */
  workInformations: Array<WorkInformation>;
};

/** Input to connect an existing Company record by its unique ID. Use this when you want to link to an already existing Company without creating a new one. */
export type CompanyConnectInput = {
  /** The unique identifier of the existing Company record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new Company record. Required fields must be provided. Relation fields support nested create or connect. */
export type CompanyCreateInput = {
  /** (Optional) The acronym of the new Company. Type: String. */
  acronym?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Optional) The conctactNumber of the new Company. Type: String. */
  conctactNumber?: InputMaybe<Scalars['String']['input']>;
  /** (Required) The createdAt of the new Company. Type: DateTime. */
  createdAt: Scalars['DateTime']['input'];
  /** (Optional) List of Department relation — create a new Department inline or connect to an existing one by ID. */
  departments?: InputMaybe<Array<DepartmentCreateOrConnectInput>>;
  /** (Optional) The description of the new Company. Type: String. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The email of the new Company. Type: String. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single GroupOfCompany relation — create a new GroupOfCompany inline or connect to an existing one by ID. */
  groupOfCompany?: InputMaybe<GroupOfCompanyCreateOrConnectInput>;
  /** (Optional) The groupOfCompanyId of the new Company. Type: String. */
  groupOfCompanyId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of JobLevel relation — create a new JobLevel inline or connect to an existing one by ID. */
  jobLevels?: InputMaybe<Array<JobLevelCreateOrConnectInput>>;
  /** (Optional) Single Location relation — create a new Location inline or connect to an existing one by ID. */
  locations?: InputMaybe<LocationCreateOrConnectInput>;
  /** (Optional) The locationsid of the new Company. Type: String. */
  locationsid?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The logo of the new Company. Type: String. */
  logo?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The name of the new Company. Type: String. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Required) The updatedAt of the new Company. Type: DateTime. */
  updatedAt: Scalars['DateTime']['input'];
  /** (Optional) List of WorkInformation relation — create a new WorkInformation inline or connect to an existing one by ID. */
  workInformations?: InputMaybe<Array<WorkInformationCreateOrConnectInput>>;
};

/** Either create a new Company record or connect to an existing one. Provide 'create' to insert a new Company, or 'connect' to link to an existing Company by ID. Do not provide both. */
export type CompanyCreateOrConnectInput = {
  /** Connect an existing Company record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<CompanyConnectInput>;
  /** Create a new Company record and link it to the parent. Provide all required fields for Company. */
  create?: InputMaybe<CompanyCreateInput>;
};

/** Paginated response wrapper for Company. Returns a paged list of Company records with pagination metadata and counts. */
export type CompanyDeletedListResponse = {
  __typename?: 'CompanyDeletedListResponse';
  /** Operation result code for the Company pagination query. e.g. 'COMPANY_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Company records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the Company pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Company pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for Company. Returns multiple Company records along with operation status. */
export type CompanyListResponse = {
  __typename?: 'CompanyListResponse';
  /** Operation result code for the Company list operation. e.g. 'COMPANY_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of Company records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<Company>>;
  /** Indicates whether the Company list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Company list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying Company records. Use this to control which page of results to return and how to filter the dataset. */
export type CompanyPageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down Company results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter Company records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of Company records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter Company records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for Company. Returns a paged list of Company records with pagination metadata and counts. */
export type CompanyPaginationResponse = {
  __typename?: 'CompanyPaginationResponse';
  /** Total number of active (isActive: true) Company records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of Company records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the Company pagination query. e.g. 'COMPANY_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Company records. Null if the query failed. */
  data?: Maybe<Array<Company>>;
  /** Total number of inactive (isActive: false) Company records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the Company pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Company pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for Company. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for Company. Returns the created/updated/deleted Company record along with operation status. */
export type CompanyResponse = {
  __typename?: 'CompanyResponse';
  /** Operation result code for Company. e.g. 'COMPANY_CREATE_SUCCESS' or 'COMPANY_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The Company record returned from the operation. Null if the operation failed. */
  data?: Maybe<Company>;
  /** Indicates whether the Company operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Company operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing Company record. All fields are optional — only provided fields will be updated. */
export type CompanyUpdateInput = {
  /** (Optional) Update the acronym of the Company. Type: String. Leave empty to keep existing value. */
  acronym?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Update the conctactNumber of the Company. Type: String. Leave empty to keep existing value. */
  conctactNumber?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the createdAt of the Company. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of Department relation — update the related record inline or reconnect to a different Department by ID. */
  departments?: InputMaybe<Array<DepartmentUpdateOrConnectInput>>;
  /** (Optional) Update the description of the Company. Type: String. Leave empty to keep existing value. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the email of the Company. Type: String. Leave empty to keep existing value. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single GroupOfCompany relation — update the related record inline or reconnect to a different GroupOfCompany by ID. */
  groupOfCompany?: InputMaybe<GroupOfCompanyUpdateOrConnectInput>;
  /** (Optional) Update the groupOfCompanyId of the Company. Type: String. Leave empty to keep existing value. */
  groupOfCompanyId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the id of the Company. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of JobLevel relation — update the related record inline or reconnect to a different JobLevel by ID. */
  jobLevels?: InputMaybe<Array<JobLevelUpdateOrConnectInput>>;
  /** (Optional) Single Location relation — update the related record inline or reconnect to a different Location by ID. */
  locations?: InputMaybe<LocationUpdateOrConnectInput>;
  /** (Optional) Update the locationsid of the Company. Type: String. Leave empty to keep existing value. */
  locationsid?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the logo of the Company. Type: String. Leave empty to keep existing value. */
  logo?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the name of the Company. Type: String. Leave empty to keep existing value. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the updatedAt of the Company. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — update the related record inline or reconnect to a different WorkInformation by ID. */
  workInformations?: InputMaybe<Array<WorkInformationUpdateOrConnectInput>>;
};

/** Either update an existing related Company record inline or reconnect to a different Company by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing Company. Do not provide both. */
export type CompanyUpdateOrConnectInput = {
  /** Reconnect to a different existing Company record by its unique ID. */
  connect?: InputMaybe<CompanyConnectInput>;
  /** Update the fields of the related Company record inline. Only provided fields will be changed. */
  update?: InputMaybe<CompanyUpdateInput>;
};

export type DeletedItem = {
  __typename?: 'DeletedItem';
  /** Unique identifier of the deleted record. */
  id?: Maybe<Scalars['String']['output']>;
};

/** Represents a Department record in the database. */
export type Department = {
  __typename?: 'Department';
  /** (Optional) acronym field of Department. Type: String. */
  acronym?: Maybe<Scalars['String']['output']>;
  /** (Optional) List of related AuditLog records linked to this Department. */
  auditLogs: Array<AuditLog>;
  /** (Optional) Related Company record linked to this Department. */
  company?: Maybe<Company>;
  /** (Optional) companyId field of Department. Type: String. */
  companyId?: Maybe<Scalars['String']['output']>;
  /** (Optional) createdAt field of Department. Type: DateTime (ISO 8601). */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) description field of Department. Type: String. */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier of the Department record. */
  id: Scalars['ID']['output'];
  /** (Optional) isActive field of Department. Type: Boolean. */
  isActive?: Maybe<Scalars['Boolean']['output']>;
  /** (Optional) name field of Department. Type: String. */
  name?: Maybe<Scalars['String']['output']>;
  /** (Optional) updatedAt field of Department. Type: DateTime (ISO 8601). */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) List of related WorkInformation records linked to this Department. */
  workInformations: Array<WorkInformation>;
};

/** Input to connect an existing Department record by its unique ID. Use this when you want to link to an already existing Department without creating a new one. */
export type DepartmentConnectInput = {
  /** The unique identifier of the existing Department record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new Department record. Required fields must be provided. Relation fields support nested create or connect. */
export type DepartmentCreateInput = {
  /** (Optional) The acronym of the new Department. Type: String. */
  acronym?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Optional) Single Company relation — create a new Company inline or connect to an existing one by ID. */
  company?: InputMaybe<CompanyCreateOrConnectInput>;
  /** (Optional) The companyId of the new Department. Type: String. */
  companyId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The createdAt of the new Department. Type: DateTime. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) The description of the new Department. Type: String. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The isActive of the new Department. Type: Boolean. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) The name of the new Department. Type: String. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The updatedAt of the new Department. Type: DateTime. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — create a new WorkInformation inline or connect to an existing one by ID. */
  workInformations?: InputMaybe<Array<WorkInformationCreateOrConnectInput>>;
};

/** Either create a new Department record or connect to an existing one. Provide 'create' to insert a new Department, or 'connect' to link to an existing Department by ID. Do not provide both. */
export type DepartmentCreateOrConnectInput = {
  /** Connect an existing Department record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<DepartmentConnectInput>;
  /** Create a new Department record and link it to the parent. Provide all required fields for Department. */
  create?: InputMaybe<DepartmentCreateInput>;
};

/** Paginated response wrapper for Department. Returns a paged list of Department records with pagination metadata and counts. */
export type DepartmentDeletedListResponse = {
  __typename?: 'DepartmentDeletedListResponse';
  /** Operation result code for the Department pagination query. e.g. 'DEPARTMENT_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Department records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the Department pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Department pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for Department. Returns multiple Department records along with operation status. */
export type DepartmentListResponse = {
  __typename?: 'DepartmentListResponse';
  /** Operation result code for the Department list operation. e.g. 'DEPARTMENT_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of Department records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<Department>>;
  /** Indicates whether the Department list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Department list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying Department records. Use this to control which page of results to return and how to filter the dataset. */
export type DepartmentPageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down Department results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter Department records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of Department records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter Department records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for Department. Returns a paged list of Department records with pagination metadata and counts. */
export type DepartmentPaginationResponse = {
  __typename?: 'DepartmentPaginationResponse';
  /** Total number of active (isActive: true) Department records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of Department records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the Department pagination query. e.g. 'DEPARTMENT_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Department records. Null if the query failed. */
  data?: Maybe<Array<Department>>;
  /** Total number of inactive (isActive: false) Department records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the Department pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Department pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for Department. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for Department. Returns the created/updated/deleted Department record along with operation status. */
export type DepartmentResponse = {
  __typename?: 'DepartmentResponse';
  /** Operation result code for Department. e.g. 'DEPARTMENT_CREATE_SUCCESS' or 'DEPARTMENT_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The Department record returned from the operation. Null if the operation failed. */
  data?: Maybe<Department>;
  /** Indicates whether the Department operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Department operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing Department record. All fields are optional — only provided fields will be updated. */
export type DepartmentUpdateInput = {
  /** (Optional) Update the acronym of the Department. Type: String. Leave empty to keep existing value. */
  acronym?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Single Company relation — update the related record inline or reconnect to a different Company by ID. */
  company?: InputMaybe<CompanyUpdateOrConnectInput>;
  /** (Optional) Update the companyId of the Department. Type: String. Leave empty to keep existing value. */
  companyId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the createdAt of the Department. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the description of the Department. Type: String. Leave empty to keep existing value. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the id of the Department. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the isActive of the Department. Type: Boolean. Leave empty to keep existing value. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Update the name of the Department. Type: String. Leave empty to keep existing value. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the updatedAt of the Department. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — update the related record inline or reconnect to a different WorkInformation by ID. */
  workInformations?: InputMaybe<Array<WorkInformationUpdateOrConnectInput>>;
};

/** Either update an existing related Department record inline or reconnect to a different Department by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing Department. Do not provide both. */
export type DepartmentUpdateOrConnectInput = {
  /** Reconnect to a different existing Department record by its unique ID. */
  connect?: InputMaybe<DepartmentConnectInput>;
  /** Update the fields of the related Department record inline. Only provided fields will be changed. */
  update?: InputMaybe<DepartmentUpdateInput>;
};

/** Represents a GroupOfCompany record in the database. */
export type GroupOfCompany = {
  __typename?: 'GroupOfCompany';
  /** (Optional) acronym field of GroupOfCompany. Type: String. */
  acronym?: Maybe<Scalars['String']['output']>;
  /** (Optional) List of related AuditLog records linked to this GroupOfCompany. */
  auditLogs: Array<AuditLog>;
  /** (Optional) List of related Company records linked to this GroupOfCompany. */
  companies: Array<Company>;
  /** (Optional) createdAt field of GroupOfCompany. Type: DateTime (ISO 8601). */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) description field of GroupOfCompany. Type: String. */
  description?: Maybe<Scalars['String']['output']>;
  /** (Optional) Related Location record linked to this GroupOfCompany. */
  headquarters?: Maybe<Location>;
  /** (Optional) headquartersId field of GroupOfCompany. Type: String. */
  headquartersId?: Maybe<Scalars['String']['output']>;
  /** Unique identifier of the GroupOfCompany record. */
  id: Scalars['ID']['output'];
  /** (Optional) Related Type record linked to this GroupOfCompany. */
  industryType?: Maybe<Type>;
  /** (Optional) industryTypeId field of GroupOfCompany. Type: String. */
  industryTypeId?: Maybe<Scalars['String']['output']>;
  /** (Optional) isActive field of GroupOfCompany. Type: Boolean. */
  isActive?: Maybe<Scalars['Boolean']['output']>;
  /** (Optional) name field of GroupOfCompany. Type: String. */
  name?: Maybe<Scalars['String']['output']>;
  /** (Optional) updatedAt field of GroupOfCompany. Type: DateTime (ISO 8601). */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) List of related WorkInformation records linked to this GroupOfCompany. */
  workInformations: Array<WorkInformation>;
};

/** Input to connect an existing GroupOfCompany record by its unique ID. Use this when you want to link to an already existing GroupOfCompany without creating a new one. */
export type GroupOfCompanyConnectInput = {
  /** The unique identifier of the existing GroupOfCompany record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new GroupOfCompany record. Required fields must be provided. Relation fields support nested create or connect. */
export type GroupOfCompanyCreateInput = {
  /** (Optional) The acronym of the new GroupOfCompany. Type: String. */
  acronym?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Optional) List of Company relation — create a new Company inline or connect to an existing one by ID. */
  companies?: InputMaybe<Array<CompanyCreateOrConnectInput>>;
  /** (Optional) The createdAt of the new GroupOfCompany. Type: DateTime. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) The description of the new GroupOfCompany. Type: String. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Location relation — create a new Location inline or connect to an existing one by ID. */
  headquarters?: InputMaybe<LocationCreateOrConnectInput>;
  /** (Optional) The headquartersId of the new GroupOfCompany. Type: String. */
  headquartersId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Type relation — create a new Type inline or connect to an existing one by ID. */
  industryType?: InputMaybe<TypeCreateOrConnectInput>;
  /** (Optional) The industryTypeId of the new GroupOfCompany. Type: String. */
  industryTypeId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The isActive of the new GroupOfCompany. Type: Boolean. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) The name of the new GroupOfCompany. Type: String. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The updatedAt of the new GroupOfCompany. Type: DateTime. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — create a new WorkInformation inline or connect to an existing one by ID. */
  workInformations?: InputMaybe<Array<WorkInformationCreateOrConnectInput>>;
};

/** Either create a new GroupOfCompany record or connect to an existing one. Provide 'create' to insert a new GroupOfCompany, or 'connect' to link to an existing GroupOfCompany by ID. Do not provide both. */
export type GroupOfCompanyCreateOrConnectInput = {
  /** Connect an existing GroupOfCompany record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<GroupOfCompanyConnectInput>;
  /** Create a new GroupOfCompany record and link it to the parent. Provide all required fields for GroupOfCompany. */
  create?: InputMaybe<GroupOfCompanyCreateInput>;
};

/** Paginated response wrapper for GroupOfCompany. Returns a paged list of GroupOfCompany records with pagination metadata and counts. */
export type GroupOfCompanyDeletedListResponse = {
  __typename?: 'GroupOfCompanyDeletedListResponse';
  /** Operation result code for the GroupOfCompany pagination query. e.g. 'GROUPOFCOMPANY_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of GroupOfCompany records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the GroupOfCompany pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the GroupOfCompany pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for GroupOfCompany. Returns multiple GroupOfCompany records along with operation status. */
export type GroupOfCompanyListResponse = {
  __typename?: 'GroupOfCompanyListResponse';
  /** Operation result code for the GroupOfCompany list operation. e.g. 'GROUPOFCOMPANY_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of GroupOfCompany records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<GroupOfCompany>>;
  /** Indicates whether the GroupOfCompany list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the GroupOfCompany list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying GroupOfCompany records. Use this to control which page of results to return and how to filter the dataset. */
export type GroupOfCompanyPageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down GroupOfCompany results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter GroupOfCompany records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of GroupOfCompany records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter GroupOfCompany records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for GroupOfCompany. Returns a paged list of GroupOfCompany records with pagination metadata and counts. */
export type GroupOfCompanyPaginationResponse = {
  __typename?: 'GroupOfCompanyPaginationResponse';
  /** Total number of active (isActive: true) GroupOfCompany records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of GroupOfCompany records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the GroupOfCompany pagination query. e.g. 'GROUPOFCOMPANY_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of GroupOfCompany records. Null if the query failed. */
  data?: Maybe<Array<GroupOfCompany>>;
  /** Total number of inactive (isActive: false) GroupOfCompany records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the GroupOfCompany pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the GroupOfCompany pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for GroupOfCompany. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for GroupOfCompany. Returns the created/updated/deleted GroupOfCompany record along with operation status. */
export type GroupOfCompanyResponse = {
  __typename?: 'GroupOfCompanyResponse';
  /** Operation result code for GroupOfCompany. e.g. 'GROUPOFCOMPANY_CREATE_SUCCESS' or 'GROUPOFCOMPANY_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The GroupOfCompany record returned from the operation. Null if the operation failed. */
  data?: Maybe<GroupOfCompany>;
  /** Indicates whether the GroupOfCompany operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the GroupOfCompany operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing GroupOfCompany record. All fields are optional — only provided fields will be updated. */
export type GroupOfCompanyUpdateInput = {
  /** (Optional) Update the acronym of the GroupOfCompany. Type: String. Leave empty to keep existing value. */
  acronym?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) List of Company relation — update the related record inline or reconnect to a different Company by ID. */
  companies?: InputMaybe<Array<CompanyUpdateOrConnectInput>>;
  /** (Optional) Update the createdAt of the GroupOfCompany. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the description of the GroupOfCompany. Type: String. Leave empty to keep existing value. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Location relation — update the related record inline or reconnect to a different Location by ID. */
  headquarters?: InputMaybe<LocationUpdateOrConnectInput>;
  /** (Optional) Update the headquartersId of the GroupOfCompany. Type: String. Leave empty to keep existing value. */
  headquartersId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the id of the GroupOfCompany. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Type relation — update the related record inline or reconnect to a different Type by ID. */
  industryType?: InputMaybe<TypeUpdateOrConnectInput>;
  /** (Optional) Update the industryTypeId of the GroupOfCompany. Type: String. Leave empty to keep existing value. */
  industryTypeId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the isActive of the GroupOfCompany. Type: Boolean. Leave empty to keep existing value. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Update the name of the GroupOfCompany. Type: String. Leave empty to keep existing value. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the updatedAt of the GroupOfCompany. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — update the related record inline or reconnect to a different WorkInformation by ID. */
  workInformations?: InputMaybe<Array<WorkInformationUpdateOrConnectInput>>;
};

/** Either update an existing related GroupOfCompany record inline or reconnect to a different GroupOfCompany by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing GroupOfCompany. Do not provide both. */
export type GroupOfCompanyUpdateOrConnectInput = {
  /** Reconnect to a different existing GroupOfCompany record by its unique ID. */
  connect?: InputMaybe<GroupOfCompanyConnectInput>;
  /** Update the fields of the related GroupOfCompany record inline. Only provided fields will be changed. */
  update?: InputMaybe<GroupOfCompanyUpdateInput>;
};

/** Represents a Holiday record in the database. */
export type Holiday = {
  __typename?: 'Holiday';
  /** (Optional) List of related AuditLog records linked to this Holiday. */
  auditLogs: Array<AuditLog>;
  /** (Required) createdAt field of Holiday. Type: DateTime (ISO 8601). */
  createdAt: Scalars['DateTime']['output'];
  /** (Required) date field of Holiday. Type: DateTime (ISO 8601). */
  date: Scalars['DateTime']['output'];
  /** (Required) description field of Holiday. Type: String. */
  description: Scalars['String']['output'];
  /** Unique identifier of the Holiday record. */
  id: Scalars['ID']['output'];
  /** (Required) isRecurring field of Holiday. Type: Boolean. */
  isRecurring: Scalars['Boolean']['output'];
  /** (Required) name field of Holiday. Type: String. */
  name: Scalars['String']['output'];
  /** (Required) updatedAt field of Holiday. Type: DateTime (ISO 8601). */
  updatedAt: Scalars['DateTime']['output'];
};

/** Input to connect an existing Holiday record by its unique ID. Use this when you want to link to an already existing Holiday without creating a new one. */
export type HolidayConnectInput = {
  /** The unique identifier of the existing Holiday record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new Holiday record. Required fields must be provided. Relation fields support nested create or connect. */
export type HolidayCreateInput = {
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Required) The createdAt of the new Holiday. Type: DateTime. */
  createdAt: Scalars['DateTime']['input'];
  /** (Required) The date of the new Holiday. Type: DateTime. */
  date: Scalars['DateTime']['input'];
  /** (Required) The description of the new Holiday. Type: String. */
  description: Scalars['String']['input'];
  /** (Required) The isRecurring of the new Holiday. Type: Boolean. */
  isRecurring: Scalars['Boolean']['input'];
  /** (Required) The name of the new Holiday. Type: String. */
  name: Scalars['String']['input'];
  /** (Required) The updatedAt of the new Holiday. Type: DateTime. */
  updatedAt: Scalars['DateTime']['input'];
};

/** Either create a new Holiday record or connect to an existing one. Provide 'create' to insert a new Holiday, or 'connect' to link to an existing Holiday by ID. Do not provide both. */
export type HolidayCreateOrConnectInput = {
  /** Connect an existing Holiday record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<HolidayConnectInput>;
  /** Create a new Holiday record and link it to the parent. Provide all required fields for Holiday. */
  create?: InputMaybe<HolidayCreateInput>;
};

/** Paginated response wrapper for Holiday. Returns a paged list of Holiday records with pagination metadata and counts. */
export type HolidayDeletedListResponse = {
  __typename?: 'HolidayDeletedListResponse';
  /** Operation result code for the Holiday pagination query. e.g. 'HOLIDAY_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Holiday records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the Holiday pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Holiday pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for Holiday. Returns multiple Holiday records along with operation status. */
export type HolidayListResponse = {
  __typename?: 'HolidayListResponse';
  /** Operation result code for the Holiday list operation. e.g. 'HOLIDAY_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of Holiday records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<Holiday>>;
  /** Indicates whether the Holiday list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Holiday list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying Holiday records. Use this to control which page of results to return and how to filter the dataset. */
export type HolidayPageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down Holiday results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter Holiday records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of Holiday records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter Holiday records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for Holiday. Returns a paged list of Holiday records with pagination metadata and counts. */
export type HolidayPaginationResponse = {
  __typename?: 'HolidayPaginationResponse';
  /** Total number of active (isActive: true) Holiday records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of Holiday records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the Holiday pagination query. e.g. 'HOLIDAY_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Holiday records. Null if the query failed. */
  data?: Maybe<Array<Holiday>>;
  /** Total number of inactive (isActive: false) Holiday records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the Holiday pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Holiday pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for Holiday. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for Holiday. Returns the created/updated/deleted Holiday record along with operation status. */
export type HolidayResponse = {
  __typename?: 'HolidayResponse';
  /** Operation result code for Holiday. e.g. 'HOLIDAY_CREATE_SUCCESS' or 'HOLIDAY_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The Holiday record returned from the operation. Null if the operation failed. */
  data?: Maybe<Holiday>;
  /** Indicates whether the Holiday operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Holiday operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing Holiday record. All fields are optional — only provided fields will be updated. */
export type HolidayUpdateInput = {
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Update the createdAt of the Holiday. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the date of the Holiday. Type: DateTime. Leave empty to keep existing value. */
  date?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the description of the Holiday. Type: String. Leave empty to keep existing value. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the id of the Holiday. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the isRecurring of the Holiday. Type: Boolean. Leave empty to keep existing value. */
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Update the name of the Holiday. Type: String. Leave empty to keep existing value. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the updatedAt of the Holiday. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Either update an existing related Holiday record inline or reconnect to a different Holiday by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing Holiday. Do not provide both. */
export type HolidayUpdateOrConnectInput = {
  /** Reconnect to a different existing Holiday record by its unique ID. */
  connect?: InputMaybe<HolidayConnectInput>;
  /** Update the fields of the related Holiday record inline. Only provided fields will be changed. */
  update?: InputMaybe<HolidayUpdateInput>;
};

/** Represents a JobLevel record in the database. */
export type JobLevel = {
  __typename?: 'JobLevel';
  /** (Optional) acronym field of JobLevel. Type: String. */
  acronym?: Maybe<Scalars['String']['output']>;
  /** (Optional) List of related AuditLog records linked to this JobLevel. */
  auditLogs: Array<AuditLog>;
  /** (Optional) Related Company record linked to this JobLevel. */
  company?: Maybe<Company>;
  /** (Optional) companyId field of JobLevel. Type: String. */
  companyId?: Maybe<Scalars['String']['output']>;
  /** (Optional) createdAt field of JobLevel. Type: DateTime (ISO 8601). */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) description field of JobLevel. Type: String. */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier of the JobLevel record. */
  id: Scalars['ID']['output'];
  /** (Optional) isActive field of JobLevel. Type: Boolean. */
  isActive?: Maybe<Scalars['Boolean']['output']>;
  /** (Optional) Related Type record linked to this JobLevel. */
  jobcodeType?: Maybe<Type>;
  /** (Optional) jobcodeTypeId field of JobLevel. Type: String. */
  jobcodeTypeId?: Maybe<Scalars['String']['output']>;
  /** (Optional) name field of JobLevel. Type: String. */
  name?: Maybe<Scalars['String']['output']>;
  /** (Optional) updatedAt field of JobLevel. Type: DateTime (ISO 8601). */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) List of related WorkInformation records linked to this JobLevel. */
  workInformations: Array<WorkInformation>;
};

/** Input to connect an existing JobLevel record by its unique ID. Use this when you want to link to an already existing JobLevel without creating a new one. */
export type JobLevelConnectInput = {
  /** The unique identifier of the existing JobLevel record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new JobLevel record. Required fields must be provided. Relation fields support nested create or connect. */
export type JobLevelCreateInput = {
  /** (Optional) The acronym of the new JobLevel. Type: String. */
  acronym?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Optional) Single Company relation — create a new Company inline or connect to an existing one by ID. */
  company?: InputMaybe<CompanyCreateOrConnectInput>;
  /** (Optional) The companyId of the new JobLevel. Type: String. */
  companyId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The createdAt of the new JobLevel. Type: DateTime. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) The description of the new JobLevel. Type: String. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The isActive of the new JobLevel. Type: Boolean. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Single Type relation — create a new Type inline or connect to an existing one by ID. */
  jobcodeType?: InputMaybe<TypeCreateOrConnectInput>;
  /** (Optional) The jobcodeTypeId of the new JobLevel. Type: String. */
  jobcodeTypeId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The name of the new JobLevel. Type: String. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The updatedAt of the new JobLevel. Type: DateTime. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — create a new WorkInformation inline or connect to an existing one by ID. */
  workInformations?: InputMaybe<Array<WorkInformationCreateOrConnectInput>>;
};

/** Either create a new JobLevel record or connect to an existing one. Provide 'create' to insert a new JobLevel, or 'connect' to link to an existing JobLevel by ID. Do not provide both. */
export type JobLevelCreateOrConnectInput = {
  /** Connect an existing JobLevel record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<JobLevelConnectInput>;
  /** Create a new JobLevel record and link it to the parent. Provide all required fields for JobLevel. */
  create?: InputMaybe<JobLevelCreateInput>;
};

/** Paginated response wrapper for JobLevel. Returns a paged list of JobLevel records with pagination metadata and counts. */
export type JobLevelDeletedListResponse = {
  __typename?: 'JobLevelDeletedListResponse';
  /** Operation result code for the JobLevel pagination query. e.g. 'JOBLEVEL_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of JobLevel records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the JobLevel pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the JobLevel pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for JobLevel. Returns multiple JobLevel records along with operation status. */
export type JobLevelListResponse = {
  __typename?: 'JobLevelListResponse';
  /** Operation result code for the JobLevel list operation. e.g. 'JOBLEVEL_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of JobLevel records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<JobLevel>>;
  /** Indicates whether the JobLevel list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the JobLevel list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying JobLevel records. Use this to control which page of results to return and how to filter the dataset. */
export type JobLevelPageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down JobLevel results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter JobLevel records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of JobLevel records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter JobLevel records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for JobLevel. Returns a paged list of JobLevel records with pagination metadata and counts. */
export type JobLevelPaginationResponse = {
  __typename?: 'JobLevelPaginationResponse';
  /** Total number of active (isActive: true) JobLevel records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of JobLevel records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the JobLevel pagination query. e.g. 'JOBLEVEL_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of JobLevel records. Null if the query failed. */
  data?: Maybe<Array<JobLevel>>;
  /** Total number of inactive (isActive: false) JobLevel records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the JobLevel pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the JobLevel pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for JobLevel. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for JobLevel. Returns the created/updated/deleted JobLevel record along with operation status. */
export type JobLevelResponse = {
  __typename?: 'JobLevelResponse';
  /** Operation result code for JobLevel. e.g. 'JOBLEVEL_CREATE_SUCCESS' or 'JOBLEVEL_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The JobLevel record returned from the operation. Null if the operation failed. */
  data?: Maybe<JobLevel>;
  /** Indicates whether the JobLevel operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the JobLevel operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing JobLevel record. All fields are optional — only provided fields will be updated. */
export type JobLevelUpdateInput = {
  /** (Optional) Update the acronym of the JobLevel. Type: String. Leave empty to keep existing value. */
  acronym?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Single Company relation — update the related record inline or reconnect to a different Company by ID. */
  company?: InputMaybe<CompanyUpdateOrConnectInput>;
  /** (Optional) Update the companyId of the JobLevel. Type: String. Leave empty to keep existing value. */
  companyId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the createdAt of the JobLevel. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the description of the JobLevel. Type: String. Leave empty to keep existing value. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the id of the JobLevel. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the isActive of the JobLevel. Type: Boolean. Leave empty to keep existing value. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Single Type relation — update the related record inline or reconnect to a different Type by ID. */
  jobcodeType?: InputMaybe<TypeUpdateOrConnectInput>;
  /** (Optional) Update the jobcodeTypeId of the JobLevel. Type: String. Leave empty to keep existing value. */
  jobcodeTypeId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the name of the JobLevel. Type: String. Leave empty to keep existing value. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the updatedAt of the JobLevel. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — update the related record inline or reconnect to a different WorkInformation by ID. */
  workInformations?: InputMaybe<Array<WorkInformationUpdateOrConnectInput>>;
};

/** Either update an existing related JobLevel record inline or reconnect to a different JobLevel by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing JobLevel. Do not provide both. */
export type JobLevelUpdateOrConnectInput = {
  /** Reconnect to a different existing JobLevel record by its unique ID. */
  connect?: InputMaybe<JobLevelConnectInput>;
  /** Update the fields of the related JobLevel record inline. Only provided fields will be changed. */
  update?: InputMaybe<JobLevelUpdateInput>;
};

/** Represents a Location record in the database. */
export type Location = {
  __typename?: 'Location';
  /** (Optional) List of related AuditLog records linked to this Location. */
  auditLogs: Array<AuditLog>;
  /** (Optional) List of related Company records linked to this Location. */
  companiesLocation: Array<Company>;
  /** (Optional) createdAt field of Location. Type: DateTime (ISO 8601). */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) description field of Location. Type: String. */
  description?: Maybe<Scalars['String']['output']>;
  /** (Optional) List of related GroupOfCompany records linked to this Location. */
  groupOfCompaniesLocation: Array<GroupOfCompany>;
  /** Unique identifier of the Location record. */
  id: Scalars['ID']['output'];
  /** (Optional) isActive field of Location. Type: Boolean. */
  isActive?: Maybe<Scalars['Boolean']['output']>;
  /** (Optional) name field of Location. Type: String. */
  name?: Maybe<Scalars['String']['output']>;
  /** (Optional) updatedAt field of Location. Type: DateTime (ISO 8601). */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) List of related WorkInformation records linked to this Location. */
  workInformations: Array<WorkInformation>;
};

/** Input to connect an existing Location record by its unique ID. Use this when you want to link to an already existing Location without creating a new one. */
export type LocationConnectInput = {
  /** The unique identifier of the existing Location record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new Location record. Required fields must be provided. Relation fields support nested create or connect. */
export type LocationCreateInput = {
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Optional) List of Company relation — create a new Company inline or connect to an existing one by ID. */
  companiesLocation?: InputMaybe<Array<CompanyCreateOrConnectInput>>;
  /** (Optional) The createdAt of the new Location. Type: DateTime. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) The description of the new Location. Type: String. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of GroupOfCompany relation — create a new GroupOfCompany inline or connect to an existing one by ID. */
  groupOfCompaniesLocation?: InputMaybe<Array<GroupOfCompanyCreateOrConnectInput>>;
  /** (Optional) The isActive of the new Location. Type: Boolean. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) The name of the new Location. Type: String. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The updatedAt of the new Location. Type: DateTime. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — create a new WorkInformation inline or connect to an existing one by ID. */
  workInformations?: InputMaybe<Array<WorkInformationCreateOrConnectInput>>;
};

/** Either create a new Location record or connect to an existing one. Provide 'create' to insert a new Location, or 'connect' to link to an existing Location by ID. Do not provide both. */
export type LocationCreateOrConnectInput = {
  /** Connect an existing Location record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<LocationConnectInput>;
  /** Create a new Location record and link it to the parent. Provide all required fields for Location. */
  create?: InputMaybe<LocationCreateInput>;
};

/** Paginated response wrapper for Location. Returns a paged list of Location records with pagination metadata and counts. */
export type LocationDeletedListResponse = {
  __typename?: 'LocationDeletedListResponse';
  /** Operation result code for the Location pagination query. e.g. 'LOCATION_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Location records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the Location pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Location pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for Location. Returns multiple Location records along with operation status. */
export type LocationListResponse = {
  __typename?: 'LocationListResponse';
  /** Operation result code for the Location list operation. e.g. 'LOCATION_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of Location records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<Location>>;
  /** Indicates whether the Location list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Location list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying Location records. Use this to control which page of results to return and how to filter the dataset. */
export type LocationPageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down Location results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter Location records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of Location records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter Location records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for Location. Returns a paged list of Location records with pagination metadata and counts. */
export type LocationPaginationResponse = {
  __typename?: 'LocationPaginationResponse';
  /** Total number of active (isActive: true) Location records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of Location records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the Location pagination query. e.g. 'LOCATION_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Location records. Null if the query failed. */
  data?: Maybe<Array<Location>>;
  /** Total number of inactive (isActive: false) Location records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the Location pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Location pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for Location. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for Location. Returns the created/updated/deleted Location record along with operation status. */
export type LocationResponse = {
  __typename?: 'LocationResponse';
  /** Operation result code for Location. e.g. 'LOCATION_CREATE_SUCCESS' or 'LOCATION_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The Location record returned from the operation. Null if the operation failed. */
  data?: Maybe<Location>;
  /** Indicates whether the Location operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Location operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing Location record. All fields are optional — only provided fields will be updated. */
export type LocationUpdateInput = {
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) List of Company relation — update the related record inline or reconnect to a different Company by ID. */
  companiesLocation?: InputMaybe<Array<CompanyUpdateOrConnectInput>>;
  /** (Optional) Update the createdAt of the Location. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the description of the Location. Type: String. Leave empty to keep existing value. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of GroupOfCompany relation — update the related record inline or reconnect to a different GroupOfCompany by ID. */
  groupOfCompaniesLocation?: InputMaybe<Array<GroupOfCompanyUpdateOrConnectInput>>;
  /** (Optional) Update the id of the Location. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the isActive of the Location. Type: Boolean. Leave empty to keep existing value. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Update the name of the Location. Type: String. Leave empty to keep existing value. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the updatedAt of the Location. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — update the related record inline or reconnect to a different WorkInformation by ID. */
  workInformations?: InputMaybe<Array<WorkInformationUpdateOrConnectInput>>;
};

/** Either update an existing related Location record inline or reconnect to a different Location by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing Location. Do not provide both. */
export type LocationUpdateOrConnectInput = {
  /** Reconnect to a different existing Location record by its unique ID. */
  connect?: InputMaybe<LocationConnectInput>;
  /** Update the fields of the related Location record inline. Only provided fields will be changed. */
  update?: InputMaybe<LocationUpdateInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Soft-delete a AuditLog record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  AuditLogArchive?: Maybe<AuditLogResponse>;
  /** Soft-delete multiple AuditLog records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  AuditLogArchiveMany?: Maybe<AuditLogListResponse>;
  /** Create a new AuditLog record. Triggers a real-time subscription event on success. */
  AuditLogCreate?: Maybe<AuditLogResponse>;
  /** Create multiple AuditLog records in a single operation. Each created record triggers an individual real-time subscription event. */
  AuditLogCreateMany?: Maybe<AuditLogListResponse>;
  /** Permanently delete a AuditLog record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  AuditLogRemove?: Maybe<AuditLogResponse>;
  /** Permanently delete multiple AuditLog records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  AuditLogRemoveMany?: Maybe<AuditLogDeletedListResponse>;
  /** Restore a previously archived AuditLog record by setting it back to active. Triggers a real-time subscription event on success. */
  AuditLogRestore?: Maybe<AuditLogResponse>;
  /** Restore multiple previously archived AuditLog records back to active. Each restored record triggers an individual real-time subscription event. */
  AuditLogRestoreMany?: Maybe<AuditLogListResponse>;
  /** Update an existing AuditLog record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  AuditLogUpdate?: Maybe<AuditLogResponse>;
  /** Update multiple AuditLog records in a single operation. Each updated record triggers an individual real-time subscription event. */
  AuditLogUpdateMany?: Maybe<AuditLogListResponse>;
  /** Soft-delete a BasicInformation record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  BasicInformationArchive?: Maybe<BasicInformationResponse>;
  /** Soft-delete multiple BasicInformation records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  BasicInformationArchiveMany?: Maybe<BasicInformationListResponse>;
  /** Create a new BasicInformation record. Triggers a real-time subscription event on success. */
  BasicInformationCreate?: Maybe<BasicInformationResponse>;
  /** Create multiple BasicInformation records in a single operation. Each created record triggers an individual real-time subscription event. */
  BasicInformationCreateMany?: Maybe<BasicInformationListResponse>;
  /** Permanently delete a BasicInformation record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  BasicInformationRemove?: Maybe<BasicInformationResponse>;
  /** Permanently delete multiple BasicInformation records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  BasicInformationRemoveMany?: Maybe<BasicInformationDeletedListResponse>;
  /** Restore a previously archived BasicInformation record by setting it back to active. Triggers a real-time subscription event on success. */
  BasicInformationRestore?: Maybe<BasicInformationResponse>;
  /** Restore multiple previously archived BasicInformation records back to active. Each restored record triggers an individual real-time subscription event. */
  BasicInformationRestoreMany?: Maybe<BasicInformationListResponse>;
  /** Update an existing BasicInformation record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  BasicInformationUpdate?: Maybe<BasicInformationResponse>;
  /** Update multiple BasicInformation records in a single operation. Each updated record triggers an individual real-time subscription event. */
  BasicInformationUpdateMany?: Maybe<BasicInformationListResponse>;
  /** Soft-delete a Company record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  CompanyArchive?: Maybe<CompanyResponse>;
  /** Soft-delete multiple Company records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  CompanyArchiveMany?: Maybe<CompanyListResponse>;
  /** Create a new Company record. Triggers a real-time subscription event on success. */
  CompanyCreate?: Maybe<CompanyResponse>;
  /** Create multiple Company records in a single operation. Each created record triggers an individual real-time subscription event. */
  CompanyCreateMany?: Maybe<CompanyListResponse>;
  /** Permanently delete a Company record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  CompanyRemove?: Maybe<CompanyResponse>;
  /** Permanently delete multiple Company records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  CompanyRemoveMany?: Maybe<CompanyDeletedListResponse>;
  /** Restore a previously archived Company record by setting it back to active. Triggers a real-time subscription event on success. */
  CompanyRestore?: Maybe<CompanyResponse>;
  /** Restore multiple previously archived Company records back to active. Each restored record triggers an individual real-time subscription event. */
  CompanyRestoreMany?: Maybe<CompanyListResponse>;
  /** Update an existing Company record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  CompanyUpdate?: Maybe<CompanyResponse>;
  /** Update multiple Company records in a single operation. Each updated record triggers an individual real-time subscription event. */
  CompanyUpdateMany?: Maybe<CompanyListResponse>;
  /** Soft-delete a Department record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  DepartmentArchive?: Maybe<DepartmentResponse>;
  /** Soft-delete multiple Department records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  DepartmentArchiveMany?: Maybe<DepartmentListResponse>;
  /** Create a new Department record. Triggers a real-time subscription event on success. */
  DepartmentCreate?: Maybe<DepartmentResponse>;
  /** Create multiple Department records in a single operation. Each created record triggers an individual real-time subscription event. */
  DepartmentCreateMany?: Maybe<DepartmentListResponse>;
  /** Permanently delete a Department record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  DepartmentRemove?: Maybe<DepartmentResponse>;
  /** Permanently delete multiple Department records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  DepartmentRemoveMany?: Maybe<DepartmentDeletedListResponse>;
  /** Restore a previously archived Department record by setting it back to active. Triggers a real-time subscription event on success. */
  DepartmentRestore?: Maybe<DepartmentResponse>;
  /** Restore multiple previously archived Department records back to active. Each restored record triggers an individual real-time subscription event. */
  DepartmentRestoreMany?: Maybe<DepartmentListResponse>;
  /** Update an existing Department record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  DepartmentUpdate?: Maybe<DepartmentResponse>;
  /** Update multiple Department records in a single operation. Each updated record triggers an individual real-time subscription event. */
  DepartmentUpdateMany?: Maybe<DepartmentListResponse>;
  /** Soft-delete a GroupOfCompany record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  GroupOfCompanyArchive?: Maybe<GroupOfCompanyResponse>;
  /** Soft-delete multiple GroupOfCompany records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  GroupOfCompanyArchiveMany?: Maybe<GroupOfCompanyListResponse>;
  /** Create a new GroupOfCompany record. Triggers a real-time subscription event on success. */
  GroupOfCompanyCreate?: Maybe<GroupOfCompanyResponse>;
  /** Create multiple GroupOfCompany records in a single operation. Each created record triggers an individual real-time subscription event. */
  GroupOfCompanyCreateMany?: Maybe<GroupOfCompanyListResponse>;
  /** Permanently delete a GroupOfCompany record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  GroupOfCompanyRemove?: Maybe<GroupOfCompanyResponse>;
  /** Permanently delete multiple GroupOfCompany records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  GroupOfCompanyRemoveMany?: Maybe<GroupOfCompanyDeletedListResponse>;
  /** Restore a previously archived GroupOfCompany record by setting it back to active. Triggers a real-time subscription event on success. */
  GroupOfCompanyRestore?: Maybe<GroupOfCompanyResponse>;
  /** Restore multiple previously archived GroupOfCompany records back to active. Each restored record triggers an individual real-time subscription event. */
  GroupOfCompanyRestoreMany?: Maybe<GroupOfCompanyListResponse>;
  /** Update an existing GroupOfCompany record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  GroupOfCompanyUpdate?: Maybe<GroupOfCompanyResponse>;
  /** Update multiple GroupOfCompany records in a single operation. Each updated record triggers an individual real-time subscription event. */
  GroupOfCompanyUpdateMany?: Maybe<GroupOfCompanyListResponse>;
  /** Soft-delete a Holiday record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  HolidayArchive?: Maybe<HolidayResponse>;
  /** Soft-delete multiple Holiday records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  HolidayArchiveMany?: Maybe<HolidayListResponse>;
  /** Create a new Holiday record. Triggers a real-time subscription event on success. */
  HolidayCreate?: Maybe<HolidayResponse>;
  /** Create multiple Holiday records in a single operation. Each created record triggers an individual real-time subscription event. */
  HolidayCreateMany?: Maybe<HolidayListResponse>;
  /** Permanently delete a Holiday record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  HolidayRemove?: Maybe<HolidayResponse>;
  /** Permanently delete multiple Holiday records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  HolidayRemoveMany?: Maybe<HolidayDeletedListResponse>;
  /** Restore a previously archived Holiday record by setting it back to active. Triggers a real-time subscription event on success. */
  HolidayRestore?: Maybe<HolidayResponse>;
  /** Restore multiple previously archived Holiday records back to active. Each restored record triggers an individual real-time subscription event. */
  HolidayRestoreMany?: Maybe<HolidayListResponse>;
  /** Update an existing Holiday record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  HolidayUpdate?: Maybe<HolidayResponse>;
  /** Update multiple Holiday records in a single operation. Each updated record triggers an individual real-time subscription event. */
  HolidayUpdateMany?: Maybe<HolidayListResponse>;
  /** Soft-delete a JobLevel record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  JobLevelArchive?: Maybe<JobLevelResponse>;
  /** Soft-delete multiple JobLevel records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  JobLevelArchiveMany?: Maybe<JobLevelListResponse>;
  /** Create a new JobLevel record. Triggers a real-time subscription event on success. */
  JobLevelCreate?: Maybe<JobLevelResponse>;
  /** Create multiple JobLevel records in a single operation. Each created record triggers an individual real-time subscription event. */
  JobLevelCreateMany?: Maybe<JobLevelListResponse>;
  /** Permanently delete a JobLevel record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  JobLevelRemove?: Maybe<JobLevelResponse>;
  /** Permanently delete multiple JobLevel records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  JobLevelRemoveMany?: Maybe<JobLevelDeletedListResponse>;
  /** Restore a previously archived JobLevel record by setting it back to active. Triggers a real-time subscription event on success. */
  JobLevelRestore?: Maybe<JobLevelResponse>;
  /** Restore multiple previously archived JobLevel records back to active. Each restored record triggers an individual real-time subscription event. */
  JobLevelRestoreMany?: Maybe<JobLevelListResponse>;
  /** Update an existing JobLevel record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  JobLevelUpdate?: Maybe<JobLevelResponse>;
  /** Update multiple JobLevel records in a single operation. Each updated record triggers an individual real-time subscription event. */
  JobLevelUpdateMany?: Maybe<JobLevelListResponse>;
  /** Soft-delete a Location record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  LocationArchive?: Maybe<LocationResponse>;
  /** Soft-delete multiple Location records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  LocationArchiveMany?: Maybe<LocationListResponse>;
  /** Create a new Location record. Triggers a real-time subscription event on success. */
  LocationCreate?: Maybe<LocationResponse>;
  /** Create multiple Location records in a single operation. Each created record triggers an individual real-time subscription event. */
  LocationCreateMany?: Maybe<LocationListResponse>;
  /** Permanently delete a Location record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  LocationRemove?: Maybe<LocationResponse>;
  /** Permanently delete multiple Location records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  LocationRemoveMany?: Maybe<LocationDeletedListResponse>;
  /** Restore a previously archived Location record by setting it back to active. Triggers a real-time subscription event on success. */
  LocationRestore?: Maybe<LocationResponse>;
  /** Restore multiple previously archived Location records back to active. Each restored record triggers an individual real-time subscription event. */
  LocationRestoreMany?: Maybe<LocationListResponse>;
  /** Update an existing Location record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  LocationUpdate?: Maybe<LocationResponse>;
  /** Update multiple Location records in a single operation. Each updated record triggers an individual real-time subscription event. */
  LocationUpdateMany?: Maybe<LocationListResponse>;
  /** Soft-delete a Permission record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  PermissionArchive?: Maybe<PermissionResponse>;
  /** Soft-delete multiple Permission records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  PermissionArchiveMany?: Maybe<PermissionListResponse>;
  /** Create a new Permission record. Triggers a real-time subscription event on success. */
  PermissionCreate?: Maybe<PermissionResponse>;
  /** Create multiple Permission records in a single operation. Each created record triggers an individual real-time subscription event. */
  PermissionCreateMany?: Maybe<PermissionListResponse>;
  /** Permanently delete a Permission record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  PermissionRemove?: Maybe<PermissionResponse>;
  /** Permanently delete multiple Permission records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  PermissionRemoveMany?: Maybe<PermissionDeletedListResponse>;
  /** Restore a previously archived Permission record by setting it back to active. Triggers a real-time subscription event on success. */
  PermissionRestore?: Maybe<PermissionResponse>;
  /** Restore multiple previously archived Permission records back to active. Each restored record triggers an individual real-time subscription event. */
  PermissionRestoreMany?: Maybe<PermissionListResponse>;
  /** Update an existing Permission record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  PermissionUpdate?: Maybe<PermissionResponse>;
  /** Update multiple Permission records in a single operation. Each updated record triggers an individual real-time subscription event. */
  PermissionUpdateMany?: Maybe<PermissionListResponse>;
  /** Soft-delete a Position record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  PositionArchive?: Maybe<PositionResponse>;
  /** Soft-delete multiple Position records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  PositionArchiveMany?: Maybe<PositionListResponse>;
  /** Create a new Position record. Triggers a real-time subscription event on success. */
  PositionCreate?: Maybe<PositionResponse>;
  /** Create multiple Position records in a single operation. Each created record triggers an individual real-time subscription event. */
  PositionCreateMany?: Maybe<PositionListResponse>;
  /** Permanently delete a Position record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  PositionRemove?: Maybe<PositionResponse>;
  /** Permanently delete multiple Position records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  PositionRemoveMany?: Maybe<PositionDeletedListResponse>;
  /** Restore a previously archived Position record by setting it back to active. Triggers a real-time subscription event on success. */
  PositionRestore?: Maybe<PositionResponse>;
  /** Restore multiple previously archived Position records back to active. Each restored record triggers an individual real-time subscription event. */
  PositionRestoreMany?: Maybe<PositionListResponse>;
  /** Update an existing Position record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  PositionUpdate?: Maybe<PositionResponse>;
  /** Update multiple Position records in a single operation. Each updated record triggers an individual real-time subscription event. */
  PositionUpdateMany?: Maybe<PositionListResponse>;
  /** Soft-delete a Role record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  RoleArchive?: Maybe<RoleResponse>;
  /** Soft-delete multiple Role records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  RoleArchiveMany?: Maybe<RoleListResponse>;
  /** Create a new Role record. Triggers a real-time subscription event on success. */
  RoleCreate?: Maybe<RoleResponse>;
  /** Create multiple Role records in a single operation. Each created record triggers an individual real-time subscription event. */
  RoleCreateMany?: Maybe<RoleListResponse>;
  /** Soft-delete a RolePermission record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  RolePermissionArchive?: Maybe<RolePermissionResponse>;
  /** Soft-delete multiple RolePermission records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  RolePermissionArchiveMany?: Maybe<RolePermissionListResponse>;
  /** Create a new RolePermission record. Triggers a real-time subscription event on success. */
  RolePermissionCreate?: Maybe<RolePermissionResponse>;
  /** Create multiple RolePermission records in a single operation. Each created record triggers an individual real-time subscription event. */
  RolePermissionCreateMany?: Maybe<RolePermissionListResponse>;
  /** Permanently delete a RolePermission record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  RolePermissionRemove?: Maybe<RolePermissionResponse>;
  /** Permanently delete multiple RolePermission records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  RolePermissionRemoveMany?: Maybe<RolePermissionDeletedListResponse>;
  /** Restore a previously archived RolePermission record by setting it back to active. Triggers a real-time subscription event on success. */
  RolePermissionRestore?: Maybe<RolePermissionResponse>;
  /** Restore multiple previously archived RolePermission records back to active. Each restored record triggers an individual real-time subscription event. */
  RolePermissionRestoreMany?: Maybe<RolePermissionListResponse>;
  /** Update an existing RolePermission record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  RolePermissionUpdate?: Maybe<RolePermissionResponse>;
  /** Update multiple RolePermission records in a single operation. Each updated record triggers an individual real-time subscription event. */
  RolePermissionUpdateMany?: Maybe<RolePermissionListResponse>;
  /** Permanently delete a Role record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  RoleRemove?: Maybe<RoleResponse>;
  /** Permanently delete multiple Role records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  RoleRemoveMany?: Maybe<RoleDeletedListResponse>;
  /** Restore a previously archived Role record by setting it back to active. Triggers a real-time subscription event on success. */
  RoleRestore?: Maybe<RoleResponse>;
  /** Restore multiple previously archived Role records back to active. Each restored record triggers an individual real-time subscription event. */
  RoleRestoreMany?: Maybe<RoleListResponse>;
  /** Update an existing Role record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  RoleUpdate?: Maybe<RoleResponse>;
  /** Update multiple Role records in a single operation. Each updated record triggers an individual real-time subscription event. */
  RoleUpdateMany?: Maybe<RoleListResponse>;
  /** Soft-delete a ShiftingSchedule record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  ShiftingScheduleArchive?: Maybe<ShiftingScheduleResponse>;
  /** Soft-delete multiple ShiftingSchedule records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  ShiftingScheduleArchiveMany?: Maybe<ShiftingScheduleListResponse>;
  /** Create a new ShiftingSchedule record. Triggers a real-time subscription event on success. */
  ShiftingScheduleCreate?: Maybe<ShiftingScheduleResponse>;
  /** Create multiple ShiftingSchedule records in a single operation. Each created record triggers an individual real-time subscription event. */
  ShiftingScheduleCreateMany?: Maybe<ShiftingScheduleListResponse>;
  /** Permanently delete a ShiftingSchedule record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  ShiftingScheduleRemove?: Maybe<ShiftingScheduleResponse>;
  /** Permanently delete multiple ShiftingSchedule records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  ShiftingScheduleRemoveMany?: Maybe<ShiftingScheduleDeletedListResponse>;
  /** Restore a previously archived ShiftingSchedule record by setting it back to active. Triggers a real-time subscription event on success. */
  ShiftingScheduleRestore?: Maybe<ShiftingScheduleResponse>;
  /** Restore multiple previously archived ShiftingSchedule records back to active. Each restored record triggers an individual real-time subscription event. */
  ShiftingScheduleRestoreMany?: Maybe<ShiftingScheduleListResponse>;
  /** Update an existing ShiftingSchedule record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  ShiftingScheduleUpdate?: Maybe<ShiftingScheduleResponse>;
  /** Update multiple ShiftingSchedule records in a single operation. Each updated record triggers an individual real-time subscription event. */
  ShiftingScheduleUpdateMany?: Maybe<ShiftingScheduleListResponse>;
  /** Soft-delete a Status record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  StatusArchive?: Maybe<StatusResponse>;
  /** Soft-delete multiple Status records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  StatusArchiveMany?: Maybe<StatusListResponse>;
  /** Create a new Status record. Triggers a real-time subscription event on success. */
  StatusCreate?: Maybe<StatusResponse>;
  /** Create multiple Status records in a single operation. Each created record triggers an individual real-time subscription event. */
  StatusCreateMany?: Maybe<StatusListResponse>;
  /** Permanently delete a Status record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  StatusRemove?: Maybe<StatusResponse>;
  /** Permanently delete multiple Status records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  StatusRemoveMany?: Maybe<StatusDeletedListResponse>;
  /** Restore a previously archived Status record by setting it back to active. Triggers a real-time subscription event on success. */
  StatusRestore?: Maybe<StatusResponse>;
  /** Restore multiple previously archived Status records back to active. Each restored record triggers an individual real-time subscription event. */
  StatusRestoreMany?: Maybe<StatusListResponse>;
  /** Update an existing Status record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  StatusUpdate?: Maybe<StatusResponse>;
  /** Update multiple Status records in a single operation. Each updated record triggers an individual real-time subscription event. */
  StatusUpdateMany?: Maybe<StatusListResponse>;
  /** Soft-delete a Type record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  TypeArchive?: Maybe<TypeResponse>;
  /** Soft-delete multiple Type records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  TypeArchiveMany?: Maybe<TypeListResponse>;
  /** Create a new Type record. Triggers a real-time subscription event on success. */
  TypeCreate?: Maybe<TypeResponse>;
  /** Create multiple Type records in a single operation. Each created record triggers an individual real-time subscription event. */
  TypeCreateMany?: Maybe<TypeListResponse>;
  /** Permanently delete a Type record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  TypeRemove?: Maybe<TypeResponse>;
  /** Permanently delete multiple Type records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  TypeRemoveMany?: Maybe<TypeDeletedListResponse>;
  /** Restore a previously archived Type record by setting it back to active. Triggers a real-time subscription event on success. */
  TypeRestore?: Maybe<TypeResponse>;
  /** Restore multiple previously archived Type records back to active. Each restored record triggers an individual real-time subscription event. */
  TypeRestoreMany?: Maybe<TypeListResponse>;
  /** Update an existing Type record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  TypeUpdate?: Maybe<TypeResponse>;
  /** Update multiple Type records in a single operation. Each updated record triggers an individual real-time subscription event. */
  TypeUpdateMany?: Maybe<TypeListResponse>;
  /** Soft-delete a User record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  UserArchive?: Maybe<UserResponse>;
  /** Soft-delete multiple User records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  UserArchiveMany?: Maybe<UserListResponse>;
  /** Create a new User record. Triggers a real-time subscription event on success. */
  UserCreate?: Maybe<UserResponse>;
  /** Create multiple User records in a single operation. Each created record triggers an individual real-time subscription event. */
  UserCreateMany?: Maybe<UserListResponse>;
  /** Login a user with account and password, optionally with OTP and IP address for rate limiting. */
  UserLogin?: Maybe<UserResponse>;
  /** Permanently delete a User record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  UserRemove?: Maybe<UserResponse>;
  /** Permanently delete multiple User records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  UserRemoveMany?: Maybe<UserDeletedListResponse>;
  /** Restore a previously archived User record by setting it back to active. Triggers a real-time subscription event on success. */
  UserRestore?: Maybe<UserResponse>;
  /** Restore multiple previously archived User records back to active. Each restored record triggers an individual real-time subscription event. */
  UserRestoreMany?: Maybe<UserListResponse>;
  /** Soft-delete a UserRole record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  UserRoleArchive?: Maybe<UserRoleResponse>;
  /** Soft-delete multiple UserRole records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  UserRoleArchiveMany?: Maybe<UserRoleListResponse>;
  /** Create a new UserRole record. Triggers a real-time subscription event on success. */
  UserRoleCreate?: Maybe<UserRoleResponse>;
  /** Create multiple UserRole records in a single operation. Each created record triggers an individual real-time subscription event. */
  UserRoleCreateMany?: Maybe<UserRoleListResponse>;
  /** Permanently delete a UserRole record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  UserRoleRemove?: Maybe<UserRoleResponse>;
  /** Permanently delete multiple UserRole records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  UserRoleRemoveMany?: Maybe<UserRoleDeletedListResponse>;
  /** Restore a previously archived UserRole record by setting it back to active. Triggers a real-time subscription event on success. */
  UserRoleRestore?: Maybe<UserRoleResponse>;
  /** Restore multiple previously archived UserRole records back to active. Each restored record triggers an individual real-time subscription event. */
  UserRoleRestoreMany?: Maybe<UserRoleListResponse>;
  /** Update an existing UserRole record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  UserRoleUpdate?: Maybe<UserRoleResponse>;
  /** Update multiple UserRole records in a single operation. Each updated record triggers an individual real-time subscription event. */
  UserRoleUpdateMany?: Maybe<UserRoleListResponse>;
  /** Update an existing User record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  UserUpdate?: Maybe<UserResponse>;
  /** Update multiple User records in a single operation. Each updated record triggers an individual real-time subscription event. */
  UserUpdateMany?: Maybe<UserListResponse>;
  /** Soft-delete a WorkInformation record by setting it as inactive. The record is not permanently removed. Triggers a real-time subscription event on success. */
  WorkInformationArchive?: Maybe<WorkInformationResponse>;
  /** Soft-delete multiple WorkInformation records by setting them as inactive. Each archived record triggers an individual real-time subscription event. */
  WorkInformationArchiveMany?: Maybe<WorkInformationListResponse>;
  /** Create a new WorkInformation record. Triggers a real-time subscription event on success. */
  WorkInformationCreate?: Maybe<WorkInformationResponse>;
  /** Create multiple WorkInformation records in a single operation. Each created record triggers an individual real-time subscription event. */
  WorkInformationCreateMany?: Maybe<WorkInformationListResponse>;
  /** Permanently delete a WorkInformation record by ID. This action is irreversible. Triggers a real-time subscription event on success. */
  WorkInformationRemove?: Maybe<WorkInformationResponse>;
  /** Permanently delete multiple WorkInformation records by their IDs. This action is irreversible. Each removed record triggers an individual real-time subscription event. */
  WorkInformationRemoveMany?: Maybe<WorkInformationDeletedListResponse>;
  /** Restore a previously archived WorkInformation record by setting it back to active. Triggers a real-time subscription event on success. */
  WorkInformationRestore?: Maybe<WorkInformationResponse>;
  /** Restore multiple previously archived WorkInformation records back to active. Each restored record triggers an individual real-time subscription event. */
  WorkInformationRestoreMany?: Maybe<WorkInformationListResponse>;
  /** Update an existing WorkInformation record by ID. Only provided fields will be changed. Triggers a real-time subscription event on success. */
  WorkInformationUpdate?: Maybe<WorkInformationResponse>;
  /** Update multiple WorkInformation records in a single operation. Each updated record triggers an individual real-time subscription event. */
  WorkInformationUpdateMany?: Maybe<WorkInformationListResponse>;
  _dummy?: Maybe<Scalars['String']['output']>;
};


export type MutationAuditLogArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationAuditLogArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationAuditLogCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: AuditLogCreateInput;
};


export type MutationAuditLogCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<AuditLogCreateInput>;
};


export type MutationAuditLogRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationAuditLogRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationAuditLogRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationAuditLogRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationAuditLogUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: AuditLogUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationAuditLogUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<AuditLogUpdateInput>;
};


export type MutationBasicInformationArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationBasicInformationArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationBasicInformationCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: BasicInformationCreateInput;
};


export type MutationBasicInformationCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<BasicInformationCreateInput>;
};


export type MutationBasicInformationRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationBasicInformationRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationBasicInformationRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationBasicInformationRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationBasicInformationUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: BasicInformationUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationBasicInformationUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<BasicInformationUpdateInput>;
};


export type MutationCompanyArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationCompanyArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationCompanyCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: CompanyCreateInput;
};


export type MutationCompanyCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<CompanyCreateInput>;
};


export type MutationCompanyRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationCompanyRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationCompanyRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationCompanyRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationCompanyUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: CompanyUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationCompanyUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<CompanyUpdateInput>;
};


export type MutationDepartmentArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationDepartmentArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationDepartmentCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: DepartmentCreateInput;
};


export type MutationDepartmentCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<DepartmentCreateInput>;
};


export type MutationDepartmentRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationDepartmentRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationDepartmentRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationDepartmentRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationDepartmentUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: DepartmentUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationDepartmentUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<DepartmentUpdateInput>;
};


export type MutationGroupOfCompanyArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationGroupOfCompanyArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationGroupOfCompanyCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: GroupOfCompanyCreateInput;
};


export type MutationGroupOfCompanyCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<GroupOfCompanyCreateInput>;
};


export type MutationGroupOfCompanyRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationGroupOfCompanyRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationGroupOfCompanyRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationGroupOfCompanyRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationGroupOfCompanyUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: GroupOfCompanyUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationGroupOfCompanyUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<GroupOfCompanyUpdateInput>;
};


export type MutationHolidayArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationHolidayArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationHolidayCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: HolidayCreateInput;
};


export type MutationHolidayCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<HolidayCreateInput>;
};


export type MutationHolidayRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationHolidayRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationHolidayRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationHolidayRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationHolidayUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: HolidayUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationHolidayUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<HolidayUpdateInput>;
};


export type MutationJobLevelArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationJobLevelArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationJobLevelCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: JobLevelCreateInput;
};


export type MutationJobLevelCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<JobLevelCreateInput>;
};


export type MutationJobLevelRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationJobLevelRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationJobLevelRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationJobLevelRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationJobLevelUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: JobLevelUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationJobLevelUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<JobLevelUpdateInput>;
};


export type MutationLocationArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationLocationArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationLocationCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: LocationCreateInput;
};


export type MutationLocationCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<LocationCreateInput>;
};


export type MutationLocationRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationLocationRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationLocationRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationLocationRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationLocationUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: LocationUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationLocationUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<LocationUpdateInput>;
};


export type MutationPermissionArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationPermissionArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationPermissionCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: PermissionCreateInput;
};


export type MutationPermissionCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<PermissionCreateInput>;
};


export type MutationPermissionRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationPermissionRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationPermissionRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationPermissionRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationPermissionUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: PermissionUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationPermissionUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<PermissionUpdateInput>;
};


export type MutationPositionArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationPositionArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationPositionCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: PositionCreateInput;
};


export type MutationPositionCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<PositionCreateInput>;
};


export type MutationPositionRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationPositionRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationPositionRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationPositionRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationPositionUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: PositionUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationPositionUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<PositionUpdateInput>;
};


export type MutationRoleArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationRoleArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationRoleCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: RoleCreateInput;
};


export type MutationRoleCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<RoleCreateInput>;
};


export type MutationRolePermissionArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationRolePermissionArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationRolePermissionCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: RolePermissionCreateInput;
};


export type MutationRolePermissionCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<RolePermissionCreateInput>;
};


export type MutationRolePermissionRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationRolePermissionRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationRolePermissionRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationRolePermissionRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationRolePermissionUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: RolePermissionUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationRolePermissionUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<RolePermissionUpdateInput>;
};


export type MutationRoleRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationRoleRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationRoleRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationRoleRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationRoleUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: RoleUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationRoleUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<RoleUpdateInput>;
};


export type MutationShiftingScheduleArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationShiftingScheduleArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationShiftingScheduleCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: ShiftingScheduleCreateInput;
};


export type MutationShiftingScheduleCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<ShiftingScheduleCreateInput>;
};


export type MutationShiftingScheduleRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationShiftingScheduleRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationShiftingScheduleRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationShiftingScheduleRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationShiftingScheduleUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: ShiftingScheduleUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationShiftingScheduleUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<ShiftingScheduleUpdateInput>;
};


export type MutationStatusArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationStatusArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationStatusCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: StatusCreateInput;
};


export type MutationStatusCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<StatusCreateInput>;
};


export type MutationStatusRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationStatusRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationStatusRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationStatusRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationStatusUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: StatusUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationStatusUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<StatusUpdateInput>;
};


export type MutationTypeArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationTypeArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationTypeCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: TypeCreateInput;
};


export type MutationTypeCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<TypeCreateInput>;
};


export type MutationTypeRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationTypeRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationTypeRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationTypeRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationTypeUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: TypeUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationTypeUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<TypeUpdateInput>;
};


export type MutationUserArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationUserArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationUserCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: UserCreateInput;
};


export type MutationUserCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<UserCreateInput>;
};


export type MutationUserLoginArgs = {
  input: UserLoginInput;
};


export type MutationUserRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationUserRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationUserRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationUserRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationUserRoleArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationUserRoleArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationUserRoleCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: UserRoleCreateInput;
};


export type MutationUserRoleCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<UserRoleCreateInput>;
};


export type MutationUserRoleRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationUserRoleRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationUserRoleRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationUserRoleRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationUserRoleUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: UserRoleUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationUserRoleUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<UserRoleUpdateInput>;
};


export type MutationUserUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: UserUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationUserUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<UserUpdateInput>;
};


export type MutationWorkInformationArchiveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationWorkInformationArchiveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationWorkInformationCreateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: WorkInformationCreateInput;
};


export type MutationWorkInformationCreateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<WorkInformationCreateInput>;
};


export type MutationWorkInformationRemoveArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationWorkInformationRemoveManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationWorkInformationRestoreArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationWorkInformationRestoreManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  ids: Array<Scalars['String']['input']>;
};


export type MutationWorkInformationUpdateArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: WorkInformationUpdateInput;
  id: Scalars['String']['input'];
};


export type MutationWorkInformationUpdateManyArgs = {
  currentUserId?: InputMaybe<Scalars['String']['input']>;
  data: Array<WorkInformationUpdateInput>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage?: Maybe<Scalars['Int']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

/** Represents a Permission record in the database. */
export type Permission = {
  __typename?: 'Permission';
  /** (Optional) action field of Permission. Type: String. */
  action?: Maybe<Scalars['String']['output']>;
  /** (Optional) List of related AuditLog records linked to this Permission. */
  auditLogs: Array<AuditLog>;
  /** (Required) createdAt field of Permission. Type: DateTime (ISO 8601). */
  createdAt: Scalars['DateTime']['output'];
  /** (Optional) description field of Permission. Type: String. */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier of the Permission record. */
  id: Scalars['ID']['output'];
  /** (Required) isActive field of Permission. Type: Boolean. */
  isActive: Scalars['Boolean']['output'];
  /** (Required) isAdmin field of Permission. Type: Boolean. */
  isAdmin: Scalars['Boolean']['output'];
  /** (Required) isGlobal field of Permission. Type: Boolean. */
  isGlobal: Scalars['Boolean']['output'];
  /** (Optional) name field of Permission. Type: String. */
  name?: Maybe<Scalars['String']['output']>;
  /** (Optional) resource field of Permission. Type: String. */
  resource?: Maybe<Scalars['String']['output']>;
  /** (Optional) List of related RolePermission records linked to this Permission. */
  rolePermissions: Array<RolePermission>;
  /** (Required) updatedAt field of Permission. Type: DateTime (ISO 8601). */
  updatedAt: Scalars['DateTime']['output'];
};

/** Input to connect an existing Permission record by its unique ID. Use this when you want to link to an already existing Permission without creating a new one. */
export type PermissionConnectInput = {
  /** The unique identifier of the existing Permission record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new Permission record. Required fields must be provided. Relation fields support nested create or connect. */
export type PermissionCreateInput = {
  /** (Optional) The action of the new Permission. Type: String. */
  action?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Required) The createdAt of the new Permission. Type: DateTime. */
  createdAt: Scalars['DateTime']['input'];
  /** (Optional) The description of the new Permission. Type: String. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Required) The isActive of the new Permission. Type: Boolean. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) The isAdmin of the new Permission. Type: Boolean. */
  isAdmin: Scalars['Boolean']['input'];
  /** (Required) The isGlobal of the new Permission. Type: Boolean. */
  isGlobal: Scalars['Boolean']['input'];
  /** (Optional) The name of the new Permission. Type: String. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The resource of the new Permission. Type: String. */
  resource?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of RolePermission relation — create a new RolePermission inline or connect to an existing one by ID. */
  rolePermissions?: InputMaybe<Array<RolePermissionCreateOrConnectInput>>;
  /** (Required) The updatedAt of the new Permission. Type: DateTime. */
  updatedAt: Scalars['DateTime']['input'];
};

/** Either create a new Permission record or connect to an existing one. Provide 'create' to insert a new Permission, or 'connect' to link to an existing Permission by ID. Do not provide both. */
export type PermissionCreateOrConnectInput = {
  /** Connect an existing Permission record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<PermissionConnectInput>;
  /** Create a new Permission record and link it to the parent. Provide all required fields for Permission. */
  create?: InputMaybe<PermissionCreateInput>;
};

/** Paginated response wrapper for Permission. Returns a paged list of Permission records with pagination metadata and counts. */
export type PermissionDeletedListResponse = {
  __typename?: 'PermissionDeletedListResponse';
  /** Operation result code for the Permission pagination query. e.g. 'PERMISSION_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Permission records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the Permission pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Permission pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for Permission. Returns multiple Permission records along with operation status. */
export type PermissionListResponse = {
  __typename?: 'PermissionListResponse';
  /** Operation result code for the Permission list operation. e.g. 'PERMISSION_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of Permission records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<Permission>>;
  /** Indicates whether the Permission list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Permission list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying Permission records. Use this to control which page of results to return and how to filter the dataset. */
export type PermissionPageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down Permission results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter Permission records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of Permission records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter Permission records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for Permission. Returns a paged list of Permission records with pagination metadata and counts. */
export type PermissionPaginationResponse = {
  __typename?: 'PermissionPaginationResponse';
  /** Total number of active (isActive: true) Permission records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of Permission records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the Permission pagination query. e.g. 'PERMISSION_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Permission records. Null if the query failed. */
  data?: Maybe<Array<Permission>>;
  /** Total number of inactive (isActive: false) Permission records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the Permission pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Permission pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for Permission. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for Permission. Returns the created/updated/deleted Permission record along with operation status. */
export type PermissionResponse = {
  __typename?: 'PermissionResponse';
  /** Operation result code for Permission. e.g. 'PERMISSION_CREATE_SUCCESS' or 'PERMISSION_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The Permission record returned from the operation. Null if the operation failed. */
  data?: Maybe<Permission>;
  /** Indicates whether the Permission operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Permission operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing Permission record. All fields are optional — only provided fields will be updated. */
export type PermissionUpdateInput = {
  /** (Optional) Update the action of the Permission. Type: String. Leave empty to keep existing value. */
  action?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Update the createdAt of the Permission. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the description of the Permission. Type: String. Leave empty to keep existing value. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the id of the Permission. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the isActive of the Permission. Type: Boolean. Leave empty to keep existing value. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Update the isAdmin of the Permission. Type: Boolean. Leave empty to keep existing value. */
  isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Update the isGlobal of the Permission. Type: Boolean. Leave empty to keep existing value. */
  isGlobal?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Update the name of the Permission. Type: String. Leave empty to keep existing value. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the resource of the Permission. Type: String. Leave empty to keep existing value. */
  resource?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of RolePermission relation — update the related record inline or reconnect to a different RolePermission by ID. */
  rolePermissions?: InputMaybe<Array<RolePermissionUpdateOrConnectInput>>;
  /** (Optional) Update the updatedAt of the Permission. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Either update an existing related Permission record inline or reconnect to a different Permission by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing Permission. Do not provide both. */
export type PermissionUpdateOrConnectInput = {
  /** Reconnect to a different existing Permission record by its unique ID. */
  connect?: InputMaybe<PermissionConnectInput>;
  /** Update the fields of the related Permission record inline. Only provided fields will be changed. */
  update?: InputMaybe<PermissionUpdateInput>;
};

/** Represents a Position record in the database. */
export type Position = {
  __typename?: 'Position';
  /** (Optional) acronym field of Position. Type: String. */
  acronym?: Maybe<Scalars['String']['output']>;
  /** (Optional) List of related AuditLog records linked to this Position. */
  auditLogs: Array<AuditLog>;
  /** (Required) createdAt field of Position. Type: DateTime (ISO 8601). */
  createdAt: Scalars['DateTime']['output'];
  /** (Optional) description field of Position. Type: String. */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier of the Position record. */
  id: Scalars['ID']['output'];
  /** (Optional) name field of Position. Type: String. */
  name?: Maybe<Scalars['String']['output']>;
  /** (Required) updatedAt field of Position. Type: DateTime (ISO 8601). */
  updatedAt: Scalars['DateTime']['output'];
  /** (Optional) List of related WorkInformation records linked to this Position. */
  workInformations: Array<WorkInformation>;
};

/** Input to connect an existing Position record by its unique ID. Use this when you want to link to an already existing Position without creating a new one. */
export type PositionConnectInput = {
  /** The unique identifier of the existing Position record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new Position record. Required fields must be provided. Relation fields support nested create or connect. */
export type PositionCreateInput = {
  /** (Optional) The acronym of the new Position. Type: String. */
  acronym?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Required) The createdAt of the new Position. Type: DateTime. */
  createdAt: Scalars['DateTime']['input'];
  /** (Optional) The description of the new Position. Type: String. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The name of the new Position. Type: String. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Required) The updatedAt of the new Position. Type: DateTime. */
  updatedAt: Scalars['DateTime']['input'];
  /** (Optional) List of WorkInformation relation — create a new WorkInformation inline or connect to an existing one by ID. */
  workInformations?: InputMaybe<Array<WorkInformationCreateOrConnectInput>>;
};

/** Either create a new Position record or connect to an existing one. Provide 'create' to insert a new Position, or 'connect' to link to an existing Position by ID. Do not provide both. */
export type PositionCreateOrConnectInput = {
  /** Connect an existing Position record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<PositionConnectInput>;
  /** Create a new Position record and link it to the parent. Provide all required fields for Position. */
  create?: InputMaybe<PositionCreateInput>;
};

/** Paginated response wrapper for Position. Returns a paged list of Position records with pagination metadata and counts. */
export type PositionDeletedListResponse = {
  __typename?: 'PositionDeletedListResponse';
  /** Operation result code for the Position pagination query. e.g. 'POSITION_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Position records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the Position pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Position pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for Position. Returns multiple Position records along with operation status. */
export type PositionListResponse = {
  __typename?: 'PositionListResponse';
  /** Operation result code for the Position list operation. e.g. 'POSITION_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of Position records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<Position>>;
  /** Indicates whether the Position list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Position list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying Position records. Use this to control which page of results to return and how to filter the dataset. */
export type PositionPageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down Position results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter Position records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of Position records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter Position records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for Position. Returns a paged list of Position records with pagination metadata and counts. */
export type PositionPaginationResponse = {
  __typename?: 'PositionPaginationResponse';
  /** Total number of active (isActive: true) Position records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of Position records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the Position pagination query. e.g. 'POSITION_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Position records. Null if the query failed. */
  data?: Maybe<Array<Position>>;
  /** Total number of inactive (isActive: false) Position records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the Position pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Position pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for Position. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for Position. Returns the created/updated/deleted Position record along with operation status. */
export type PositionResponse = {
  __typename?: 'PositionResponse';
  /** Operation result code for Position. e.g. 'POSITION_CREATE_SUCCESS' or 'POSITION_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The Position record returned from the operation. Null if the operation failed. */
  data?: Maybe<Position>;
  /** Indicates whether the Position operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Position operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing Position record. All fields are optional — only provided fields will be updated. */
export type PositionUpdateInput = {
  /** (Optional) Update the acronym of the Position. Type: String. Leave empty to keep existing value. */
  acronym?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Update the createdAt of the Position. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the description of the Position. Type: String. Leave empty to keep existing value. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the id of the Position. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the name of the Position. Type: String. Leave empty to keep existing value. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the updatedAt of the Position. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — update the related record inline or reconnect to a different WorkInformation by ID. */
  workInformations?: InputMaybe<Array<WorkInformationUpdateOrConnectInput>>;
};

/** Either update an existing related Position record inline or reconnect to a different Position by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing Position. Do not provide both. */
export type PositionUpdateOrConnectInput = {
  /** Reconnect to a different existing Position record by its unique ID. */
  connect?: InputMaybe<PositionConnectInput>;
  /** Update the fields of the related Position record inline. Only provided fields will be changed. */
  update?: InputMaybe<PositionUpdateInput>;
};

export type Query = {
  __typename?: 'Query';
  /** Retrieve a paginated list of AuditLog records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  AuditLogFindAll?: Maybe<AuditLogPaginationResponse>;
  /** Retrieve a single AuditLog record by its unique ID. */
  AuditLogFindUnique?: Maybe<AuditLogResponse>;
  /** Retrieve a paginated list of BasicInformation records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  BasicInformationFindAll?: Maybe<BasicInformationPaginationResponse>;
  /** Retrieve a single BasicInformation record by its unique ID. */
  BasicInformationFindUnique?: Maybe<BasicInformationResponse>;
  /** Retrieve a paginated list of Company records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  CompanyFindAll?: Maybe<CompanyPaginationResponse>;
  /** Retrieve a single Company record by its unique ID. */
  CompanyFindUnique?: Maybe<CompanyResponse>;
  /** Retrieve a paginated list of Department records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  DepartmentFindAll?: Maybe<DepartmentPaginationResponse>;
  /** Retrieve a single Department record by its unique ID. */
  DepartmentFindUnique?: Maybe<DepartmentResponse>;
  /** Retrieve a paginated list of GroupOfCompany records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  GroupOfCompanyFindAll?: Maybe<GroupOfCompanyPaginationResponse>;
  /** Retrieve a single GroupOfCompany record by its unique ID. */
  GroupOfCompanyFindUnique?: Maybe<GroupOfCompanyResponse>;
  /** Retrieve a paginated list of Holiday records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  HolidayFindAll?: Maybe<HolidayPaginationResponse>;
  /** Retrieve a single Holiday record by its unique ID. */
  HolidayFindUnique?: Maybe<HolidayResponse>;
  /** Retrieve a paginated list of JobLevel records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  JobLevelFindAll?: Maybe<JobLevelPaginationResponse>;
  /** Retrieve a single JobLevel record by its unique ID. */
  JobLevelFindUnique?: Maybe<JobLevelResponse>;
  /** Retrieve a paginated list of Location records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  LocationFindAll?: Maybe<LocationPaginationResponse>;
  /** Retrieve a single Location record by its unique ID. */
  LocationFindUnique?: Maybe<LocationResponse>;
  /** Retrieve a paginated list of Permission records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  PermissionFindAll?: Maybe<PermissionPaginationResponse>;
  /** Retrieve a single Permission record by its unique ID. */
  PermissionFindUnique?: Maybe<PermissionResponse>;
  /** Retrieve a paginated list of Position records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  PositionFindAll?: Maybe<PositionPaginationResponse>;
  /** Retrieve a single Position record by its unique ID. */
  PositionFindUnique?: Maybe<PositionResponse>;
  /** Retrieve a paginated list of Role records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  RoleFindAll?: Maybe<RolePaginationResponse>;
  /** Retrieve a single Role record by its unique ID. */
  RoleFindUnique?: Maybe<RoleResponse>;
  /** Retrieve a paginated list of RolePermission records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  RolePermissionFindAll?: Maybe<RolePermissionPaginationResponse>;
  /** Retrieve a single RolePermission record by its unique ID. */
  RolePermissionFindUnique?: Maybe<RolePermissionResponse>;
  /** Retrieve a paginated list of ShiftingSchedule records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  ShiftingScheduleFindAll?: Maybe<ShiftingSchedulePaginationResponse>;
  /** Retrieve a single ShiftingSchedule record by its unique ID. */
  ShiftingScheduleFindUnique?: Maybe<ShiftingScheduleResponse>;
  /** Retrieve a paginated list of Status records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  StatusFindAll?: Maybe<StatusPaginationResponse>;
  /** Retrieve a single Status record by its unique ID. */
  StatusFindUnique?: Maybe<StatusResponse>;
  /** Retrieve a paginated list of Type records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  TypeFindAll?: Maybe<TypePaginationResponse>;
  /** Retrieve a single Type record by its unique ID. */
  TypeFindUnique?: Maybe<TypeResponse>;
  /** Retrieve a paginated list of User records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  UserFindAll?: Maybe<UserPaginationResponse>;
  /** Retrieve a single User record by its unique ID. */
  UserFindUnique?: Maybe<UserResponse>;
  /** Retrieve a paginated list of UserRole records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  UserRoleFindAll?: Maybe<UserRolePaginationResponse>;
  /** Retrieve a single UserRole record by its unique ID. */
  UserRoleFindUnique?: Maybe<UserRoleResponse>;
  /** Retrieve a paginated list of WorkInformation records. Supports filtering by active status, keyword search, and advanced JSON filters. */
  WorkInformationFindAll?: Maybe<WorkInformationPaginationResponse>;
  /** Retrieve a single WorkInformation record by its unique ID. */
  WorkInformationFindUnique?: Maybe<WorkInformationResponse>;
  _dummy?: Maybe<Scalars['String']['output']>;
};


export type QueryAuditLogFindAllArgs = {
  paginationInput: AuditLogPageInput;
};


export type QueryAuditLogFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryBasicInformationFindAllArgs = {
  paginationInput: BasicInformationPageInput;
};


export type QueryBasicInformationFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryCompanyFindAllArgs = {
  paginationInput: CompanyPageInput;
};


export type QueryCompanyFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryDepartmentFindAllArgs = {
  paginationInput: DepartmentPageInput;
};


export type QueryDepartmentFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryGroupOfCompanyFindAllArgs = {
  paginationInput: GroupOfCompanyPageInput;
};


export type QueryGroupOfCompanyFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryHolidayFindAllArgs = {
  paginationInput: HolidayPageInput;
};


export type QueryHolidayFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryJobLevelFindAllArgs = {
  paginationInput: JobLevelPageInput;
};


export type QueryJobLevelFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryLocationFindAllArgs = {
  paginationInput: LocationPageInput;
};


export type QueryLocationFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryPermissionFindAllArgs = {
  paginationInput: PermissionPageInput;
};


export type QueryPermissionFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryPositionFindAllArgs = {
  paginationInput: PositionPageInput;
};


export type QueryPositionFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryRoleFindAllArgs = {
  paginationInput: RolePageInput;
};


export type QueryRoleFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryRolePermissionFindAllArgs = {
  paginationInput: RolePermissionPageInput;
};


export type QueryRolePermissionFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryShiftingScheduleFindAllArgs = {
  paginationInput: ShiftingSchedulePageInput;
};


export type QueryShiftingScheduleFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryStatusFindAllArgs = {
  paginationInput: StatusPageInput;
};


export type QueryStatusFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryTypeFindAllArgs = {
  paginationInput: TypePageInput;
};


export type QueryTypeFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserFindAllArgs = {
  paginationInput: UserPageInput;
};


export type QueryUserFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserRoleFindAllArgs = {
  paginationInput: UserRolePageInput;
};


export type QueryUserRoleFindUniqueArgs = {
  id: Scalars['String']['input'];
};


export type QueryWorkInformationFindAllArgs = {
  paginationInput: WorkInformationPageInput;
};


export type QueryWorkInformationFindUniqueArgs = {
  id: Scalars['String']['input'];
};

/** Represents a Role record in the database. */
export type Role = {
  __typename?: 'Role';
  /** (Optional) List of related AuditLog records linked to this Role. */
  auditLogs: Array<AuditLog>;
  /** (Required) createdAt field of Role. Type: DateTime (ISO 8601). */
  createdAt: Scalars['DateTime']['output'];
  /** (Optional) description field of Role. Type: String. */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier of the Role record. */
  id: Scalars['ID']['output'];
  /** (Required) isActive field of Role. Type: Boolean. */
  isActive: Scalars['Boolean']['output'];
  /** (Optional) name field of Role. Type: String. */
  name?: Maybe<Scalars['String']['output']>;
  /** (Optional) List of related RolePermission records linked to this Role. */
  rolePermissions: Array<RolePermission>;
  /** (Required) updatedAt field of Role. Type: DateTime (ISO 8601). */
  updatedAt: Scalars['DateTime']['output'];
  /** (Optional) List of related UserRole records linked to this Role. */
  userRoles: Array<UserRole>;
};

/** Input to connect an existing Role record by its unique ID. Use this when you want to link to an already existing Role without creating a new one. */
export type RoleConnectInput = {
  /** The unique identifier of the existing Role record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new Role record. Required fields must be provided. Relation fields support nested create or connect. */
export type RoleCreateInput = {
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Required) The createdAt of the new Role. Type: DateTime. */
  createdAt: Scalars['DateTime']['input'];
  /** (Optional) The description of the new Role. Type: String. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Required) The isActive of the new Role. Type: Boolean. */
  isActive: Scalars['Boolean']['input'];
  /** (Optional) The name of the new Role. Type: String. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of RolePermission relation — create a new RolePermission inline or connect to an existing one by ID. */
  rolePermissions?: InputMaybe<Array<RolePermissionCreateOrConnectInput>>;
  /** (Required) The updatedAt of the new Role. Type: DateTime. */
  updatedAt: Scalars['DateTime']['input'];
  /** (Optional) List of UserRole relation — create a new UserRole inline or connect to an existing one by ID. */
  userRoles?: InputMaybe<Array<UserRoleCreateOrConnectInput>>;
};

/** Either create a new Role record or connect to an existing one. Provide 'create' to insert a new Role, or 'connect' to link to an existing Role by ID. Do not provide both. */
export type RoleCreateOrConnectInput = {
  /** Connect an existing Role record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<RoleConnectInput>;
  /** Create a new Role record and link it to the parent. Provide all required fields for Role. */
  create?: InputMaybe<RoleCreateInput>;
};

/** Paginated response wrapper for Role. Returns a paged list of Role records with pagination metadata and counts. */
export type RoleDeletedListResponse = {
  __typename?: 'RoleDeletedListResponse';
  /** Operation result code for the Role pagination query. e.g. 'ROLE_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Role records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the Role pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Role pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for Role. Returns multiple Role records along with operation status. */
export type RoleListResponse = {
  __typename?: 'RoleListResponse';
  /** Operation result code for the Role list operation. e.g. 'ROLE_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of Role records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<Role>>;
  /** Indicates whether the Role list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Role list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying Role records. Use this to control which page of results to return and how to filter the dataset. */
export type RolePageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down Role results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter Role records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of Role records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter Role records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for Role. Returns a paged list of Role records with pagination metadata and counts. */
export type RolePaginationResponse = {
  __typename?: 'RolePaginationResponse';
  /** Total number of active (isActive: true) Role records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of Role records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the Role pagination query. e.g. 'ROLE_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Role records. Null if the query failed. */
  data?: Maybe<Array<Role>>;
  /** Total number of inactive (isActive: false) Role records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the Role pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Role pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for Role. */
  pageinfo?: Maybe<PageInfo>;
};

/** Represents a RolePermission record in the database. */
export type RolePermission = {
  __typename?: 'RolePermission';
  /** (Optional) List of related AuditLog records linked to this RolePermission. */
  auditLogs: Array<AuditLog>;
  /** (Optional) conditions field of RolePermission. Type: JSON object. */
  conditions?: Maybe<Scalars['Json']['output']>;
  /** (Required) createdAt field of RolePermission. Type: DateTime (ISO 8601). */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier of the RolePermission record. */
  id: Scalars['ID']['output'];
  /** (Required) isActive field of RolePermission. Type: Boolean. */
  isActive: Scalars['Boolean']['output'];
  /** (Optional) Related Permission record linked to this RolePermission. */
  permission?: Maybe<Permission>;
  /** (Optional) permissionId field of RolePermission. Type: String. */
  permissionId?: Maybe<Scalars['String']['output']>;
  /** (Optional) Related Role record linked to this RolePermission. */
  role?: Maybe<Role>;
  /** (Optional) roleId field of RolePermission. Type: String. */
  roleId?: Maybe<Scalars['String']['output']>;
  /** (Optional) Related Type record linked to this RolePermission. */
  scopeType?: Maybe<Type>;
  /** (Optional) scopeTypeId field of RolePermission. Type: String. */
  scopeTypeId?: Maybe<Scalars['String']['output']>;
  /** (Required) scopeValues field of RolePermission. Type: String. */
  scopeValues: Scalars['String']['output'];
  /** (Required) updatedAt field of RolePermission. Type: DateTime (ISO 8601). */
  updatedAt: Scalars['DateTime']['output'];
};

/** Input to connect an existing RolePermission record by its unique ID. Use this when you want to link to an already existing RolePermission without creating a new one. */
export type RolePermissionConnectInput = {
  /** The unique identifier of the existing RolePermission record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new RolePermission record. Required fields must be provided. Relation fields support nested create or connect. */
export type RolePermissionCreateInput = {
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Optional) The conditions of the new RolePermission. Type: Json. */
  conditions?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) The createdAt of the new RolePermission. Type: DateTime. */
  createdAt: Scalars['DateTime']['input'];
  /** (Required) The isActive of the new RolePermission. Type: Boolean. */
  isActive: Scalars['Boolean']['input'];
  /** (Optional) Single Permission relation — create a new Permission inline or connect to an existing one by ID. */
  permission?: InputMaybe<PermissionCreateOrConnectInput>;
  /** (Optional) The permissionId of the new RolePermission. Type: String. */
  permissionId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Role relation — create a new Role inline or connect to an existing one by ID. */
  role?: InputMaybe<RoleCreateOrConnectInput>;
  /** (Optional) The roleId of the new RolePermission. Type: String. */
  roleId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Type relation — create a new Type inline or connect to an existing one by ID. */
  scopeType?: InputMaybe<TypeCreateOrConnectInput>;
  /** (Optional) The scopeTypeId of the new RolePermission. Type: String. */
  scopeTypeId?: InputMaybe<Scalars['String']['input']>;
  /** (Required) The scopeValues of the new RolePermission. Type: String. */
  scopeValues: Scalars['String']['input'];
  /** (Required) The updatedAt of the new RolePermission. Type: DateTime. */
  updatedAt: Scalars['DateTime']['input'];
};

/** Either create a new RolePermission record or connect to an existing one. Provide 'create' to insert a new RolePermission, or 'connect' to link to an existing RolePermission by ID. Do not provide both. */
export type RolePermissionCreateOrConnectInput = {
  /** Connect an existing RolePermission record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<RolePermissionConnectInput>;
  /** Create a new RolePermission record and link it to the parent. Provide all required fields for RolePermission. */
  create?: InputMaybe<RolePermissionCreateInput>;
};

/** Paginated response wrapper for RolePermission. Returns a paged list of RolePermission records with pagination metadata and counts. */
export type RolePermissionDeletedListResponse = {
  __typename?: 'RolePermissionDeletedListResponse';
  /** Operation result code for the RolePermission pagination query. e.g. 'ROLEPERMISSION_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of RolePermission records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the RolePermission pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the RolePermission pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for RolePermission. Returns multiple RolePermission records along with operation status. */
export type RolePermissionListResponse = {
  __typename?: 'RolePermissionListResponse';
  /** Operation result code for the RolePermission list operation. e.g. 'ROLEPERMISSION_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of RolePermission records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<RolePermission>>;
  /** Indicates whether the RolePermission list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the RolePermission list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying RolePermission records. Use this to control which page of results to return and how to filter the dataset. */
export type RolePermissionPageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down RolePermission results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter RolePermission records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of RolePermission records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter RolePermission records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for RolePermission. Returns a paged list of RolePermission records with pagination metadata and counts. */
export type RolePermissionPaginationResponse = {
  __typename?: 'RolePermissionPaginationResponse';
  /** Total number of active (isActive: true) RolePermission records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of RolePermission records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the RolePermission pagination query. e.g. 'ROLEPERMISSION_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of RolePermission records. Null if the query failed. */
  data?: Maybe<Array<RolePermission>>;
  /** Total number of inactive (isActive: false) RolePermission records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the RolePermission pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the RolePermission pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for RolePermission. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for RolePermission. Returns the created/updated/deleted RolePermission record along with operation status. */
export type RolePermissionResponse = {
  __typename?: 'RolePermissionResponse';
  /** Operation result code for RolePermission. e.g. 'ROLEPERMISSION_CREATE_SUCCESS' or 'ROLEPERMISSION_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The RolePermission record returned from the operation. Null if the operation failed. */
  data?: Maybe<RolePermission>;
  /** Indicates whether the RolePermission operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the RolePermission operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing RolePermission record. All fields are optional — only provided fields will be updated. */
export type RolePermissionUpdateInput = {
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Update the conditions of the RolePermission. Type: Json. Leave empty to keep existing value. */
  conditions?: InputMaybe<Scalars['Json']['input']>;
  /** (Optional) Update the createdAt of the RolePermission. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the id of the RolePermission. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the isActive of the RolePermission. Type: Boolean. Leave empty to keep existing value. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Single Permission relation — update the related record inline or reconnect to a different Permission by ID. */
  permission?: InputMaybe<PermissionUpdateOrConnectInput>;
  /** (Optional) Update the permissionId of the RolePermission. Type: String. Leave empty to keep existing value. */
  permissionId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Role relation — update the related record inline or reconnect to a different Role by ID. */
  role?: InputMaybe<RoleUpdateOrConnectInput>;
  /** (Optional) Update the roleId of the RolePermission. Type: String. Leave empty to keep existing value. */
  roleId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Type relation — update the related record inline or reconnect to a different Type by ID. */
  scopeType?: InputMaybe<TypeUpdateOrConnectInput>;
  /** (Optional) Update the scopeTypeId of the RolePermission. Type: String. Leave empty to keep existing value. */
  scopeTypeId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the scopeValues of the RolePermission. Type: String. Leave empty to keep existing value. */
  scopeValues?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the updatedAt of the RolePermission. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Either update an existing related RolePermission record inline or reconnect to a different RolePermission by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing RolePermission. Do not provide both. */
export type RolePermissionUpdateOrConnectInput = {
  /** Reconnect to a different existing RolePermission record by its unique ID. */
  connect?: InputMaybe<RolePermissionConnectInput>;
  /** Update the fields of the related RolePermission record inline. Only provided fields will be changed. */
  update?: InputMaybe<RolePermissionUpdateInput>;
};

/** Single record response wrapper for Role. Returns the created/updated/deleted Role record along with operation status. */
export type RoleResponse = {
  __typename?: 'RoleResponse';
  /** Operation result code for Role. e.g. 'ROLE_CREATE_SUCCESS' or 'ROLE_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The Role record returned from the operation. Null if the operation failed. */
  data?: Maybe<Role>;
  /** Indicates whether the Role operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Role operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing Role record. All fields are optional — only provided fields will be updated. */
export type RoleUpdateInput = {
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Update the createdAt of the Role. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the description of the Role. Type: String. Leave empty to keep existing value. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the id of the Role. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the isActive of the Role. Type: Boolean. Leave empty to keep existing value. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Update the name of the Role. Type: String. Leave empty to keep existing value. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of RolePermission relation — update the related record inline or reconnect to a different RolePermission by ID. */
  rolePermissions?: InputMaybe<Array<RolePermissionUpdateOrConnectInput>>;
  /** (Optional) Update the updatedAt of the Role. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of UserRole relation — update the related record inline or reconnect to a different UserRole by ID. */
  userRoles?: InputMaybe<Array<UserRoleUpdateOrConnectInput>>;
};

/** Either update an existing related Role record inline or reconnect to a different Role by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing Role. Do not provide both. */
export type RoleUpdateOrConnectInput = {
  /** Reconnect to a different existing Role record by its unique ID. */
  connect?: InputMaybe<RoleConnectInput>;
  /** Update the fields of the related Role record inline. Only provided fields will be changed. */
  update?: InputMaybe<RoleUpdateInput>;
};

/** Represents a ShiftingSchedule record in the database. */
export type ShiftingSchedule = {
  __typename?: 'ShiftingSchedule';
  /** (Optional) List of related AuditLog records linked to this ShiftingSchedule. */
  auditLogs: Array<AuditLog>;
  /** (Required) breakEnd field of ShiftingSchedule. Type: DateTime (ISO 8601). */
  breakEnd: Scalars['DateTime']['output'];
  /** (Required) breakStart field of ShiftingSchedule. Type: DateTime (ISO 8601). */
  breakStart: Scalars['DateTime']['output'];
  /** (Required) createdAt field of ShiftingSchedule. Type: DateTime (ISO 8601). */
  createdAt: Scalars['DateTime']['output'];
  /** (Required) description field of ShiftingSchedule. Type: String. */
  description: Scalars['String']['output'];
  /** (Required) endTime field of ShiftingSchedule. Type: DateTime (ISO 8601). */
  endTime: Scalars['DateTime']['output'];
  /** Unique identifier of the ShiftingSchedule record. */
  id: Scalars['ID']['output'];
  /** (Required) lunchEnd field of ShiftingSchedule. Type: DateTime (ISO 8601). */
  lunchEnd: Scalars['DateTime']['output'];
  /** (Required) lunchStart field of ShiftingSchedule. Type: DateTime (ISO 8601). */
  lunchStart: Scalars['DateTime']['output'];
  /** (Required) name field of ShiftingSchedule. Type: String. */
  name: Scalars['String']['output'];
  /** (Required) restDays field of ShiftingSchedule. Type: Integer. */
  restDays: Scalars['Int']['output'];
  /** (Required) startTime field of ShiftingSchedule. Type: DateTime (ISO 8601). */
  startTime: Scalars['DateTime']['output'];
  /** (Required) updatedAt field of ShiftingSchedule. Type: DateTime (ISO 8601). */
  updatedAt: Scalars['DateTime']['output'];
  /** (Required) workDays field of ShiftingSchedule. Type: Integer. */
  workDays: Scalars['Int']['output'];
  /** (Optional) Related WorkInformation record linked to this ShiftingSchedule. */
  workInformation?: Maybe<WorkInformation>;
  /** (Optional) workInformationId field of ShiftingSchedule. Type: String. */
  workInformationId?: Maybe<Scalars['String']['output']>;
};

/** Input to connect an existing ShiftingSchedule record by its unique ID. Use this when you want to link to an already existing ShiftingSchedule without creating a new one. */
export type ShiftingScheduleConnectInput = {
  /** The unique identifier of the existing ShiftingSchedule record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new ShiftingSchedule record. Required fields must be provided. Relation fields support nested create or connect. */
export type ShiftingScheduleCreateInput = {
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Required) The breakEnd of the new ShiftingSchedule. Type: DateTime. */
  breakEnd: Scalars['DateTime']['input'];
  /** (Required) The breakStart of the new ShiftingSchedule. Type: DateTime. */
  breakStart: Scalars['DateTime']['input'];
  /** (Required) The createdAt of the new ShiftingSchedule. Type: DateTime. */
  createdAt: Scalars['DateTime']['input'];
  /** (Required) The description of the new ShiftingSchedule. Type: String. */
  description: Scalars['String']['input'];
  /** (Required) The endTime of the new ShiftingSchedule. Type: DateTime. */
  endTime: Scalars['DateTime']['input'];
  /** (Required) The lunchEnd of the new ShiftingSchedule. Type: DateTime. */
  lunchEnd: Scalars['DateTime']['input'];
  /** (Required) The lunchStart of the new ShiftingSchedule. Type: DateTime. */
  lunchStart: Scalars['DateTime']['input'];
  /** (Required) The name of the new ShiftingSchedule. Type: String. */
  name: Scalars['String']['input'];
  /** (Required) The restDays of the new ShiftingSchedule. Type: Int. */
  restDays: Scalars['Int']['input'];
  /** (Required) The startTime of the new ShiftingSchedule. Type: DateTime. */
  startTime: Scalars['DateTime']['input'];
  /** (Required) The updatedAt of the new ShiftingSchedule. Type: DateTime. */
  updatedAt: Scalars['DateTime']['input'];
  /** (Required) The workDays of the new ShiftingSchedule. Type: Int. */
  workDays: Scalars['Int']['input'];
  /** (Optional) Single WorkInformation relation — create a new WorkInformation inline or connect to an existing one by ID. */
  workInformation?: InputMaybe<WorkInformationCreateOrConnectInput>;
  /** (Optional) The workInformationId of the new ShiftingSchedule. Type: String. */
  workInformationId?: InputMaybe<Scalars['String']['input']>;
};

/** Either create a new ShiftingSchedule record or connect to an existing one. Provide 'create' to insert a new ShiftingSchedule, or 'connect' to link to an existing ShiftingSchedule by ID. Do not provide both. */
export type ShiftingScheduleCreateOrConnectInput = {
  /** Connect an existing ShiftingSchedule record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<ShiftingScheduleConnectInput>;
  /** Create a new ShiftingSchedule record and link it to the parent. Provide all required fields for ShiftingSchedule. */
  create?: InputMaybe<ShiftingScheduleCreateInput>;
};

/** Paginated response wrapper for ShiftingSchedule. Returns a paged list of ShiftingSchedule records with pagination metadata and counts. */
export type ShiftingScheduleDeletedListResponse = {
  __typename?: 'ShiftingScheduleDeletedListResponse';
  /** Operation result code for the ShiftingSchedule pagination query. e.g. 'SHIFTINGSCHEDULE_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of ShiftingSchedule records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the ShiftingSchedule pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the ShiftingSchedule pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for ShiftingSchedule. Returns multiple ShiftingSchedule records along with operation status. */
export type ShiftingScheduleListResponse = {
  __typename?: 'ShiftingScheduleListResponse';
  /** Operation result code for the ShiftingSchedule list operation. e.g. 'SHIFTINGSCHEDULE_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of ShiftingSchedule records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<ShiftingSchedule>>;
  /** Indicates whether the ShiftingSchedule list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the ShiftingSchedule list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying ShiftingSchedule records. Use this to control which page of results to return and how to filter the dataset. */
export type ShiftingSchedulePageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down ShiftingSchedule results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter ShiftingSchedule records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of ShiftingSchedule records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter ShiftingSchedule records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for ShiftingSchedule. Returns a paged list of ShiftingSchedule records with pagination metadata and counts. */
export type ShiftingSchedulePaginationResponse = {
  __typename?: 'ShiftingSchedulePaginationResponse';
  /** Total number of active (isActive: true) ShiftingSchedule records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of ShiftingSchedule records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the ShiftingSchedule pagination query. e.g. 'SHIFTINGSCHEDULE_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of ShiftingSchedule records. Null if the query failed. */
  data?: Maybe<Array<ShiftingSchedule>>;
  /** Total number of inactive (isActive: false) ShiftingSchedule records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the ShiftingSchedule pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the ShiftingSchedule pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for ShiftingSchedule. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for ShiftingSchedule. Returns the created/updated/deleted ShiftingSchedule record along with operation status. */
export type ShiftingScheduleResponse = {
  __typename?: 'ShiftingScheduleResponse';
  /** Operation result code for ShiftingSchedule. e.g. 'SHIFTINGSCHEDULE_CREATE_SUCCESS' or 'SHIFTINGSCHEDULE_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The ShiftingSchedule record returned from the operation. Null if the operation failed. */
  data?: Maybe<ShiftingSchedule>;
  /** Indicates whether the ShiftingSchedule operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the ShiftingSchedule operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing ShiftingSchedule record. All fields are optional — only provided fields will be updated. */
export type ShiftingScheduleUpdateInput = {
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Update the breakEnd of the ShiftingSchedule. Type: DateTime. Leave empty to keep existing value. */
  breakEnd?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the breakStart of the ShiftingSchedule. Type: DateTime. Leave empty to keep existing value. */
  breakStart?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the createdAt of the ShiftingSchedule. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the description of the ShiftingSchedule. Type: String. Leave empty to keep existing value. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the endTime of the ShiftingSchedule. Type: DateTime. Leave empty to keep existing value. */
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the id of the ShiftingSchedule. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the lunchEnd of the ShiftingSchedule. Type: DateTime. Leave empty to keep existing value. */
  lunchEnd?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the lunchStart of the ShiftingSchedule. Type: DateTime. Leave empty to keep existing value. */
  lunchStart?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the name of the ShiftingSchedule. Type: String. Leave empty to keep existing value. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the restDays of the ShiftingSchedule. Type: Int. Leave empty to keep existing value. */
  restDays?: InputMaybe<Scalars['Int']['input']>;
  /** (Optional) Update the startTime of the ShiftingSchedule. Type: DateTime. Leave empty to keep existing value. */
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the updatedAt of the ShiftingSchedule. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the workDays of the ShiftingSchedule. Type: Int. Leave empty to keep existing value. */
  workDays?: InputMaybe<Scalars['Int']['input']>;
  /** (Optional) Single WorkInformation relation — update the related record inline or reconnect to a different WorkInformation by ID. */
  workInformation?: InputMaybe<WorkInformationUpdateOrConnectInput>;
  /** (Optional) Update the workInformationId of the ShiftingSchedule. Type: String. Leave empty to keep existing value. */
  workInformationId?: InputMaybe<Scalars['String']['input']>;
};

/** Either update an existing related ShiftingSchedule record inline or reconnect to a different ShiftingSchedule by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing ShiftingSchedule. Do not provide both. */
export type ShiftingScheduleUpdateOrConnectInput = {
  /** Reconnect to a different existing ShiftingSchedule record by its unique ID. */
  connect?: InputMaybe<ShiftingScheduleConnectInput>;
  /** Update the fields of the related ShiftingSchedule record inline. Only provided fields will be changed. */
  update?: InputMaybe<ShiftingScheduleUpdateInput>;
};

/** Represents a Status record in the database. */
export type Status = {
  __typename?: 'Status';
  /** (Optional) List of related AuditLog records linked to this Status. */
  auditLogs: Array<AuditLog>;
  /** (Optional) createdAt field of Status. Type: DateTime (ISO 8601). */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Unique identifier of the Status record. */
  id: Scalars['ID']['output'];
  /** (Optional) isActive field of Status. Type: Boolean. */
  isActive?: Maybe<Scalars['Boolean']['output']>;
  /** (Optional) modelNameType field of Status. Type: String. */
  modelNameType?: Maybe<Scalars['String']['output']>;
  /** (Optional) name field of Status. Type: String. */
  name?: Maybe<Scalars['String']['output']>;
  /** (Optional) updatedAt field of Status. Type: DateTime (ISO 8601). */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) List of related WorkInformation records linked to this Status. */
  workInformations: Array<WorkInformation>;
};

/** Input to connect an existing Status record by its unique ID. Use this when you want to link to an already existing Status without creating a new one. */
export type StatusConnectInput = {
  /** The unique identifier of the existing Status record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new Status record. Required fields must be provided. Relation fields support nested create or connect. */
export type StatusCreateInput = {
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Optional) The createdAt of the new Status. Type: DateTime. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) The isActive of the new Status. Type: Boolean. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) The modelNameType of the new Status. Type: String. */
  modelNameType?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The name of the new Status. Type: String. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The updatedAt of the new Status. Type: DateTime. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — create a new WorkInformation inline or connect to an existing one by ID. */
  workInformations?: InputMaybe<Array<WorkInformationCreateOrConnectInput>>;
};

/** Either create a new Status record or connect to an existing one. Provide 'create' to insert a new Status, or 'connect' to link to an existing Status by ID. Do not provide both. */
export type StatusCreateOrConnectInput = {
  /** Connect an existing Status record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<StatusConnectInput>;
  /** Create a new Status record and link it to the parent. Provide all required fields for Status. */
  create?: InputMaybe<StatusCreateInput>;
};

/** Paginated response wrapper for Status. Returns a paged list of Status records with pagination metadata and counts. */
export type StatusDeletedListResponse = {
  __typename?: 'StatusDeletedListResponse';
  /** Operation result code for the Status pagination query. e.g. 'STATUS_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Status records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the Status pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Status pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for Status. Returns multiple Status records along with operation status. */
export type StatusListResponse = {
  __typename?: 'StatusListResponse';
  /** Operation result code for the Status list operation. e.g. 'STATUS_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of Status records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<Status>>;
  /** Indicates whether the Status list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Status list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying Status records. Use this to control which page of results to return and how to filter the dataset. */
export type StatusPageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down Status results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter Status records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of Status records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter Status records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for Status. Returns a paged list of Status records with pagination metadata and counts. */
export type StatusPaginationResponse = {
  __typename?: 'StatusPaginationResponse';
  /** Total number of active (isActive: true) Status records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of Status records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the Status pagination query. e.g. 'STATUS_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Status records. Null if the query failed. */
  data?: Maybe<Array<Status>>;
  /** Total number of inactive (isActive: false) Status records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the Status pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Status pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for Status. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for Status. Returns the created/updated/deleted Status record along with operation status. */
export type StatusResponse = {
  __typename?: 'StatusResponse';
  /** Operation result code for Status. e.g. 'STATUS_CREATE_SUCCESS' or 'STATUS_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The Status record returned from the operation. Null if the operation failed. */
  data?: Maybe<Status>;
  /** Indicates whether the Status operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Status operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing Status record. All fields are optional — only provided fields will be updated. */
export type StatusUpdateInput = {
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Update the createdAt of the Status. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the id of the Status. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the isActive of the Status. Type: Boolean. Leave empty to keep existing value. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Update the modelNameType of the Status. Type: String. Leave empty to keep existing value. */
  modelNameType?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the name of the Status. Type: String. Leave empty to keep existing value. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the updatedAt of the Status. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — update the related record inline or reconnect to a different WorkInformation by ID. */
  workInformations?: InputMaybe<Array<WorkInformationUpdateOrConnectInput>>;
};

/** Either update an existing related Status record inline or reconnect to a different Status by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing Status. Do not provide both. */
export type StatusUpdateOrConnectInput = {
  /** Reconnect to a different existing Status record by its unique ID. */
  connect?: InputMaybe<StatusConnectInput>;
  /** Update the fields of the related Status record inline. Only provided fields will be changed. */
  update?: InputMaybe<StatusUpdateInput>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Real-time subscription for AuditLog changes. Emits an event whenever a AuditLog record is created, updated, archived, restored, or deleted. */
  AuditLogSubscription?: Maybe<AuditLog>;
  /** Real-time subscription for BasicInformation changes. Emits an event whenever a BasicInformation record is created, updated, archived, restored, or deleted. */
  BasicInformationSubscription?: Maybe<BasicInformation>;
  /** Real-time subscription for Company changes. Emits an event whenever a Company record is created, updated, archived, restored, or deleted. */
  CompanySubscription?: Maybe<Company>;
  /** Real-time subscription for Department changes. Emits an event whenever a Department record is created, updated, archived, restored, or deleted. */
  DepartmentSubscription?: Maybe<Department>;
  /** Real-time subscription for GroupOfCompany changes. Emits an event whenever a GroupOfCompany record is created, updated, archived, restored, or deleted. */
  GroupOfCompanySubscription?: Maybe<GroupOfCompany>;
  /** Real-time subscription for Holiday changes. Emits an event whenever a Holiday record is created, updated, archived, restored, or deleted. */
  HolidaySubscription?: Maybe<Holiday>;
  /** Real-time subscription for JobLevel changes. Emits an event whenever a JobLevel record is created, updated, archived, restored, or deleted. */
  JobLevelSubscription?: Maybe<JobLevel>;
  /** Real-time subscription for Location changes. Emits an event whenever a Location record is created, updated, archived, restored, or deleted. */
  LocationSubscription?: Maybe<Location>;
  /** Real-time subscription for Permission changes. Emits an event whenever a Permission record is created, updated, archived, restored, or deleted. */
  PermissionSubscription?: Maybe<Permission>;
  /** Real-time subscription for Position changes. Emits an event whenever a Position record is created, updated, archived, restored, or deleted. */
  PositionSubscription?: Maybe<Position>;
  /** Real-time subscription for RolePermission changes. Emits an event whenever a RolePermission record is created, updated, archived, restored, or deleted. */
  RolePermissionSubscription?: Maybe<RolePermission>;
  /** Real-time subscription for Role changes. Emits an event whenever a Role record is created, updated, archived, restored, or deleted. */
  RoleSubscription?: Maybe<Role>;
  /** Real-time subscription for ShiftingSchedule changes. Emits an event whenever a ShiftingSchedule record is created, updated, archived, restored, or deleted. */
  ShiftingScheduleSubscription?: Maybe<ShiftingSchedule>;
  /** Real-time subscription for Status changes. Emits an event whenever a Status record is created, updated, archived, restored, or deleted. */
  StatusSubscription?: Maybe<Status>;
  /** Real-time subscription for Type changes. Emits an event whenever a Type record is created, updated, archived, restored, or deleted. */
  TypeSubscription?: Maybe<Type>;
  /** Real-time subscription for UserRole changes. Emits an event whenever a UserRole record is created, updated, archived, restored, or deleted. */
  UserRoleSubscription?: Maybe<UserRole>;
  /** Real-time subscription for User changes. Emits an event whenever a User record is created, updated, archived, restored, or deleted. */
  UserSubscription?: Maybe<User>;
  /** Real-time subscription for WorkInformation changes. Emits an event whenever a WorkInformation record is created, updated, archived, restored, or deleted. */
  WorkInformationSubscription?: Maybe<WorkInformation>;
  countdown?: Maybe<Scalars['String']['output']>;
};

/** Represents a Type record in the database. */
export type Type = {
  __typename?: 'Type';
  /** (Optional) List of related AuditLog records linked to this Type. */
  actionType: Array<AuditLog>;
  /** (Optional) List of related AuditLog records linked to this Type. */
  auditLogs: Array<AuditLog>;
  /** (Optional) createdAt field of Type. Type: DateTime (ISO 8601). */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) List of related WorkInformation records linked to this Type. */
  employmentType: Array<WorkInformation>;
  /** Unique identifier of the Type record. */
  id: Scalars['ID']['output'];
  /** (Optional) List of related GroupOfCompany records linked to this Type. */
  industryType: Array<GroupOfCompany>;
  /** (Optional) isActive field of Type. Type: Boolean. */
  isActive?: Maybe<Scalars['Boolean']['output']>;
  /** (Optional) List of related JobLevel records linked to this Type. */
  jobLevels: Array<JobLevel>;
  /** (Optional) modelNameType field of Type. Type: String. */
  modelNameType?: Maybe<Scalars['String']['output']>;
  /** (Optional) name field of Type. Type: String. */
  name?: Maybe<Scalars['String']['output']>;
  /** (Optional) List of related RolePermission records linked to this Type. */
  rolePermissions: Array<RolePermission>;
  /** (Optional) updatedAt field of Type. Type: DateTime (ISO 8601). */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) List of related WorkInformation records linked to this Type. */
  workSetupType: Array<WorkInformation>;
};

/** Input to connect an existing Type record by its unique ID. Use this when you want to link to an already existing Type without creating a new one. */
export type TypeConnectInput = {
  /** The unique identifier of the existing Type record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new Type record. Required fields must be provided. Relation fields support nested create or connect. */
export type TypeCreateInput = {
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  actionType?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Optional) The createdAt of the new Type. Type: DateTime. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — create a new WorkInformation inline or connect to an existing one by ID. */
  employmentType?: InputMaybe<Array<WorkInformationCreateOrConnectInput>>;
  /** (Optional) List of GroupOfCompany relation — create a new GroupOfCompany inline or connect to an existing one by ID. */
  industryType?: InputMaybe<Array<GroupOfCompanyCreateOrConnectInput>>;
  /** (Optional) The isActive of the new Type. Type: Boolean. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) List of JobLevel relation — create a new JobLevel inline or connect to an existing one by ID. */
  jobLevels?: InputMaybe<Array<JobLevelCreateOrConnectInput>>;
  /** (Optional) The modelNameType of the new Type. Type: String. */
  modelNameType?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The name of the new Type. Type: String. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of RolePermission relation — create a new RolePermission inline or connect to an existing one by ID. */
  rolePermissions?: InputMaybe<Array<RolePermissionCreateOrConnectInput>>;
  /** (Optional) The updatedAt of the new Type. Type: DateTime. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — create a new WorkInformation inline or connect to an existing one by ID. */
  workSetupType?: InputMaybe<Array<WorkInformationCreateOrConnectInput>>;
};

/** Either create a new Type record or connect to an existing one. Provide 'create' to insert a new Type, or 'connect' to link to an existing Type by ID. Do not provide both. */
export type TypeCreateOrConnectInput = {
  /** Connect an existing Type record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<TypeConnectInput>;
  /** Create a new Type record and link it to the parent. Provide all required fields for Type. */
  create?: InputMaybe<TypeCreateInput>;
};

/** Paginated response wrapper for Type. Returns a paged list of Type records with pagination metadata and counts. */
export type TypeDeletedListResponse = {
  __typename?: 'TypeDeletedListResponse';
  /** Operation result code for the Type pagination query. e.g. 'TYPE_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Type records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the Type pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Type pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for Type. Returns multiple Type records along with operation status. */
export type TypeListResponse = {
  __typename?: 'TypeListResponse';
  /** Operation result code for the Type list operation. e.g. 'TYPE_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of Type records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<Type>>;
  /** Indicates whether the Type list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Type list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying Type records. Use this to control which page of results to return and how to filter the dataset. */
export type TypePageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down Type results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter Type records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of Type records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter Type records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for Type. Returns a paged list of Type records with pagination metadata and counts. */
export type TypePaginationResponse = {
  __typename?: 'TypePaginationResponse';
  /** Total number of active (isActive: true) Type records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of Type records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the Type pagination query. e.g. 'TYPE_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of Type records. Null if the query failed. */
  data?: Maybe<Array<Type>>;
  /** Total number of inactive (isActive: false) Type records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the Type pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Type pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for Type. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for Type. Returns the created/updated/deleted Type record along with operation status. */
export type TypeResponse = {
  __typename?: 'TypeResponse';
  /** Operation result code for Type. e.g. 'TYPE_CREATE_SUCCESS' or 'TYPE_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The Type record returned from the operation. Null if the operation failed. */
  data?: Maybe<Type>;
  /** Indicates whether the Type operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the Type operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing Type record. All fields are optional — only provided fields will be updated. */
export type TypeUpdateInput = {
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  actionType?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Update the createdAt of the Type. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — update the related record inline or reconnect to a different WorkInformation by ID. */
  employmentType?: InputMaybe<Array<WorkInformationUpdateOrConnectInput>>;
  /** (Optional) Update the id of the Type. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of GroupOfCompany relation — update the related record inline or reconnect to a different GroupOfCompany by ID. */
  industryType?: InputMaybe<Array<GroupOfCompanyUpdateOrConnectInput>>;
  /** (Optional) Update the isActive of the Type. Type: Boolean. Leave empty to keep existing value. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) List of JobLevel relation — update the related record inline or reconnect to a different JobLevel by ID. */
  jobLevels?: InputMaybe<Array<JobLevelUpdateOrConnectInput>>;
  /** (Optional) Update the modelNameType of the Type. Type: String. Leave empty to keep existing value. */
  modelNameType?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the name of the Type. Type: String. Leave empty to keep existing value. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of RolePermission relation — update the related record inline or reconnect to a different RolePermission by ID. */
  rolePermissions?: InputMaybe<Array<RolePermissionUpdateOrConnectInput>>;
  /** (Optional) Update the updatedAt of the Type. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) List of WorkInformation relation — update the related record inline or reconnect to a different WorkInformation by ID. */
  workSetupType?: InputMaybe<Array<WorkInformationUpdateOrConnectInput>>;
};

/** Either update an existing related Type record inline or reconnect to a different Type by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing Type. Do not provide both. */
export type TypeUpdateOrConnectInput = {
  /** Reconnect to a different existing Type record by its unique ID. */
  connect?: InputMaybe<TypeConnectInput>;
  /** Update the fields of the related Type record inline. Only provided fields will be changed. */
  update?: InputMaybe<TypeUpdateInput>;
};

/** Represents a User record in the database. */
export type User = {
  __typename?: 'User';
  /** (Optional) List of related AuditLog records linked to this User. */
  actions: Array<AuditLog>;
  /** (Optional) List of related AuditLog records linked to this User. */
  auditLogs: Array<AuditLog>;
  /** (Optional) Related BasicInformation record linked to this User. */
  basicInformations?: Maybe<BasicInformation>;
  /** (Optional) createdAt field of User. Type: DateTime (ISO 8601). */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) email field of User. Type: String. */
  email?: Maybe<Scalars['String']['output']>;
  /** (Optional) emailVerified field of User. Type: DateTime (ISO 8601). */
  emailVerified?: Maybe<Scalars['DateTime']['output']>;
  /** Unique identifier of the User record. */
  id: Scalars['ID']['output'];
  /** (Optional) image field of User. Type: String. */
  image?: Maybe<Scalars['String']['output']>;
  /** (Optional) isActive field of User. Type: Boolean. */
  isActive?: Maybe<Scalars['Boolean']['output']>;
  /** (Optional) isTwoFactorAuthEnabled field of User. Type: Boolean. */
  isTwoFactorAuthEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** (Optional) name field of User. Type: String. */
  name?: Maybe<Scalars['String']['output']>;
  /** (Optional) otpCode field of User. Type: String. */
  otpCode?: Maybe<Scalars['String']['output']>;
  /** (Optional) password field of User. Type: String. */
  password?: Maybe<Scalars['String']['output']>;
  /** (Optional) updatedAt field of User. Type: DateTime (ISO 8601). */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) userName field of User. Type: String. */
  userName?: Maybe<Scalars['String']['output']>;
  /** (Optional) List of related UserRole records linked to this User. */
  userRoles: Array<UserRole>;
};

/** Input to connect an existing User record by its unique ID. Use this when you want to link to an already existing User without creating a new one. */
export type UserConnectInput = {
  /** The unique identifier of the existing User record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new User record. Required fields must be provided. Relation fields support nested create or connect. */
export type UserCreateInput = {
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  actions?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Optional) Single BasicInformation relation — create a new BasicInformation inline or connect to an existing one by ID. */
  basicInformations?: InputMaybe<BasicInformationCreateOrConnectInput>;
  /** (Optional) The createdAt of the new User. Type: DateTime. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) The email of the new User. Type: String. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The emailVerified of the new User. Type: DateTime. */
  emailVerified?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) The image of the new User. Type: String. */
  image?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The isActive of the new User. Type: Boolean. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) The isTwoFactorAuthEnabled of the new User. Type: Boolean. */
  isTwoFactorAuthEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) The name of the new User. Type: String. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The otpCode of the new User. Type: String. */
  otpCode?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The password of the new User. Type: String. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The updatedAt of the new User. Type: DateTime. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) The userName of the new User. Type: String. */
  userName?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of UserRole relation — create a new UserRole inline or connect to an existing one by ID. */
  userRoles?: InputMaybe<Array<UserRoleCreateOrConnectInput>>;
};

/** Either create a new User record or connect to an existing one. Provide 'create' to insert a new User, or 'connect' to link to an existing User by ID. Do not provide both. */
export type UserCreateOrConnectInput = {
  /** Connect an existing User record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<UserConnectInput>;
  /** Create a new User record and link it to the parent. Provide all required fields for User. */
  create?: InputMaybe<UserCreateInput>;
};

/** Paginated response wrapper for User. Returns a paged list of User records with pagination metadata and counts. */
export type UserDeletedListResponse = {
  __typename?: 'UserDeletedListResponse';
  /** Operation result code for the User pagination query. e.g. 'USER_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of User records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the User pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the User pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for User. Returns multiple User records along with operation status. */
export type UserListResponse = {
  __typename?: 'UserListResponse';
  /** Operation result code for the User list operation. e.g. 'USER_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of User records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<User>>;
  /** Indicates whether the User list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the User list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

export type UserLoginInput = {
  /** Email or username of the user. */
  account: Scalars['String']['input'];
  /** IP address of the client making the login request, used for rate limiting. Optional but recommended. */
  ipAddress?: InputMaybe<Scalars['String']['input']>;
  /** One-time password for 2FA, if enabled. */
  otp?: InputMaybe<Scalars['String']['input']>;
  /** Password of the user. */
  password: Scalars['String']['input'];
};

/** Pagination and filtering input for querying User records. Use this to control which page of results to return and how to filter the dataset. */
export type UserPageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down User results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter User records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of User records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter User records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for User. Returns a paged list of User records with pagination metadata and counts. */
export type UserPaginationResponse = {
  __typename?: 'UserPaginationResponse';
  /** Total number of active (isActive: true) User records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of User records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the User pagination query. e.g. 'USER_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of User records. Null if the query failed. */
  data?: Maybe<Array<User>>;
  /** Total number of inactive (isActive: false) User records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the User pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the User pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for User. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for User. Returns the created/updated/deleted User record along with operation status. */
export type UserResponse = {
  __typename?: 'UserResponse';
  /** Operation result code for User. e.g. 'USER_CREATE_SUCCESS' or 'USER_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The User record returned from the operation. Null if the operation failed. */
  data?: Maybe<User>;
  /** Indicates whether the User operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the User operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Represents a UserRole record in the database. */
export type UserRole = {
  __typename?: 'UserRole';
  /** (Optional) List of related AuditLog records linked to this UserRole. */
  auditLogs: Array<AuditLog>;
  /** (Required) createdAt field of UserRole. Type: DateTime (ISO 8601). */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier of the UserRole record. */
  id: Scalars['ID']['output'];
  /** (Required) isActive field of UserRole. Type: Boolean. */
  isActive: Scalars['Boolean']['output'];
  /** (Optional) Related Role record linked to this UserRole. */
  role?: Maybe<Role>;
  /** (Optional) roleId field of UserRole. Type: String. */
  roleId?: Maybe<Scalars['String']['output']>;
  /** (Optional) scopeTypeId field of UserRole. Type: String. */
  scopeTypeId?: Maybe<Scalars['String']['output']>;
  /** (Required) scopeValues field of UserRole. Type: String. */
  scopeValues: Scalars['String']['output'];
  /** (Required) updatedAt field of UserRole. Type: DateTime (ISO 8601). */
  updatedAt: Scalars['DateTime']['output'];
  /** (Optional) Related User record linked to this UserRole. */
  user?: Maybe<User>;
  /** (Optional) userId field of UserRole. Type: String. */
  userId?: Maybe<Scalars['String']['output']>;
};

/** Input to connect an existing UserRole record by its unique ID. Use this when you want to link to an already existing UserRole without creating a new one. */
export type UserRoleConnectInput = {
  /** The unique identifier of the existing UserRole record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new UserRole record. Required fields must be provided. Relation fields support nested create or connect. */
export type UserRoleCreateInput = {
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Required) The createdAt of the new UserRole. Type: DateTime. */
  createdAt: Scalars['DateTime']['input'];
  /** (Required) The isActive of the new UserRole. Type: Boolean. */
  isActive: Scalars['Boolean']['input'];
  /** (Optional) Single Role relation — create a new Role inline or connect to an existing one by ID. */
  role?: InputMaybe<RoleCreateOrConnectInput>;
  /** (Optional) The roleId of the new UserRole. Type: String. */
  roleId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The scopeTypeId of the new UserRole. Type: String. */
  scopeTypeId?: InputMaybe<Scalars['String']['input']>;
  /** (Required) The scopeValues of the new UserRole. Type: String. */
  scopeValues: Scalars['String']['input'];
  /** (Required) The updatedAt of the new UserRole. Type: DateTime. */
  updatedAt: Scalars['DateTime']['input'];
  /** (Optional) Single User relation — create a new User inline or connect to an existing one by ID. */
  user?: InputMaybe<UserCreateOrConnectInput>;
  /** (Optional) The userId of the new UserRole. Type: String. */
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** Either create a new UserRole record or connect to an existing one. Provide 'create' to insert a new UserRole, or 'connect' to link to an existing UserRole by ID. Do not provide both. */
export type UserRoleCreateOrConnectInput = {
  /** Connect an existing UserRole record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<UserRoleConnectInput>;
  /** Create a new UserRole record and link it to the parent. Provide all required fields for UserRole. */
  create?: InputMaybe<UserRoleCreateInput>;
};

/** Paginated response wrapper for UserRole. Returns a paged list of UserRole records with pagination metadata and counts. */
export type UserRoleDeletedListResponse = {
  __typename?: 'UserRoleDeletedListResponse';
  /** Operation result code for the UserRole pagination query. e.g. 'USERROLE_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of UserRole records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the UserRole pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the UserRole pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for UserRole. Returns multiple UserRole records along with operation status. */
export type UserRoleListResponse = {
  __typename?: 'UserRoleListResponse';
  /** Operation result code for the UserRole list operation. e.g. 'USERROLE_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of UserRole records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<UserRole>>;
  /** Indicates whether the UserRole list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the UserRole list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying UserRole records. Use this to control which page of results to return and how to filter the dataset. */
export type UserRolePageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down UserRole results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter UserRole records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of UserRole records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter UserRole records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for UserRole. Returns a paged list of UserRole records with pagination metadata and counts. */
export type UserRolePaginationResponse = {
  __typename?: 'UserRolePaginationResponse';
  /** Total number of active (isActive: true) UserRole records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of UserRole records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the UserRole pagination query. e.g. 'USERROLE_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of UserRole records. Null if the query failed. */
  data?: Maybe<Array<UserRole>>;
  /** Total number of inactive (isActive: false) UserRole records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the UserRole pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the UserRole pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for UserRole. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for UserRole. Returns the created/updated/deleted UserRole record along with operation status. */
export type UserRoleResponse = {
  __typename?: 'UserRoleResponse';
  /** Operation result code for UserRole. e.g. 'USERROLE_CREATE_SUCCESS' or 'USERROLE_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The UserRole record returned from the operation. Null if the operation failed. */
  data?: Maybe<UserRole>;
  /** Indicates whether the UserRole operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the UserRole operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing UserRole record. All fields are optional — only provided fields will be updated. */
export type UserRoleUpdateInput = {
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Update the createdAt of the UserRole. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the id of the UserRole. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the isActive of the UserRole. Type: Boolean. Leave empty to keep existing value. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Single Role relation — update the related record inline or reconnect to a different Role by ID. */
  role?: InputMaybe<RoleUpdateOrConnectInput>;
  /** (Optional) Update the roleId of the UserRole. Type: String. Leave empty to keep existing value. */
  roleId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the scopeTypeId of the UserRole. Type: String. Leave empty to keep existing value. */
  scopeTypeId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the scopeValues of the UserRole. Type: String. Leave empty to keep existing value. */
  scopeValues?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the updatedAt of the UserRole. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single User relation — update the related record inline or reconnect to a different User by ID. */
  user?: InputMaybe<UserUpdateOrConnectInput>;
  /** (Optional) Update the userId of the UserRole. Type: String. Leave empty to keep existing value. */
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** Either update an existing related UserRole record inline or reconnect to a different UserRole by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing UserRole. Do not provide both. */
export type UserRoleUpdateOrConnectInput = {
  /** Reconnect to a different existing UserRole record by its unique ID. */
  connect?: InputMaybe<UserRoleConnectInput>;
  /** Update the fields of the related UserRole record inline. Only provided fields will be changed. */
  update?: InputMaybe<UserRoleUpdateInput>;
};

/** Input fields to update an existing User record. All fields are optional — only provided fields will be updated. */
export type UserUpdateInput = {
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  actions?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Single BasicInformation relation — update the related record inline or reconnect to a different BasicInformation by ID. */
  basicInformations?: InputMaybe<BasicInformationUpdateOrConnectInput>;
  /** (Optional) Update the createdAt of the User. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the email of the User. Type: String. Leave empty to keep existing value. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the emailVerified of the User. Type: DateTime. Leave empty to keep existing value. */
  emailVerified?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the id of the User. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the image of the User. Type: String. Leave empty to keep existing value. */
  image?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the isActive of the User. Type: Boolean. Leave empty to keep existing value. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Update the isTwoFactorAuthEnabled of the User. Type: Boolean. Leave empty to keep existing value. */
  isTwoFactorAuthEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Update the name of the User. Type: String. Leave empty to keep existing value. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the otpCode of the User. Type: String. Leave empty to keep existing value. */
  otpCode?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the password of the User. Type: String. Leave empty to keep existing value. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the updatedAt of the User. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the userName of the User. Type: String. Leave empty to keep existing value. */
  userName?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) List of UserRole relation — update the related record inline or reconnect to a different UserRole by ID. */
  userRoles?: InputMaybe<Array<UserRoleUpdateOrConnectInput>>;
};

/** Either update an existing related User record inline or reconnect to a different User by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing User. Do not provide both. */
export type UserUpdateOrConnectInput = {
  /** Reconnect to a different existing User record by its unique ID. */
  connect?: InputMaybe<UserConnectInput>;
  /** Update the fields of the related User record inline. Only provided fields will be changed. */
  update?: InputMaybe<UserUpdateInput>;
};

/** Represents a WorkInformation record in the database. */
export type WorkInformation = {
  __typename?: 'WorkInformation';
  /** (Optional) List of related AuditLog records linked to this WorkInformation. */
  auditLogs: Array<AuditLog>;
  /** (Optional) Related Company record linked to this WorkInformation. */
  company?: Maybe<Company>;
  /** (Optional) companyId field of WorkInformation. Type: String. */
  companyId?: Maybe<Scalars['String']['output']>;
  /** (Optional) contractEndDate field of WorkInformation. Type: DateTime (ISO 8601). */
  contractEndDate?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) createdAt field of WorkInformation. Type: DateTime (ISO 8601). */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) Related Department record linked to this WorkInformation. */
  department?: Maybe<Department>;
  /** (Optional) departmentId field of WorkInformation. Type: String. */
  departmentId?: Maybe<Scalars['String']['output']>;
  /** (Optional) Related BasicInformation record linked to this WorkInformation. */
  employee?: Maybe<BasicInformation>;
  /** (Optional) employeeId field of WorkInformation. Type: String. */
  employeeId?: Maybe<Scalars['String']['output']>;
  /** (Optional) employeeNumber field of WorkInformation. Type: String. */
  employeeNumber?: Maybe<Scalars['String']['output']>;
  /** (Optional) Related Status record linked to this WorkInformation. */
  employmentStatus?: Maybe<Status>;
  /** (Optional) employmentStatusId field of WorkInformation. Type: String. */
  employmentStatusId?: Maybe<Scalars['String']['output']>;
  /** (Optional) Related Type record linked to this WorkInformation. */
  employmentType?: Maybe<Type>;
  /** (Optional) employmentTypeId field of WorkInformation. Type: String. */
  employmentTypeId?: Maybe<Scalars['String']['output']>;
  /** (Optional) endDate field of WorkInformation. Type: DateTime (ISO 8601). */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) finalProbationEvaluationDate field of WorkInformation. Type: DateTime (ISO 8601). */
  finalProbationEvaluationDate?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) firstProbationEvaluationDate field of WorkInformation. Type: DateTime (ISO 8601). */
  firstProbationEvaluationDate?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) Related GroupOfCompany record linked to this WorkInformation. */
  groupOfCompany?: Maybe<GroupOfCompany>;
  /** (Optional) groupOfCompanyId field of WorkInformation. Type: String. */
  groupOfCompanyId?: Maybe<Scalars['String']['output']>;
  /** (Optional) hireDate field of WorkInformation. Type: DateTime (ISO 8601). */
  hireDate?: Maybe<Scalars['DateTime']['output']>;
  /** Unique identifier of the WorkInformation record. */
  id: Scalars['ID']['output'];
  /** (Optional) isActive field of WorkInformation. Type: Boolean. */
  isActive?: Maybe<Scalars['Boolean']['output']>;
  /** (Optional) Related JobLevel record linked to this WorkInformation. */
  jobLevel?: Maybe<JobLevel>;
  /** (Optional) jobLevelId field of WorkInformation. Type: String. */
  jobLevelId?: Maybe<Scalars['String']['output']>;
  /** (Optional) Related Position record linked to this WorkInformation. */
  position?: Maybe<Position>;
  /** (Optional) positionId field of WorkInformation. Type: String. */
  positionId?: Maybe<Scalars['String']['output']>;
  /** (Optional) regularizationDate field of WorkInformation. Type: DateTime (ISO 8601). */
  regularizationDate?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) Related BasicInformation record linked to this WorkInformation. */
  reportingManager?: Maybe<BasicInformation>;
  /** (Optional) reportingManagerId field of WorkInformation. Type: String. */
  reportingManagerId?: Maybe<Scalars['String']['output']>;
  /** (Optional) seasonalEndDate field of WorkInformation. Type: DateTime (ISO 8601). */
  seasonalEndDate?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) Related ShiftingSchedule record linked to this WorkInformation. */
  shiftingSchedule?: Maybe<ShiftingSchedule>;
  /** (Optional) updatedAt field of WorkInformation. Type: DateTime (ISO 8601). */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** (Optional) Related Location record linked to this WorkInformation. */
  workLocation?: Maybe<Location>;
  /** (Optional) workLocationId field of WorkInformation. Type: String. */
  workLocationId?: Maybe<Scalars['String']['output']>;
  /** (Optional) Related Type record linked to this WorkInformation. */
  workSetupType?: Maybe<Type>;
  /** (Optional) workSetupTypeId field of WorkInformation. Type: String. */
  workSetupTypeId?: Maybe<Scalars['String']['output']>;
};

/** Input to connect an existing WorkInformation record by its unique ID. Use this when you want to link to an already existing WorkInformation without creating a new one. */
export type WorkInformationConnectInput = {
  /** The unique identifier of the existing WorkInformation record to connect. */
  id: Scalars['String']['input'];
};

/** Input fields required to create a new WorkInformation record. Required fields must be provided. Relation fields support nested create or connect. */
export type WorkInformationCreateInput = {
  /** (Optional) List of AuditLog relation — create a new AuditLog inline or connect to an existing one by ID. */
  auditLogs?: InputMaybe<Array<AuditLogCreateOrConnectInput>>;
  /** (Optional) Single Company relation — create a new Company inline or connect to an existing one by ID. */
  company?: InputMaybe<CompanyCreateOrConnectInput>;
  /** (Optional) The companyId of the new WorkInformation. Type: String. */
  companyId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The contractEndDate of the new WorkInformation. Type: DateTime. */
  contractEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) The createdAt of the new WorkInformation. Type: DateTime. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single Department relation — create a new Department inline or connect to an existing one by ID. */
  department?: InputMaybe<DepartmentCreateOrConnectInput>;
  /** (Optional) The departmentId of the new WorkInformation. Type: String. */
  departmentId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single BasicInformation relation — create a new BasicInformation inline or connect to an existing one by ID. */
  employee?: InputMaybe<BasicInformationCreateOrConnectInput>;
  /** (Optional) The employeeId of the new WorkInformation. Type: String. */
  employeeId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The employeeNumber of the new WorkInformation. Type: String. */
  employeeNumber?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Status relation — create a new Status inline or connect to an existing one by ID. */
  employmentStatus?: InputMaybe<StatusCreateOrConnectInput>;
  /** (Optional) The employmentStatusId of the new WorkInformation. Type: String. */
  employmentStatusId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Type relation — create a new Type inline or connect to an existing one by ID. */
  employmentType?: InputMaybe<TypeCreateOrConnectInput>;
  /** (Optional) The employmentTypeId of the new WorkInformation. Type: String. */
  employmentTypeId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The endDate of the new WorkInformation. Type: DateTime. */
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) The finalProbationEvaluationDate of the new WorkInformation. Type: DateTime. */
  finalProbationEvaluationDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) The firstProbationEvaluationDate of the new WorkInformation. Type: DateTime. */
  firstProbationEvaluationDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single GroupOfCompany relation — create a new GroupOfCompany inline or connect to an existing one by ID. */
  groupOfCompany?: InputMaybe<GroupOfCompanyCreateOrConnectInput>;
  /** (Optional) The groupOfCompanyId of the new WorkInformation. Type: String. */
  groupOfCompanyId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The hireDate of the new WorkInformation. Type: DateTime. */
  hireDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) The isActive of the new WorkInformation. Type: Boolean. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Single JobLevel relation — create a new JobLevel inline or connect to an existing one by ID. */
  jobLevel?: InputMaybe<JobLevelCreateOrConnectInput>;
  /** (Optional) The jobLevelId of the new WorkInformation. Type: String. */
  jobLevelId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Position relation — create a new Position inline or connect to an existing one by ID. */
  position?: InputMaybe<PositionCreateOrConnectInput>;
  /** (Optional) The positionId of the new WorkInformation. Type: String. */
  positionId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The regularizationDate of the new WorkInformation. Type: DateTime. */
  regularizationDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single BasicInformation relation — create a new BasicInformation inline or connect to an existing one by ID. */
  reportingManager?: InputMaybe<BasicInformationCreateOrConnectInput>;
  /** (Optional) The reportingManagerId of the new WorkInformation. Type: String. */
  reportingManagerId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) The seasonalEndDate of the new WorkInformation. Type: DateTime. */
  seasonalEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single ShiftingSchedule relation — create a new ShiftingSchedule inline or connect to an existing one by ID. */
  shiftingSchedule?: InputMaybe<ShiftingScheduleCreateOrConnectInput>;
  /** (Optional) The updatedAt of the new WorkInformation. Type: DateTime. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single Location relation — create a new Location inline or connect to an existing one by ID. */
  workLocation?: InputMaybe<LocationCreateOrConnectInput>;
  /** (Optional) The workLocationId of the new WorkInformation. Type: String. */
  workLocationId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Type relation — create a new Type inline or connect to an existing one by ID. */
  workSetupType?: InputMaybe<TypeCreateOrConnectInput>;
  /** (Optional) The workSetupTypeId of the new WorkInformation. Type: String. */
  workSetupTypeId?: InputMaybe<Scalars['String']['input']>;
};

/** Either create a new WorkInformation record or connect to an existing one. Provide 'create' to insert a new WorkInformation, or 'connect' to link to an existing WorkInformation by ID. Do not provide both. */
export type WorkInformationCreateOrConnectInput = {
  /** Connect an existing WorkInformation record by its unique ID instead of creating a new one. */
  connect?: InputMaybe<WorkInformationConnectInput>;
  /** Create a new WorkInformation record and link it to the parent. Provide all required fields for WorkInformation. */
  create?: InputMaybe<WorkInformationCreateInput>;
};

/** Paginated response wrapper for WorkInformation. Returns a paged list of WorkInformation records with pagination metadata and counts. */
export type WorkInformationDeletedListResponse = {
  __typename?: 'WorkInformationDeletedListResponse';
  /** Operation result code for the WorkInformation pagination query. e.g. 'WORKINFORMATION_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of WorkInformation records. Null if the query failed. */
  data?: Maybe<Array<DeletedItem>>;
  /** Indicates whether the WorkInformation pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the WorkInformation pagination query. */
  message?: Maybe<Scalars['String']['output']>;
};

/** List response wrapper for WorkInformation. Returns multiple WorkInformation records along with operation status. */
export type WorkInformationListResponse = {
  __typename?: 'WorkInformationListResponse';
  /** Operation result code for the WorkInformation list operation. e.g. 'WORKINFORMATION_CREATE_MANY_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** Array of WorkInformation records returned from the operation. Null if the operation failed. */
  data?: Maybe<Array<WorkInformation>>;
  /** Indicates whether the WorkInformation list operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the WorkInformation list operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Pagination and filtering input for querying WorkInformation records. Use this to control which page of results to return and how to filter the dataset. */
export type WorkInformationPageInput = {
  /** (Required) The page number to retrieve. Starts at 1. */
  currentPage: Scalars['Int']['input'];
  /** (Optional) Advanced JSON filter to narrow down WorkInformation results. Follows Prisma where clause structure. */
  filter?: InputMaybe<Scalars['Json']['input']>;
  /** (Required) Filter WorkInformation records by their active status. Set to true to return only active records, false for inactive. */
  isActive: Scalars['Boolean']['input'];
  /** (Required) Number of WorkInformation records to return per page. */
  pageSize: Scalars['Int']['input'];
  /** (Optional) Search keyword to filter WorkInformation records by text fields. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated response wrapper for WorkInformation. Returns a paged list of WorkInformation records with pagination metadata and counts. */
export type WorkInformationPaginationResponse = {
  __typename?: 'WorkInformationPaginationResponse';
  /** Total number of active (isActive: true) WorkInformation records. */
  active?: Maybe<Scalars['Int']['output']>;
  /** Total number of WorkInformation records in the database regardless of filters. */
  allCount?: Maybe<Scalars['Int']['output']>;
  /** Operation result code for the WorkInformation pagination query. e.g. 'WORKINFORMATION_FETCH_SUCCESS'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The current page of WorkInformation records. Null if the query failed. */
  data?: Maybe<Array<WorkInformation>>;
  /** Total number of inactive (isActive: false) WorkInformation records. */
  inActive?: Maybe<Scalars['Int']['output']>;
  /** Indicates whether the WorkInformation pagination query was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the WorkInformation pagination query. */
  message?: Maybe<Scalars['String']['output']>;
  /** Pagination metadata including current page, total pages, and navigation flags for WorkInformation. */
  pageinfo?: Maybe<PageInfo>;
};

/** Single record response wrapper for WorkInformation. Returns the created/updated/deleted WorkInformation record along with operation status. */
export type WorkInformationResponse = {
  __typename?: 'WorkInformationResponse';
  /** Operation result code for WorkInformation. e.g. 'WORKINFORMATION_CREATE_SUCCESS' or 'WORKINFORMATION_NOT_FOUND'. */
  code?: Maybe<Scalars['String']['output']>;
  /** The WorkInformation record returned from the operation. Null if the operation failed. */
  data?: Maybe<WorkInformation>;
  /** Indicates whether the WorkInformation operation was successful. */
  isSuccess?: Maybe<Scalars['Boolean']['output']>;
  /** Human-readable message describing the result of the WorkInformation operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Input fields to update an existing WorkInformation record. All fields are optional — only provided fields will be updated. */
export type WorkInformationUpdateInput = {
  /** (Optional) List of AuditLog relation — update the related record inline or reconnect to a different AuditLog by ID. */
  auditLogs?: InputMaybe<Array<AuditLogUpdateOrConnectInput>>;
  /** (Optional) Single Company relation — update the related record inline or reconnect to a different Company by ID. */
  company?: InputMaybe<CompanyUpdateOrConnectInput>;
  /** (Optional) Update the companyId of the WorkInformation. Type: String. Leave empty to keep existing value. */
  companyId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the contractEndDate of the WorkInformation. Type: DateTime. Leave empty to keep existing value. */
  contractEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the createdAt of the WorkInformation. Type: DateTime. Leave empty to keep existing value. */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single Department relation — update the related record inline or reconnect to a different Department by ID. */
  department?: InputMaybe<DepartmentUpdateOrConnectInput>;
  /** (Optional) Update the departmentId of the WorkInformation. Type: String. Leave empty to keep existing value. */
  departmentId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single BasicInformation relation — update the related record inline or reconnect to a different BasicInformation by ID. */
  employee?: InputMaybe<BasicInformationUpdateOrConnectInput>;
  /** (Optional) Update the employeeId of the WorkInformation. Type: String. Leave empty to keep existing value. */
  employeeId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the employeeNumber of the WorkInformation. Type: String. Leave empty to keep existing value. */
  employeeNumber?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Status relation — update the related record inline or reconnect to a different Status by ID. */
  employmentStatus?: InputMaybe<StatusUpdateOrConnectInput>;
  /** (Optional) Update the employmentStatusId of the WorkInformation. Type: String. Leave empty to keep existing value. */
  employmentStatusId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Type relation — update the related record inline or reconnect to a different Type by ID. */
  employmentType?: InputMaybe<TypeUpdateOrConnectInput>;
  /** (Optional) Update the employmentTypeId of the WorkInformation. Type: String. Leave empty to keep existing value. */
  employmentTypeId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the endDate of the WorkInformation. Type: DateTime. Leave empty to keep existing value. */
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the finalProbationEvaluationDate of the WorkInformation. Type: DateTime. Leave empty to keep existing value. */
  finalProbationEvaluationDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the firstProbationEvaluationDate of the WorkInformation. Type: DateTime. Leave empty to keep existing value. */
  firstProbationEvaluationDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single GroupOfCompany relation — update the related record inline or reconnect to a different GroupOfCompany by ID. */
  groupOfCompany?: InputMaybe<GroupOfCompanyUpdateOrConnectInput>;
  /** (Optional) Update the groupOfCompanyId of the WorkInformation. Type: String. Leave empty to keep existing value. */
  groupOfCompanyId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the hireDate of the WorkInformation. Type: DateTime. Leave empty to keep existing value. */
  hireDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Update the id of the WorkInformation. Type: String. Leave empty to keep existing value. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the isActive of the WorkInformation. Type: Boolean. Leave empty to keep existing value. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** (Optional) Single JobLevel relation — update the related record inline or reconnect to a different JobLevel by ID. */
  jobLevel?: InputMaybe<JobLevelUpdateOrConnectInput>;
  /** (Optional) Update the jobLevelId of the WorkInformation. Type: String. Leave empty to keep existing value. */
  jobLevelId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Position relation — update the related record inline or reconnect to a different Position by ID. */
  position?: InputMaybe<PositionUpdateOrConnectInput>;
  /** (Optional) Update the positionId of the WorkInformation. Type: String. Leave empty to keep existing value. */
  positionId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the regularizationDate of the WorkInformation. Type: DateTime. Leave empty to keep existing value. */
  regularizationDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single BasicInformation relation — update the related record inline or reconnect to a different BasicInformation by ID. */
  reportingManager?: InputMaybe<BasicInformationUpdateOrConnectInput>;
  /** (Optional) Update the reportingManagerId of the WorkInformation. Type: String. Leave empty to keep existing value. */
  reportingManagerId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Update the seasonalEndDate of the WorkInformation. Type: DateTime. Leave empty to keep existing value. */
  seasonalEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single ShiftingSchedule relation — update the related record inline or reconnect to a different ShiftingSchedule by ID. */
  shiftingSchedule?: InputMaybe<ShiftingScheduleUpdateOrConnectInput>;
  /** (Optional) Update the updatedAt of the WorkInformation. Type: DateTime. Leave empty to keep existing value. */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** (Optional) Single Location relation — update the related record inline or reconnect to a different Location by ID. */
  workLocation?: InputMaybe<LocationUpdateOrConnectInput>;
  /** (Optional) Update the workLocationId of the WorkInformation. Type: String. Leave empty to keep existing value. */
  workLocationId?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) Single Type relation — update the related record inline or reconnect to a different Type by ID. */
  workSetupType?: InputMaybe<TypeUpdateOrConnectInput>;
  /** (Optional) Update the workSetupTypeId of the WorkInformation. Type: String. Leave empty to keep existing value. */
  workSetupTypeId?: InputMaybe<Scalars['String']['input']>;
};

/** Either update an existing related WorkInformation record inline or reconnect to a different WorkInformation by ID. Provide 'update' to modify the related record's fields, or 'connect' to switch to a different existing WorkInformation. Do not provide both. */
export type WorkInformationUpdateOrConnectInput = {
  /** Reconnect to a different existing WorkInformation record by its unique ID. */
  connect?: InputMaybe<WorkInformationConnectInput>;
  /** Update the fields of the related WorkInformation record inline. Only provided fields will be changed. */
  update?: InputMaybe<WorkInformationUpdateInput>;
};
