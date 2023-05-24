import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// custom components
import { SidebarComponent } from './@features/todo/sidebar/sidebar.component';
import { ContentComponent } from './@features/todo/content/content.component';
import { TodoComponent    } from './@features/todo/todo.component';
import { MetaComponent    } from './@features/todo/meta/meta.component';

// custom services
import { TodoService      } from './@services/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    SidebarComponent,
    ContentComponent,
    MetaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
