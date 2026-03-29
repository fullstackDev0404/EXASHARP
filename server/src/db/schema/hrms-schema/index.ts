import * as assets from './assets';
import * as attendance from './attendance';
import * as core from './core';
import * as enums from './enums';
import * as organization from './organization';
import * as employee from './employee';
import * as development from './development';
import * as payroll from './payroll';
import * as performance from './performance';
import * as recruitment from './recruitment';
import * as system from './system';
import * as tableRelations from './table-relations';

    
export const hrmsSchema = {
    ...assets,
    ...attendance,
    ...core,
    ...development,
    ...enums,
    ...organization,
    ...employee,
    ...payroll,
    ...performance,
    ...recruitment,
    ...system,
    ...tableRelations
}