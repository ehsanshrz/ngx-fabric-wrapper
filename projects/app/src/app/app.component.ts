import { Canvas, Line, Text, FabricImage } from 'fabric';

import { Component, ViewChild } from '@angular/core';

import { FabricComponent, FabricDirective, FabricConfigInterface } from 'ngx-fabric-wrapper';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ],
  standalone: false
})
export class AppComponent {
  public show: boolean = true;

  public data: any = {
    objects: [
      {
        type: 'group',
        top: 22,
        left: 72,
        width: 200,
        height: 60,
        objects: [
          {
            type: 'rect',
            top: -30,
            left: -100,
            width: 200,
            height: 60,
            fill: '#cfcfcf'
          },
          {
            type: 'text',
            width: 200,
            height: 60,
            fontSize: 24,
            text: 'Example object',
            originX: 'center',
            originY: 'center'
          }
        ]
      }
    ]
  };

  public type: string = 'component';

  public disabled: boolean = false;

  public config: FabricConfigInterface = {
    renderOnAddRemove: true
  };

  @ViewChild(FabricComponent, { static: false }) componentRef?: FabricComponent;
  @ViewChild(FabricDirective, { static: false }) directiveRef?: FabricDirective;

  constructor() {}

  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public addLine(): void {
    const line = new Line([
      44, 100, 300, 100
    ], {
      fill: '#000000',
      stroke: '#000000',
      strokeWidth: 3
    });

    if (this.type === 'directive' && this.directiveRef) {
      (this.directiveRef.fabric() as Canvas).add(line);
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      (this.componentRef.directiveRef.fabric() as Canvas).add(line);
    }
  }

  public addText(): void {
    const text = new Text('Angular', {
      top: 120,
      left: 105,
      fill: '#000000'
    });

    if (this.type === 'directive' && this.directiveRef) {
      (this.directiveRef.fabric() as Canvas).add(text);
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      (this.componentRef.directiveRef.fabric() as Canvas).add(text);
    }
  }

  public addImage(): void {
    FabricImage.fromURL('https://angular.io/assets/images/logos/angular/angular.png').then((image) => {
      image.scale(0.5);

      image.set({ left: 110, top: 180 });

      if (this.type === 'directive' && this.directiveRef) {
        (this.directiveRef.fabric() as Canvas).add(image);
      } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
        (this.componentRef.directiveRef.fabric() as Canvas).add(image);
      }
    });
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public resetCanvasObjects(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.clear();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.clear();
    }

    this.data = Object.assign({}, this.data);
  }

  public onDataLoaded(canvas: any): void {
    console.log('Data loaded:', canvas);
  }

  public onObjectAdded(event: any): void {
    console.log('Object added:', event);
  }

  public onSelectionCreated(event: any): void {
    console.log('Selection created:', event);
  }
}
