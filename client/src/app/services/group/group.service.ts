import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupNameSubject = new BehaviorSubject<string>(this.getStoredGroupName());
  private groupCodeSubject = new BehaviorSubject<string>(this.getStoredGroupCode());

  currentGroupName = this.groupNameSubject.asObservable();
  currentGroupCode = this.groupCodeSubject.asObservable();

  setGroupName(name: string) {
    this.groupNameSubject.next(name);
    localStorage.setItem('groupName', name);
  }

  setGroupCode(code: string) {
    this.groupCodeSubject.next(code);
    localStorage.setItem('groupCode', code);
  }

  private getStoredGroupName(): string {
    return localStorage.getItem('groupName') || '';
  }

  private getStoredGroupCode(): string {
    return localStorage.getItem('groupCode') || '';
  }
}
