import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColumnComponent } from './column/column.component';
import { NoteComponent } from './note/note.component';
import { TopicComponent } from './topic.component';

const routes: Routes = [
    { path: '', component: TopicComponent, },
    { path: 'note/:id/:name', component: NoteComponent, },
    { path: 'column/:domainId/:topicId/:topicName', component: ColumnComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TopicRoutingModule {
}