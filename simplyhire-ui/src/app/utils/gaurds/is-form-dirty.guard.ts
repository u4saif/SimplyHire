import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root',
})
export class IsFormDirtyGuard implements CanDeactivate<unknown> {
  constructor(private modal: NzModalService) {}
  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component && component.dynamicForm && component.dynamicForm.dirty) {
      return new Observable((observer: Observer<boolean>) => {
        this.modal.confirm({
          nzTitle:
            'You have unsaved changes, are you sure you want to leave this page ?',
          nzOkText: 'Yes',
          nzCancelText: 'No',
          nzOnOk: () => {
            observer.next(true);
            observer.complete();
          },
          nzOnCancel: () => {
            observer.next(false);
            observer.complete();
          },
        });
      });
    }

    return true;
  }
}
