import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  // A BehaviorSubject to hold and emit the current group name. Initialized with value from localStorage.
  private groupNameSubject = new BehaviorSubject<string>(this.getStoredGroupName());

  // A BehaviorSubject to hold and emit the current group code. Initialized with value from localStorage.
  private groupCodeSubject = new BehaviorSubject<string>(this.getStoredGroupCode());

  // Observable that components can subscribe to in order to get the current group name.
  currentGroupName = this.groupNameSubject.asObservable();

  // Observable that components can subscribe to in order to get the current group code.
  currentGroupCode = this.groupCodeSubject.asObservable();

  /**
   * Updates the group name and stores it in localStorage.
   * @param name The new group name to set.
   */
  setGroupName(name: string) {
    this.groupNameSubject.next(name); // Emit the new group name to all subscribers.
    localStorage.setItem('groupName', name); // Store the new group name in localStorage.
  }

  /**
   * Updates the group code and stores it in localStorage.
   * @param code The new group code to set.
   */
  setGroupCode(code: string) {
    this.groupCodeSubject.next(code); // Emit the new group code to all subscribers.
    localStorage.setItem('groupCode', code); // Store the new group code in localStorage.
  }

  /**
   * Retrieves the stored group name from localStorage.
   * @returns The stored group name, or an empty string if not found.
   */
  private getStoredGroupName(): string {
    return localStorage.getItem('groupName') || ''; // Return the stored group name or an empty string if not found.
  }

  /**
   * Retrieves the stored group code from localStorage.
   * @returns The stored group code, or an empty string if not found.
   */
  private getStoredGroupCode(): string {
    return localStorage.getItem('groupCode') || ''; // Return the stored group code or an empty string if not found.
  }
}
