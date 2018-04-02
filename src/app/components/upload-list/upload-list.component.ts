import {Component, OnInit} from '@angular/core';
import {VideosService} from '../../services/videos.service';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html'
})
export class UploadListComponent implements OnInit {

  constructor(private videoService: VideosService) {
    this.videoService.getUserVideos().subscribe((res) => {
      console.log(res);
    });
  }

  ngOnInit() {

  }

}
