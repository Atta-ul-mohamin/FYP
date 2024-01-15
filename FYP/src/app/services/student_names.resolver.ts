import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ParseService } from 'src/app/services/parse.service';

@Injectable({ providedIn: 'root' })
export class StudentNamesResolver implements Resolve<string[]> {
  constructor(private parseService: ParseService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<string[]> {
    if (this.parseService.user) {
      const teacherId = this.parseService.user.objectId;
      const studentIds = await this.parseService.getStudentIdsByTeacherId(teacherId);
      return this.parseService.getStudentNamesByIds(studentIds);
    }
    return [];
  }
}
