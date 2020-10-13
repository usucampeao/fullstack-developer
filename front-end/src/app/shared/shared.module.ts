// Angular modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular html editor
import { AngularEditorModule } from '@kolkov/angular-editor';

// Material
import { LayoutModule } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
// Form Controls
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Buttons & indicators
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// Popups / modals
import { MatDialogModule } from '@angular/material/dialog';     
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Data table
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';        
import { MatPaginatorModule } from '@angular/material/paginator';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

// Own components
import {
	MainNavComponent,
	MainLayoutComponent,
	ToolbarComponent,
	AccountCardComponent
} from './layouts/index';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';
import { MenuDropdownComponent } from './layouts/toolbar/menu-dropdown/menu-dropdown.component';
import { MenuComponent } from './layouts/sidenav/menu/menu.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MatConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true,
	wheelSpeed: 2,
	wheelPropagation: true
};

@NgModule({
	imports: [
		// Angular
		CommonModule,
		RouterModule,
		// Material		
		LayoutModule,
		MatFormFieldModule,
		MatCardModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatDialogModule,
		MatMenuModule,
		MatExpansionModule,
		// End Material
		PerfectScrollbarModule
	],
	exports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		/**
         * Material
         */
		// Navigation
		MatMenuModule,
		MatSidenavModule,
		MatToolbarModule,
		// Layout
		MatListModule,
		MatCardModule,
		MatGridListModule,
		MatExpansionModule,
		MatTabsModule,
		// Form Controls
		MatInputModule,
		MatSelectModule,
		MatCheckboxModule,
		MatRadioModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSlideToggleModule,
		// Buttons & indicators
		MatButtonModule,
		MatIconModule,
		MatProgressBarModule,
		// Popups / modals
		MatDialogModule,        // Like a modal
		MatSnackBarModule,      // Like a toast
		MatTooltipModule,
		// Data table
		MatTableModule,
		MatSortModule,          // Sort tables
		MatPaginatorModule,
		/* End Material */
		AngularEditorModule,
		PerfectScrollbarModule
	],
	declarations: [
		MainNavComponent,
		MainLayoutComponent,
		ToolbarComponent,
		MatConfirmDeleteComponent,
		AccountCardComponent,
		SidenavComponent,
		MenuDropdownComponent,
		MenuComponent,
		AuthLayoutComponent
	],
	entryComponents: [
		MatConfirmDeleteComponent
	],
	providers: [
		// scrollbar
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		}
	]
})
export class SharedModule { }
