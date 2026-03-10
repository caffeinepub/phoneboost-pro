import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AppSettings,
  ScanHistory,
  SecurityScan,
  UserProfile,
} from "../backend.d";
import { Variant_dark_light } from "../backend.d";
import { useActor } from "./useActor";

export function useAppSettings() {
  const { actor, isFetching } = useActor();
  return useQuery<AppSettings | null>({
    queryKey: ["appSettings"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAppSettings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveAppSettings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settings: AppSettings) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveAppSettings(settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appSettings"] });
    },
  });
}

export function useUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useScanHistory() {
  const { actor, isFetching } = useActor();
  return useQuery<ScanHistory[]>({
    queryKey: ["scanHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getScanHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddScanHistory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (history: ScanHistory) => {
      if (!actor) throw new Error("Not connected");
      return actor.addScanHistory(history);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanHistory"] });
    },
  });
}

export function useSecurityScan() {
  const { actor, isFetching } = useActor();
  return useQuery<SecurityScan | null>({
    queryKey: ["securityScan"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSecurityScan();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveSecurityScan() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (scan: SecurityScan) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveSecurityScan(scan);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["securityScan"] });
    },
  });
}

export { Variant_dark_light };
