import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));

// const TaskServiceToken = new InjectionToken('tack-service-token')

// bootstrapApplication(AppComponent,{
//     providers: [{provide:TaskServiceToken}, useClass:TasksService ], // регистрация сервиса
// }).catch((err) => console.error(err));
