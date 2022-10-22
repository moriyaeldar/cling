import { NgModule } from '@angular/core';

import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { PersonFill,Alarm,App,Bookmark,  Heart, Sliders, PlusCircleFill, Columns, ChevronRight, CameraFill, FolderFill, MicFill, Search, GearFill, ChevronCompactDown, Whatsapp } from 'ng-bootstrap-icons/icons';

// Select some icons (use an object, not an array)
const icons = {
  PersonFill,
  PlusCircleFill,
  Columns,
  Sliders,
  Heart,
  Alarm,App,Bookmark,
  ChevronRight,
  CameraFill,
  FolderFill,
  MicFill,
  Search,
  GearFill,
  ChevronCompactDown,
  Whatsapp
};

@NgModule({
  imports: [BootstrapIconsModule.pick(icons)],
  exports: [BootstrapIconsModule],
})
export class IconsModule {}

// NOTES:
// 1. We add BootstrapIconsModule to the 'exports', since the <bi> component will be used in templates of parent module
// 2. Don't forget to pick some icons using BootstrapIconsModule.pick({ ... })
