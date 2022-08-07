import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'src/@shared/services/notify.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {

  topicId: string = '';
  topicName: string = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private notifyServ: NotifyService,) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.topicId = params['topicId'];
      this.topicName = params['topicName'];
    });
  }

  onNoteClick(note: any) {
    this.router.navigate(['topic/note']);
  }

  onBackClick(){
    console.log(1111111)
    this.router.navigate(['topic/']);
  }

}
