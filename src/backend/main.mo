import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Order "mo:core/Order";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  public type UserProfile = {
    name : Text;
    avatarColor : Text;
  };

  public type ScanHistory = {
    date : Time.Time;
    itemsCleaned : Nat;
    mbFreed : Nat;
  };

  public type AppSettings = {
    theme : {
      #dark;
      #light;
    };
    notificationsEnabled : Bool;
  };

  public type SecurityScan = {
    lastScanDate : Time.Time;
    threatsFound : Nat;
  };

  module ScanHistory {
    public func compare(history1 : ScanHistory, history2 : ScanHistory) : Order.Order {
      Int.compare(history1.date, history2.date);
    };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let scanHistories = Map.empty<Principal, [ScanHistory]>();
  let appSettings = Map.empty<Principal, AppSettings>();
  let securityScans = Map.empty<Principal, SecurityScan>();

  // Access control from authorization component
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    switch (userProfiles.get(caller)) {
      case (?profile) { ?profile };
      case (null) { null };
    };
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    switch (userProfiles.get(user)) {
      case (?profile) { ?profile };
      case (null) { null };
    };
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func addScanHistory(history : ScanHistory) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add scan history");
    };
    let existingHistory = switch (scanHistories.get(caller)) {
      case (?histories) { histories };
      case (null) { [] };
    };
    scanHistories.add(caller, existingHistory.concat([history]));
  };

  public query ({ caller }) func getScanHistory() : async [ScanHistory] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access scan history");
    };
    switch (scanHistories.get(caller)) {
      case (?history) { history };
      case (null) { [] };
    };
  };

  public shared ({ caller }) func saveAppSettings(settings : AppSettings) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save settings");
    };
    appSettings.add(caller, settings);
  };

  public query ({ caller }) func getAppSettings() : async ?AppSettings {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access settings");
    };
    appSettings.get(caller);
  };

  public shared ({ caller }) func saveSecurityScan(scan : SecurityScan) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save security scans");
    };
    securityScans.add(caller, scan);
  };

  public query ({ caller }) func getSecurityScan() : async ?SecurityScan {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access security scans");
    };
    securityScans.get(caller);
  };

  public query ({ caller }) func getLastScanHistory(limit : Nat) : async [ScanHistory] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access scan history");
    };
    switch (scanHistories.get(caller)) {
      case (?histories) {
        let sorted = histories.sort();
        let len = sorted.size();
        if (len <= limit) {
          sorted;
        } else {
          Array.tabulate<ScanHistory>(limit, func(i) { sorted[i] });
        };
      };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getScanCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access scan count");
    };
    switch (scanHistories.get(caller)) {
      case (?histories) { histories.size() };
      case (null) { 0 };
    };
  };

  public query ({ caller }) func getAllScanHistoriesByUser(user : Principal) : async [ScanHistory] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own scan history");
    };
    switch (scanHistories.get(user)) {
      case (?history) { history };
      case (null) { [] };
    };
  };
};
