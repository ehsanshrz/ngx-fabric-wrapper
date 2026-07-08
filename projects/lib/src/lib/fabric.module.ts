import { NgModule } from '@angular/core';

import { FabricComponent } from './fabric.component';
import { FabricDirective } from './fabric.directive';

@NgModule({
  imports: [ FabricComponent, FabricDirective ],
  exports: [ FabricComponent, FabricDirective ]
})
export class FabricModule {
}
