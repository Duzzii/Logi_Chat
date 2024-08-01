import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupNameSource = new BehaviorSubject<string>('');
  private groupCodeSource = new BehaviorSubject<string>('');

  currentGroupName = this.groupNameSource.asObservable();
  currentGroupCode = this.groupCodeSource.asObservable();

  constructor() { }

  setGroupName(name: string) {
    this.groupNameSource.next(name);
  }

  setGroupCode(code: string) {
    this.groupCodeSource.next(code);
  }
}
