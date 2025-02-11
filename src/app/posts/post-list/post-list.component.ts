import { Component } from "@angular/core";

@Component({
    selector: 'post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent{
    posts = [
        { title: '1st Title', content: '1st content' },
        { title: '2nd Title', content: '2nd content' },
        { title: '3rd Title', content: '3rd content' }
    ]
}