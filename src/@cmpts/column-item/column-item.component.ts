import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss']
})
export class ColumnItemComponent implements OnInit {

  @Input() name: string = '小程序小程序啦啦啦啦啦啦啦啦啦啦啦啦啦啦';
  @Input() intro: string = '一是就业主体人群就业总体稳定。25-59岁就业主体人群失业率4月份虽有所升高，但是升幅明显低于总体失业率水平。6月份，25-59岁就业主体人群失业率为4.5%，比上月回落0.6个百分点，接近2021年平均水平。';
  @Input() selected: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onMyClick() {
    this.selected = true;
    this.onClick.emit();
  }

}
