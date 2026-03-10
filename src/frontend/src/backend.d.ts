import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SecurityScan {
    threatsFound: bigint;
    lastScanDate: Time;
}
export interface ScanHistory {
    itemsCleaned: bigint;
    date: Time;
    mbFreed: bigint;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
    avatarColor: string;
}
export interface AppSettings {
    theme: Variant_dark_light;
    notificationsEnabled: boolean;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_dark_light {
    dark = "dark",
    light = "light"
}
export interface backendInterface {
    addScanHistory(history: ScanHistory): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllScanHistoriesByUser(user: Principal): Promise<Array<ScanHistory>>;
    getAppSettings(): Promise<AppSettings | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLastScanHistory(limit: bigint): Promise<Array<ScanHistory>>;
    getScanCount(): Promise<bigint>;
    getScanHistory(): Promise<Array<ScanHistory>>;
    getSecurityScan(): Promise<SecurityScan | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveAppSettings(settings: AppSettings): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveSecurityScan(scan: SecurityScan): Promise<void>;
}
