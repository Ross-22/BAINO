import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
    selector: 'post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
    posts: Post[] = [];
    private postsSub!: Subscription;
    //@Input() posts=[
    //    {title: '1st title', content: '1st Content' },
    //]
    constructor(public postsService: PostsService){
    }
    ngOnInit() {
        this.posts = this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdatedListener()
        .subscribe((posts: Post[]) =>{
            this.posts = posts;
        }
    );
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}